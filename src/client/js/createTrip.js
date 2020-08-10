const daysDifference = (date1, date2) => Math.ceil(Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24));


export const createTripHtml = (trips) => {

    let htmlText = '';

    var newTripLocationBlock = document.createElement('div');

    for (let item of trips) {

        htmlText += `<div class="trip-new-destination">
                        <div class="trip-image" ${ item.image != false ? 'style="background-image: url(' + item.image + ')"' : ``}></div>
                        <div class="trip-info">
                            <h2 class="trip-name">
                                <span class="trip-city">${item.destination.city}</span>,
                                <span class="trip-country">${item.destination.country}</span>
                            </h2>
                            <div class="trip-dates">                                                                                                                                                                        
                                       <div class="trip-duration">The trip will continue ${daysDifference(item.dateStart, item.dateEnd)} days </div>
                                       <div class="trip-start-time">The trip will start in:${daysDifference(new Date(), item.dateStart)} days  </div>                            
                            </div>
                            <div class="weather">
                                <div class="weather-title">Today's Weather</div>
                                <div class="weather-content">
                                    <div class="weather-icon">
                                        <img src="https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png "/>
                                    </div>
                                    <div class="weather-info">
                                        <div class="weather-temp"><span>${item.weather.temperature}</span> &deg;C</div>
                                        <div class="weather-summary">${item.weather.summary}</div>
                                    </div>
                                </div>
                            </div>
                        </div>                      
                    </div>`;
    }

    newTripLocationBlock.innerHTML = htmlText;
    return newTripLocationBlock;
}