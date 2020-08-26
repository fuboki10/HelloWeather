const API_KEY = '3056be121e8647e4248094ac0a7cf18d';

$(() => {
    const temperatureDescription = $('.temperature-description');
    const temperatureDegree = $('.temperature-degree');
    const location = $('.location-timezone');
    
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
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const country = data.sys.country;
                const city = data.name;

                temperatureDegree[0].innerHTML = temperature;
                temperatureDescription[0].innerHTML = description;
                location[0].innerHTML = `${country}/${city}`;
            });
      }); 
    } else{
        console.log("Geolocation not available!");
    }
});