// Content script: Find current playlist from youtube, compare and find deleted videos and store data in chrome storage without the user input
{
  // Get current playlist from Youtube with titles, images and url's
  const currentPlaylist = [
    ...document.querySelectorAll(
      "[page-subtype='playlist'] ytd-playlist-video-renderer"
    ),
  ].map((item) => {
    const title = item.querySelector("#meta h3 a");
    const img = item.querySelector("#img");
    const url = item.querySelector("#thumbnail #thumbnail");
    console.log(img);
    return { title: title.textContent.trim(), img: img.src, url: url.href };
  });

  // Find playlistId in the url
  const text = "list=";
  const url = window.location.href;
  const number = url.search(text);
  const currentPlaylistId = url.slice(number + 5, number + 5 + 34);

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.local.get(["data"], ({ data }) => {
    let { playlist, deletedVideos, playlistId } = data;

    // Check if new playlist is the same as old playlist
    // if (currentPlaylistId !== playlistId) return;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    const newlyDeletedVideos = playlist.filter(
      (oldVideo) =>
        !currentPlaylist.find(
          (currentVideo) => oldVideo.title === currentVideo.title
        )
    );

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
      },
    });
  });
  console.log("Playlist updated");
}
