let content = document.querySelector(".main_content");
let deletedVideos_button = document.querySelector(".deletedVideos");

const toggleDeletedVideos = () => {
  console.log("start");
  if (content.innerHTML) {
    content.innerHTML = "";
  } else {
    chrome.storage.sync.get("data", ({ data }) => {
      const { deletedVideos } = data;
      console.log("from delete", deletedVideos);
      for (let i = 0; i < deletedVideos.length; i++) {
        content.innerHTML += `
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
  console.log("dude");
  if (deletedVideos_button.classList.contains("active")) {
    deletedVideos_button.classList.remove("active");
  } else {
    deletedVideos_button.classList.add("active");
  }
};

deletedVideos_button.addEventListener("click", toggleDeletedVideos);
