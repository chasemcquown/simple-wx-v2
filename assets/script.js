// get user's city
let cityInput = document.querySelector('#city')
// identify search button 
const searchButton = document.querySelector('#search-btn')
// identify recent serch button container
const recentSearchBtns = document.querySelector("#previous-searches")
// create array to hold previous searches
let previousSearches = [];
// api key 
const apiKey = "&appid=cf6215d35458f7e05133781f893bec16";

// if recent searches exist in local storage, grab them and make a button for each saved city
function getRecentSearches() {

    let citySearches = JSON.parse(localStorage.getItem('cities'))

    for(i = 0; i < citySearches.length; i++) {
        
        // create and display button for searche saved to local storage
        const buttonContainer = document.querySelector("#previous-searches")
        let newButton = document.createElement("button")
        newButton.id = citySearches[i]
        newButton.innerText = citySearches[i]
        newButton.classList = 'recent-btn'
        buttonContainer.appendChild(newButton)
    }

    
}

// fetch for inputted city
function getCityWX() {

    // save searched city
    let city = cityInput.value.trim()

    // push searched city into array
    previousSearches.push(city)

    // save array to local storage 
    localStorage.setItem("cities", JSON.stringify(previousSearches))

    // fetch current conditions
    fetch(
        "https://api.openweathermap.org/data/2.5/find?q=" + city + "&units=imperial" + apiKey

    )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        // change current weather container background
        let currentWxContainer = document.querySelector("#current-weather")
        currentWxContainer.style.color = "white"
        currentWxContainer.style.boxShadow = "10px 10px white"
        currentWxContainer.style.backgroundColor = '#258BF6'

        // get current WX data
        let weatherIcon = data.list[0].weather[0].icon
        let currentWX = data.list[0].weather[0].main
        let currentWXDetail = data.list[0].weather[0].description
        let currentTemp = data.list[0].main.temp 
        let currentWind = data.list[0].wind.speed 
        let currentHumidity = data.list[0].main.humidity

        // display current WX data
        document.querySelector("#conditions-description").innerHTML = "Current conditions for " + data.list[0].name + ": " + currentWX + " (" + currentWXDetail + ")"
        document.querySelector('#current-conditions-icon').src = "assets/icons/" + weatherIcon + ".png"
        document.querySelector('#current-temp').innerHTML = "Temperature: " + currentTemp + " F"
        document.querySelector('#current-wind').innerHTML = "Wind: " + currentWind + "mph"
        document.querySelector('#current-humidity').innerHTML = "Humidity: " + currentHumidity + "%"
        document.querySelector("#recent-search").innerHTML = data.list[0].name

        // create and display button for recent searches
        const buttonContainer = document.querySelector("#previous-searches")
        let newButton = document.createElement("button")
        newButton.id = data.list[0].name
        newButton.innerText = data.list[0].name
        newButton.classList = 'btn btn-secondary'
        buttonContainer.appendChild(newButton)
    });

    // fetch for 5 day forecast
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + apiKey
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        
        // get current year
        let date = new Date()
        let year = date.getFullYear()

        // day one data
        let dayOneDate = data.list[4].dt_txt.slice(5,10)
        let dayOneIcon = data.list[4].weather[0].icon
        let dayOneTemp = data.list[4].main.temp
        let windSpeedOne = data.list[4].wind.speed
        let dayOneWind = windSpeedOne.toString()
        let dayOneHumidity = data.list[4].main.humidity
        document.querySelector("#day-one-date").innerText = dayOneDate + "-" + year
        document.querySelector("#day-one-icon").src = "assets/icons/" + dayOneIcon + ".png"
        document.querySelector("#day-one-temp").innerText = "Temp: " + dayOneTemp + " F"
        document.querySelector("#day-one-wind").innerText = "Wind: " + dayOneWind.slice(0,2) + "mph"
        document.querySelector("#day-one-humidity").innerText = "Humidity: " + dayOneHumidity + "%"

        // day two data
        let dayTwoDate = data.list[12].dt_txt.slice(5,10)
        let dayTwoIcon = data.list[12].weather[0].icon
        let dayTwoTemp = data.list[12].main.temp
        let windSpeedTwo = data.list[12].wind.speed
        let dayTwoWind = windSpeedTwo.toString()
        let dayTwoHumidity = data.list[12].main.humidity
        document.querySelector("#day-two-date").innerText = dayTwoDate + "-" + year
        document.querySelector("#day-two-icon").src = "assets/icons/" + dayTwoIcon + ".png"
        document.querySelector("#day-two-temp").innerText = "Temp: " + dayTwoTemp + " F"
        document.querySelector("#day-two-wind").innerText = "Wind: " + dayTwoWind.slice(0,2) + "mph"
        document.querySelector("#day-two-humidity").innerText = "Humidity: " + dayTwoHumidity + "%"

        // day three data
        let dayThreeDate = data.list[20].dt_txt.slice(5,10)
        let dayThreeIcon = data.list[20].weather[0].icon
        let dayThreeTemp = data.list[20].main.temp
        let windSpeedThree = data.list[20].wind.speed
        let dayThreeWind = windSpeedThree.toString()
        let dayThreeHumidity = data.list[20].main.humidity
        document.querySelector("#day-three-date").innerText = dayThreeDate + "-" + year
        document.querySelector("#day-three-icon").src = "assets/icons/" + dayThreeIcon + ".png"
        document.querySelector("#day-three-temp").innerText = "Temp: " + dayThreeTemp + " F"
        document.querySelector("#day-three-wind").innerText = "Wind: " + dayThreeWind.slice(0,2) + "mph"
        document.querySelector("#day-three-humidity").innerText = "Humidity: " + dayThreeHumidity + "%"

        // day four data
        let dayFourDate = data.list[28].dt_txt.slice(5,10)
        let dayFourIcon = data.list[28].weather[0].icon
        let dayFourTemp = data.list[28].main.temp
        let windSpeedFour = data.list[28].wind.speed
        let dayFourWind = windSpeedFour.toString()
        let dayFourHumidity = data.list[28].main.humidity
        document.querySelector("#day-four-date").innerText = dayFourDate + "-" + year
        document.querySelector("#day-four-icon").src = "assets/icons/" + dayFourIcon + ".png"
        document.querySelector("#day-four-temp").innerText = "Temp: " + dayFourTemp + " F"
        document.querySelector("#day-four-wind").innerText = "Wind: " + dayFourWind.slice(0,2) + "mph"
        document.querySelector("#day-four-humidity").innerText = "Humidity: " +  dayFourHumidity + "%"

        // day five data
        let dayFiveDate = data.list[32].dt_txt.slice(5,10)
        let dayFiveIcon = data.list[32].weather[0].icon
        let dayFiveTemp = data.list[32].main.temp
        let windSpeedFive = data.list[32].wind.speed
        let dayFiveWind = windSpeedFive.toString()
        let dayFiveHumidity = data.list[32].main.humidity
        document.querySelector("#day-five-date").innerText = dayFiveDate + "-" + year
        document.querySelector("#day-five-icon").src = "assets/icons/" + dayFiveIcon + ".png"
        document.querySelector("#day-five-temp").innerText = "Temp: " + dayFiveTemp + " F"
        document.querySelector("#day-five-wind").innerText = "Wind: " + dayFiveWind.slice(0,2) + "mph"
        document.querySelector("#day-five-humidity").innerText = "Humidity: " + dayFiveHumidity + "%"
    })

}

