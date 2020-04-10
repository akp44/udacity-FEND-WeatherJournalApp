//  configuring OpenWeatherApi
const url = 'https://api.openweathermap.org/data/2.5/weather'
const key = 'f6249dfe6380271a1f9d4eca79dfcfd0'

const button = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');

// Elements for updating the value dynamically 
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

let d = new Date();
d.setMonth(4);
let newDate = d.getDate() + '.' + d.getMonth() + '.' + d.getFullYear();


const fetchWeatherData = async (baseURL, zip, apiKey) => {
    try {
      const request = await fetch(
        `${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`,
      )
      const result = await request.json();
      const {
        main: {temp},
      } = result
      return temp
    } catch (error) {
        throw 'error';
    }
}

const savingData = async (path, data) => {
    try {
      await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      throw 'error';
    }
}


button.addEventListener('click', () => {
    fetchWeatherData(url, zip.value, key)
      .then(temp => {
        return {date: newDate, temp, content: feelings.value}
      })
      .then(data => {
        savingData('/api/projectdata', data)
        return data
      })
      .then(({temp, date, content}) => updatingUI(temp, date, content))
      .catch(err => {
        console.error(err);
    })
})

// Update UI
const updatingUI = async (temperature, newDate, feelings) => {
    date.innerText = `The date is: ${newDate}`
    temp.innerText = `The temperature right now: ${temperature} deg`
    content.innerText = `And your thoughts are: ${feelings}`
  }