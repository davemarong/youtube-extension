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
};

export const injectFunctionToWebsite = (element, func) => {
  element.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: func,
    });
  });
};

// Get current playlist from Youtube
export const getCurrentPlaylist = () => {
  return [...document.querySelectorAll("#meta h3 a")].map((item) => {
    return item.title;
  });
};
