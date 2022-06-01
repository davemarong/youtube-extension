import { main_content } from "./globalVariables.js";
import { updateMainContentWithLoop, changeHeadline } from "./utils.js";

let showSavedPlaylist = document.querySelector(".showSavedPlaylist");

showSavedPlaylist.addEventListener("click", () => {
  changeHeadline("Show saved playlist");
  updateMainContentWithLoop(main_content, "playlist", "playlist");
});
