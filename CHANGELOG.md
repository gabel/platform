# Mattermost Changelog

## UNDER DEVELOPMENT Release v1.2.0

The "UNDER DEVELOPMENT" section of the Mattermost changelog appears in the product's `master` branch to note key changes committed to master and are on their way to the next stable release. When a stable release is pushed the "UNDER DEVELOPMENT" heading is removed from the final changelog of the release. 

- **Release candidate anticipated:** 2015-11-10
- **Final release anticipated:** 2015-11-16

### Improvements 

Onboarding 

- New tutorial explaining how to use Mattermost for new users

Messaging and Notifications 

- Users can now search for teammates to add to **Direct Message** list via **More** menu
- Users can now personalize Direct Messages list by removing users listed
- Link previews - Adding URL with .gif file adds image below message 

Search 

- Adding search term `in:[channel_url_name]` now limits searches within a specific channel
- Adding search term `from:[username]` now limits searches to messages from a specific user
- Tip explaining search options when clicking into search box

Integrations 

- [Outgoing webhooks](https://github.com/mattermost/platform/blob/master/doc/integrations/webhooks/Outgoing-Webhooks.md) now available
- Made available [application template showing outgoing webhooks working with Mattermost and external application](https://github.com/mattermost/mattermost-integration-giphy)

User Interface

- Member list in Channel display now scrollable, and includes Message button to message channel members directly
- Added ability to edit previous message by hitting UP arrow
- Syntax highlighting added for code blocks
   - Languages include `Diff, Apache, Makefile, HTTP, JSON, Markdown, Java, CSS, nginx, ObjectiveC, Python, XML, Perl, Bash, PHP, Coffee, C, SQL, Go, Ruby, Java, and ini`. 
   - Use by adding the name of the language on the first link of the code block, for example: ```python
   - Syntax color theme can be defined under **Account Settings** > **Appearance Settings** > **Custom Theme**

Team Settings

- Added Team Settings option to include account creation URL on team login page
- Added Team Settings option to include link to given team on root page
- Ability to rotate invite code for invite URL 

Extras

- Added `/shrug KEYWORD` command to output: `¯\_(ツ)_/¯ KEYWORD`
- Added `/me KEYWORD` command to output: _`KEYWORD`_ 

System Console

- New statistics page
- Configurable option to create an account directly from team page

#### Bug Fixes

- Various fixes to theme colors 

### Compatibility  

- IE 11 new minimum version for IE, since IE 10 share fell below 5% on desktop 
- Safari 8 new minimum version for Safari, since Safari 7 fell below 1% on desktop 

#### Config.json Changes from v1.1 to v1.2

Multiple settings were added to [`config.json`](./config/config.json). These options can be modified in the System Console, or manually updated in the existing config.json file. This is a list of changes and their new default values in a fresh install: 
- Under `TeamSettings` in `config.json`:
  - Added: `"RestrictTeamNames": true` to control whether team names are restricted
  - Added: `"EnableTeamListing": false` to control whether teams can be listed on the root page of the site
- Under `ServiceSettings` in `config.json`
  - Added: `EnableOutgoingWebhooks": true` to turn on outgoing webhooks

#### Database Changes from v1.1 to v1.2

The following is for informational purposes only, no action needed. Mattermost automatically upgrades database tables from the previous version's schema using only additions. Sessions table is dropped and rebuilt, no team data is affected by this. 

##### Channels Table
1. Renamed `Description` to `Header`
2. Added `Purpose` column with type `varchar(1024)`

##### Preferences Table
1. Added `Preferences` Table

##### Teams Table 
1. Added `InviteId` column with type `varchar(32)`
2. Added `AllowOpenInvite` column with type `tinyint(1)`
3. Added `AllowTeamListing` column with type `tinyint(1)`
4. Added `idx_teams_invite_id` index

#### Known Issues

- Microsoft Edge does not yet support drag and drop 
- Incoming webhooks no longer disrupted when channel is deleted

#### Contributors 

Many thanks to our external contributors. In no particular order:

- [florianorben](https://github.com/florianorben)
- [trashcan](https://github.com/trashcan)
- [girishso](https://github.com/girishso)
- [apaatsio](https://github.com/apaatsio)
- [jlebleu](https://github.com/jlebleu)
- [stasvovk](https://github.com/stasvovk)
- [mcmillhj](https://github.com/mcmillhj)
- [sharms](https://github.com/sharms)
- [jvasallo](https://github.com/jvasallo)
- [layzerar](https://github.com/layzerar)
- [optimistiks](https://github.com/optimistiks)
- [layzerar](https://github.com/layzerar)

## Release v1.1.1 (Bug Fix Release) 

Released 2015-10-20 

### About Bug Fix Releases

This is a bug fix release (v1.1.1) and recommended only for users needing a fix to the specific issue listed below. All other users should use the most recent major stable build release (v1.1.0). 

[View more information on Mattermost release numbering](https://github.com/mattermost/platform/blob/master/doc/install/release-numbering.md).

### Release Purpose

#### Provide option for upgrading database from Mattermost v0.7 to v1.1

Upgrading Mattermost v0.7 to Mattermost v1.1 originally required installing Mattermost v1.0 to upgrade from the Mattermost v0.7 database, followed by an install of Mattermost v1.1. 

This was problematic for installing Mattermost with GitLab omnibus since GitLab 8.0 contained Mattermost v0.7 and GitLab 8.1 was to include Mattermost v1.1

Therefore Mattermost v1.1.1 was created that can upgrade the database in Mattermost v0.7 to Mattermost v1.1 directly. 

Users who configured Mattermost v0.7 within GitLab via the `config.json` file should consult [documentation on upgrading configurations from Mattermost v0.7 to Mattermost v1.1](https://github.com/mattermost/platform/blob/master/doc/install/Upgrade-Guide.md#upgrading-mattermost-v07-to-v11).

#### Removes 32-char limit on salts 

Mattermost v1.1 introduced a 32-char limit on salts that broke the salt generating in GitLab and this restriction was removed for 1.1.1. 

## Release v1.1.0

Released: 2015-10-16

### Release Highlights

#### Incoming Webhooks

Mattermost now supports incoming webhooks for channels and private groups. This developer feature is available from the Account Settings -> Integrations menu. Documentation on how developers can use the webhook functionality to build custom integrations, along with samples, is available at http://mattermost.org/webhooks. 

### Improvements

Integrations

- Improved support for incoming webhooks, including the ability to override a username and post as a bot instead

Documentation

- Added documentation on config.json and System Console settings 
- Docker Toolbox replaces deprecated Boot2Docker instructions in container install documentation 

Theme Colors

- Improved appearance of dark themes

System Console 

- Client side errors now written to server logs 
- Added "EnableSecurityFixAlert" option to receive alerts on relevant security fix alerts
- Various improvements to System Console UI and help text

Messaging and Notifications

- Replaced "Quiet Mode" in the Channel Notification Settings with an option to only show unread indicator when mentioned

### Bug Fixes

- Fixed regression causing "Get Public Link" on images not to work
- Fixed bug where certain characters caused search errors
- Fixed bug where System Administrator did not have Team Administrator permissions
- Fixed bug causing scrolling to jump when the right hand sidebar opened and closed

### Known Issues

- Slack import is unstable due to change in Slack export format
- Uploading a .flac file breaks the file previewer on iOS

### Compatibility 

#### Config.json Changes from v1.0 to v1.1 

##### Service Settings 

Multiple settings were added to [`config.json`](./config/config.json) and System Console UI. Prior to upgrading the Mattermost binaries from the previous versions, these options would need to be manually updated in existing config.json file. This is a list of changes and their new default values in a fresh install: 
- Under `ServiceSettings` in `config.json`:
  - Added: `"EnablePostIconOverride": false` to control whether webhooks can override profile pictures
  - Added: `"EnablePostUsernameOverride": false` to control whether webhooks can override profile pictures
  - Added: `"EnableSecurityFixAlert": true` to control whether the system is alerted to security updates

#### Database Changes from v1.0 to v1.1

The following is for informational purposes only, no action needed. Mattermost automatically upgrades database tables from the previous version's schema using only additions. Sessions table is dropped and rebuilt, no team data is affected by this. 

##### ChannelMembers Table
1. Removed `NotifyLevel` column
2. Added `NotifyProps` column with type `varchar(2000)` and default value `{}`

### Contributors

Many thanks to our external contributors. In no particular order: 

- [chengweiv5](https://github.com/chengweiv5)
- [pstonier](https://github.com/pstonier)
- [teviot](https://github.com/teviot)
- [tmuwandi](https://github.com/tmuwandi)
- [driou](https://github.com/driou)
- [justyns](https://github.com/justyns)
- [drbaker](https://github.com/drbaker)
- [thomas9987](https://github.com/thomas9987)
- [chuck5](https://github.com/chuck5)
- [sjmog](https://github.com/sjmog)
- [chengkun](https://github.com/chengkun)
- [sexybern](https://github.com/sexybern)
- [tomitm](https://github.com/tomitm)
- [stephenfin](https://github.com/stephenfin)

## Release v1.0.0

Released 2015-10-02

### Release Highlights

#### Markdown 

Markdown support is now available across messages, comments and channel descriptions for: 

- **Headings** - in five different sizes to help organize your thoughts 
- **Lists** - both numbered and bullets
- **Font formatting** - including **bold**, _italics_, ~~strikethrough~~, `code`, links, and block quotes)
- **In-line images** - useful for creating buttons and status messages
- **Tables** - for keeping things organized 
- **Emoticons** - translation of emoji codes to images like :sheep: :boom: :rage1: :+1: 

See [documentation](doc/help/enduser/markdown.md) for full details.

#### Themes

Themes as been significantly upgraded in this release with: 

- 4 pre-set themes, two light and two dark, to customize your experience
- 18 detailed color setting options to precisely match the colors of your other tools or preferences 
- Ability to import themes from Slack

#### System console and command line tools 

Added new web-based System Console for managing instance level configuration. This lets IT admins conveniently: 

- _access core settings_, like server, database, email, rate limiting, file store, SSO, and log settings, 
- _monitor operations_, by quickly accessing log files and user roles, and
- _manage teams_, with essential functions such as team role assignment and password reset

In addition new command line tools are available for managing Mattermost system roles, creating users, resetting passwords, getting version info and other basic tasks. 

Run `./platform -h` for documentation using the new command line tool.


### New Features 

Messaging, Comments and Notifications

- Full markdown support in messages, comments, and channel description 
- Support for emoji codes rendering to image files

Files and Images 

- Added ability to play video and audio files 

System Console 

- UI to change config.json settings
- Ability to view log files from console
- Ability to reset user passwords
- Ability for IT admin to manage members across multiple teams from single interface

User Interface

- Ability to set custom theme colors
- Replaced single color themes with pre-set themes
- Added ability to import themes from Slack

Integrations

- (Preview) Initial support for incoming webhooks 

### Improvements

Documentation

- Added production installation instructions 
- Updated software and hardware requirements documentation
- Re-organized install instructions out of README and into separate files
- Added Code Contribution Guidelines
- Added new hardware sizing recommendations 
- Consolidated licensing information into LICENSE.txt and NOTICE.txt
- Added markdown documentation 

Performance 

- Enabled Javascript optimizations 
- Numerous improvements in center channel and mobile web 

Code Quality 

- Reformatted Javascript per Mattermost Style Guide

User Interface

- Added version, build number, build date and build hash under Account Settings -> Security

Licensing 

- Compiled version of Mattermost v1.0.0 now available under MIT license

### Bug Fixes

- Fixed issue so that SSO option automatically set `EmailVerified=true` (it was false previously)

### Compatibility 

A large number of settings were changed in [`config.json`](./config/config.json) and a System Console UI was added. This is a very large change due to Mattermost releasing as v1.0 and it's unlikely a change of this size would happen again. 

Prior to upgrading the Mattermost binaries from the previous versions, the below options would need to be manually updated in your existing config.json file to migrate successfully. This is a list of changes and their new default values in a fresh install: 
#### Config.json Changes from v0.7 to v1.0 

##### Service Settings 

- Under `ServiceSettings` in [`config.json`](./config/config.json):
  - Moved: `"SiteName": "Mattermost"` which was added to `TeamSettings`
  - Removed: `"Mode" : "dev"` which deprecates a high level dev mode, now replaced by granular controls
  - Renamed: `"AllowTesting" : false` to `"EnableTesting": false` which allows the use of `/loadtest` slash commands during development
  - Removed: `"UseSSL": false` boolean replaced by `"ConnectionSecurity": ""` under `Security` with new options: _None_ (`""`), _TLS_ (`"TLS"`) and _StartTLS_ ('"StartTLS"`)
  - Renamed: `"Port": "8065"` to `"ListenAddress": ":8065"` to define address on which to listen. Must be prepended with a colon.
  - Removed: `"Version": "developer"` removed and version information now stored in `model/version.go`
  - Removed: `"Shards": {}` which was not used
  - Moved: `"InviteSalt": "gxHVDcKUyP2y1eiyW8S8na1UYQAfq6J6"` to `EmailSettings`
  - Moved: `"PublicLinkSalt": "TO3pTyXIZzwHiwyZgGql7lM7DG3zeId4"` to `FileSettings`
  - Renamed and Moved `"ResetSalt": "IPxFzSfnDFsNsRafZxz8NaYqFKhf9y2t"` to `"PasswordResetSalt": "vZ4DcKyVVRlKHHJpexcuXzojkE5PZ5eL"` and moved to `EmailSettings`
  - Removed: `"AnalyticsUrl": ""` which was not used
  - Removed: `"UseLocalStorage": true` which is replaced by `"DriverName": "local"` in `FileSettings`
  - Renamed and Moved: `"StorageDirectory": "./data/"` to `Directory` and moved to `FileSettings`
  - Renamed: `"AllowedLoginAttempts": 10` to `"MaximumLoginAttempts": 10`
  - Renamed, Reversed and Moved: `"DisableEmailSignUp": false` renamed `"EnableSignUpWithEmail": true`, reversed meaning of `true`, and moved to `EmailSettings`
  - Added: `"EnableOAuthServiceProvider": false` to enable OAuth2 service provider functionality
  - Added: `"EnableIncomingWebhooks": false` to enable incoming webhooks feature

##### Team Settings 

- Under `TeamSettings` in [`config.json`](./config/config.json):
  - Renamed: `"AllowPublicLink": true` renamed to `"EnablePublicLink": true` and moved to `FileSettings`
  - Removed: `AllowValetDefault` which was a guest account feature that is deprecated 
  - Removed: `"TermsLink": "/static/help/configure_links.html"` removed since option didn't need configuration
  - Removed: `"PrivacyLink": "/static/help/configure_links.html"` removed since option didn't need configuration
  - Removed: `"AboutLink": "/static/help/configure_links.html"` removed since option didn't need configuration
  - Removed: `"HelpLink": "/static/help/configure_links.html"` removed since option didn't need configuration
  - Removed: `"ReportProblemLink": "/static/help/configure_links.html"` removed since option didn't need configuration
  - Removed: `"TourLink": "/static/help/configure_links.html"` removed since option didn't need configuration
  - Removed: `"DefaultThemeColor": "#2389D7"` removed since theme colors changed from 1 to 18, default theme color option may be added back later after theme color design stablizes 
  - Renamed: `"DisableTeamCreation": false` to `"EnableUserCreation": true` and reversed
  - Added: ` "EnableUserCreation": true` added to disable ability to create new user accounts in the system

##### SSO Settings

- Under `SSOSettings` in [`config.json`](./config/config.json):
  - Renamed Category: `SSOSettings` to `GitLabSettings`
  - Renamed: `"Allow": false` to `"Enable": false` to enable GitLab SSO
  
##### AWS Settings

- Under `AWSSettings` in [`config.json`](./config/config.json):
  - This section was removed and settings moved to `FileSettings`
  - Renamed and Moved: `"S3AccessKeyId": ""` renamed `"AmazonS3AccessKeyId": "",` and moved to `FileSettings`
  - Renamed and Moved: `"S3SecretAccessKey": ""` renamed `"AmazonS3SecretAccessKey": "",` and moved to `FileSettings`
  - Renamed and Moved: `"S3Bucket": ""` renamed `"AmazonS3Bucket": "",` and moved to `FileSettings`
  - Renamed and Moved: `"S3Region": ""` renamed `"AmazonS3Region": "",` and moved to `FileSettings`

##### Image Settings 

- Under `ImageSettings` in [`config.json`](./config/config.json):
  - Renamed: `"ImageSettings"` section to `"FileSettings"`
  - Added: `"DriverName" : "local"` to specify the file storage method, `amazons3` can also be used to setup S3

##### EmailSettings

- Under `EmailSettings` in [`config.json`](./config/config.json):
  - Removed: `"ByPassEmail": "true"` which is replaced with `SendEmailNotifications` and `RequireEmailVerification`
  - Added: `"SendEmailNotifications" : "false"` to control whether email notifications are sent
  - Added: `"RequireEmailVerification" : "false"` to control if users need to verify their emails
  - Replaced: `"UseTLS": "false"` with `"ConnectionSecurity": ""` with options: _None_ (`""`), _TLS_ (`"TLS"`) and _StartTLS_ (`"StartTLS"`)
  - Replaced: `"UseStartTLS": "false"` with `"ConnectionSecurity": ""` with options: _None_ (`""`), _TLS_ (`"TLS"`) and _StartTLS_ (`"StartTLS"`)

##### Privacy Settings 

- Under `PrivacySettings` in [`config.json`](./config/config.json):
  - Removed: `"ShowPhoneNumber": "true"` which was not used
  - Removed: `"ShowSkypeId" : "true"` which was not used
  
### Database Changes from v0.7 to v1.0

The following is for informational purposes only, no action needed. Mattermost automatically upgrades database tables from the previous version's schema using only additions. Sessions table is dropped and rebuilt, no team data is affected by this. 

##### Users Table
1. Added `ThemeProps` column with type `varchar(2000)` and default value `{}`

##### Teams Table
1. Removed `AllowValet` column

##### Sessions Table
1. Renamed `Id` column `Token`
2. Renamed `AltId` column `Id`
3. Added `IsOAuth` column with type `tinyint(1)` and default value `0`

##### OAuthAccessData Table
1. Added new table `OAuthAccessData`
2. Added `AuthCode` column with type `varchar(128)`
3. Added `Token` column with type `varchar(26)` as the primary key
4. Added `RefreshToken` column with type `varchar(26)`
5. Added `RedirectUri` column with type `varchar(256)`
6. Added index on `AuthCode` column

##### OAuthApps Table
1. Added new table `OAuthApps`
2. Added `Id` column with type `varchar(26)` as primary key
2. Added `CreatorId` column with type `varchar(26)`
2. Added `CreateAt` column with type `bigint(20)`
2. Added `UpdateAt` column with type `bigint(20)`
2. Added `ClientSecret` column with type `varchar(128)`
2. Added `Name` column with type `varchar(64)`
2. Added `Description` column with type `varchar(512)`
2. Added `CallbackUrls` column with type `varchar(1024)`
2. Added `Homepage` column with type `varchar(256)`
3. Added index on `CreatorId` column

##### OAuthAuthData Table
1. Added new table `OAuthAuthData`
2. Added `ClientId` column with type `varchar(26)`
2. Added `UserId` column with type `varchar(26)`
2. Added `Code` column with type `varchar(128)` as primary key
2. Added `ExpiresIn` column with type `int(11)`
2. Added `CreateAt` column with type `bigint(20)`
2. Added `State` column with type `varchar(128)`
2. Added `Scope` column with type `varchar(128)`

##### IncomingWebhooks Table
1. Added new table `IncomingWebhooks`
2. Added `Id` column with type `varchar(26)` as primary key
2. Added `CreateAt` column with type `bigint(20)`
2. Added `UpdateAt` column with type `bigint(20)`
2. Added `DeleteAt` column with type `bigint(20)`
2. Added `UserId` column with type `varchar(26)`
2. Added `ChannelId` column with type `varchar(26)`
2. Added `TeamId` column with type `varchar(26)`
3. Added index on `UserId` column
3. Added index on `TeamId` column

##### Systems Table
1. Added new table `Systems`
2. Added `Name` column with type `varchar(64)` as primary key
3. Added `Value column with type `varchar(1024)`

### Contributors

Many thanks to our external contributors. In no particular order: 

- [jdeng](https://github.com/jdeng)
- [Trozz](https://github.com/Trozz)
- [LAndres](https://github.com/LAndreas)
- [JessBot](https://github.com/JessBot)
- [apaatsio](https://github.com/apaatsio)
- [chengweiv5](https://github.com/chengweiv5)

## Release v0.7.0 (Beta1) 

Released 2015-09-05

### Release Highlights

#### Improved GitLab Mattermost support 

Following the release of Mattermost v0.6.0 Alpha, GitLab 7.14 offered an automated install of Mattermost with GitLab Single-Sign-On (co-branded as "GitLab Mattermost") in its omnibus installer.

New features, improvements, and bug fixes recommended by the GitLab community were incorporated into Mattermost v0.7.0 Beta1--in particular, extending support of GitLab SSO to team creation, and restricting team creation to users with verified emails from a configurable list of domains.

#### Slack Import (Preview)

Preview of Slack import functionality supports the processing of an "Export" file from Slack containing account information and public channel archives from a Slack team.   

- In the feature preview, emails and usernames from Slack are used to create new Mattermost accounts, which users can activate by going to the Password Reset screen in Mattermost to set new credentials. 
- Once logged in, users will have access to previous Slack messages shared in public channels, now imported to Mattermost.  

Limitations: 

- Slack does not export files or images your team has stored in Slack's database. Mattermost will provide links to the location of your assets in Slack's web UI.
- Slack does not export any content from private groups or direct messages that your team has stored in Slack's database. 
- The Preview release of Slack Import does not offer pre-checks or roll-back and will not import Slack accounts with username or email address collisions with existing Mattermost accounts. Also, Slack channel names with underscores will not import. Also, mentions do not yet resolve as Mattermost usernames (still show Slack ID). These issues are being addressed in [Mattermost v0.8.0 Migration Support](https://mattermost.atlassian.net/browse/PLT-22?filter=10002).

### New Features 

GitLab Mattermost 

- Ability to create teams using GitLab SSO (previously GitLab SSO only supported account creation and sign-in)
- Ability to restrict team creation to GitLab SSO and/or users with email verified from a specific list of domains.

File and Image Sharing 

- New drag-and-drop file sharing to messages and comments 
- Ability to paste images from clipboard to messages and comments 

Messaging, Comments and Notifications 

- Send messages faster with from optimistic posting and retry on failure 

Documentation 

- New style guidelines for Go, React and Javascript 

### Improvements

Messaging, Comments and Notifications 

- Performance improvements to channel rendering
- Added "Unread posts" in left hand sidebar when notification indicator is off-screen

Documentation 

- Install documentation improved based on early adopter feedback

### Bug Fixes

- Fixed multiple issues with GitLab SSO, installation and on-boarding 
- Fixed multiple IE 10 issues 
- Fixed broken link in verify email function 
- Fixed public links not working on mobile

### Contributors

Many thanks to our external contributors. In no particular order: 

- [asubset](https://github.com/asubset)
- [felixbuenemann](https://github.com/felixbuenemann)
- [CtrlZvi](https://github.com/CtrlZvi)
- [BastienDurel](https://github.com/BastienDurel)
- [manusajith](https://github.com/manusajith)
- [doosp](https://github.com/doosp)
- [zackify](https://github.com/zackify)
- [willstacey](https://github.com/willstacey)

Special thanks to the GitLab Mattermost early adopter community who influenced this release, and who play a pivotal role in bringing Mattermost to over 100,000 organizations using GitLab today. In no particular order: 

- [cifvts](http://forum.mattermost.org/users/cifvts/activity)
- [Chryb](https://gitlab.com/u/Chryb)
- [cookacounty](https://gitlab.com/u/cookacounty)
- [bweston92](https://gitlab.com/u/bweston92)
- [mablae](https://gitlab.com/u/mablae)
- [picharmer](https://gitlab.com/u/picharmer)
- [cmtonkinson](https://gitlab.com/u/cmtonkinson)
- [cmthomps](https://gitlab.com/u/cmthomps)
- [m.gamperl](https://gitlab.com/u/m.gamperl)
- [StanMarsh](https://gitlab.com/u/StanMarsh)
- [alx1](https://gitlab.com/u/alx1)
- [jeanmarc-leroux](https://gitlab.com/u/jeanmarc-leroux)
- [dnoe](https://gitlab.com/u/dnoe)
- [dblessing](https://gitlab.com/u/dblessing)
- [mechanicjay](https://gitlab.com/u/mechanicjay)
- [larsemil](https://gitlab.com/u/larsemil)
- [vga](https://gitlab.com/u/vga)
- [stanhu](https://gitlab.com/u/stanhu)
- [kohenkatz](https://gitlab.com/u/kohenkatz)
- [RavenB1](https://gitlab.com/u/RavenB1)
- [booksprint](http://forum.mattermost.org/users/booksprint/activity)
- [scottcorscadden](http://forum.mattermost.org/users/scottcorscadden/activity)
- [sskmani](http://forum.mattermost.org/users/sskmani/activity)
- [gosure](http://forum.mattermost.org/users/gosure/activity)
- [jigarshah](http://forum.mattermost.org/users/jigarshah/activity)

Extra special thanks to GitLab community leaders for successful release of GitLab Mattermost Alpha: 

- [marin](https://gitlab.com/u/marin)
- [sytse](https://gitlab.com/u/sytse) 


## Release v0.6.0 (Alpha) 

Released 2015-08-07

### Release Highlights

- Simplified on-prem install
- Support for GitLab Mattermost (GitLab SSO, Postgres support, IE 10+ support) 

### Compatibility

*Note: While use of Mattermost Preview (v0.5.0) and Mattermost Alpha (v0.6.0) in production is not recommended, we document compatibility considerations for a small number of organizations running Mattermost in production, supported directly by Mattermost product team.*

- Switched Team URLs from team.domain.com to domain.com/team 

### New Features 

GitLab Mattermost 

- OAuth2 support for GitLab Single-Sign-On
- PostgreSQL support for GitLab Mattermost users
- Support for Internet Explorer 10+ for GitLab Mattermost users

File and Image Sharing 

- New thumbnails and formatting for files and images

Messaging, Comments and Notifications 

- Users now see posts they sent highlighted in a different color
- Mentions can now also trigger on user-defined words 

Security and Administration 

- Enable users to view and log out of active sessions
- Team Admin can now delete posts from any user

On-boarding 

- “Off-Topic” now available as default channel, in addition to “Town Square” 

### Improvements

Installation 

- New "ByPassEmail" setting enables Mattermost to operate without having to set up email
- New option to use local storage instead of S3 
- Removed use of Redis to simplify on-premise installation 

On-boarding 

- Team setup wizard updated with usability improvements 

Documentation 

- Install documentation improved based on early adopter feedback 

### Contributors 

Many thanks to our external contributors. In no particular order: 

- [ralder](https://github.com/ralder)
- [jedisct1](https://github.com/jedisct1)
- [faebser](https://github.com/faebser)
- [firstrow](https://github.com/firstrow)
- [haikoschol](https://github.com/haikoschol)
- [adamenger](https://github.com/adamenger)

## Release v0.5.0 (Preview) 

Released 2015-06-24

### Release Highlights

- First release of Mattermost as a team communication service for sharing messagse and files across PCs and phones, with archiving and instant search.
 
### New Features

Messaging and File Sharing

- Send messages, comments, files and images across public, private and 1-1 channels
- Personalize notifications for unreads and mentions by channel
- Use #hashtags to tag and find messages, discussions and files

Archiving and Search 
 
- Search public and private channels for historical messages and comments 
- View recent mentions of your name, username, nickname, and custom search terms

Anywhere Access

- Use Mattermost from web-enabled PCs and phones
- Define team-specific branding and color themes across your devices
