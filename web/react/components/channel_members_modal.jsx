// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

const MemberList = require('./member_list.jsx');
const ChannelInviteModal = require('./channel_invite_modal.jsx');

const UserStore = require('../stores/user_store.jsx');
const ChannelStore = require('../stores/channel_store.jsx');

const AsyncClient = require('../utils/async_client.jsx');
const Client = require('../utils/client.jsx');
const Utils = require('../utils/utils.jsx');

const Modal = ReactBootstrap.Modal;

export default class ChannelMembersModal extends React.Component {
    constructor(props) {
        super(props);

        this.getStateFromStores = this.getStateFromStores.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        const state = this.getStateFromStores();
        state.showInviteModal = false;
        this.state = state;
    }
    getStateFromStores() {
        const users = UserStore.getActiveOnlyProfiles();
        const memberList = ChannelStore.getCurrentExtraInfo().members;

        const nonmemberList = [];
        for (const id in users) {
            if (users.hasOwnProperty(id)) {
                let found = false;
                for (let i = 0; i < memberList.length; i++) {
                    if (memberList[i].id === id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    nonmemberList.push(users[id]);
                }
            }
        }

        function compareByUsername(a, b) {
            if (a.username < b.username) {
                return -1;
            } else if (a.username > b.username) {
                return 1;
            }

            return 0;
        }

        memberList.sort(compareByUsername);
        nonmemberList.sort(compareByUsername);

        const channel = ChannelStore.getCurrent();
        let channelName = '';
        if (channel) {
            channelName = channel.display_name;
        }

        return {
            nonmemberList,
            memberList,
            channelName
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.show && nextProps.show) {
            ChannelStore.addExtraInfoChangeListener(this.onChange);
            ChannelStore.addChangeListener(this.onChange);
        } else if (this.props.show && !nextProps.show) {
            ChannelStore.removeExtraInfoChangeListener(this.onChange);
            ChannelStore.removeChangeListener(this.onChange);
        }
    }
    onChange() {
        const newState = this.getStateFromStores();
        if (!Utils.areStatesEqual(this.state, newState)) {
            this.setState(newState);
        }
    }
    handleRemove(userId) {
        // Make sure the user is a member of the channel
        const memberList = this.state.memberList;
        let found = false;
        for (let i = 0; i < memberList.length; i++) {
            if (memberList[i].id === userId) {
                found = true;
                break;
            }
        }

        if (!found) {
            return;
        }

        const data = {};
        data.user_id = userId;

        Client.removeChannelMember(ChannelStore.getCurrentId(), data,
            () => {
                let oldMember;
                for (let i = 0; i < memberList.length; i++) {
                    if (userId === memberList[i].id) {
                        oldMember = memberList[i];
                        memberList.splice(i, 1);
                        break;
                    }
                }

                const nonmemberList = this.state.nonmemberList;
                if (oldMember) {
                    nonmemberList.push(oldMember);
                }

                this.setState({memberList, nonmemberList});
                AsyncClient.getChannelExtraInfo(true);
            },
            (err) => {
                this.setState({inviteError: err.message});
            }
         );
    }
    render() {
        const currentMember = ChannelStore.getCurrentMember();
        let isAdmin = false;
        if (currentMember) {
            isAdmin = Utils.isAdmin(currentMember.roles) || Utils.isAdmin(UserStore.getCurrentUser().roles);
        }

        return (
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onModalDismissed}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title><span className='name'>{this.state.channelName}</span>{' Members'}</Modal.Title>
                        <a
                            className='btn btn-md btn-primary'
                            href='#'
                            onClick={() => {
                                this.setState({showInviteModal: true});
                                this.props.onModalDismissed();
                            }}
                        >
                            <i className='glyphicon glyphicon-envelope'/>{' Add New Members'}
                        </a>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='col-sm-12'>
                            <div className='team-member-list'>
                                <MemberList
                                    memberList={this.state.memberList}
                                    isAdmin={isAdmin}
                                    handleRemove={this.handleRemove}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type='button'
                            className='btn btn-default'
                            onClick={this.props.onModalDismissed}
                        >
                            {'Close'}
                        </button>
                    </Modal.Footer>
                </Modal>
                <ChannelInviteModal
                    show={this.state.showInviteModal}
                    onModalDismissed={() => this.setState({showInviteModal: false})}
                />
            </div>
        );
    }
}

ChannelMembersModal.defaultProps = {
    show: false
};

ChannelMembersModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onModalDismissed: React.PropTypes.func.isRequired
};
