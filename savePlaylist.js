let savePlaylist_button = document.querySelector(".savePlaylist");

savePlaylist.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handlePlaylist,
  });
});

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
    console.log("From savePlaylist", deletedVideos);
    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    const newlyDeletedVideos = playlist.filter((video) => {
      return !currentPlaylist.includes(video);
    });

    // Save the newly created deletedVideos and playlist
    chrome.storage.sync.set({
      data: {
        playlist: [...currentPlaylist, "dude"],
        deletedVideos: [...data.deletedVideos, ...newlyDeletedVideos],
      },
    });
  });
  console.log("save play");
};
