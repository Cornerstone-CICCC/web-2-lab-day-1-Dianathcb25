const btnWeather = document.getElementById("btn-weather")
const weatherInput = document.getElementById("weather-input")
const weatherDisplay = document.getElementById("weather-display")
const imgDay = document.getElementById("img-day")
const imgNight = document.getElementById("img-night")
const weatherOver = document.getElementById("weather-over")
const bodyElement = document.body


btnWeather.addEventListener("click", () => {
    const city = weatherInput.value

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    .then(res => res.json())
    .then(data => {
        console.log(data.results[0])

        const country = data.results[0].country
        const timeZone = data.results[0].timezone
        const population = data.results[0].population

        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
        .then(res => res.json())
        .then(weather => {
        console.log(weather)

        const temp = weather.current.temperature_2m
        const tempUnit = weather.daily_units.temperature_2m_max

        const tomorrowMax = weather.daily.temperature_2m_max
        
        const tomorrowMin = weather.daily.temperature_2m_min
        
        const dayNight = weather.current.is_day
        if (dayNight === 1) {
            imgDay.style.display = "block"
            imgNight.style.display = "none"
            weatherOver.style.color = "black"
            bodyElement.classList.add("day-theme")
            bodyElement.classList.remove("nigth-theme")
        } else {
            imgDay.style.display = "none"
            imgNight.style.display = "block"
            weatherOver.style.color = "white"
            bodyElement.classList.remove("day-theme")
            bodyElement.classList.add("nigth-theme")
        }
        
        weatherOver.textContent = `${city} ${temp}${tempUnit}`

        weatherDisplay.innerHTML = 
        `
        <table>
            <tr>
                <th>Country:</th>
                    <td>${country}</td>
            </tr>
            <tr>
                <th>Timezone:</th>
                   <td>${timeZone}</td>
            </tr>
            <tr>
                <th>Population:</th>
                    <td>${population}</td>
            </tr>
            <tr>
                <th>Tomorrow's Forecast:</th>
                    <td>
                        Low: ${tomorrowMin}${tempUnit}
                    <br>
                        Max: ${tomorrowMax}${tempUnit}
                    </td>
            </tr>
        </table>
        `

    })
    .catch(err => console.error(err))
})
})