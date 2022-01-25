getCities();

function getCities(){
    fetch ('http://localhost:3000/cities')
    .then(resp => resp.json())
    .then(data => data.forEach(cityBar)) 
}

// Function to display leftbar info on main page
function cityBar(cityObj){
const cityName = document.createElement('ol');
cityName.innerText = cityObj.city

const img = document.createElement('img')
img.style.width = '80px'
img.style.height = '60px'
img.src = cityObj.image

document.querySelector('#cities').append(cityName, img)
    
img.addEventListener('click', function() {
const cityInfo = document.getElementById('cityInfo')
const cityName = document.createElement('h2')
cityName.innerHTML = cityObj.city
const cityPhoto = document.createElement('img')
cityPhoto.src = cityObj.image
const countryName = document.createElement('h3')
countryName.innerHTML = cityObj.country
const cityCaption = document.createElement('h4')
cityCaption.innerHTML = cityObj.caption
const addedBy = document.createElement('p')
addedBy.innerHTML = `added by ${cityObj.username}`
const likeCount = document.createElement('p')
likeCount.innerHTML = `${cityObj.likes} likes`
const commentContainer = document.createElement('div')
commentContainer.innerHTML = "Comments go here"
const commentDraftbox = document.createElement('textarea')
commentDraftbox.innerHTML = "Type comments here"
const commentForm = document.createElement('form')


cityInfo.append(cityName, cityPhoto, countryName, cityCaption, addedBy, likeCount, commentContainer, commentDraftbox)
})

// Form submit
const newImage = document.querySelector('#new_image').addEventListener('submit', addCity)
function addCity(event){
event.preventDefault()
let cityObj = {
    country: event.target.country.value,
    city: event.target.city.value,
    image: event.target.image.value,
    caption: event.target.caption.value,
    likes: 0
}
postCity(cityObj) 

function postCity(cityObj){
fetch ('http://localhost:3000/cities', {
method: 'POST',
headers:{
    'Content-Type': 'application/json',
},
body: JSON.stringify(cityObj)
})
.then(resp => resp.json())
.then(data => console.log(data))
}
// need to add to submit event 

}}
