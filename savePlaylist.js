// imports
import { savePlaylist_confirmation } from "./htmlElements.js";
import { main_content } from "./globalVariables.js";
import {
  getCurrentPlaylist,
  injectFunctionToWebsite,
  createPlaylistConfirmationHtml,
  handlePlaylist,
} from "./utils.js";

let savePlaylist_button = document.querySelector(".savePlaylist");
let confirmation_button;

// The script picks up on every video on youtube. Fix that bro. A more specific selector goes a long way
const getPlaylistAndPassMessage = () => {
  const currentPlaylist = [
    ...document.querySelectorAll("[page-subtype='playlist'] #meta h3 a"),
  ].map((item) => {
    return item.title;
  });
  chrome.runtime.sendMessage({ playlist: currentPlaylist });
};

chrome.runtime.onMessage.addListener((request) => {
  console.log(request.playlist);
  let savePlaylist_list = document.querySelector(".savePlaylist_list");
  createPlaylistConfirmationHtml(savePlaylist_list, request.playlist);
});

const updateContent = () => {
  main_content.innerHTML = savePlaylist_confirmation;
  confirmation_button = document.querySelector(".confirmation_button");
  injectFunctionToWebsite(confirmation_button, handlePlaylist);
};

injectFunctionToWebsite(savePlaylist_button, getPlaylistAndPassMessage);
savePlaylist_button.addEventListener("click", updateContent);
