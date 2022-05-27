let savePlaylist = document.getElementById("savePlaylist");

const handlePlaylist = () => {
  // Get current playlist from Youtube
  const currentPlaylist = [...document.querySelectorAll("#meta h3 a")].map(
    (item) => {
      return item.title;
    }
  );

  // Get previous playlist and previous deleted videos from local storage
  let previousPlaylist = localStorage.getItem("playlist");
  let previousDeletedVideos = localStorage.getItem("deletedVideos");

  // If previousDeletedVideos have videos inside, then parse it
  if (previousDeletedVideos) {
    previousDeletedVideos = JSON.parse(previousDeletedVideos);
  } else {
    previousDeletedVideos = [];
  }

  let deletedVideos = [];

  // If previousPlaylist is falsey, then we cant JSON.parse
  if (!previousPlaylist) {
    previousPlaylist = [];
  } else {
    // Compare playlists and extract videos that are missing from currentPlaylist
    deletedVideos = JSON.parse(previousPlaylist).filter((video) => {
      return !currentPlaylist.includes(video);
    });
    deletedVideos = [...previousDeletedVideos, ...deletedVideos];
  }

  // If deletedVideos is truthy, dont send to local storage
  if (deletedVideos) {
    localStorage.setItem("deletedVideos", JSON.stringify(deletedVideos));
  }
  localStorage.setItem("playlist", JSON.stringify(currentPlaylist));
};

savePlaylist.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handlePlaylist,
  });
});

let deletedVideos_button = document.querySelector(".deletedVideos_button");

const showDeletedVideos = () => {
  // I do not have access to localStorage because we are not using the standard browser. This is why we do not use local storage i guess
  let deletedVideos_list = document.querySelector(".deletedVideos_list");
  let deletedVideos = localStorage.getItem("deletedVideos");

  if (deletedVideos) {
    deletedVideos = JSON.parse(deletedVideos);

    console.log("good");
    console.log(deletedVideos_list);
    deletedVideos_list.innerHTML = "";

    for (let i = 0; i < deletedVideos.length; i++) {
      deletedVideos_list.innerHTML += `
      <li>
        ${deletedVideos[i]}
      </li>
      `;
    }
  } else {
    deletedVideos_list.innerHTML = "You have no deleted videos";
  }
};
// deletedVideos_button.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: showDeletedVideos,
//   });
// });
deletedVideos_button.addEventListener("click", showDeletedVideos);
