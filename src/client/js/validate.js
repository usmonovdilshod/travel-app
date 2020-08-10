const futureDate = date => Math.ceil((new Date(date) - Date.now()) / (1000 * 60 * 60 * 24)) >= 0;
const dateAfterThatDate = (past, future) => Math.ceil((new Date(future) - new Date(past)) / (1000 * 60 * 60 * 24)) > 0;

export const validation = () => {

    let errors = '';
    
    
    const destination = document.getElementById('destination');
    const dateStart = document.getElementById('date-start');
    const dateEnd = document.getElementById('date-end');




    // check  Destination 
    if(destination.value.length < 3) {

        destination.classList.remove('valid');
        destination.classList.add('error');
        
        errors += alert('Type correctly city name');
        
    }
    else {
        //validated
        destination.classList.remove('error');
        destination.classList.add('valid');
    }

    // check Start Date 
    if(!futureDate(dateStart.value) || dateStart.value == '') {

        dateStart.classList.add('error');
        dateStart.classList.remove('valid');

        errors += alert('wrong departing date');
       
    } else {
        //validated
        dateStart.classList.remove('error');
        dateStart.classList.add('valid');
    }

    // check  End Date 
    if(!dateAfterThatDate(dateStart.value, dateEnd.value) || !futureDate(dateEnd.value) || dateEnd.value == ''){
        dateEnd.classList.add('error')
        dateEnd.classList.remove('valid');
        
        errors += alert('wrong returning date');
        
    } else {
        dateEnd.classList.remove('error')
        dateEnd.classList.add('valid');
    }

    if(!errors) {
        
        
        // if not errors return the validated object
        return {
                    destination: destination.value, 
                    dateStart: dateStart.value, 
                    dateEnd: dateEnd.value
                }
    } else {

        return false;
        
    }
}

