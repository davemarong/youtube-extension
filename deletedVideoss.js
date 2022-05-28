let deletedVideos_list = document.querySelector(".deletedVideos_list");
let deletedVideos_button = document.querySelector(".deletedVideos_button");

deletedVideos_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: showDeletedVideos,
  });
});
console.log("hei");
const showDeletedVideos = () => {
  console.log("show delted videos");
  let deletedVideos = localStorage.getItem("deletedVideos");

  if (deletedVideos) {
    deletedVideos = JSON.parse(deletedVideos);

    deletedVideos_list.innerHTML = "";

    for (let i = 0; i < deletedVideos.length; i++) {
      deletedVideos_list.innerHTML += `
      <li>
        ${deletedVideos[i]}
      </li>
      `;
    }
  } else {
    deletedVideos_list.innerHTML = "You have no deleted videos";
  }
};
