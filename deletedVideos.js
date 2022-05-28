let deletedVideos_list = document.querySelector(".deletedVideos_list");
let deletedVideos_button = document.querySelector(".deletedVideos_button");

const toggleDeletedVideos = () => {
  if (deletedVideos_list.innerHTML) {
    deletedVideos_list.innerHTML = "";
  } else {
    chrome.storage.sync.get("data", ({ data }) => {
      const { deletedVideos } = data;
      console.log("from delete", deletedVideos);
      for (let i = 0; i < deletedVideos.length; i++) {
        deletedVideos_list.innerHTML += `
              <li>
              ${deletedVideos[i]}
              </li>
              `;
      }
    });
  }
};

deletedVideos_button.addEventListener("click", toggleDeletedVideos);
