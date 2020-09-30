import {render, refreshContent, getIndexOfObjectByName, capitalize} from "./util.js";
import flatpickr from "flatpickr";
import {types, destinations} from "./mock/point.js";
import {createTripInfoTemplate} from "./view/trip-info.js";
import {createCostTemplate} from "./view/cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFiltersTemplate} from "./view/filters.js";
import {createTripSortTemplate} from "./view/trip-sort.js";
import {
  createEditFormTemplate,
  createOfferSwitchTemplate,
  createOffersSectionTemplate,
  createDestinationSectionTemplate,
  createPicturesTemplate
} from "./view/edit-form.js";
import {createTripDaysTemplate} from "./view/trip-days.js";
import {createTripDayTemplate} from "./view/trip-day.js";
import {createTripEventTemplate} from "./view/trip-event.js";
import {generateId, generatePoint} from "./mock/point.js";
import {generateDay} from "./mock/day.js";

const TRIP_DAY_COUNT = 3;
const TRIP_EVENT_COUNT = 18;
const TRIP_EVENT_COUNT_IN_DAY = TRIP_EVENT_COUNT / TRIP_DAY_COUNT;

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);

render(tripInfoElement, createCostTemplate());

render(tripControlsElement, createSiteMenuTemplate());
render(tripControlsElement, createFiltersTemplate());
render(tripEventsElement, createTripSortTemplate());

render(tripEventsElement, createEditFormTemplate());

render(tripEventsElement, createTripDaysTemplate());

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < TRIP_DAY_COUNT; i++) {
  render(tripDaysElement, createTripDayTemplate(generateDay()));
}

const initEditForm = (editFormElement) => {
  const startPickr = flatpickr(`#event-start-time-1`, {
    'enableTime': true,
    'dateFormat': `d/m/y H:i`,
    'time_24hr': true,
    'onChange': (selectedDates, dateStr) => {
      endPickr.set(`minDate`, dateStr);
    }
  });

  const endPickr = flatpickr(`#event-end-time-1`, {
    'enableTime': true,
    'dateFormat': `d/m/y H:i`,
    'time_24hr': true,
    'onChange': (selectedDates, dateStr) => {
      startPickr.set(`maxDate`, dateStr);
    }
  });

  const eventTypeListElement = editFormElement.querySelector(`.event__type-list`);
  const eventDetailsElement = editFormElement.querySelector(`.event__details`);
  const eventTypeOutputElement = editFormElement.querySelector(`.event__type-output`);

  eventTypeListElement.addEventListener(`change`, (evt) => {
    const {target} = evt;
    if (target.classList[0] === `event__type-input`) {
      const eventTypeLabelElement = editFormElement.querySelector(`label[for=${target.id}]`);
      const eventTypeName = eventTypeLabelElement.textContent;
      const eventTypeIndex = getIndexOfObjectByName(types, eventTypeName);
      const {preposition, offers} = types[eventTypeIndex];
      eventTypeOutputElement.textContent = `${eventTypeName} ${preposition}`;

      const offersSectionElement = eventDetailsElement.querySelector(`.event__section--offers`);
      if (offers.length) {
        if (!offersSectionElement) {
          render(
              eventDetailsElement,
              createOffersSectionTemplate(offers, []),
              `afterbegin`
          );
        } else {
          const offersContainerElement = offersSectionElement.querySelector(`.event__available-offers`);
          refreshContent(offersContainerElement, createOfferSwitchTemplate(offers, []));
        }
      } else {
        eventDetailsElement.removeChild(offersSectionElement);
      }
    }
  }, false);

  const destinationFieldElement = editFormElement.querySelector(`.event__input--destination`);

  destinationFieldElement.addEventListener(`change`, () => {
    const destinationIndex = getIndexOfObjectByName(destinations, destinationFieldElement.value);
    const destinationSectionElement = eventDetailsElement.querySelector(`.event__section--destination`);
    if (destinationIndex > -1) {
      const destination = destinations[destinationIndex];
      const {description, pictures} = destination;
      if (destination.description !== `` || destination.pictures.length) {
        if (!destinationSectionElement) {
          render(
              eventDetailsElement,
              createDestinationSectionTemplate(destinations[destinationIndex])
          );
        } else {
          const destinationDescriptionElement = destinationSectionElement.querySelector(`.event__destination-description`);
          destinationDescriptionElement.textContent = description;
          const photosTapeElement = destinationSectionElement.querySelector(`.event__photos-tape`);
          refreshContent(photosTapeElement, createPicturesTemplate(pictures));
        }
        destinationFieldElement.dataset.prevValue = destinationFieldElement.value;
      } else {
        eventDetailsElement.removeChild(destinationSectionElement);
      }
    } else {
      destinationFieldElement.value = destinationFieldElement.dataset.prevValue;
    }
  });

  const resetButtonElement = editFormElement.querySelector(`.event__reset-btn`);

  resetButtonElement.addEventListener(`click`, () => {
    tripEventsElement.removeChild(editFormElement);
  });

  const saveButtonElement = editFormElement.querySelector(`.event__save-btn`);

  saveButtonElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const priceFieldElement = editFormElement.querySelector(`.event__input--price`);
    const eventTypeInputElement = editFormElement.querySelector(`.event__type-input:checked`);
    points.push({
      basePrice: priceFieldElement.value,
      dateFrom: startPickr.selectedDates[0],
      dateTo: endPickr.selectedDates[0],
      destinationIndex: getIndexOfObjectByName(destinations, destinationFieldElement.value),
      id: generateId(),
      isFavorite: false,
      offerIndexes: Array.from(
          editFormElement.querySelectorAll(`.event__type-input`)
      ).map((offer, index, offers) => {
        return offers.indexOf(offer);
      }),
      typeIndex: getIndexOfObjectByName(types, capitalize(eventTypeInputElement.value))
    });
    tripEventsElement.removeChild(editFormElement);
    render(
        tripEventsListElements[tripEventsListElements.length - 1],
        createTripEventTemplate(points[points.length - 1])
    );
  });
};

const eventAddButtonElement = tripMainElement.querySelector(`.trip-main__event-add-btn`);

eventAddButtonElement.addEventListener(`click`, () => {
  const editFormElement = tripEventsElement.querySelector(`.event--edit`);
  if (!editFormElement) {
    render(tripEventsElement, createEditFormTemplate(), `afterbegin`);
    editFormElement = tripEventsElement.querySelector(`.event--edit`);
    initEditForm(editFormElement);
  }
});

const editFormElement = tripEventsElement.querySelector(`.event--edit`);

initEditForm(editFormElement);

let points = [];
const tripEventsListElements = tripDaysElement.querySelectorAll(`.trip-events__list`);

for (let i = 0; i < TRIP_DAY_COUNT; i++) {
  for (let j = 0; j < TRIP_EVENT_COUNT_IN_DAY; j++) {
    points.push(generatePoint());
    render(tripEventsListElements[i], createTripEventTemplate(points[points.length - 1]));
  }
}
