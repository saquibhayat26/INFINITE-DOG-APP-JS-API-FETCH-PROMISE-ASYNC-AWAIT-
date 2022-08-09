let timer;
let deleteFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();

    getBreedList(data.message);
  } catch {
    console.log("Data not recieved");
  }
}

start();

function getBreedList(breedsList) {
  document.getElementById("breedList").innerHTML = `
  <select onChange = "loadByBreed(this.value)">
  <option>Choose a dog breed</option>
  ${Object.keys(breedsList).map((breed) => {
    return `<option>${breed}</option>`;
  })}
  </select>
  `;
}

async function loadByBreed(breed) {
  let response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
  let data = await response.json();

  getBreedImage(data.message);
}

function getBreedImage(breedImageList) {
  let currentSlide = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (breedImageList.length > 1) {
    document.getElementById("slideShow").innerHTML = ` <div
      class="slide"
      style="
            background-image: url('${breedImageList[0]}');
          "
    ></div>;
  <div
      class="slide"
      style="
            background-image: url('${breedImageList[1]}');
          "
    ></div>`;
    currentSlide += 2;
    if (breedImageList.length == 2) currentSlide = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slideShow").innerHTML = ` <div
      class="slide"
      style="
            background-image: url('${breedImageList[0]}');
          "
    ></div>;
  <div class="slide"></div>`;
  }

  function nextSlide() {
    document.getElementById("slideShow").insertAdjacentHTML(
      "beforeend",
      ` <div
      class="slide"
      style="
            background-image: url('${breedImageList[currentSlide]}');
          "
    ></div>`
    );

    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
      if (currentSlide + 1 >= breedImageList.length) {
        currentSlide = 0;
      }
      currentSlide++;
    }, 1000);
  }
}
