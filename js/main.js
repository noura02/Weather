


var currentArray = [];
var locationArray = [];
var forecastArray = [];
var searchInput = document.getElementById('searchInput');
var subInput = document.getElementById('subInput');
var currentName = 0;
getWeather(`london`);

async function getWeather(city) {
    var weatherApi = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f26ac50b8bf1479eae6142014210205&q=${city}&days=7`);
    var weatherResponce = await weatherApi.json(); //object
    currentArray = Array( weatherResponce.current); //array
    locationArray = Array(weatherResponce.location);//array
    forecastArray = weatherResponce.forecast.forecastday;
    displayWeather();
    getDate();
}


function displayWeather() {
    var currentContainer = ``;
    var tomorrowContainer = ``;
    var afterContainer = ``;

    for (var i = 0; i < currentArray.length; i++) {


        currentContainer += `
                              
                              <p class=' city'>${locationArray[i].name}</p>
                      <div class='d-flex justify-content-between'> <p class='temp'>${currentArray[i].temp_c}&#176 C</p><img class='today-icon mt-3' src='http:${currentArray[i].condition.icon}'></div>
                              <p class='cond'>${currentArray[i].condition.text}</p>
                              

                             <img src="imgs/icon-umberella.png" class="img-fluid" /><span class='grey ml-2 mr-3'>20%</span>
                             <img src="imgs/icon-wind.png" class="img-fluid" /><span class='grey ml-2 mr-3' >18km/hr</span>
                             <img src="imgs/icon-compass.png" class="img-fluid" /><span class='grey ml-2 mr-3' >East</span>
                             </div>
`;
        
        tomorrowContainer += ` 
                               <img src='http:${forecastArray[1].day.condition.icon}'>
                              <p class='bold text-white'>${forecastArray[1].day.maxtemp_c}&#176 C</p>
                              <p class=' city'>${forecastArray[1].day.mintemp_c}&#176 C</p>
                              <p class='cond'>${forecastArray[1].day.condition.text}</p>
                             
                              
                               `;

        afterContainer += ` 
                               <img src='http:${forecastArray[2].day.condition.icon}'>
                              <p class='bold text-white'>${forecastArray[2].day.maxtemp_c}&#176 C</p>
                              <p class=' city'>${forecastArray[2].day.mintemp_c}&#176 C</p>
                              <p class='cond'>${forecastArray[2].day.condition.text}</p>
                             
                              
                               `

    }

    document.querySelector('.sec-1 #today').innerHTML = currentContainer;
    document.querySelector('.sec-1 #tomorrow').innerHTML = tomorrowContainer;
    document.querySelector('.sec-1 #afterTomorrow').innerHTML = afterContainer;
};




searchInput.addEventListener('keyup', function (e) {
    var val = searchInput.value;
    currentName = val;
    for (var i = 0; i < locationArray.length; i++) {


        if (currentName.toLowerCase().includes(val.toLowerCase())) {
            getWeather(currentName);

        }
        else {
            getWeather('london');

        }
    }
    searchInput.style.color = '#fff';
});




function getDate() {
    var date = new Date();
    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var months = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sep', 'oct', 'nov', 'dec'];

    document.getElementById('date').innerHTML =
        `<div class='d-flex justify-content-between'>
        <p>${days[date.getDay()]}</p>
        <p class='ml-auto'>${date.getDate()}</p><span class='ml-1'>${months[date.getMonth()]}</span>
        </div>`;
    document.getElementById('tomorrowDate').innerHTML = `<p>${days[date.getDay() + 1]}<p/>`;
    document.getElementById('afterDate').innerHTML = `<p>${days[date.getDay() + 2]}<p/>`;
};
  

searchInput.addEventListener('click', function (e) {
   
    searchInput.style.color = '#fff';
});
subInput.addEventListener('click', function (e) {

    subInput.style.color = '#fff';
});
