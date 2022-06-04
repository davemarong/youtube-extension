import { searchErrorMessage_html } from "./htmlElements.js";

// FUNCTIONS UPDATING "MAIN_CONTENT"------------------------------------------------------------------>
// Update the "mainContent" by looping and displaying the html
export const updateMainContentWithLoop = (element, datatype, messageType) => {
  element.innerHTML = "";
  chrome.storage.local.get("data", ({ data }) => {
    if (data[datatype].length > 0) {
      for (let i = 0; i < data[datatype].length; i++) {
        element.innerHTML += `
        <li>
        ${data[datatype][i]}
        </li>
        `;
      }
      element.innerHTML =
        `<ul class="savePlaylist_list">` + element.innerHTML + `</ul>`;
    } else {
      element.innerHTML = `<div class="main_content-error">Your ${messageType} is empty</div>`;
    }
  });
};

// Create the html that will confirm if the playlist shown is the right one
export const createPlaylistConfirmHtml = (
  element,
  playlist,
  elementContainer
) => {
  element.innerHTML = ``;
  if (playlist.length > 0) {
    for (let i = 0; i < playlist.length; i++) {
      element.innerHTML += `
      <a target="_blank" href=${playlist[i].url}>
      <li data-ulr="${playlist[i].url}">
        <img height="35" src="${playlist[i].img}">
        <p>${playlist[i].title}</p>
      </li>
      </a>
      `;
    }
  } else {
    displayErrorMessage(elementContainer, searchErrorMessage_html);
  }
};

// Display an error message
const displayErrorMessage = (element, message) => {
  element.innerHTML = message;
};

// Insert html into dom
export const insertHtmlToDom = (element, html) => {
  element.innerHTML = html;
};

// Change header title
export const changeHeadline = (text) => {
  let headline = document.querySelector(".headline");
  headline.textContent = text;
};

// Closes the popup
export const clearPopup = () => {
  let popup = document.getElementById("myPopup");
  popup.textContent = "";
  popup.classList.remove("show");
};

// When the user clicks on <div>, open the popup
export const popupAlert = (message) => {
  let popup = document.getElementById("myPopup");
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(clearPopup, 3000);
};

// FUNCTIONS INVOLVING THE CONTENT SCRIPT/BEING RUN ON THE ACTUAL WEBSITE---------------------------------------->
// Injecting a function into the webpage. This function then has access to the webpage dom.
export const injectFunctionToWebsite = (element, func) => {
  element.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: func,
    });
  });
};

// Content script: Find current playlist from youtube, compare and find deleted videos and store data in chrome storage
export const handlePlaylist = () => {
  // Get current playlist from Youtube
  const currentPlaylist = [
    ...document.querySelectorAll("[page-subtype='playlist'] #meta h3 a"),
  ].map((item) => {
    return item.title;
  });

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.local.get(["data"], ({ data }) => {
    const { playlist, deletedVideos } = data;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    const newlyDeletedVideos = playlist.filter((video) => {
      return !currentPlaylist.includes(video);
    });

    // Save the newly created deletedVideos and playlist
    chrome.storage.local.set({
      data: {
        playlist: currentPlaylist,
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
      },
    });
  });
};

// Find playlist on the youtube page and send it back to extension
export const getPlaylistAndPassMessage = () => {
  // const currentPlaylist = [
  //   ...document.querySelectorAll("[page-subtype='playlist'] #meta h3 a"),
  // ].map((item) => {
  //   return item.title;
  // });
  const currentPlaylist = [
    ...document.querySelectorAll(
      "[page-subtype='playlist'] ytd-playlist-video-renderer"
    ),
  ].map((item) => {
    const title = item.querySelector("#meta h3 a");
    const img = item.querySelector("#img");
    const url = item.querySelector("#thumbnail #thumbnail");
    console.log(url.href);
    return { title: title.textContent.trim(), img: img.src, url: url.href };
  });
  console.log(currentPlaylist);
  chrome.runtime.sendMessage({ playlist: currentPlaylist });
};

// OTHER FUNCTIONS ------------------------------------------------------------------------------------------>
// Get current playlist from Youtube
export const getCurrentPlaylist = () => {
  return [...document.querySelectorAll("#meta h3 a")].map((item) => {
    return item.title;
  });
};
