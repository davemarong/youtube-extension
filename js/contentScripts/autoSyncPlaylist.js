// Content script: Find current playlist from youtube, compare and find deleted videos and store data in chrome storage without the user input
{
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

  // Find playlistId in the url
  const text = "list=";
  const url = window.location.href;
  const number = url.search(text);
  const currentPlaylistId = url.slice(number + 5, number + 5 + 34);

  // Get day of month
  const date = new Date();
  const [day, month, dayInMonth] = date.toString().split(" ");
  const dayAndMonth = `${month} ${dayInMonth}`;

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.local.get(["data"], ({ data }) => {
    let { playlist, deletedVideos, playlistId, lastUpdate } = data;

    // If playlistData is empty, try to get from LocalStorage
    if (playlist.length === 0) {
      const playlistData = JSON.parse(localStorage.getItem("playlistData"));
      if (playlistData) {
        playlist = playlistData.playlist;
        deletedVideos = playlistData.deletedVideos;
        playlistId = playlistData.playlistId;
        lastUpdate = playlistData.lastUpdate;
      } else return;
    }

    // Check if new playlist is the same as old playlist
    if (currentPlaylistId !== playlistId) return;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    const newlyDeletedVideos = playlist.filter(
      (oldVideo) =>
        !currentPlaylist.find(
          (currentVideo) => oldVideo.title === currentVideo.title
        )
    );

    if (currentPlaylist.length === 0) return;

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

    console.log("update current playlist ", updatedCurrentPlaylist);

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
        lastUpdate: dayAndMonth,
      },
    });
    localStorage.setItem(
      "playlistData",
      JSON.stringify({
        playlist: updatedCurrentPlaylist,
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
        playlistId: playlistId,
        lastUpdate: dayAndMonth,
      })
    );
  });
  console.log("Playlist updated automaticly");
}
