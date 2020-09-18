import {createTripInfoTemplate} from "./view/trip-info.js";
import {createCostTemplate} from "./view/cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {createEditFormTemplate} from "./view/edit-form.js";
import {createTripDaysTemplate} from "./view/trip-days.js";
import {createTripDayTemplate} from "./view/trip-day.js";
import {createTripEventTemplate} from "./view/trip-event.js";

const TRIP_DAY_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteHeaderElement = siteMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(siteMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = siteMainElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createCostTemplate());

render(siteHeaderElement, createSiteMenuTemplate());
render(siteHeaderElement, createFiltersTemplate());
render(tripEventsElement, createTripSortTemplate());
render(tripEventsElement, createEditFormTemplate());
render(tripEventsElement, createTripDaysTemplate());

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < TRIP_DAY_COUNT; i++) {
  render(tripDaysElement, createTripDayTemplate());
}

const tripEventsListElements = tripDaysElement.querySelectorAll(`.trip-events__list`);

for (let i = 0; i < TRIP_DAY_COUNT; i++) {
  render(tripEventsListElements[i], createTripEventTemplate());
}

