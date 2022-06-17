// Find playlist on the youtube page and send it back to extension
{
  let currentPlaylist = [
    ...document.querySelectorAll(
      "[page-subtype='playlist'] ytd-playlist-video-renderer"
    ),
  ].map((item) => {
    const title = item.querySelector("#meta h3 a");
    const img = item.querySelector("#img");
    const url = item.querySelector("#thumbnail #thumbnail");
    return { title: title.textContent.trim(), img: img.src, url: url.href };
  });

  // Find playlistId in the url
  const text = "list=";
  const url = window.location.href;
  const number = url.search(text);
  const playlistId = url.slice(number + 5, number + 5 + 34);

  // Get img-url from oldPlaylist if newPlaylist does not have
  chrome.storage.local.get(["data"], ({ data }) => {
    const updatedCurrentPlaylist = currentPlaylist.map((currentVideo) => {
      // If img is present, return
      if (currentVideo.img) return currentVideo;

      // If image is not present, find image in old playlist and return that
      const updatedVideo = data.playlist.find(
        (oldVideo) => currentVideo.title === oldVideo.title
      );

      if (updatedVideo) {
        return updatedVideo;
      } else {
        return currentVideo;
      }
    });

    // Send data back to extension
    chrome.runtime.sendMessage({
      playlist: updatedCurrentPlaylist,
      playlistId: playlistId,
    });
  });
}
