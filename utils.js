export const updateMainContentWithLoop = (element, datatype) => {
  element.innerHTML = "";
  chrome.storage.sync.get("data", ({ data }) => {
    for (let i = 0; i < data[datatype].length; i++) {
      element.innerHTML += `
                <li>
                ${data[datatype][i]}
                </li>
                `;
    }
  });
  // toggleButtonColor();
};

// const toggleButtonColor = () => {
//   console.log("dude");
//   if (deletedVideos_button.classList.contains("active")) {
//     deletedVideos_button.classList.remove("active");
//   } else {
//     deletedVideos_button.classList.add("active");
//   }
// };
