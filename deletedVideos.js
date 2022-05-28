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
  toggleButtonColor();
};

const toggleButtonColor = () => {
  if (deletedVideos_button.className.includes("button_active")) {
    deletedVideos_button.classList = "button deletedVideos_button";
  } else {
    deletedVideos_button.classList =
      "button deletedVideos_button button_active";
  }
};

deletedVideos_button.addEventListener("click", toggleDeletedVideos);
