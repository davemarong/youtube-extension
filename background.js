let data = {
  playlist: [],
  deletedVideos: [],
  playlistId: "",
  lastUpdate: "",
  updateBackups: [],
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

const executeContentScriptAutoSync = async (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs },
      files: ["./js/contentScripts/autoSyncPlaylist.js"],
    },
    (result) => {
      console.log("Auto update complete");
    }
  );
};
chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
  // Get tab-id and tab-url
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const url = tabs[0].url;
    chrome.storage.local.get(["data"], ({ data }) => {
      let { playlistId, lastUpdate } = data;

      // Get day of month
      const date = new Date();
      const [day, month, dayInMonth] = date.toString().split(" ");
      const dayAndMonth = `${month} ${dayInMonth}`;
      console.log(dayAndMonth);
      console.log(`Last update was: ${lastUpdate}, and today is ${dayInMonth}`);

      // If last update auto-sync was today, return
      if (dayAndMonth === lastUpdate) return;

      // Check if current playlist is the same as the saved playlist
      if (playlistId.length > 0 && url.includes(playlistId)) {
        executeContentScriptAutoSync(tabs[0].id);
      }
      // If playlist does not exist, check in local storage
      else {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["./js/contentScripts/getLocalStorageData.js"],
          },
          (result) => {
            chrome.storage.local.get(["data"], ({ data }) => {
              let { playlistId } = data;
              if ((playlistId = true && url.includes(playlistId))) {
                executeContentScriptAutoSync(tabs[0].id);
              } else {
                console.log("nope. not yet");
              }
            });
          }
        );
      }
    });
  }),
    filter;
});
