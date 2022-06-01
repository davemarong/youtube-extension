import { main_content } from "./globalVariables.js";
import { updateMainContentWithLoop } from "./utils.js";

let showSavedPlaylist = document.querySelector(".showSavedPlaylist");
console.log("3");
showSavedPlaylist.addEventListener("click", () => {
  console.log("show playlist");
  updateMainContentWithLoop(main_content, "playlist");
});
