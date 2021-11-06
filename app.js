const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure property
    const {cityDets, weather} = data;
    console.log(cityDets,weather);
    console.log(weather.WeatherIcon);

    //update detail template
    details.innerHTML = `
    <h5 class="card-title my-3">${cityDets.EnglishName}</h5>
              <h5 class="card-title my-3">${weather.WeatherText}</h5>
              <div class="display-4 my-4">
                  <span>${weather.Temperature.Metric.Value}</span>
                  <span>&deg;C</span>
              </div>
    `;

    //update night and day images & icon
    let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);



    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }
    else{
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc);


    //remove d-none class
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets,weather}
}

cityForm.addEventListener('submit', e =>{
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})