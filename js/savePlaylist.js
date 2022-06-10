// IMPORTS
import {
  savePlaylist_html,
  popup_synced_message,
  searchErrorMessage_newPlaylist,
  searchErrorMessage_oldPlaylist,
} from "../utils/htmlElements.js";
import { main_content } from "../utils/globalVariables.js";
import {
  injectFunctionToWebsite,
  createPlaylistConfirmHtml,
  handlePlaylist,
  changeHeadline,
  popupAlert,
  insertHtmlToDom,
  getPlaylistAndPassMessage,
  comparePlaylists,
} from "../utils/utils.js";

// QUERY SELECTORS
let savePlaylist_link = document.querySelector(".savePlaylist_link");
let savePlaylist_button;

// EVENT LISTENERS
// A listener on the extension that receives the playlist from the page, creates html and displays it.
chrome.runtime.onMessage.addListener((request) => {
  createPlaylistConfirmHtml(
    ".newPlaylist",
    request.playlist,
    searchErrorMessage_newPlaylist
  );
});

// Update the mainContent and add eventListener to the newly created html
savePlaylist_link.addEventListener("click", () => {
  insertHtmlToDom(main_content, savePlaylist_html);
  chrome.storage.local.get(["data"], ({ data }) => {
    createPlaylistConfirmHtml(
      ".oldPlaylist",
      data.playlist,
      searchErrorMessage_oldPlaylist
    );
  });
  changeHeadline("Find playlist from this page");
  savePlaylist_button = document.querySelector(".savePlaylist_button");
  injectFunctionToWebsite(savePlaylist_button, handlePlaylist);
  savePlaylist_button.addEventListener("click", () => {
    const [numberDeletedVideos, deletedVideos] = comparePlaylists(
      ".oldPlaylist",
      ".newPlaylist"
    );
    popupAlert(popup_synced_message(numberDeletedVideos, deletedVideos));
  });
});

// A functions thats adds an eventListener and upon activating injects as run code on the website
injectFunctionToWebsite(savePlaylist_link, getPlaylistAndPassMessage);
