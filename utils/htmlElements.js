export const savePlaylist_html = `
  <div class="tooltip_container">
    <div class="tooltip">
      Images not showing?
      <span class="tooltip_text">
        This is because the images on your youtube page has not been loaded. You
        have to scroll all the way to the bottom of the page, and make sure all
        the thumbnail images are visible. Then click on "Find playlist from this
        page".
      </span>
    </div>
    <div class="tooltip">
      Can't find your playlist?
      <ul class="tooltip_text">
        Make sure you are on a youtube page with your playlist on:
        <li>1: In the sidebar, click on "Library".</li>
        <li>
          2: Scroll down to your playlist, and click "VIEW FULL PLAYLIST". This
          will open your playlist homepage.
        </li>
        <li>3: In your extension, click on "Find playlist form this page" to try again.</li>
      </ul>
    </div>
  </div>
    <div class="savePlaylist_container">
      <div class="playlist_list_container">
        <div class="oldPlaylist_container">
          <h2>Old playlist</h2>
          <ul class="oldPlaylist">
            <div class="loadingSpinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </ul>
        </div>
        <div class="newPlaylist_container">
          <h2>New playlist</h2>
          <ul class="newPlaylist">
            <div class="loadingSpinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </ul>
        </div>
      </div>
      <div class="savePlaylist_button_container"></div>
    </div>
`;

export const savePlaylist_button_html = `
    <p>Do you want to compare and sync these playlists?</p>
    <div class="popup">
      <span class="popuptext" id="myPopup">
        Popup text...
      </span>
    </div>
    <button class="savePlaylist_button button">
      Sync
      <img class="savePlaylist_button_icon" src="../images/sync.svg" />
    </button>
`;

export const emptyDeletedVideos_html = `
  <div class="emptyDeletedVideos_container">
    <p>Do you want to erase your "deleted videos"?</p>
    <div class="popup">
      <span class="popuptext" id="myPopup">
        Popup text...
      </span>
    </div>
    <button class="emptyDeletedVideos_confirm button">Yes</button>
  </div>
`;

export const searchErrorMessage_newPlaylist = `
  <div class="main_content-error">
    Sadly, we could not find any playlist. Navigate to a youtube page with a playlist and then click "Find playlist from this youtube page" again.
  </div>
  `;
export const searchErrorMessage_oldPlaylist = `
  <div class="main_content-error">
    You have no previously saved playlist. Press sync to start tracking your playlist.
  </div>
  `;
export const popup_synced_message = (numberDeletedVideos, deletedVideos) =>
  `
  <div>
  <p>
  We found ${numberDeletedVideos} videos that had been removed ${
    deletedVideos.length > 0
      ? ", these have been saved to your 'deleted videos' list."
      : "."
  }
    </p>
    <p>${deletedVideos}</p>
    </div>
    `;
