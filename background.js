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
    if (url.includes("PLVEFS9uzMyHYKBAklGQmv6m38WH")) {
      console.log("This is it bro");
    } else {
      console.log("nope. not yet");
    }
  }),
    filter;
});
