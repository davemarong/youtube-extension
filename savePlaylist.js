import { savePlaylist_confirmation } from "./htmlElements.js";
import { main_content } from "./globalVariables.js";

let savePlaylist_button = document.querySelector(".savePlaylist");
let confirmation_button;

const updateContent = () => {
  main_content.innerHTML = savePlaylist_confirmation;
  confirmation_button = document.querySelector(".confirmation_button");
  injectFunctionToWebsite(confirmation_button, handlePlaylist);
};

const injectFunctionToWebsite = (element, func) => {
  element.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: func,
    });
  });
};
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
