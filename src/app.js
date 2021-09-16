function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
	let temperatureElement = document.querySelector("#temp-now");
	let cityElement = document.querySelector("#city-heading");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windElement = document.querySelector("#wind");
	let dateElement = document.querySelector("#date");

	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	humidityElement.innerHTML = response.data.main.humidity;
	windElement.innerHTML = Math.round(response.data.wind.speed);
	dateElement.innerHTML = formatDate(response.data.dt * 1000);

	let iconElement = document.querySelector("#icon");
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
	);

	celsiusTemp = Math.round(response.data.main.temp);
}

function search(city) {
	let apiKey = "ca40b820105beb53b92d32a2aebf57bb";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

	axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#search-city");
	search(cityInputElement.value);
}

function displayFahrenheit(event) {
	event.preventDefault();
	let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
	let temperatureElement = document.querySelector("#temp-now");
	chooseCelsius.classList.remove("active");
	chooseFahrenheit.classList.add("active");
	temperatureElement.innerHTML = fahrenheitTemp;
}

function displayCelsius(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temp-now");
	chooseCelsius.classList.add("active");
	chooseFahrenheit.classList.remove("active");
	temperatureElement.innerHTML = celsiusTemp;
}

let celsiusTemp = null;

let changeCity = document.querySelector("#search-bar");
changeCity.addEventListener("submit", submitCity);

let chooseFahrenheit = document.querySelector("#fahrenheit");
chooseFahrenheit.addEventListener("click", displayFahrenheit);

let chooseCelsius = document.querySelector("#celsius");
chooseCelsius.addEventListener("click", displayCelsius);

search("Prague");
