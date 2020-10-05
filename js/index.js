const ipInput = document.getElementById('ipInput')
const form = document.getElementById("inputForm")

const view = { latitude: '', longitude: '' }
var mymap;
findMyIp()


if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        getIpInformation(ipInput.value);
    })
}

async function findMyIp() {
    await fetch(`https://ipapi.co/json/`)
        .then(async(response) => {
            const data = await response.json()
            console.log(data);

            getIpInformation(data.ip)
        })
}

async function getIpInformation(address) {
    await fetch(`https://geo.ipify.org/api/v1?apiKey=at_8MILKCRFnbSBnDAAOLrexZlzQipVZ&ipAddress=${address}`)
        .then(async(response) => {
            const data = await response.json()
            view.latitude = data.location.lat;
            view.longitude = data.location.lng
            setInfos(data);
            setTheMap();
        })
}

function setTheMap() {
    if (mymap) {
        mymap.remove();
    }
    mymap = L.map('mapid').setView([view.latitude, view.longitude], 15);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    L.marker([view.latitude, view.longitude]).addTo(mymap);
}

function setInfos(data) {
    const ip = document.getElementById("ip")
    const location = document.getElementById("location")
    const country = document.getElementById("country")
    const isp = document.getElementById("isp")
    ip.innerText = data.ip
    location.innerText = data.location.city
    country.innerText = data.location.country
    isp.innerText = data.isp
}