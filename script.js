const myMap = {
    coordinates: [],

    buildMap() {
        let userLoc = L.map('map', {
            center: this.coordinates,
            zoom: 12,
        });
        // adding tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 15,
            attribution: '© OpenStreetMap'
        }).addTo(userLoc);
        //create and main add geolocation marker
        const marker = L.marker(this.coordinates)
        marker.addTo(userLoc).bindPopup('<b>Current Location</b>').openPopUp()
    },

}



// get user's coordinates                                                           
async function getCoords(){
    let pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}
// event listeners for radio buttons 
const radios = document.querySelectorAll('input')
for (const radio of radios) {
  radio.onclick = (e) => {
    console.log(e.target.value);
  }
}
// foursquare
const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3h7nBtf9V8SYAwG9tkJ0XWbBiNEtOoRuwSe5cJPFki54='
    }
  };

  fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=coffee&limit=5&ll=41.8781%2C-87.6298`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    


window.onload = async () => {
    let coordinates = await getCoords()
    myMap.coordinates = coordinates
    console.log(coordinates)
    myMap.buildMap()
}