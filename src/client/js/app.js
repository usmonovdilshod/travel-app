import { validation } from './validate';
import { createTripHtml } from './createTrip';
import { getAPI } from './requests';

const scrollToSection = sectionId => document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });


let tripHolder = [];


const createNewTripBlock = (data) => {

    //get the DOM
    const newTripBlock = document.getElementById('new-trip-box');
    newTripBlock.innerHTML = '';

    //display the newTripBlock in the browser
    newTripBlock.appendChild(createTripHtml(data));

}



document.addEventListener('DOMContentLoaded', () => {

    //get the DOM
    const searchBtn = document.getElementById('search');


    // Event Listener
    searchBtn.addEventListener('click', () => {

        const userDataForm = validation()
        //check the form 
        if (userDataForm) {

            const tripSection = document.getElementById('new-trip');

            tripSection.classList.remove('active');
            tripSection.classList.add('loading');
            scrollToSection('new-trip');

            // generate the data from API
            getAPI(userDataForm)
                .then(destination => {

                    //add a new destination 
                    tripHolder.push(destination);

                    createNewTripBlock(tripHolder);
                    tripSection.classList.remove('loading');
                    tripSection.classList.add('active');

                });

        }

    });

});
