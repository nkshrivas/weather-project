
        const fetchScreen = document.getElementById('fetchScreen');
        const fetchBtn = document.getElementById('fetchBtn');
        const weatherData = document.getElementById('weatherData');

        async function fetchWeather() {
            try {
                const longlat = await fetchLocation();
                const longitude = longlat[0];
                const latitude = longlat[1];

                fetchScreen.style = `
                    flex-direction: column;
                    margin: 0 0;
                    align-items: flex-start;
                `;
                fetchScreen.innerHTML = `
                   <div class="welcome">
                    <h1>Welcome to Weather App</h1>
                    <p>Here is your current location</p>
                    </div>
                    <div class="loc">
                        <h3>Longitude: ${longitude}</h3>
                        <h3>Latitude: ${latitude}</h3>
                    </div>
                    <iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed"></iframe>
                `;

                const url = `https://api.weatherapi.com/v1/current.json?key=7ef8b2e496d3490181d125612230309&q=${latitude},${longitude}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Weather data fetch failed with status ${response.status}`);
                }

                const data = await response.json();
                console.log(data)
                weatherData.style = `
                width: 100%;
                margin: 0 2;
                padding: 5px;
                background-color: #fff;
                height: 100vh;
                color: #000;
                `;
                
                weatherData.innerHTML = `
                    <h2>Your Weather Data</h2>
                    <div class="weather">
                        <h3>Location: ${data.location.name}, ${data.location.country}</h3>
                        <h3>Temperature: ${data.current.temp_c}°C</h3>
                        <h3>Humidity: ${data.current.humidity}%</h3>
                        <h3>Feels Like: ${data.current.feelslike_c}°C</h3>
                        <h3>Local Time: ${data.location.localtime}</h3>
                        <h3>Pressure: ${data.current.pressure_mb} hPa</h3>
                        <h3>Wind Speed: ${data.current.wind_kph} km/h</h3>
                        <h3>UV Index: ${data.current.uv}</h3>
                        <h3>Wind Degree: ${data.current.wind_degree}°</h3>
                    </div>
                `;
            } catch (error) {
                console.error(error);
            }
        }

        const fetchLocation = () => {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        resolve([position.coords.longitude, position.coords.latitude]);
                    }, error => {
                        console.error(error);
                        reject(error);
                    });
                } else {
                    console.log("Geolocation is not supported by this browser.");
                    reject("Geolocation not supported");
                }
            });
        }

        fetchBtn.addEventListener('click', fetchWeather);
  