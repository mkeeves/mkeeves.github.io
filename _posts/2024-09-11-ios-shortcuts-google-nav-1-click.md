# iOS Shortcuts - one click Google Maps Navigation

There are built in widgets for Google Maps on iOS which allow you to quickly navigate to locations like Home or Work, but rely upon the location being saved in your Google account, require more than one press to begin navigation, and also from time to time don't work as expected, for example if your account is signed out. Creating the shortcut on iOS means I can now start navigation with less presses, and without reliance upon data in my google account.

I began by following a guide from another blog (https://www.upsync.dev/2022/08/01/ios-google-maps-shortcut) to create the shortcut in such a way that was easy to reuse as a template. This worked just fine, but I found that in addition to pressing the shortcut button on my iPhone, once Google Maps opened I also needed to Start navigation.

After some googling, followed by a little trial and error, I amended the last 2 steps in the shortcut. The penultimate step now uses the URL of the Universal maps URI scheme, and the last step opens the x-callback-url.

<img title="a title" alt="Alt text" src="../assets/2024-09-11-ios-shortcuts-google-nav-1-click/1.png">

Because shortcuts can be added as widgets on iOS, I can now start navigating locations I've saved using this shortcut very quickly. If I want to add another destination, then it's easy to duplicate the shortct and amend the destination.

Here is the final result...
![Pic 1](../assets/2024-09-11-ios-shortcuts-google-nav-1-click/1.png "")

![Pic 2](../assets/2024-09-11-ios-shortcuts-google-nav-1-click/1.png "")

<img src="../assets/2024-09-11-ios-shortcuts-google-nav-1-click/1.png" />

<img src="../assets/2024-09-11-ios-shortcuts-google-nav-1-click/1.png" />

<img src="../assets/2024-09-11-ios-shortcuts-google-nav-1-click/1.png" />