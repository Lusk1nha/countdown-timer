const dateInput = document.querySelector('.userDate')
const dateButton = document.querySelector('.dateButton')
const actualDateButton = document.querySelector('.actualDateButton')

let today = ''

dateButton.addEventListener('click', () => {
  if ( !dateInput.value ) return console.error('without value')
  settingCountDown()

})

actualDateButton.addEventListener('click', getDateNow)

function getDateNow() {
  // * Updating the date of the input

  const date = dateNow()
  const dateFormat = formatTransformation(date.year, date.month, date.day)

  return dateInput.value = `${dateFormat.validYear}-${dateFormat.validMonth}-${dateFormat.validDay}`
}

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
  console.log(inputValue)


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