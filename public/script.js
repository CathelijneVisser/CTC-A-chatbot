// More info button

const infoIcons = document.querySelectorAll(".info-icon")

infoIcons.forEach(infoIcon => {
    infoIcon.addEventListener("click", (event) => {
        const moreInfoText = document.getElementById(infoIcon.dataset.szid);

        moreInfoText.classList.toggle("show-more-info")
    })
})


// Like button

const likeButtons = document.querySelectorAll(".favorite-button")

likeButtons.forEach(likeButton => {
    likeButton.addEventListener("click", heartAnimation)
    
    function heartAnimation () {
        likeButton.classList.toggle("heart-animation")
    }
})


// Search button

const searchButtons = document.querySelectorAll(".search-button")

searchButtons.forEach(searchButton => {
    searchButton.addEventListener("click", searchAnimation)
    searchButton.addEventListener("animationend", searchAnimation)
    
    function searchAnimation () {
        searchButton.classList.toggle("search-animation")
    }
})

// Chatbot button

const chatButton = document.querySelector(".chat-button")
const chatCloseButton = document.querySelector(".chatbot-close-btn")
const chatFrame = document.querySelector(".chatbot-frame")

chatButton.addEventListener("click", chatToggle)
chatCloseButton.addEventListener("click", chatToggle)
    
function chatToggle () {
  chatFrame.classList.toggle("chatbot-show")
}

// Current date

const dateInput = document.getElementById("date-from");
const dateOutput = document.getElementById("date-till");

// Automaticly change ending date

if(dateInput){
    dateInput.onchange = () => {
        dateOutput.value = dateInput.value
    }
}


// Invalid state form

const inputs = document.querySelectorAll("input, select, textarea")

inputs.forEach(input => {
    input.addEventListener(
        "invalid",
        event => {
            input.classList.add("invalid")
        },
        false
    );
});


// Map
const checkMap = document.getElementById("map")
if (checkMap){
var map = L.map('map').setView([52.2129919, 5.2793703], 7)

L.tileLayer('https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=6ws7wF90PofV2LnNfOXL', {
    maxZoom: 19,
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map)

// Custom marker map

var markerIcon = L.icon({
    iconUrl: 'assets/img/Icon_search.svg',
    iconSize:   [15, 19],
    iconAnchor:  [0, 0],
})

// Longitude, latitude

var WicherLat = [51.915775, 4.477979]
var WafaLat = [51.9200524, 4.4660027]
var KarelLat = [52.3653432, 4.864459999999999]
var AhmedLat = [51.91511389999999, 4.3975444]
var ManonLat = [51.9147605, 4.398279]

// Markers

var Wicher = L.marker(WicherLat, {icon: markerIcon})
var Wafa = L.marker(WafaLat, {icon: markerIcon})
var Karel = L.marker(KarelLat, {icon: markerIcon})
var Ahmed = L.marker(AhmedLat, {icon: markerIcon})
var Manon = L.marker(ManonLat, {icon: markerIcon})
var markers = L.layerGroup([Wicher, Wafa, Karel, Ahmed, Manon]).addTo(map)

// Link to zone

var searchButton = document.querySelectorAll(".search-button")

searchButton.forEach(button => {
    button.addEventListener("click", function() {
        const data = this.dataset.point

        if (data == "Wicher") {
             map.flyTo(WicherLat, 16)
        }

        if (data == "Wafa") {
             map.flyTo(WafaLat, 16)
        }

        if (data == "Karel") {
             map.flyTo(KarelLat, 16)
        }

        if (data == "Ahmed") {
             map.flyTo(AhmedLat, 16)
        }

        if (data == "Manon") {
             map.flyTo(ManonLat, 16)
        }


    })
})
}

//chatroom togglen

//Chatroom

let ioServer = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

const loadingState = document.querySelector('span.loading')
const emptyState = document.querySelector('span.empty')
const errorState = document.querySelector('span.offline')

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
    const message = input.value
  if (input.value) {
    input.value = ""
    addMessage("user", message)
    ioServer.emit('message', message, ((error) => {
    if (error) {
      return alert(error);
    }
    input.value.focus()
    
  })
    
)}})

//states
ioServer.on('message', (message) => {
  // loadingState.style.display = 'none'
  // emptyState.style.display = 'none'
  addMessage("cody", message)
})  

ioServer.io.on('error', (error) => {
  // loadingState.style.display = 'none'
  // emptyState.style.display = 'none'
  // errorState.style.display = 'inline'
})

ioServer.io.on('reconnect_attempt', (attempt) => {
  console.log('attempting reconnection')
})

function addMessage(role, message) {
  var li = document.createElement('li')
  var p = document.createElement('p')

  li.classList.add(role) 
  p.textContent = message
  messages.appendChild(li)
  li.appendChild(p)
  messages.scrollTop = messages.scrollHeight
}