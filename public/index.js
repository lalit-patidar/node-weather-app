console.log('hello aap sabhi ko')

setInterval(() => {
    clock()
}, 1000);
function clock() {
    let date = new Date();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const currentSeconds = date.getSeconds();
    let watch = currentHours + ':' + currentMinutes + ':' + currentSeconds

    document.getElementById("watch").innerHTML = watch
}

// fetch api is used to collect data from url but it work for only clint side js

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//      response.json().then((data) => {
//          console.log(data)
//          document.getElementById("lilly").innerHTML = `weather in <b>${data.address}</b> now <b>${data.weather}</b>`
//      })
// })

// to collect the data of form form user

const formData = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

formData.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    //  fetch api is used to collect data from url but it work for only clint side js
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            
            } else {
                // document.getElementById("lilly").innerHTML = `weather in <b>${data.temperature}</b> now <b>${data.weather}</b>`
                messageOne.textContent = data.location;
                messageTwo.textContent = `temperature in ${data.address} is ${data.temperature}`;
            }
            
        })
    
    })

    // document.getElementById("show").innerHTML = location;
})


