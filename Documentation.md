# Summary

This project is a vanilla js app. Here are some key points:

- Built as a "single page app".
- The div with the class "main_content" is were the dynamic content lays.
- 1 js file for each link in the nav/sidebar.
- Storing data in chrome.storage.local
-

## Terms/keywords

- MainContent: The base element for the SPA. This is were all the dynamic html is displayed.
- Content script: This is code that is run in the context of the actual website. This has access to the DOM on the website.
- UI element/extension code: This is the code that is run on the extension-side/UI-elements. This has no access to the website DOM.

### How it works

It start when the user is on a page with a youtube-playlist. Then it will search through the dom to find a playlist based on some elements and classes. It then stores that playlist in chrome.storage.local.

The user can then "saveAndCompare" the playlist saved the next time they are on a page with the same youtube playlist. After comparing playlists, the user will end up with two lists:

- Deleted videos: All the videos that are not present in the second playlist anymore.
- Updated playlist: The newest playlist that has been saved.

#### Future problems

- The extension finds a youtube playlist on the website by searching for elements and classes in the dom. If youtube changes anything here, no playlist will be found.
