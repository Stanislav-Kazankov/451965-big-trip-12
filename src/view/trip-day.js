export const createTripDayTemplate = (day) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day.number}</span>
        <time class="day__date" datetime="2019-03-18">${day.date.toString().slice(4, 10)}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`
  );
};
