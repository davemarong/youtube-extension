import { main_content } from "../utils/globalVariables.js";
import { updateMainContentWithLoop, changeHeadline } from "../utils/utils.js";

let deletedVideos_link = document.querySelector(".deletedVideos_link");

deletedVideos_link.addEventListener("click", () => {
  changeHeadline("Show deleted videos");
  updateMainContentWithLoop(
    main_content,
    "deletedVideos",
    "'deleted videos list'"
  );
});