import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';
// import 'https://unpkg.com/dayjs@1.11.13/plugin/updateLocale.js';

// dayjs.locale('ru', { monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноября', 'Дек'], });



const date = dayjs().format('D.MM.YYYY');
// const date = dayjs().format('D');
const formattedMonth = dayjs().format('MMM');
const year = dayjs().format('YYYY');
const time = dayjs().format('HH:mm');

const dateTimeEl = document.querySelector('.date-time');
let updTimeId;

// const fullDate = `${date}${formattedMonth} ${year}`;

const date1 = dayjs().format('D.MM.YY');
console.log(date);

export function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const time = `${hours}:${minutes}`;


  clearInterval(updTimeId);
  updTimeId = setInterval(updateTime, 15500);

  dateTimeEl.innerHTML = `
  ${date} ${time}
  `;

  console.log('time')
}