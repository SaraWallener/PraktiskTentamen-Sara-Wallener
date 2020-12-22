// Constructorn Country
function Country(name, timezone,flag) {
        this.name = name;
        this.timezone = timezone;
        this.flag = flag;
}

// Anslut och hämta data med specifika fält, namn, tidszon och flagga. Returnera som json
async function getApiData(){
    const uri = 'https://restcountries.eu/rest/v2/all?fields=name;timezones;flag';
    let response = await fetch(uri);
    return response.json();
}

// skapar en array som håller tre random länder med timezone och flagga.
function getCountry(){
    let country = [];
    // Hämtar API data 
    getApiData().then(data => {
        // Skapar en for-loop för att hämta ut 3 stycken länder
       for(let i = 0; i < 3; i++){
           // API returnerar 250 object, vilket används för att skapa ett random tal baserat på det
           let random = Math.floor(Math.random() * data.length);
           let name = data[random].name;
           let flag = data[random].flag;
           let timezone = data[random].timezones;
           // Skapar en ny instans av constructorn Country
           country[i] = new Country(name,timezone,flag);
       }
       displayData(country)
    })
}

// Hämtar alla sections och attachar varje elementen i en for-loop.
function displayData(countries) {
    const sections = document.querySelectorAll('section');
    let len = countries.length;

    // Eftersom antal sections är bestämda, tar loopen hänsyn till antal länder.
    for(let i = 0; i < len; i++) {
        // Uppdaterar varje element med landdata. h3 hämtar funktionen getTime() från constructorn
            sections[i].querySelector('img').src = countries[i].flag;
            sections[i].querySelector('h1').textContent  = countries[i].name;
            sections[i].querySelector('h3').textContent  = countries[i].getTime();
    }
    
}
// Lägger till en 0 om tiden är mindre än 10 för att få 00 i timme & minut
function addZero(time) {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  }

  // Lösning för om adderingen går över timme 24.
  function correctingTime(UTCHour, timeZoneHour){
    let checkNumber = UTCHour + timeZoneHour;
    return (checkNumber >= 24 ? (checkNumber - 24) : checkNumber);
  }
  
  // Prototype som lägger till tidzon hantering och lägger det i constructorn Country.
  Country.prototype.getTime =  function() {
      // Hämtar +/- från api tidzon för att använda i if/else
    let conditional = this.timezone[0].substring(3,4);
     // Hämtar tidzon timme från api tidzon och får använda type conversion för att ändra string till number
     // annars blir det 22 + "01" = 2201 (concatinerat)
    let timeZoneHour = Number(this.timezone[0].substring(4,6))
    // Skapar en ny instans av Date() och hämtar ut UTCHours() samt Minutes(). 
    let date = new Date();
    let UTCHour = date.getUTCHours();
    let UTCMinutes = date.getUTCMinutes();
    // För att spara nya tiden
    let newHour;
    
    // If/else som antingen adderar eller subtraherar beroende på conditional +/-
    if (conditional === '+') {
        newHour = correctingTime(UTCHour, timeZoneHour);
        // Subtraherar tiderna
    } else if (conditional === '-') {
        newHour = UTCHour - timeZoneHour;
        // Vissa API responser innehåller enbart [UTC] som verkar vara UTC 00, så returnerar UTCHour.
    } else {
        newHour = UTCHour;
    }
    // returnerar formatterad tid 00:00
    return `${addZero(newHour)}:${addZero(UTCMinutes)}`;
    }

// Startar API-anropet
getCountry();