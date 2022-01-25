
getCities() 

const citiesUl = document.querySelector('#cities')

function getCities() {
  fetch('http://localhost:3000/cities')
  .then(res => res.json())
  .then(cityArray => displayCitiesInSideBar(cityArray))
}

function displayCitiesInSideBar(cityArray) {
  cityArray.forEach(cityObj => {
    const cityLi = document.createElement('li')
    cityLi.className = "citiesList"
    cityLi.textContent = cityObj.city

    const img = document.createElement('img')
    img.style.width = '80px'
    img.style.height = '60px'
    img.src = cityObj.image

    citiesUl.append(cityLi, img)
  })
}