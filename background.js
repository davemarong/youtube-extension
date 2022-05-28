let data = {
  playlist: [],
  deletedVideos: [],
};
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ data });
  console.log("Default playlist and deletedVideos is created");
});
