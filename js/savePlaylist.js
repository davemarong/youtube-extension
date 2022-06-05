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
  createPlaylistConfirmHtml(".newPlaylist", request.playlist, main_content);
});

// Update the mainContent and add eventListener to the newly created html
savePlaylist_link.addEventListener("click", () => {
  insertHtmlToDom(main_content, savePlaylist_html);
  chrome.storage.local.get(["data"], ({ data }) => {
    createPlaylistConfirmHtml(".oldPlaylist", data.playlist, main_content);
  });
  changeHeadline("Find playlist from this page");
  savePlaylist_button = document.querySelector(".savePlaylist_button");
  injectFunctionToWebsite(savePlaylist_button, handlePlaylist);
  savePlaylist_button.addEventListener("click", () => {
    const [numberDeletedVideos, deletedVideos] = comparePlaylists(
      ".oldPlaylist",
      ".newPlaylist"
    );
    console.log(numberDeletedVideos);
    popupAlert(
      `<div>
      <p>
      We found ${numberDeletedVideos} videos ${
        deletedVideos.length > 0
          ? ", these have been saved to your 'deleted videos' list."
          : "."
      }
      </p>
      <p>
      ${deletedVideos}
      </p>
      </div>`
    );
  });
});

const comparePlaylists = (selector1, selector2) => {
  let oldPlaylist_element = document.querySelector(selector1);
  let newPlaylist_element = document.querySelector(selector2);

  const oldPlaylist = [...oldPlaylist_element.querySelectorAll("p")].map(
    (video) => video.textContent
  );
  const newPlaylist = [...newPlaylist_element.querySelectorAll("p")].map(
    (video) => video.textContent
  );

  const newlyDeletedVideos = oldPlaylist.filter(
    (oldVideo) => !newPlaylist.find((currentVideo) => oldVideo === currentVideo)
  );
  console.log(newlyDeletedVideos);
  return [newlyDeletedVideos.length, newlyDeletedVideos];
};

// A functions thats adds an eventListener and upon activating injects as run code on the website
injectFunctionToWebsite(savePlaylist_link, getPlaylistAndPassMessage);
