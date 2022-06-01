import { main_content } from "./globalVariables.js";
import { updateMainContentWithLoop } from "./utils.js";

let showSavedPlaylist = document.querySelector(".showSavedPlaylist");

showSavedPlaylist.addEventListener("click", () => {
  updateMainContentWithLoop(main_content, "playlist");
});
