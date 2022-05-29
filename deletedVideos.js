import { main_content } from "./globalVariables.js";
import { updateMainContentWithLoop, changeHeadline } from "./utils.js";

let deletedVideos_button = document.querySelector(".deletedVideos");

deletedVideos_button.addEventListener("click", () => {
  changeHeadline("Show deleted videos");
  updateMainContentWithLoop(
    main_content,
    "deletedVideos",
    "'deleted videos list'"
  );
});
