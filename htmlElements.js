export const savePlaylist_html = `
  <div class="savePlaylist_container">
    <ul class="savePlaylist_list"></ul>
    <p>Is this the correct playlist?</p>
    <div class="popup">
      <span class="popuptext" id="myPopup">
        Popup text...
      </span>
    </div>
    <button class="savePlaylist_button button">Yes</button>
  </div>
`;

export const emptyDeletedVideos_html = `
  <div class="emptyDeletedVideos_container">
    <p>Do you want to erase your "deleted videos list"?</p>
    <div class="popup">
      <span class="popuptext" id="myPopup">
        Popup text...
      </span>
    </div>
    <button class="emptyDeletedVideos_confirm button">Yes</button>
  </div>
`;

export const searchErrorMessage_html = `
  <div class="main_content-error">
    Sadly, we could not find any playlist. Navigate to a youtube page with a playlist and then click "Find playlist from this youtube page" again.
  </div>
  `;
