// Weather Widget
const apiKey = 'f18e3afd78118350f4bf234d4e25a95b'; // Replace with your actual API key
const city = 'Padre Garcia';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
            const dayDate = `${dayName} ${now.getDate()}, ${now.getFullYear().toString().slice(-2)}`;
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let condition = "Sunny";
            if (data.weather[0].main.includes("Cloud")) condition = "Cloudy";
            else if (data.weather[0].main.includes("Rain")) condition = "Raining";
            else if (data.weather[0].main === "Clear") condition = "Sunny";
            const hour = now.getHours();
            let timeOfDay = hour >= 6 && hour < 18 ? 'day' : 'night';
            let cardClass = `weather-${timeOfDay}-${condition.toLowerCase()}`;
            const weatherInfo = `
                <div class="card ${cardClass}">
                    <div class="card-body">
                        <div class="top-section d-flex align-items-center mb-3">
                            <div class="left-content">
                                <div class="date-year mb-1">${dayDate}</div>
                                <div class="condition mb-1">${condition}</div>
                                <div class="temp">${data.main.temp}°C</div>
                            </div>
                            <div class="right-content ms-5">
                                <img src="${iconUrl}" alt="${data.weather[0].description}">
                            </div>
                            
                        </div>
                        <hr class="border border-dark">
                        <div class="bottom-section d-flex justify-content-around">
                            <div class="wind">Wind: ${data.wind.speed} m/s</div>
                            <div class="humidity">Humidity: ${data.main.humidity}%</div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data.</p>';
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = '<p>Error fetching weather data.</p>';
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchWeather);