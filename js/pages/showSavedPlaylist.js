// IMPORTS
import { main_content } from "../../utils/globalVariables.js";
import {
  updateMainContentWithLoop,
  changeHeadline,
} from "../../utils/utils.js";

// QUERY SELECTORS
let showSavedPlaylist_link = document.querySelector(".showSavedPlaylist_link");

// EVENT LISTENERS
showSavedPlaylist_link.addEventListener("click", () => {
  changeHeadline("Show saved playlist");
  updateMainContentWithLoop(main_content, "playlist", "playlist");
});
