import axios from 'axios';
import datepicker from 'js-datepicker';
import moment from 'moment';


export default class Widget {
  constructor() {
    this.date = new Date();
    this.eventMarks = [];
    this.events = [];
    this.containerEvens = document.querySelector('.event-container-input');
  }

  init() {
    this.getEventMarks()
      .then(this.getEventData)
      .then(this.initCalendar)
      .then(this.appendDescription);
      // .then(this.filterDate);
  }

  // getEventList = () => Promise.all(this.eventMarks.map(this.getEventData))

  getEventMarks = () => axios.get('http://mybusiness.f.atwinta.ru/api/event/marks')
    .then((response) => response.data)
    .then(({ data }) => {
      this.eventMarks = data;
    });


  getEventData = () => axios.get(`http://mybusiness.f.atwinta.ru/api/events/`)
    .then((response) => response.data)
    .then(({ data }) => {
      this.events= data;
    });

  appendDescription = () => {
    console.log(this.events);
    const format = 'DD-MMMM-YYYY';
    moment.locale('ru', {
      months: 'января_февраля_марта_апреля_мая_июня_июля_августа_сетнября_октября_ноября_декабря'.split('_'),
    });

        // this.events.map((item) => {
          Object.values(this.events).forEach((el) => {
              console.log(el);
              const ElementTitle = document.createElement('a');
              const ElementImg = document.createElement('img');
              const ElementDate = document.createElement('p');
              const blockEvents = document.createElement('div');

              // document.getElementById('del').innerText = el.title;
              ElementTitle.innerText = el.title;
              ElementTitle.setAttribute('href', `${el.link}`);
              ElementImg.src = el.image;
              ElementDate.innerText = moment(el.date).format(format);
              blockEvents.appendChild(ElementTitle).classList.add('link', 'event-title');
              blockEvents.appendChild(ElementDate).classList.add('event-date');
              blockEvents.appendChild(ElementImg).classList.add('event-image');
              this.containerEvens.appendChild(blockEvents).classList.add('event-container-input_event');
            });

          // });
  };

  filterDate = (date) => {
    moment.locale('ru', {
      months: 'января_февраля_марта_апреля_мая_июня_июля_августа_сетнября_октября_ноября_декабря'.split('_'),
    });
    const format = 'YYYY-MM-DD';
    const newFormat = 'DD-MMMM-YYYY';
    const selected = moment(date).format(format);
    const containerInput = document.getElementById('del');
    while (containerInput.firstChild) {
      containerInput.removeChild(containerInput.getElementsByClassName('event-container-input_event')[0]);
    }

    this.events = null;


      axios.get(`http://mybusiness.f.atwinta.ru/api/events/${selected}`)
        .then((response) => response.data)
        .then(({ data }) => {
          this.events = data;
        })
        .then(() => {
          this.events.forEach((key) => {
            this.events;
            const ElementTitle = document.createElement('a');
            const ElementImg = document.createElement('img');
            const ElementDate = document.createElement('p');
            const blockEvents = document.createElement('div');

            ElementDate.innerText = moment(key.date).locale('ru').format(newFormat);
            ElementTitle.innerText = key.title;
            ElementImg.src = key.image;
            ElementTitle.setAttribute('href', `${key.link}`);
            blockEvents.appendChild(ElementTitle).classList.add('link', 'event-title');
            blockEvents.appendChild(ElementDate).classList.add('event-date');
            blockEvents.appendChild(ElementImg).classList.add('event-image');
            this.containerEvens.appendChild(blockEvents).classList.add('event-container-input_event');
          });
        });

  };

  initCalendar = () => {
    const picker = datepicker('.calendar-input', {
      customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      alwaysShow: true,
      customDays: ['Вс', 'Пд', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      position: '',
      startDay: 1,
      events: this.eventMarks.map((date) => new Date(date)),
      onSelect: (instance, date) => {
        this.filterDate(date);
      },
    });
    picker.calendarContainer.style.setProperty('font-size', '1.5rem');
    // const btn = document.getElementById('btn');
    // btn.addEventListener('click', e => {
    //   e.stopPropagation()
    //   const isHidden = picker.calendarContainer.classList.contains('qs-hidden')
    //   picker[isHidden ? 'show' : 'hide']()
    // })
    picker.show();
  }
}
