const dateButton = document.querySelector('.dateButton')
const dateInput = document.querySelector('.userDate')
let today = ''

getTodaysTime()
dateButton.addEventListener('click', startCountDown)

function getTodaysTime() {
  const date = new Date()

  const actualFullYear = date.getFullYear()
  const actualMonth = ((date.getMonth() + 1) < 10 ) ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1
  const actualDay = ( date.getDate() < 10 ) ? `0${date.getDate()}` : date.getDate()

  dateInput.value = `${actualFullYear}-${actualMonth}-${actualDay}`
  today = `${actualFullYear}-${actualMonth}-${actualDay}`

}

function startCountDown() {
  const splitDateInput = dateInput.value.split('-')
  const splitToday = today.split('-')

  if ( splitDateInput[0] >= splitToday[0] ) {
    return console.log('valid')

  } else return console.error('invalid')

}