// fetch if a previous search button is selected
function handleSearch(e) {
    if (e.target !== e.currentTarget) {
        let selectedCity = e.target.id

        // fetch current conditions
        fetch(
            "https://api.openweathermap.org/data/2.5/find?q=" + selectedCity + "&units=imperial" + apiKey

        )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            // get current WX data
            let weatherIcon = data.list[0].weather[0].icon
            let currentWX = data.list[0].weather[0].main
            let currentWXDetail = data.list[0].weather[0].description
            let currentTemp = data.list[0].main.temp 
            let currentWind = data.list[0].wind.speed 
            let currentHumidity = data.list[0].main.humidity

            // display current WX data
            document.querySelector("#conditions-description").innerHTML = "Current conditions: " + currentWX + " (" + currentWXDetail + ")"
            document.querySelector('#current-conditions-icon').src = "assets/icons/" + weatherIcon + ".png"
            document.querySelector('#current-temp').innerHTML = "Temperature: " + currentTemp + " F"
            document.querySelector('#current-wind').innerHTML = "Wind: " + currentWind + "mph"
            document.querySelector('#current-humidity').innerHTML = "Humidity: " + currentHumidity + "%"
            document.querySelector("#recent-search").innerHTML = data.list[0].name

        });

        // fetch for 5 day forecast
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" + selectedCity + "&units=imperial" + apiKey
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            // get current year
            let date = new Date()
            let year = date.getFullYear()

            // day one data
            let dayOneDate = data.list[4].dt_txt.slice(5,10)
            let dayOneIcon = data.list[4].weather[0].icon
            let dayOneTemp = data.list[4].main.temp
            let windSpeedOne = data.list[4].wind.speed
            let dayOneWind = windSpeedOne.toString()
            let dayOneHumidity = data.list[4].main.humidity
            document.querySelector("#day-one-date").innerText = dayOneDate + "-" + year
            document.querySelector("#day-one-icon").src = "assets/icons/" + dayOneIcon + ".png"
            document.querySelector("#day-one-temp").innerText = "Temp: " + dayOneTemp + " F"
            document.querySelector("#day-one-wind").innerText = "Wind: " + dayOneWind.slice(0,2) + "mph"
            document.querySelector("#day-one-humidity").innerText = "Humidity: " + dayOneHumidity + "%"

            // day two data
            let dayTwoDate = data.list[12].dt_txt.slice(5,10)
            let dayTwoIcon = data.list[12].weather[0].icon
            let dayTwoTemp = data.list[12].main.temp
            let windSpeedTwo = data.list[12].wind.speed
            let dayTwoWind = windSpeedTwo.toString()
            let dayTwoHumidity = data.list[12].main.humidity
            document.querySelector("#day-two-date").innerText = dayTwoDate + "-" + year
            document.querySelector("#day-two-icon").src = "assets/icons/" + dayTwoIcon + ".png"
            document.querySelector("#day-two-temp").innerText = "Temp: " + dayTwoTemp + " F"
            document.querySelector("#day-two-wind").innerText = "Wind: " + dayTwoWind.slice(0,2) + "mph"
            document.querySelector("#day-two-humidity").innerText = "Humidity: " + dayTwoHumidity + "%"

            // day three data
            let dayThreeDate = data.list[20].dt_txt.slice(5,10)
            let dayThreeIcon = data.list[20].weather[0].icon
            let dayThreeTemp = data.list[20].main.temp
            let windSpeedThree = data.list[20].wind.speed
            let dayThreeWind = windSpeedThree.toString()
            let dayThreeHumidity = data.list[20].main.humidity
            document.querySelector("#day-three-date").innerText = dayThreeDate + "-" + year
            document.querySelector("#day-three-icon").src = "assets/icons/" + dayThreeIcon + ".png"
            document.querySelector("#day-three-temp").innerText = "Temp: " + dayThreeTemp + " F"
            document.querySelector("#day-three-wind").innerText = "Wind: " + dayThreeWind.slice(0,2) + "mph"
            document.querySelector("#day-three-humidity").innerText = "Humidity: " + dayThreeHumidity + "%"

            // day four data
            let dayFourDate = data.list[28].dt_txt.slice(5,10)
            let dayFourIcon = data.list[28].weather[0].icon
            let dayFourTemp = data.list[28].main.temp
            let windSpeedFour = data.list[28].wind.speed
            let dayFourWind = windSpeedFour.toString()
            let dayFourHumidity = data.list[28].main.humidity
            document.querySelector("#day-four-date").innerText = dayFourDate + "-" + year
            document.querySelector("#day-four-icon").src = "assets/icons/" + dayFourIcon + ".png"
            document.querySelector("#day-four-temp").innerText = "Temp: " + dayFourTemp + " F"
            document.querySelector("#day-four-wind").innerText = "Wind: " + dayFourWind.slice(0,2) + "mph"
            document.querySelector("#day-four-humidity").innerText = "Humidity: " +  dayFourHumidity + "%"

            // day five data
            let dayFiveDate = data.list[32].dt_txt.slice(5,10)
            let dayFiveIcon = data.list[32].weather[0].icon
            let dayFiveTemp = data.list[32].main.temp
            let windSpeedFive = data.list[32].wind.speed
            let dayFiveWind = windSpeedFive.toString()
            let dayFiveHumidity = data.list[32].main.humidity
            document.querySelector("#day-five-date").innerText = dayFiveDate + "-" + year
            document.querySelector("#day-five-icon").src = "assets/icons/" + dayFiveIcon + ".png"
            document.querySelector("#day-five-temp").innerText = "Temp: " + dayFiveTemp + " F"
            document.querySelector("#day-five-wind").innerText = "Wind: " + dayFiveWind.slice(0,2) + "mph"
            document.querySelector("#day-five-humidity").innerText = "Humidity: " + dayFiveHumidity + "%"
        })
    }
}


// find city once search button has been clicked
searchButton.addEventListener('click', getCityWX)

// listen for clicks on parent element of recent search buttons, then fetch
recentSearchBtns.addEventListener("click", handleSearch)

// get items from locl storage
getRecentSearches()
