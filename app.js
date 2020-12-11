/* Skriv din kod här */
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
    getApiData().then(data => {
       for(let i = 0; i < 3; i++){
           let random = Math.floor(Math.random() * data.length);
           let name = data[random].name;
           let flag = data[random].flag;
           let timezone = data[random].timezones;
           
           country[i] = new Country(name,timezone,flag);
       }
       country.forEach(country => console.log(country))
       displayData(country)
    })
}

function displayData(countries) {
    const sections = document.querySelectorAll('section')
    let len = countries.length;

    for(let i = 0; i < len; i++) {
            sections[i].querySelector('img').src = countries[i].flag;
            sections[i].querySelector('h1').textContent  = countries[i].name;
            sections[i].querySelector('h3').textContent  = countries[i].getTime();
    }
    
}

function addZero(time) {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  }
  
  Country.prototype.getTime =  function() {
    let zone = this.timezone[0].substring(6,3);
    let date = new Date(parseInt(zone) * 3600 * 1000);
    let time = addZero(date.getHours()) + ":" + addZero(date.getMinutes());
    
    
    return time;
    
}
getCountry();