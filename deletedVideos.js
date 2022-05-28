import { main_content } from "./globalVariables.js";
import { updateMainContentWithLoop } from "./utils.js";

let deletedVideos_button = document.querySelector(".deletedVideos");

deletedVideos_button.addEventListener("click", () => {
  updateMainContentWithLoop(main_content, "deletedVideos");
});
