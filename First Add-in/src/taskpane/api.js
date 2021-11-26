function PYtoJS() {
  const url = "http://localhost:8989/PYtoJS";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      kw=JSON.stringify(json)
      document.getElementById("demo").innerHTML = kw;
    });   
}


function JStoPY(){
  const URL = 'http://localhost:8989/JStoPY'
  const xhr = new XMLHttpRequest();
  sender = JSON.stringify("Ceci est un texte en FALC provenant de JS")
  xhr.open('POST', URL);
  xhr.send(sender);
  }