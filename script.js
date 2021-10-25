const rootElem = document.getElementById("root");
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  rootElem.replaceChildren([]);
  episodeList.forEach(createCard);
}

function createCard(episode) {
  console.log(episode);
  let divContainer = document.createElement("div");
  divContainer.className = "container";
  divContainer.style.background = "white";
  let titleElement = document.createElement("h2");
  titleElement.innerText = episode.name;
  divContainer.appendChild(titleElement);
  rootElem.appendChild(divContainer);


  let divName = document.createElement("div");
  divContainer.appendChild(divName);
  divName.className = "Name";

  let episodeCode = "";
  if (episode.season <= 10) {
    episodeCode += "S" +  episode.season.toString().padStart(2, "0");
  }
  if (episode.number <= 10) {
    episodeCode += "E" + episode.number.toString().padStart(2, "0");
  }
  divName.innerText = episodeCode;

  let imgE1 = document.createElement("img");
  divContainer.appendChild(imgE1);
  imgE1.className = "Img";
  imgE1.src = episode.image.medium;


  let divSummary = document.createElement("div");
  divSummary.className = "Summary";
  divSummary.innerHTML = episode.summary;
  divContainer.appendChild(divSummary);

}

window.onload = setup;

function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((episodeList) => {
      makePageForEpisodes(episodeList);
      filterEpisodes(episodeList);
    });
}

function filterEpisodes(episodes) {
  let searchEpisodesBox = document.querySelector("#searchEpisodes");
  console.log(searchEpisodesBox.value);


  searchEpisodesBox.addEventListener("keyup", searchEpisodes);

  function searchEpisodes() {
    let filteredEpisodes = episodes.filter((episode) => {
      if (episode.name.toLowerCase().includes(searchEpisodesBox.value.toLowerCase())) {
    return true;
  } else {
    return false;
  }

    })
    makePageForEpisodes(filteredEpisodes);

  }

}

function refreshEpisodes() {
  rootElem.innerHTML = "";
  makePageForEpisodes(allEpisodes);

  let displaying = document.querySelector("#displayCounter");
  displaying.innerText = `Displaying ${allEpisodes.length} / ${allEpisodes.length} Episodes`;
  displaying.style.color = "red";
}

  function readInput(event) {
  inputValue = event.target.value;
  filterEpisodes = allEpisodes.filter(
    //**I need to redo the like an outside function
    (episode) =>
      episode.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      episode.summary.toLowerCase().includes(inputValue.toLowerCase())
  );
  //cleaning the rootElem to update every time
  rootElem.innerHTML = "";
  makePageForEpisodes(filterEpisodes);
  }