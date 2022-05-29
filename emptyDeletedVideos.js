import { insertHtmlToDom, changeHeadline } from "./utils.js";
import { main_content } from "./globalVariables.js";
import { emptyDeletedVideos_html } from "./htmlElements.js";
let emptyDeletedVideos_confirm = document.querySelector(
  ".emptyDeletedVideos_confirm"
);
let emptyDeletedVideos = document.querySelector(".emptyDeletedVideos");

emptyDeletedVideos.addEventListener("click", () => {
  changeHeadline("Empty 'deleted videos list'");
  insertHtmlToDom(main_content, emptyDeletedVideos_html);
});
emptyDeletedVideos_confirm.addEventListener("click", () => {});
