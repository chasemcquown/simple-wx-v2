// store api key in var
const apiKey = "&appid=cf6215d35458f7e05133781f893bec16";

// hide current wx container and five day cards on page load
document.querySelector(".current-wx").style.display = "none";
document.querySelector(".five-day-wx").style.display = "none";

// create array to hold search history
let searchHistory = [];

// if recent searches exist in local storage, grab them and make a button for each saved city
function getRecentSearches() {

    let citySearches = JSON.parse(localStorage.getItem('cities'))

    for(i = 0; i < citySearches.length; i++) {
        
        // create and display button for search saved to local storage
        const buttonContainer = document.querySelector(".recent-searches")
        let newButton = document.createElement("button")
        newButton.id = citySearches[i]
        newButton.innerText = citySearches[i]
        newButton.classList = 'recent'
        buttonContainer.appendChild(newButton)
    }

    
}


function fetchWX() {

    // capture user's city
    let usersCity = document.querySelector("input").value.trim()

    // push users search into history array
    searchHistory.push(usersCity);

    // save array in local storage
    localStorage.setItem("cities", JSON.stringify(searchHistory))

    // FETCH CURRENT WEATHER CONDITIONS
    fetch(
        "https://api.openweathermap.org/data/2.5/find?q=" + usersCity + "&units=imperial" + apiKey

    )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.querySelector(".current-wx").style.display = "";
        document.querySelector(".current-wx h2").innerHTML = data.list[0].name
        document.querySelector(".current-wx img").src = "assets/icons/" + data.list[0].weather[0].icon + ".png"
        document.querySelector(".current-wx p:nth-child(3)").innerHTML = "Currently: " + data.list[0].weather[0].main
        document.querySelector(".current-wx p:nth-child(4)").innerHTML = "Temp: " + data.list[0].main.temp + " F"
        document.querySelector(".current-wx p:nth-child(5)").innerHTML = "Wind: " + data.list[0].wind.speed + " mph"
        document.querySelector(".current-wx p:nth-child(6)").innerHTML = "Humidity: " + data.list[0].main.humidity + "%"
    })

    // FETCH CURRENT 5 DAY FORECAST
    fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" + usersCity + "&units=imperial" + apiKey
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.querySelector(".five-day-wx").style.display = "";
        // DAY ONE
        document.querySelector(".five-day-wx div:nth-child(1) h2").innerHTML = data.list[6].dt_txt.slice(5,10)
        document.querySelector(".five-day-wx div:nth-child(1) img").src = "assets/icons/" + data.list[6].weather[0].icon + ".png"
        document.querySelector(".five-day-wx div:nth-child(1) p:nth-child(3)").innerHTML = "Temp: " + data.list[6].main.temp + " F"
        document.querySelector(".five-day-wx div:nth-child(1) p:nth-child(4)").innerHTML = "Wind: " + data.list[6].wind.speed + " mph"
        document.querySelector(".five-day-wx div:nth-child(1) p:nth-child(5)").innerHTML = "Humidity: " + data.list[6].main.humidity  + "%"
        // DAY TWO
        document.querySelector(".five-day-wx div:nth-child(2) h2").innerHTML = data.list[14].dt_txt.slice(5,10)
        document.querySelector(".five-day-wx div:nth-child(2) img").src = "assets/icons/" + data.list[14].weather[0].icon + ".png"
        document.querySelector(".five-day-wx div:nth-child(2) p:nth-child(3)").innerHTML = "Temp: " + data.list[14].main.temp + " F"
        document.querySelector(".five-day-wx div:nth-child(2) p:nth-child(4)").innerHTML = "Wind: " + data.list[14].wind.speed + " mph"
        document.querySelector(".five-day-wx div:nth-child(2) p:nth-child(5)").innerHTML = "Humidity: " + data.list[14].main.humidity  + "%"
        // DAY 3
        document.querySelector(".five-day-wx div:nth-child(3) h2").innerHTML = data.list[22].dt_txt.slice(5,10)
        document.querySelector(".five-day-wx div:nth-child(3) img").src = "assets/icons/" + data.list[22].weather[0].icon + ".png"
        document.querySelector(".five-day-wx div:nth-child(3) p:nth-child(3)").innerHTML = "Temp: " + data.list[22].main.temp + " F"
        document.querySelector(".five-day-wx div:nth-child(3) p:nth-child(4)").innerHTML = "Wind: " + data.list[22].wind.speed + " mph"
        document.querySelector(".five-day-wx div:nth-child(3) p:nth-child(5)").innerHTML = "Humidity: " + data.list[22].main.humidity  + "%"
        // DAY 4
        document.querySelector(".five-day-wx div:nth-child(4) h2").innerHTML = data.list[30].dt_txt.slice(5,10)
        document.querySelector(".five-day-wx div:nth-child(4) img").src = "assets/icons/" + data.list[30].weather[0].icon + ".png"
        document.querySelector(".five-day-wx div:nth-child(4) p:nth-child(3)").innerHTML = "Temp: " + data.list[30].main.temp + " F"
        document.querySelector(".five-day-wx div:nth-child(4) p:nth-child(4)").innerHTML = "Wind: " + data.list[30].wind.speed + " mph"
        document.querySelector(".five-day-wx div:nth-child(4) p:nth-child(5)").innerHTML = "Humidity: " + data.list[30].main.humidity  + "%"
        // DAY 5
        document.querySelector(".five-day-wx div:nth-child(5) h2").innerHTML = data.list[38].dt_txt.slice(5,10)
        document.querySelector(".five-day-wx div:nth-child(5) img").src = "assets/icons/" + data.list[38].weather[0].icon + ".png"
        document.querySelector(".five-day-wx div:nth-child(5) p:nth-child(3)").innerHTML = "Temp: " + data.list[38].main.temp + " F"
        document.querySelector(".five-day-wx div:nth-child(5) p:nth-child(4)").innerHTML = "Wind: " + data.list[38].wind.speed + " mph"
        document.querySelector(".five-day-wx div:nth-child(5) p:nth-child(5)").innerHTML = "Humidity: " + data.list[38].main.humidity  + "%"
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

            document.querySelector(".current-wx").style.display = "";
            document.querySelector(".current-wx h2").innerHTML = data.list[0].name
            document.querySelector(".current-wx img").src = "assets/icons/" + data.list[0].weather[0].icon + ".png"
            document.querySelector(".current-wx p:nth-child(3)").innerHTML = "Currently: " + data.list[0].weather[0].main
            document.querySelector(".current-wx p:nth-child(4)").innerHTML = "Temp: " + data.list[0].main.temp + " F"
            document.querySelector(".current-wx p:nth-child(5)").innerHTML = "Wind: " + data.list[0].wind.speed + " mph"
            document.querySelector(".current-wx p:nth-child(6)").innerHTML = "Humidity: " + data.list[0].main.humidity + "%"

        });

        // fetch for 5 day forecast
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q=" + selectedCity + "&units=imperial" + apiKey
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            document.querySelector(".five-day-wx").style.display = "";
            // DAY ONE
            document.querySelector(".five-day-wx div:nth-child(1) h2").innerHTML = data.list[6].dt_txt.slice(5,10)
            document.querySelector(".five-day-wx div:nth-child(1) img").src = "assets/icons/" + data.list[6].weather[0].icon + ".png"
            document.querySelector(".five-day-wx div:nth-child(1) p:nth-child(3)").innerHTML = "Temp: " + data.list[6].main.temp + " F"
            document.querySelector(".five-day-wx div:nth-child(1) p:nth-child(4)").innerHTML = "Wind: " + data.list[6].wind.speed + " mph"
            document.querySelector(".five-day-wx div:nth-child(1) p:nth-child(5)").innerHTML = "Humidity: " + data.list[6].main.humidity  + "%"
            // DAY TWO
            document.querySelector(".five-day-wx div:nth-child(2) h2").innerHTML = data.list[14].dt_txt.slice(5,10)
            document.querySelector(".five-day-wx div:nth-child(2) img").src = "assets/icons/" + data.list[14].weather[0].icon + ".png"
            document.querySelector(".five-day-wx div:nth-child(2) p:nth-child(3)").innerHTML = "Temp: " + data.list[14].main.temp + " F"
            document.querySelector(".five-day-wx div:nth-child(2) p:nth-child(4)").innerHTML = "Wind: " + data.list[14].wind.speed + " mph"
            document.querySelector(".five-day-wx div:nth-child(2) p:nth-child(5)").innerHTML = "Humidity: " + data.list[14].main.humidity  + "%"
            // DAY 3
            document.querySelector(".five-day-wx div:nth-child(3) h2").innerHTML = data.list[22].dt_txt.slice(5,10)
            document.querySelector(".five-day-wx div:nth-child(3) img").src = "assets/icons/" + data.list[22].weather[0].icon + ".png"
            document.querySelector(".five-day-wx div:nth-child(3) p:nth-child(3)").innerHTML = "Temp: " + data.list[22].main.temp + " F"
            document.querySelector(".five-day-wx div:nth-child(3) p:nth-child(4)").innerHTML = "Wind: " + data.list[22].wind.speed + " mph"
            document.querySelector(".five-day-wx div:nth-child(3) p:nth-child(5)").innerHTML = "Humidity: " + data.list[22].main.humidity  + "%"
            // DAY 4
            document.querySelector(".five-day-wx div:nth-child(4) h2").innerHTML = data.list[30].dt_txt.slice(5,10)
            document.querySelector(".five-day-wx div:nth-child(4) img").src = "assets/icons/" + data.list[30].weather[0].icon + ".png"
            document.querySelector(".five-day-wx div:nth-child(4) p:nth-child(3)").innerHTML = "Temp: " + data.list[30].main.temp + " F"
            document.querySelector(".five-day-wx div:nth-child(4) p:nth-child(4)").innerHTML = "Wind: " + data.list[30].wind.speed + " mph"
            document.querySelector(".five-day-wx div:nth-child(4) p:nth-child(5)").innerHTML = "Humidity: " + data.list[30].main.humidity  + "%"
            // DAY 5
            document.querySelector(".five-day-wx div:nth-child(5) h2").innerHTML = data.list[38].dt_txt.slice(5,10)
            document.querySelector(".five-day-wx div:nth-child(5) img").src = "assets/icons/" + data.list[38].weather[0].icon + ".png"
            document.querySelector(".five-day-wx div:nth-child(5) p:nth-child(3)").innerHTML = "Temp: " + data.list[38].main.temp + " F"
            document.querySelector(".five-day-wx div:nth-child(5) p:nth-child(4)").innerHTML = "Wind: " + data.list[38].wind.speed + " mph"
            document.querySelector(".five-day-wx div:nth-child(5) p:nth-child(5)").innerHTML = "Humidity: " + data.list[38].main.humidity  + "%"
        })
    }
}

// if recent searches exist, grab them on page load
getRecentSearches()

// listen for click on get wx
document.querySelector("button").addEventListener("click", fetchWX)

// listen for clicks on parent element of recent search buttons, then fetch
document.querySelector(".recent-searches").addEventListener("click", handleSearch)
