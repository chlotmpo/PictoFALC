


function PYtoJS() {
  const url = "http://localhost:8989/PYtoJS";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      kw=JSON.stringify(json)
      document.getElementById("demo").innerHTML = kw;
    });   
}


function JStoPY(texte) {
  const URL = 'http://localhost:8989/JStoPY'
    const xhr = new XMLHttpRequest();
    //document.getElementById("sddsd").innerHTML = "oui";
    sender = JSON.stringify(texte)
  xhr.open('POST', URL);
  xhr.send(sender);
  }