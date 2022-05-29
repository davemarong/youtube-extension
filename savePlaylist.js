// imports
import { savePlaylist_html } from "./htmlElements.js";
import { main_content } from "./globalVariables.js";
import {
  getCurrentPlaylist,
  injectFunctionToWebsite,
  createPlaylistConfirmHtml,
  handlePlaylist,
  changeHeadline,
} from "./utils.js";

let savePlaylist_link = document.querySelector(".savePlaylist_link");
let savePlaylist_button;

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
  createPlaylistConfirmHtml(savePlaylist_list, request.playlist);
});

const updateContent = () => {
  main_content.innerHTML = savePlaylist_html;
  changeHeadline("Find playlist from this youtube page");
  savePlaylist_button = document.querySelector(".savePlaylist_button");
  injectFunctionToWebsite(savePlaylist_button, handlePlaylist);
};

injectFunctionToWebsite(savePlaylist_link, getPlaylistAndPassMessage);
savePlaylist_link.addEventListener("click", updateContent);
