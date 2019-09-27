const myIcon = L.icon({
    iconUrl: 'myIcon.svg',
    iconSize: [50, 50],
    shadowUrl: 'shadow.png',
    shadowSize: [40, 40],
});

const map = L.map('mapid', {
    center: [0, 0],
    zoom: 10
});

async function getISSData(){
    const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544")
    const data = await response.json();
    let {latitude, longitude, timestamp} = {latitude: data.latitude, longitude: data.longitude, timestamp: data.timestamp};
    showCoords(latitude, longitude, timestamp)
    updateMarker(latitude, longitude)
}

const convertTimeStamp = (timeStamp) => {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let finalDate = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return finalDate
}

function showCoords(latitude, longitude, timestamp){
    document.getElementById('lat').innerHTML = latitude;
    document.getElementById('lon').innerHTML = longitude;
    document.getElementById('time').innerHTML = convertTimeStamp(timestamp);
}

const showMap = (map) => {
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { 
        attribution 
    });
    tiles.addTo(map);
}

let previousMarker;
let polylinePoints = [];
const updateMarker = (latitude, longitude, mark) => {
    if (previousMarker != undefined) {
        map.removeLayer(previousMarker);
    };
    const newMarker = L.marker([latitude, longitude],  {icon: myIcon}).addTo(map);

    polylinePoints.push([latitude, longitude])

    previousMarker = newMarker;

    let polyline = L.polyline(polylinePoints, {color: 'red'}).addTo(map);
    map.setView([latitude, longitude], 3)
}

showMap(map);
setInterval(getISSData, 5000)