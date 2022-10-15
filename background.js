let data = {
  playlist: [],
  deletedVideos: [],
  playlistId: "",
  lastUpdate: "",
};
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ data });
  console.log("Default playlist and deletedVideos is created");
});

const filter = {
  url: [
    {
      urlMatches: "https://www.youtube.com/",
    },
  ],
};

chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
  // Get tab-id and tab-url
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const url = tabs[0].url;
    chrome.storage.local.get(["data"], ({ data }) => {
      const { playlistId, lastUpdate } = data;

      // Get day of month
      const date = new Date();
      const dayInMonth = date.getDate();

      console.log(`Last update was: ${lastUpdate}, and today is ${dayInMonth}`);

      // If last update auto-sync was today, return
      if (dayInMonth === lastUpdate) return;

      // Check if current playlist is the same as the saved playlist
      if (url.includes(playlistId)) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["./js/contentScripts/autoSyncPlaylist.js"],
          },
          (result) => {
            console.log("Auto update complete");
          }
        );
      } else {
        console.log("nope. not yet");
      }
    });
  }),
    filter;
});
