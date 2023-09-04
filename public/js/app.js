console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
    console.log(location);

    messageOne.textContent='Looking up...'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?add='+encodeURIComponent(location)).then((response) => {
        // console.log('http://localhost:3000/weather?add='+encodeURIComponent(location));
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error
            } else {
                // console.log(data.location);
                // console.log(data.forecast);
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast

            }
        })
    })
})

