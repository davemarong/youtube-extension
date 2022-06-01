import { main_content } from "./globalVariables.js";
import { updateMainContentWithLoop, changeHeadline } from "./utils.js";

let showSavedPlaylist_link = document.querySelector(".showSavedPlaylist_link");

showSavedPlaylist_link.addEventListener("click", () => {
  changeHeadline("Show saved playlist");
  updateMainContentWithLoop(main_content, "playlist", "playlist");
});
