const dateInput = document.querySelector('.userDate')
const dateButton = document.querySelector('.dateButton')
const currentDateButton = document.querySelector('.currentDateButton')

let today = ''
let start

dateButton.addEventListener('click', () => {
  if ( !dateInput.value ) return console.error('without value')
  settingCountDown()

})

currentDateButton.addEventListener('click', getDateNow)


function dateNow() {
  // * Getting the user PC date
  const date = new Date()

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return { year, month, day }
}


function formatTransformation(year, month, day) {
  // * Transform the numbers add '0' in front of the numbers below 10

  const validYear = year
  const validMonth = ( month < 10 ) ? `0${month}` : month
  const validDay = ( day < 10 ) ? `0${day}` : day

  return { validYear, validMonth, validDay }
}


function getDateNow() {
  // * Updating the date of the input

  const date = dateNow()
  const dateFormat = formatTransformation(date.year, date.month, date.day)

  return dateInput.value = `${dateFormat.validYear}-${dateFormat.validMonth}-${dateFormat.validDay}`
}


function getInputDate(rawDate) {
  // * Getting the user value in the input

  const dateArray = rawDate.split('-')
  
  const year = parseInt(dateArray[0])
  const month = parseInt(dateArray[1]) 
  const day = parseInt(dateArray[2])

  return { year, month, day }
}


function settingCountDown() {
  const inputValue = getInputDate(dateInput.value)
  const userDate = dateNow()
  
  if((!validateCountDown(inputValue, userDate))) return
  
  startingPreview(inputValue, userDate)


  function validateCountDown(inputDate, dateNow) {
    // ? Validate if the user date is after the PC date

    if ( dateNow.year > inputDate.year ) {
      console.error('invalid year')
      return false
    }

    if ( dateNow.month > inputDate.month && dateNow.year >= inputDate.year ) {
      console.error('invalid month')
      return false

    }

    if ( dateNow.day > inputDate.day && dateNow.month >= inputDate.month && dateNow.year >= inputDate.year ) {
      console.error('invalid day')
      return false

    }

    return true
  }
}


function startingPreview(inputDate, dateNow) {
  const daysContainer = document.querySelector('.time span.days')
  const hoursContainer = document.querySelector('.time span.hours')
  const minutesContainer = document.querySelector('.time span.minutes')
  const secondsContainer = document.querySelector('.time span.seconds')

  clearInterval(start)

  let days = 0

  const yearsToDays = inputDate.year - dateNow.year
  days += 365 * yearsToDays

  const monthsToDays = inputDate.month - dateNow.month
  if ( monthsToDays >= 0 ) {
    days += (31 * monthsToDays)

  } else {
    days += (31 * monthsToDays) - (monthsToDays - 2)
    
  }

  const daysToDays = inputDate.day - dateNow.day
  days += daysToDays

  if ( days > 0 ) {
    if ( days > 1 ) daysContainer.parentElement.hidden = false

    daysContainer.innerHTML = days - 1
    hoursContainer.innerHTML = 24
    minutesContainer.innerHTML = 59
    secondsContainer.innerHTML = 59

    return startingTimer()

  } else {
    daysContainer.parentElement.hidden = true

    daysContainer.innerHTML = days
    hoursContainer.innerHTML = '00'
    minutesContainer.innerHTML = '00'
    secondsContainer.innerHTML = '00'

    return
  }
}

function startingTimer() {
  start = setInterval(decreaseTime, 1000)

}

function decreaseTime() {
  const secondsContainer = document.querySelector('.time span.seconds')
  const minutesContainer = document.querySelector('.time span.minutes')
  const hoursContainer = document.querySelector('.time span.hours')
  const daysContainer = document.querySelector('.time span.days')

  if ( hoursContainer.innerHTML == '00' && minutesContainer.innerHTML == '00' && secondsContainer.innerHTML == '00' ) {

    return clearInterval(start)

  }

  let seconds = (secondsContainer.innerHTML - 1) < 10 ? '0' + (secondsContainer.innerHTML - 1) : (secondsContainer.innerHTML - 1)
  
  secondsContainer.innerHTML = seconds
  
  if (seconds == '00' && minutesContainer.innerHTML != '00') {
    let minutes = (minutesContainer.innerHTML - 1) < 10 ? '0' + (minutesContainer.innerHTML - 1) : (minutesContainer.innerHTML - 1)

    minutesContainer.innerHTML = minutes
    secondsContainer.innerHTML = 59

    if ( minutes == '00' && hoursContainer.innerHTML != '00' ) {
      let hours = (hoursContainer.innerHTML - 1) < 10 ? '0' + (hoursContainer.innerHTML - 1) : (hoursContainer.innerHTML - 1 )

      hoursContainer.innerHTML = hours
      minutesContainer.innerHTML = 59

      if ( hours == '00' ) {
        if ( daysContainer.innerHTML != 0 ) {
          daysContainer.innerHTML = daysContainer.innerHTML - 1
          hoursContainer.innerHTML = 24

        }
      }
    }
  }
}
