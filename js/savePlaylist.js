// IMPORTS
import { savePlaylist_html } from "../utils/htmlElements.js";
import { main_content } from "../utils/globalVariables.js";
import {
  injectFunctionToWebsite,
  createPlaylistConfirmHtml,
  handlePlaylist,
  changeHeadline,
  popupAlert,
  insertHtmlToDom,
  getPlaylistAndPassMessage,
} from "../utils/utils.js";

// QUERY SELECTORS
let savePlaylist_link = document.querySelector(".savePlaylist_link");
let savePlaylist_button;

// EVENT LISTENERS
// A listener on the extension that receives the playlist from the page, creates html and displays it.
chrome.runtime.onMessage.addListener((request) => {
  let savePlaylist_list = document.querySelector(".savePlaylist_list");
  createPlaylistConfirmHtml(savePlaylist_list, request.playlist, main_content);
});

// Update the mainContent and add eventListener to the newly created html
savePlaylist_link.addEventListener("click", () => {
  insertHtmlToDom(main_content, savePlaylist_html);
  changeHeadline("Find playlist from this youtube page");
  savePlaylist_button = document.querySelector(".savePlaylist_button");
  injectFunctionToWebsite(savePlaylist_button, handlePlaylist);
  savePlaylist_button.addEventListener("click", () => {
    popupAlert("Your playlist have been saved");
  });
});

// A functions thats adds an eventListener and upon activating injects as run code on the website
injectFunctionToWebsite(savePlaylist_link, getPlaylistAndPassMessage);
