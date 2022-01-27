// CALLING FUNCTIONS
getCities()
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

    const countryName = document.createElement('h3')
    countryName.textContent = cityObj.country

    const cityCaption = document.createElement('h4')
    cityCaption.textContent = cityObj.caption

    const addedBy = document.createElement('p')
    addedBy.innerHTML = `added by ${cityObj.username}`
    addedBy.style.fontSize = '13px'

    const likeButton = document.createElement('button')
    likeButton.innerText = "💗 likes"
    likeButton.type = 'button'

    const likeCount = document.createElement('p')
    likeCount.id = 'likeP'
    likeCount.textContent = `${cityObj.likes} 💗 likes`

    likeButton.addEventListener('click', () =>{
      cityObj.likes += 1
      likeCount.innerHTML = `${cityObj.likes} likes`
      updateLikes(cityObj);
    })

    const commentContainer = document.createElement('div')
    commentContainer.textContent = 'Comments go here'

    const commentDraftbox = document.createElement('textarea')
    commentDraftbox.textContent = ''
    commentDraftbox.addEventListener('keydown', (e) => {
      shiftPressed = false;
      enterPressed = false;
      if (e.shiftKey) shiftPressed = true;
      if (e.keyCode == 13) {
        e.preventDefault();
        enterPressed=true;
      }
    })
    commentDraftbox.addEventListener('keyup', function (e) {
      if (e.shiftKey || e.keyCode == 13) {
        if (!enterPressed) shiftPressed = false;
        else {
          if(!shiftPressed) {
            let input = commentDraftbox.value
            e.preventDefault();
            commentContainer.textContent = input
            commentDraftbox.value = "";
            enterPressed = false;
          } else {
            commentDraftbox += "\n";
            enterPressed = false, shiftPressed = false;
          }
        }
    }

    })
   
  cityInfo.replaceChildren(cityName, cityPhoto, countryName, cityCaption, addedBy, likeCount, likeButton, commentContainer, commentDraftbox)
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
