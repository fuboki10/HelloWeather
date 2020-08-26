const API_KEY = '3056be121e8647e4248094ac0a7cf18d';

const kelvinToCelsius = (degree) => {
    return degree - 273.15;
};

const kelvinToFahrenheit = (degree) => {
    return degree * 1.8 - 459.67;
};

$(() => {
    const temperatureDescription = $('.temperature-description');
    const temperatureDegree = $('.temperature-degree');
    const location = $('.location-timezone');
    const weatherIcon = $('#weather-icon');
    const degreeSection = $('.degree-section');
    const unit = $('#unit');

    let temperature;
    
    if ("geolocation" in navigator){ //check Geolocation available 
      navigator.geolocation.getCurrentPosition(position => {
          //console.log(position);
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;

          const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
          //console.log(api);
          
          fetch(api)
            .then(res => {
                return res.json();
            })
            .then(data => {
                temperature = data.main.temp;
                const {description, icon} = data.weather[0];
                const country = data.sys.country;
                const city = data.name;

                temperatureDegree[0].innerHTML = Math.floor(kelvinToCelsius(temperature));
                temperatureDescription[0].innerHTML = description;
                location[0].innerHTML = `${country}/${city}`;

                weatherIcon.append(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>`);
            });

            // click listener
            degreeSection.on('click', () => {
                if (unit[0].innerHTML == 'C') { // convert to F
                    unit[0].innerHTML = 'F';
                    temperatureDegree[0].innerHTML = Math.floor(kelvinToFahrenheit(temperature));
                }
                else if (unit[0].innerHTML == 'F') { // convert to K
                    unit[0].innerHTML = 'K';
                    temperatureDegree[0].innerHTML = Math.floor(temperature);
                }
                else if (unit[0].innerHTML == 'K') { // convert to C
                    unit[0].innerHTML = 'C';
                    temperatureDegree[0].innerHTML = Math.floor(kelvinToCelsius(temperature));
                }
            });
      }); 
    } else{
        console.log("Geolocation not available!");
    }
});