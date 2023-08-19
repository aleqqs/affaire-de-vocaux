'use strict';

/* Traitement du fichier json pour l'insertion dans le select */

const dbParam = JSON.stringify();
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  const dataAudioObject = JSON.parse(this.responseText);
  let textName = "<select>"
  for (let x in dataAudioObject) {
    textName += "<option id=\"" + dataAudioObject[x].audioId + "\">";
    textName += dataAudioObject[x].audioName + "</option>";
  }
  textName += "</select>"
  document.getElementById("audio-dropdown").innerHTML = textName;
}
xmlhttp.open("GET", "json/audioDatas.json", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.send("x=" + dbParam);


/* Utilisation de l'API Fetch */


function getDataFromJson() {
  return fetch('json/audioDatas.json')
      .then((response) => { 
          return response.json().then((data) => {
              return data;
            }).catch((err) => {
              console.log(err);
          }) 
      });
}

localStorage.res = JSON.stringify(await getDataFromJson());

getDataFromJson();
//console.log(localStorage.res);
const parsedDatas = JSON.parse(localStorage.res);
//console.log(parsedDatas);

const click = document.getElementById("span-click");
const dropdownchange = document.getElementById("audio-dropdown");


function onChange() {
  const mySelect = document.querySelector("#audio-dropdown");
  const currentAffaireId = mySelect[mySelect.selectedIndex].id;
  console.log(currentAffaireId);
  let findFromData = parsedDatas.find(item => item.audioId === currentAffaireId);
  let audioPath = findFromData.audioSource;
  return audioPath;
}

function onClickPlay(){
  let audioPath = onChange();
  let audioToPlay = new Audio(audioPath);
  return audioToPlay.play();
}

dropdownchange.addEventListener("change", onChange);

click.addEventListener("click", onClickPlay);