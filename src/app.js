function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${date.getHours()}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${date.getMinutes()}`;
	}

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

function formatDaily(date) {
	let currentDate = new Date(date * 1000);
	let day = currentDate.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return days[day];
}

function displayForecast(response) {
	let weatherForecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");
	let forecastHTML = `<div class="row">`;

	weatherForecast.forEach(function (forecastDay, index) {
		if (index < 6) {
			forecastHTML =
				forecastHTML +
				`<div class="col-2">
			<div class="weather-forecast-day">${formatDaily(forecastDay.dt)}</div>
				<img
				src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
				width="60px"
				/>
					<div class="weather-forecast-temp">
						<span class="weather-forecast-temp-max">${Math.round(
							forecastDay.temp.max
						)}° </span
						><span class="weather-forecast-temp-min">${Math.round(
							forecastDay.temp.min
						)}°</span>
					</div>
		</div>`;
		}
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
	let apiKey = "ca40b820105beb53b92d32a2aebf57bb";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
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

	getForecast(response.data.coord);
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

let changeCity = document.querySelector("#search-bar");
changeCity.addEventListener("submit", submitCity);

search("London");
