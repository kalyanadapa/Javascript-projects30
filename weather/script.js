const apiKey="202bcc8c342d0bd48707ee7ee8cad27a";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIkon=document.querySelector(".weather-icon")


searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

async function checkWeather(city){
    const response=await fetch(apiUrl + city + `&appid=${apiKey}`);
   
   if(response.status==404){
    document.querySelector(".error").style.display="block";
    document.querySelector(".weather").style.display="none";
   }else{
    var data=await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind").innerHTML=data.wind.speed + " km/hr";
   if(data.weather[0].main=="Clouds"){
    weatherIkon.src="./images/clouds.png";
   }else if(data.weather[0].main=="Clear"){
    weatherIkon.src="./images/clear.png";s
   }else if(data.weather[0].main=="Rain"){
    weatherIkon.src="./images/rain.png";
   }else if(data.weather[0].main=="Drizzle"){
    weatherIkon.src="./images/drizzle.png";
   }else if(data.weather[0].main=="Mist"){
    weatherIkon.src="./images/mist.png";
   }

   document.querySelector(".weather").style.display="block";
   document.querySelector(".error").style.display="none";
 

   }
   
    
}
