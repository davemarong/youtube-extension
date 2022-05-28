let deletedVideos_list = document.querySelector(".deletedVideos_list");
let deletedVideos_button = document.querySelector(".deletedVideos_button");

const toggleDeletedVideos = () => {
  chrome.storage.sync.get("data", ({ data }) => {
    const { deletedVideos } = data;
    console.log("from dele†e", deletedVideos);
    for (let i = 0; i < deletedVideos.length; i++) {
      deletedVideos_list.innerHTML += `
      <li>
        ${deletedVideos[i]}
      </li>
      `;
    }
  });
  //   deletedVideos_list.innerHTML = "Hei min venn";
  console.log("delete");
};

deletedVideos_button.addEventListener("click", toggleDeletedVideos);
