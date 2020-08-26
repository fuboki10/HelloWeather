const API_KEY = '3056be121e8647e4248094ac0a7cf18d';

$(() => {
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
                console.log(data);
            });
      }); 
    } else{
        console.log("Geolocation not available!");
    }
});