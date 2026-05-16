// Weather Widget
const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your actual API key
const city = 'Padre Garcia';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let lastWeatherData = null;
const i18n = window.i18n;
const t = (key) => (i18n && typeof i18n.t === 'function' ? i18n.t(key) : key);

function getLocale() {
    const lang = i18n && typeof i18n.getLanguage === 'function' ? i18n.getLanguage() : 'en';
    return lang === 'tl' ? 'fil-PH' : 'en-US';
}

function renderWeather(data) {
    const now = new Date();
    const locale = getLocale();
    const dayName = now.toLocaleDateString(locale, { weekday: 'short' });
    const dayDate = `${dayName} ${now.getDate()}, ${now.getFullYear().toString().slice(-2)}`;
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let conditionKey = 'weather.condition.sunny';
    let condition = t('weather.condition.sunny');
    if (data.weather[0].main.includes('Cloud')) {
        conditionKey = 'weather.condition.cloudy';
    } else if (data.weather[0].main.includes('Rain')) {
        conditionKey = 'weather.condition.raining';
    } else if (data.weather[0].main === 'Clear') {
        conditionKey = 'weather.condition.sunny';
    }
    condition = t(conditionKey);

    const hour = now.getHours();
    const timeOfDay = hour >= 6 && hour < 18 ? 'day' : 'night';
    const cardClass = `weather-${timeOfDay}-${conditionKey.split('.').pop()}`;
    const weatherInfo = `
        <div class="card ${cardClass}">
            <div class="card-body">
                <div class="top-section d-flex align-items-center mb-3">
                    <div class="left-content">
                        <div class="temp">${data.main.temp}°C</div>
                        <div class="date-year mb-1">${dayDate}</div><br>
                        <div class="condition mb-1">${condition}</div>
                        
                    </div>
                    <div class="right-content">
                        <img src="${iconUrl}" alt="${data.weather[0].description}">
                    </div>
                </div>
                <hr class="border border-dark">
                <div class="bottom-section d-flex justify-content-around">
                    <div class="wind">${t('weather.wind')}: ${data.wind.speed} m/s</div>
                    <div class="humidity">${t('weather.humidity')}: ${data.main.humidity}%</div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}

async function fetchWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            lastWeatherData = data;
            renderWeather(data);
        } else {
            document.getElementById('weather-info').innerHTML = `<p>${t('weather.error')}</p>`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p>${t('weather.error')}</p>`;
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchWeather);

if (i18n) {
    document.addEventListener('languagechange', () => {
        if (lastWeatherData) {
            renderWeather(lastWeatherData);
        }
    });
}