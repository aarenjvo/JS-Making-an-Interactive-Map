// PSEUDOCODING:
// create the Leaflet map
// get the user's location
// after a category selection is made (addEventListener)
    // make a fetch request to the fourspace api
    // use place search method
    // specify lat/long, categories, and sort
// programatically render a list of results
// map the locations on the map
let selectEl = document.querySelector('select')
let listEl = document.querySelector('ul')

const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: '19',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



navigator.geolocation.getCurrentPosition((position) => {
    let {coords: {latitude, longitude}} = position
    console.log('It Works', [latitude, longitude])
    map.setView([latitude, longitude])

}, (error) => {
    console.log(error)
})

document.querySelector('button').addEventListener('click', (event) => {
    const categoryID = selectEl.value
    
    const options = {
        method: 'GET', 
        headers: 
        {accept: 'application/json',
        authorization: 'fsq3y7gA+8o98X0fp3BT9a43pp44Riqkb0E4urrRskU0llM='
    }
    };

fetch(`https://api.foursquare.com/v3/places/search?categories=${categoryID}&sort=DISTANCE&=5`, options)
  .then(response => response.json())
  .then(({results}) => {
    console.log(results)
    listEl.innerHTML = ''
    // we are destructuring the parsed json response object
    // results = [{name, location, distance}, ...]

    for(let i = 0; i < results.length; i++) {
        results[i]
        const listItem = document.createElement('li')
        listItem.textContent = results[i].name
        listEl.append(listItem)
    }

    //  response = {context, results: [{name, location, distance}, ...]}

  })

  .catch(err => console.error(err));
})

// Noshua API key
// fsq3y7gA+8o98X0fp3BT9a43pp44Riqkb0E4urrRskU0llM=