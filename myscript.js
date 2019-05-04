function openNav(){
  document.getElementById("sidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}
function closeNav(){
  document.getElementById("sidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
function oversikt(){
  document.getElementById("Introduksjon").style.display = "none";
  document.getElementById("Detaljer").style.display = "none";
  document.getElementById("Sammenligning").style.display = "none";
  document.getElementById("Oversikt").style.display = "block";
}
function introduksjon(){
  document.getElementById("Oversikt").style.display = "none";
  document.getElementById("Detaljer").style.display = "none";
  document.getElementById("Sammenligning").style.display = "none";
  document.getElementById("Introduksjon").style.display = "block";
}
function detaljer(){
   document.getElementById("Introduksjon").style.display = "none";
   document.getElementById("Oversikt").style.display = "none";
   document.getElementById("Sammenligning").style.display = "none";
   document.getElementById("Detaljer").style.display = "block";
}
function sammenligning(){
  document.getElementById("Introduksjon").style.display = "none";
  document.getElementById("Oversikt").style.display = "none";
  document.getElementById("Detaljer").style.display = "none";
  document.getElementById("Sammenligning").style.display = "block";
}

function Befolkning(url){
  this.skjema = null;

  console.log(this);

  // Laster inn befolkning skjemaet, med URL til skjemaet.
  this.load = function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200){

        // Gjør om skjemaet til en string, for så å gjøre det til et objekt.
        // DETTE FORSVINNER UTENFOR SCOPET.
        skjema = JSON.stringify(xhr.responseText);
        skjema = JSON.parse(xhr.responseText);
        addToOversikt(skjema);
      }
    }
    // Trengs denne? Hva gjør dette egentlig?
    xhr.send();
  }

  this.getNames = function(){
    this.skjema = "ok";
  };
  this.getIDS = function(){};
  this.getInfo = function (){};
}

var bef = new Befolkning("http://wildboy.uib.no/~tpe056/folk/104857.json");
bef.load();

// Henter ut de relevante IDene vi trenger.
oversikt_table = document.getElementById("oversikt_table");
oversikt_navn = document.getElementById("oversikt_navn");
oversikt_nummer = document.getElementById("oversikt_nummer");
oversikt_befolkning = document.getElementById("oversikt_befolkning");
// Legger til data i oversikt, med et nedlastet JSON objekt som parameter.
function addToOversikt(befolkning ){
  // bruker nøkkelverdiene til å hente ut objektene.
  for (var key of Object.keys(befolkning.elementer)) {
    // Lager nye rader og rekker til infoen
    var row = oversikt_table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.classList.add("info");
    cell2.classList.add("info");
    cell3.classList.add("info");
    // legger inn infoen i rekkene. key er nøkkelverdi, altså kommunenavn.
    cell1.innerHTML = key;
    cell2.innerHTML = befolkning.elementer[key].kommunenummer;
    // Bruker det seneste året, altså 2018.
    var menn = befolkning.elementer[key].Menn[2018];
    var kvinner = befolkning.elementer[key].Kvinner[2018];
    cell3.innerHTML = parseInt(menn) + parseInt(kvinner);
  }
}
