// CALLING FUNCTIONS
getCities()
getComments()
// DOM ELEMENTS
const cities = document.querySelector('#cities')
const cityInfo = document.querySelector('#cityInfo')
const newImage = document.querySelector('#new-image')
// METHODS
function getCities(){
  fetch ('http://localhost:3000/cities')
  .then(response => response.json())
  .then(data => data.forEach(cityBar))
}
function getComments(){
	fetch ('http://localhost:3000/comments')
	.then(response => response.json())
	// .then(data => data.forEach(postComment))
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
  }
// function postComment(commentObj){
// 	fetch('http://localhost:3000/comments',{
// 		method: 'POST',
// 		headers: {'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify(cityObj)
// 	})
// 	.then(response => response.json())
// 		}
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

  img.id = "sidebarImage"
  img.style.width = '80px'
  img.style.height = '60px'
  img.src = cityObj.image

  cities.append(cityName, img)

	
// EVENTLISTENER TO DISPLAY CITY INFO ON MAIN PAGE AFTER CLICKED ON SIDEBAR
  img.addEventListener('click', function() {
    const cityName = document.createElement('h2')
    cityName.textContent = cityObj.city

    const cityPhoto = document.createElement('img')
    cityPhoto.style.width = '400px'
    cityPhoto.style.width = '400px'
    cityPhoto.src = cityObj.image
		cityPhoto.title = "Find out more!"

    const countryName = document.createElement('h3')
    countryName.textContent = cityObj.country

    const cityCaption = document.createElement('h4')
    cityCaption.textContent = cityObj.caption

    const addedBy = document.createElement('p')
    addedBy.innerHTML = `added by ${cityObj.username}`

		const commentForm = document.createElement('form')
		// commentForm.setAttribute("method", "post");

    const commentDraftbox = document.createElement('input')
    commentDraftbox.setAttribute("type", "text")

		const s = document.createElement("input");
		s.setAttribute("type", "submit");
		s.setAttribute("value", "submit");

		s.addEventListener('submit', (event) => {
			event.preventDefault()
			console.log("event")
			// let commentObj = {
			// 	content: event.target.commentDraftbox.value
			// }
			// postComment(commentObj)
		})
		commentForm.append(commentDraftbox, s)

    const likeCount = document.createElement('p')
    likeCount.id = 'likeP'
    likeCount.textContent = `${cityObj.likes} likes`
    document.querySelector('#likeButton').addEventListener('click', () =>{
      cityObj.likes += 1
      likeCount.innerHTML = cityObj.likes
      updateLikes(cityObj)
    })

	
    // const commentForm = document.createElement('form')
  cityInfo.replaceChildren(cityName, cityPhoto, countryName, cityCaption, addedBy, likeCount, commentForm)

	});


// FORM SUBMIT
newImage.addEventListener('submit', addCity)
function addCity(event){
  event.preventDefault()
    let cityObj = {
      country: event.target.country.value,
      city: event.target.city.value,
      image: event.target.image.value,
      caption: event.target.caption.value,
      username: event.target.username.value,
      likes: 0
    }
    cityBar(cityObj)
    postCity(cityObj)
  }
}

// img.addEventListener('click', postComment) 
// function postComment(commentObj) {

// 	let commentHolder = document.getElementById('commentContainer')
// 	const commentList = document.createElement('li')
// 	commentList.textContent = commentObj.content

// 	commentHolder.append(commentList)
// }	
	