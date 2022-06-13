// Content script: Find current playlist from youtube, compare and find deleted videos and store data in chrome storage without the user input
{
  // Get current playlist from Youtube with titles, images and url's
  let currentPlaylist = [
    ...document.querySelectorAll(
      "[page-subtype='playlist'] ytd-playlist-video-renderer"
    ),
  ].map((item) => {
    let title = item.querySelector("#meta h3 a");
    let img = item.querySelector("#img");
    let url = item.querySelector("#thumbnail #thumbnail");
    return { title: title.textContent.trim(), img: img.src, url: url.href };
  });

  // Find playlistId in the url
  let text = "list=";
  let url = window.location.href;
  let number = url.search(text);
  let currentPlaylistId = url.slice(number + 5, number + 5 + 34);

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.local.get(["data"], ({ data }) => {
    let { playlist, deletedVideos, playlistId } = data;

    // Check if new playlist is the same as old playlist
    // if (currentPlaylistId !== playlistId) return;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    let newlyDeletedVideos = playlist.filter(
      (oldVideo) =>
        !currentPlaylist.find(
          (currentVideo) => oldVideo.title === currentVideo.title
        )
    );

    // Save the newly created deletedVideos and playlist
    chrome.storage.local.set({
      data: {
        // NEXT LINE IS FOR TESTING THE DELETED VIDEOS SECTION
        playlist: [
          ...currentPlaylist,
          { title: "bro", url: "dude", img: "ja" },
          { title: "er", url: "dude", img: "ja" },
          { title: "kul", url: "dude", img: "ja" },
        ],
        // playlist: currentPlaylist,
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
        playlistId: playlistId,
      },
    });
  });
  console.log("Playlist updated");
}