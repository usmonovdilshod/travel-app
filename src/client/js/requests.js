
//genames
const geonamesAPI = async (city, country = '') => {

    const geoUrl = `http://api.geonames.org/searchJSON?q=${city}&country=${country}&maxRows=3&username=usmonov`;
    const res = await fetch(geoUrl);
    try {
        const data = await res.json();
        return data;

    } catch (err) {
        console.log(err);
    }
}

//weatherbit
const weatherbitAPI = async (lat, lon) => {

    const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?&lat=${lat}&lon=${lon}&key=c820836c2aac47d0808b4384a8748ab0`;
    const res = await fetch(currentWeatherUrl);
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

//pixabay
const pixabayAPI = async (keyword) => {
    
    const pixabayUrl = `https://pixabay.com/api/?key=17148390-8eb9f3e1f539c43f607907f92&q=${keyword}&image_type=photo&pretty=true`;
    const res = await fetch(pixabayUrl);
    try {
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }

}


export const getAPI = async (data) => {
    let trip = {}

    trip.dateStart = data.dateStart;
    trip.dateEnd = data.dateEnd;
    trip.toDoList = [];
    trip.error = '';

    // get Destination Coordinates
    await geonamesAPI(data.destination)
    .then(resDestination => {
        
        if(resDestination.error) {
            trip.error = resDestination.error;
        }
        else {

            // add the Destination info 
            trip.destination = {
                city: resDestination.geonames[0].toponymName,
                country: resDestination.geonames[0].countryName,
                lat: resDestination.geonames[0].lat,
                lng: resDestination.geonames[0].lng
            };
        }
    })
    
    if(trip.error == '') {
      
        await weatherbitAPI(trip.destination.lat, trip.destination.lng)
        .then(resWeather => {

            trip.weather = {
                temperature: resWeather.data[0].temp,
                summary: resWeather.data[0].weather.description,
                icon: resWeather.data[0].weather.icon
            }

        })


        //get the Image 
        await pixabayAPI(trip.destination.city)
        .then(cityImg => {
            
            //Image found by  City Name
            if(cityImg.totalHits > 0) {
                trip.image = cityImg.hits[0].largeImageURL;
            }
            else {
               
                //Send  API request to get the Image by Destination Country Name
                getImageAPI(trip.destination.country)
                .then(countryImg =>{
                    
                    //image found
                    if(countryImg.totalHits > 0) {
                        trip.image = countryImg.hits[0].largeImageURL
                    }
                    else {
                        trip.image = false;
                    }
                })
            }
            
        })


    }

    return trip;
    
}
