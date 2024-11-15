import { saveToStorage, getFromStorage, removeFromStorage } from './utils/saveToStorage.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const removeBtn = document.querySelector('.remove-btn');
const dateTimeEl = document.querySelector('.date-time');
const carNameEl = document.querySelector('.car-info-container');
const logsContEl = document.querySelector('.logs-container');
//FOR SERVICE ONLY
const clearLogBtn = document.querySelector('.js-clear-log');


const clickedCarId = getFromStorage('clickedCarId');
const getCars = getFromStorage('carsData');
const currentCar = getCars[clickedCarId];

const date = dayjs().format('D.MM.YY');
const time = dayjs().format('HH:mm');
const updTimeId = setInterval(updateTime, 15500);

updateTime();
function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;

  // const maintHistory = [{
  //   type: 'oil',
  //   date: '14.10.24',
  //   mileage: '267463',
  //   nextMaintDate: '14.10.24',
  //   nextMaintMileage: '277463'
  // }, {
  //   type: 'belt',
  //   date: '14.10.24',
  //   mileage: '267463',
  //   nextMaintMileage: '277463'
  // }
  // ]


  clearInterval(updTimeId);


  dateTimeEl.innerHTML = `
  ${date} ${time}
  `;
}

removeBtn.addEventListener('click', () => {
  const newCarsList = getCars.slice();

  newCarsList.splice(clickedCarId, 1);

  console.log(newCarsList);

  saveToStorage('carsData', newCarsList);
})

console.log(clickedCarId);
console.log(currentCar);

carNameEl.innerHTML = `
  <div class="car-icon">
    <img width="106px" height="53px" src="icons/car-icon.svg" alt="car">
  </div>

  <div class="car-name">${currentCar.carName}<span class="car-year"> ${currentCar.carYear}</span></div>
  <div class="car-vin"><span class="car-vin--title">VIN: </span>${currentCar.carVin}</div>
`;

renderLogsList();
function renderLogsList() {

  if (currentCar.carMaintData.length === 0) {
    logsContEl.innerHTML += `
      <div class="no-cars js-no-cars">Нет добавленных автомобилей</div>
      `;
  } else if (getCars.length > 0) {
    currentCar.carMaintData.forEach(log => {
      const chosenJob = log.chosenJob;
      const jobDate = log.jobDate;
      const jobMileage = log.jobMileage;

      console.log(chosenJob);
      console.log(jobDate);
      console.log(jobMileage);

      if (currentCar.carMaintData.length > 0) {
        logsContEl.innerHTML += `
      <div class="log">
        <div class="log-name log-name--yellow">
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-moisture"
            viewBox="0 0 16 16">
            <path
          d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
      </svg>
      ${chosenJob}
      </div>
      <div class="log-date">Дата: ${jobDate}</div>
      <div class="log-mileage">Пробег: ${jobMileage}км</div>
      <div class="log-next">Замените: 14.10.2025/ 277463км</div>
      </div>
      `}
    })
  }
}

clearLogBtn.addEventListener('click', ()=>{
  currentCar.carMaintData.splice(0, currentCar.carMaintData.length);

  saveToStorage('carsData', getCars);
})