export const updateMainContentWithLoop = (element, datatype) => {
  element.innerHTML = "";
  chrome.storage.local.get("data", ({ data }) => {
    for (let i = 0; i < data[datatype].length; i++) {
      element.innerHTML += `
                <li>
                ${data[datatype][i]}
                </li>
                `;
    }
  });
};

export const injectFunctionToWebsite = (element, func) => {
  element.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: func,
    });
  });
};

// Get current playlist from Youtube
export const getCurrentPlaylist = () => {
  return [...document.querySelectorAll("#meta h3 a")].map((item) => {
    return item.title;
  });
};

// Create the html that will confirm if the playlist shown is the right one
export const createPlaylistConfirmationHtml = (element, playlist) => {
  element.innerHTML = ``;
  for (let i = 0; i < playlist.length; i++) {
    element.innerHTML += `
    <li>
        ${playlist[i]}
    </li>
    `;
  }
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

// Insert html into dom
export const insertHtmlToDom = (element, html) => {
  element.innerHTML = html;
};
