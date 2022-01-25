function getCities() {
  fetch("http://localhost:3000/cities")
  .then(res => res.json())
  .then(data => console.log(data))
}
getCities()