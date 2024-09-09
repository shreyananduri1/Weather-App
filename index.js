const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '4f5d10e34450b8b84415b7b365a45e6d';
    const city = document.querySelector('.search-box input').value;

    if(city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        let backgroundImageUrl = 'images/clearimg.jpg';

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png'
                backgroundImageUrl = 'images/clear2.jpg'
                console.log("changed 1")
                break;
            
            case 'Rain':
                image.src = 'images/rain.png'
                console.log("changed 2")
                backgroundImageUrl = 'images/rainimg.jpg'
                break;

            case 'Drizzle':
                image.src = 'images/rain.png'
                console.log("changed 2")
                backgroundImageUrl = 'images/rainimg.jpg'
                break;
            
            case 'Snow':
                image.src = 'images/snow.png'
                console.log("changed 3")
                backgroundImageUrl = 'images/rainimg.jpg'
                break;

            case 'Clouds':
                image.src = 'images/cloud.png'
                backgroundImageUrl = 'images/cloudyimg.jpg'
                console.log("changed 4")
                break;
        
            case 'Mist':
                image.src = 'images/mist.png'
                backgroundImageUrl = 'images/hazeimg.jpg'

                break;
            
            case 'Haze':
                image.src = 'images/mist.png'
                backgroundImageUrl = 'images/hazeimg.jpg'

                break;
            
            default:
                image.src = 'images/cloud.png'
        }
    console.log('API Response:', json);

    document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;


    
    });

});