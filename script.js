// CALLING FUNCTIONS
getCities()
addComment()
getComments()
// DOM ELEMENTS
const cities = document.querySelector('#cities')
const cityInfo = document.querySelector('#cityInfo')
const newImage = document.querySelector('#new-image')

// METHODS
function getCities(){
  fetch ('http://localhost:3000/cities?_embed=comments')
  .then(response => response.json())
  .then(data => data.forEach(cityObj => cityBar(cityObj)))
}
function getComments(){
  fetch ('http://localhost:3000/comments')
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => data.forEach(commentObj => commentBar(commentObj)))
}
function postCity(cityObj){
  fetch ('http://localhost:3000/cities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityObj)
    })
  .then(response => response.json())
  .then(data => console.log(data))
  }

function updateLikes(cityObj){
  fetch (`http://localhost:3000/cities/${cityObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityObj)
  })
  .then(response => response.json())
}
function postComment(commentObj){
  fetch ('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj)
    })
  .then(response => response.json())
  // .then(data => console.log(data))
  }

// FUNCTION TO DISPLAY IMG ON SIDE BAR
function cityBar(cityObj) {
  const cityName = document.createElement('ol');
  cityName.innerText = cityObj.city
  const img = document.createElement('img')
  img.style.width = '80px'
  img.style.height = '60px'
  img.src = cityObj.image
  img.title = "Find Out More"
  
  cities.append(cityName, img)

// EVENTLISTENER TO DISPLAY CITY INFO ON MAIN PAGE AFTER CLICKED ON SIDEBAR
  img.addEventListener('click', function() {
    const cityName = document.createElement('h2')
    cityName.textContent = cityObj.city

    const cityPhoto = document.createElement('img')
    cityPhoto.style.width = '400px'
    cityPhoto.style.width = '400px'
    cityPhoto.src = cityObj.image
    cityPhoto.className = "animation"

    const countryName = document.createElement('h3')
    countryName.textContent = cityObj.country

    const cityCaption = document.createElement('h4')
    cityCaption.textContent = cityObj.caption

    const addedBy = document.createElement('p')
    addedBy.innerHTML = `added by ${cityObj.username}`
    addedBy.style.fontSize = '13px'

    const likeButton = document.createElement('button')
    likeButton.innerText = "💗"
    likeButton.type = 'button'

    const likeCount = document.createElement('p')
    likeCount.id = 'likeP'
    likeCount.textContent = `${cityObj.likes} likes`

    likeButton.addEventListener('click', () =>{
      cityObj.likes += 1
      likeCount.innerHTML = `${cityObj.likes} 💗 likes`
      updateLikes(cityObj);
    })

  cityInfo.replaceChildren(cityName, cityPhoto, countryName, cityCaption, addedBy, likeCount, likeButton)
})

}

// FORM SUBMIT
newImage.addEventListener('submit', addCity)
function addCity(event){
  event.preventDefault()
    let cityObj = {
      country: event.target.country.value,
      city: event.target.city.value,
      image: event.target.image.value,
      caption: event.target.caption.value,
      likes: 0
    }
    //console.log(cityObj);
    postCity(cityObj)
  }


function addComment(){
const commentForm = document.getElementById('commentForm')
commentForm.addEventListener('submit', (event) =>{
event.preventDefault()

let commentObj = {
content: event.target.newComment.value
}
postComment(commentObj)

})
}
const commentSection = document.getElementById('commentBar')
commentSection.append()

function commentBar(commentObj) {
  const newComment = document.createElement('ul');
  const hr = document.createElement('hr')
  hr.className = "hr"
  newComment.innerText = commentObj.content
  newComment.id = 'newCommentText'
  commentSection.append(newComment, hr)
}
