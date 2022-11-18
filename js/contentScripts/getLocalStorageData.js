{
  const playlistData = JSON.parse(localStorage.getItem("playlistData"));
  console.log("inside getlocalstorragecontent");
  if (playlistData) {
    console.log("playlist found in local storage");
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

        playlist: playlistData.playlist,
        deletedVideos: playlistData.deletedVideos,
        playlistId: playlistData.playlistId,
        lastUpdate: playlistData.lastUpdate,
      },
    });
  }
}
