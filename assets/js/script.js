var button = document.querySelector(".button");
var playBtn = document.querySelector(".play");
var detailsBtn = document.querySelector(".details");
var userUrl = "https://freesound.org/apiv2/users/";
var apiUrl =
  "https://freesound.org/apiv2/sounds/560446/?token=WQG0rpvXpgS6UJ0x1cigSmQIh0rpUThXm0PTZ6ea";
var picUrl =
  "https://freesound.org/apiv2/users/Migfus20/?token=WQG0rpvXpgS6UJ0x1cigSmQIh0rpUThXm0PTZ6ea";
var playUrl =
  "https://freesound.org/apiv2/sounds/560446/?token=WQG0rpvXpgS6UJ0x1cigSmQIh0rpUThXm0PTZ6ea";
var apiKey = "WQG0rpvXpgS6UJ0x1cigSmQIh0rpUThXm0PTZ6ea";

function apiFunc() {
  console.log("sup");
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
  console.log("Hi");

  var audio = fetch();
}

function getPic() {
  console.log("pic");
  fetch(picUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var list = document.querySelector(".list");
      var pic = document.createElement("img");
      pic.src = data.avatar.large;
      list.append(pic);
      getDets();
    });
}

function getDets() {
  console.log("the dets");
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var list = document.querySelector(".list");
      var fact = document.createElement("li");
      var fact2 = document.createElement("li");
      var fact3 = document.createElement("li");
      fact.textContent = data.username;
      fact2.textContent = data.name;
      fact3.textContent = data.tags[0];
      list.append(fact);
      list.append(fact2);
      list.append(fact3);
      similarSounds();
    });
}

function playMusic() {
  console.log("play");
  fetch(playUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.previews["preview-hq-mp3"]);
      var music = new Audio(data.previews["preview-hq-mp3"]);
      music.volume = 1;
      music.play();
    });
}

function similarSounds() {
  console.log("similar");
  fetch(playUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.similar_sounds);
      fetch(data.similar_sounds + "?token=" + apiKey)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          for (var i = 1; i < 5; i++) {
            fetch(userUrl + data.results[i].username + "/?token=" + apiKey)
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                var list = document.querySelector(".list");
                var pic = document.createElement("img");
                var picSrc = data.avatar.large;
                pic.src = picSrc;
                list.append(pic);
              });
            var pic = document.createElement("img");
            var list = document.querySelector(".list");
            var fact = document.createElement("li");
            var fact2 = document.createElement("li");
            var fact3 = document.createElement("li");
            fact.textContent = data.results[i].username;
            fact2.textContent = data.results[i].name;
            fact3.textContent = data.results[i].tags[0];
            list.append(fact);
            list.append(fact2);
            list.append(fact3);
          }
        });
    });
}

button.addEventListener("click", apiFunc);
detailsBtn.addEventListener("click", getPic);
playBtn.addEventListener("click", playMusic);
