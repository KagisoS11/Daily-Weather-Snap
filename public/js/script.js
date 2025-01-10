document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = ''; // Clear previous results

    if (!city) {
        resultDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    // Add a loading spinner
    const loader = document.createElement('div');
    loader.className = 'loader';
    resultDiv.appendChild(loader);

    try {
        const response = await fetch(`/weather?city=${city}`);
        loader.style.display = 'none'; // Hide the spinner once data is loaded

        if (response.ok) {
            const data = await response.json();
            resultDiv.innerHTML = `
                <div class="weather-result-animate">
                    <p><strong>City:</strong> ${data.name}</p>
                    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = '<p>City not found.</p>';
        }
    } catch (error) {
        loader.style.display = 'none';
        resultDiv.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
    }
});


