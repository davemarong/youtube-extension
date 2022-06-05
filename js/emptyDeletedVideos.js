// IMPORT
import { insertHtmlToDom, changeHeadline, popupAlert } from "../utils/utils.js";
import { main_content } from "../utils/globalVariables.js";
import { emptyDeletedVideos_html } from "../utils/htmlElements.js";

// QUERY SELECTOR
let emptyDeletedVideos_link = document.querySelector(
  ".emptyDeletedVideos_link"
);

// EVENT LISTENERS
emptyDeletedVideos_link.addEventListener("click", () => {
  changeHeadline("Empty 'deleted videos'");
  insertHtmlToDom(main_content, emptyDeletedVideos_html);

  // Add eventListener to the newly created html
  let emptyDeletedVideos_confirm = document.querySelector(
    ".emptyDeletedVideos_confirm"
  );
  emptyDeletedVideos_confirm.addEventListener("click", () => {
    emptyDeletedVideosList();
    popupAlert("Your 'deleted videos' has been deleted");
  });
});

// FUNCTIONS
const emptyDeletedVideosList = () => {
  //See if you can change only the deletedVideos property directly
  chrome.storage.local.get("data", ({ data }) => {
    const updatedData = {
      playlist: data.playlist,
      deletedVideos: [],
    };
    chrome.storage.local.set({ data: updatedData });
  });
};
