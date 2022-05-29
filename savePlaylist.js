// imports
import { savePlaylist_confirmation } from "./htmlElements.js";
import { main_content } from "./globalVariables.js";
import { getCurrentPlaylist, injectFunctionToWebsite } from "./utils.js";

let savePlaylist_button = document.querySelector(".savePlaylist");
let confirmation_button;

const createPlaylistConfirmationHtml = (element, playlist) => {
  element.innerHTML = ``;

  for (let i = 0; i < playlist.length; i++) {
    element.innerHTML += `
    <li>
        ${playlist[i]}
    </li>
    `;
  }
};

// The script picks up on every video on youtube. Fix that bro. A more specific selector goes a long way
const getPlaylistAndPassMessage = () => {
  const currentPlaylist = [...document.querySelectorAll("#meta h3 a")].map(
    (item) => {
      return item.title;
    }
  );
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

const handlePlaylist = () => {
  // Get current playlist from Youtube
  const currentPlaylist = [...document.querySelectorAll("#meta h3 a")].map(
    (item) => {
      return item.title;
    }
  );

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.sync.get(["data"], ({ data }) => {
    const { playlist, deletedVideos } = data;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    const newlyDeletedVideos = playlist.filter((video) => {
      return !currentPlaylist.includes(video);
    });

    // Save the newly created deletedVideos and playlist
    chrome.storage.sync.set({
      data: {
        playlist: [...currentPlaylist, "dude"],
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
      },
    });
  });

  if (currentPlaylist.length > 0) {
    alert("Playlist saved");
  } else {
    alert("Playlist not found");
  }
};
