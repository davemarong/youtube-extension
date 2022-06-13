let data = {
  playlist: [],
  deletedVideos: [],
  playlistId: "",
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
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const url = tabs[0].url;
    console.log(tabs[0].id);
    if (url.includes("PLVEFS9uzMyHYKBAklGQmv6m38WH")) {
      setTimeout(
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["./js/contentScripts/autoSyncPlaylist.js"],
          },
          (result) => {
            console.log(result);
          }
        ),
        3000
      );
    } else {
      console.log("nope. not yet");
    }
  }),
    filter;
});
