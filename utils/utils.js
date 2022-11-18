// FUNCTIONS UPDATING "MAIN_CONTENT"------------------------------------------------------------------>
// Update the "mainContent" by looping and displaying the html
export const updateMainContentWithLoop = (element, datatype, messageType) => {
  element.innerHTML = "";
  chrome.storage.local.get("data", ({ data }) => {
    if (data[datatype].length > 0) {
      for (let i = 0; i < data[datatype].length; i++) {
        element.innerHTML += `
        <a target="_blank" href=${data[datatype][i].url}>
          <li data-ulr="${data[datatype][i].url}">
            <img height="35" src="${data[datatype][i].img}">
            <p>${data[datatype][i].title}</p>
          </li>
        </a>

        `;
      }
      element.innerHTML =
        `<ul class="showSavedPlaylist_list playlist_list">` +
        element.innerHTML +
        `</ul>`;
    } else {
      element.innerHTML = `<div class="main_content-error">Your ${messageType} is empty</div>`;
    }
  });
};

//

// Create the html that will confirm if the playlist shown is the right one
export const createPlaylistConfirmHtml = (
  elementSelector,
  playlist,
  errorMessage_html
) => {
  let element = document.querySelector(elementSelector);
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
    displayErrorMessage(element, errorMessage_html);
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
  popup.innerHTML = "";
  popup.classList.remove("show");
};

// When the user clicks on <div>, open the popup
export const popupAlert = (message) => {
  let popup = document.getElementById("myPopup");
  popup.innerHTML = message;
  popup.classList.add("show");
  setTimeout(clearPopup, 7000);
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
  // Get current playlist from Youtube with titles, images and url's
  const currentPlaylist = [
    ...document.querySelectorAll(
      "[playlist-type='PLVE'] #items #playlist-items"
    ),
  ].map((item) => {
    const title = item.querySelector("#meta h4 #video-title");
    const img = item.querySelector("#img");
    const url = item.querySelector("#thumbnail");
    return { title: title.textContent.trim(), img: img.src, url: url.href };
  });

  console.log(currentPlaylist);
  // Find playlistId in the url
  const text = "list=";
  const url = window.location.href;
  const number = url.search(text);
  const playlistId = url.slice(number + 5, number + 5 + 34);

  // Get day of month
  const date = new Date();
  const dayInMonth = date.getDate();

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.local.get(["data"], ({ data }) => {
    const { playlist, deletedVideos } = data;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    const newlyDeletedVideos = playlist.filter(
      (oldVideo) =>
        !currentPlaylist.find(
          (currentVideo) => oldVideo.title === currentVideo.title
        )
    );

    // Get img-url from oldPlaylist if newPlaylist does not have
    const updatedCurrentPlaylist = currentPlaylist.map((currentVideo) => {
      // If img is present, return
      if (currentVideo.img) return currentVideo;

      // If image is not present, find image in old playlist and return that
      const updatedVideo = playlist.find(
        (oldVideo) => currentVideo.title === oldVideo.title
      );

      if (updatedVideo) {
        return updatedVideo;
      } else {
        return currentVideo;
      }
    });

    // Save the newly created deletedVideos and playlist
    chrome.storage.local.set({
      data: {
        // NEXT LINE IS FOR TESTING THE DELETED VIDEOS SECTION
        // playlist: [
        //   ...currentPlaylist,
        //   { title: "bro", url: "dude", img: "ja" },
        //   { title: "er", url: "dude", img: "ja" },
        //   { title: "kul", url: "dude", img: "ja" },
        // ],
        playlist: updatedCurrentPlaylist,
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
        playlistId: playlistId,
        lastUpdate: dayInMonth,
      },
    });
  });
};

// Find playlist on the youtube page and send it back to extension
export const getPlaylistAndPassMessage = () => {
  const currentPlaylist = [
    ...document.querySelectorAll(
      "[playlist-type='PLVE'] #items #playlist-items"
    ),
  ].map((item) => {
    const title = item.querySelector("#meta h4 #video-title");
    const img = item.querySelector("#img");
    const url = item.querySelector("#thumbnail");
    return { title: title.textContent.trim(), img: img.src, url: url.href };
  });
  // Find playlistId in the url
  const text = "list=";
  const url = window.location.href;
  const number = url.search(text);
  const playlistId = url.slice(number + 5, number + 5 + 34);

  // Get img-url from oldPlaylist if newPlaylist does not have
  chrome.storage.local.get(["data"], ({ data }) => {
    const updatedCurrentPlaylist = currentPlaylist.map((currentVideo) => {
      // If img is present, return
      if (currentVideo.img) return currentVideo;

      // If image is not present, find image in old playlist and return that
      const updatedVideo = data.playlist.find(
        (oldVideo) => currentVideo.title === oldVideo.title
      );

      if (updatedVideo) {
        return updatedVideo;
      } else {
        return currentVideo;
      }
    });

    // Send data back to extension
    chrome.runtime.sendMessage({
      playlist: updatedCurrentPlaylist,
      playlistId: playlistId,
    });
  });
};

// OTHER FUNCTIONS ------------------------------------------------------------------------------------------>
export const comparePlaylists = (selector1, selector2) => {
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
  return [newlyDeletedVideos.length, newlyDeletedVideos];
};
