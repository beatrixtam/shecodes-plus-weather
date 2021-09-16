function formatDate(timestamp) {
	let date = new Date(timestamp);
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
	let hours = date.getHours();
	let minutes = date.getMinutes();

	let now = `${day} ${hours}:${minutes}`;

	return now;
}

function showTemperature(response) {
	console.log(response.data);
	let temperatureElement = document.querySelector("#temp-now");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);

	let cityElement = document.querySelector("#city-heading");
	cityElement.innerHTML = response.data.name;

	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.weather[0].description;

	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = response.data.main.humidity;

	let windElement = document.querySelector("#wind");
	windElement.innerHTMAL = Math.round(response.data.wind.speed);

	let dateElement = document.querySelector("#date-time");
	dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "ca40b820105beb53b92d32a2aebf57bb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
