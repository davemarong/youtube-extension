// IMPORTS
import { savePlaylist_html } from "../utils/htmlElements.js";
import { main_content } from "../utils/globalVariables.js";
import {
  injectFunctionToWebsite,
  createPlaylistConfirmHtml,
  handlePlaylist,
  changeHeadline,
  popupAlert,
} from "../utils/utils.js";

// QUERY SELECTORS
let savePlaylist_link = document.querySelector(".savePlaylist_link");
let savePlaylist_button;

// FUNCTIONS
// Find playlist on the youtube page and send it back to extension
const getPlaylistAndPassMessage = () => {
  const currentPlaylist = [
    ...document.querySelectorAll("[page-subtype='playlist'] #meta h3 a"),
  ].map((item) => {
    return item.title;
  });
  chrome.runtime.sendMessage({ playlist: currentPlaylist });
};

// Update content on the findPlaylist page
const updateContent = () => {
  main_content.innerHTML = savePlaylist_html;
  changeHeadline("Find playlist from this youtube page");
  savePlaylist_button = document.querySelector(".savePlaylist_button");
  injectFunctionToWebsite(savePlaylist_button, handlePlaylist);
  savePlaylist_button.addEventListener("click", () => {
    popupAlert("Your playlist have been saved");
  });
};

// EVENT LISTENERS
// A listener on the extension that receives the playlist from the page, creates html and displays it.
chrome.runtime.onMessage.addListener((request) => {
  let savePlaylist_list = document.querySelector(".savePlaylist_list");
  createPlaylistConfirmHtml(savePlaylist_list, request.playlist, main_content);
});

savePlaylist_link.addEventListener("click", updateContent);

injectFunctionToWebsite(savePlaylist_link, getPlaylistAndPassMessage);
