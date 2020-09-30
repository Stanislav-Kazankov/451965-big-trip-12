import {destinations, types} from "../mock/point.js";

const createAddFormButtonsTemplate = () => {
  return (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
};

const createButtonsTemplate = (editing) => {
  let caption;
  let addFormButtonsTemplate = ``;
  if (editing) {
    caption = `Cancel`;
  } else {
    caption = `Delete`;
    addFormButtonsTemplate = createAddFormButtonsTemplate();
  }

  return `<button class="event__reset-btn" type="reset">${caption}</button>${addFormButtonsTemplate}`;
};

const createTypeSwitchItemTemplate = (typeName, checked) => {
  const typeNameLowerCase = typeName.toLowerCase();

  return (
    `<div class="event__type-item">
      <input id="event-type-${typeNameLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeNameLowerCase}" ${checked}>
      <label class="event__type-label  event__type-label--${typeNameLowerCase}" for="event-type-${typeNameLowerCase}-1">${typeName}</label>
    </div>`
  );
};

const createTransferTypeSwitchTemplate = (typeIndex) => {
  let result = ``;
  let i;
  for (i = 0; i < typeIndex && i < types.length - 3; i++) {
    result += createTypeSwitchItemTemplate(types[i].name, ``);
  }
  if (i === typeIndex) {
    result += createTypeSwitchItemTemplate(types[typeIndex].name, `checked`);
    for (i = typeIndex + 1; i < types.length - 3; i++) {
      result += createTypeSwitchItemTemplate(types[i].name, ``);
    }
  }

  return result;
};

const createActivityTypeSwitchTemplate = (typeIndex) => {
  let result = ``;
  let i;
  if (typeIndex >= types.length - 3) {
    for (i = types.length - 3; i < typeIndex && i < types.length; i++) {
      result += createTypeSwitchItemTemplate(types[i].name, ``);
    }
    if (i === typeIndex) {
      result += createTypeSwitchItemTemplate(types[typeIndex].name, `checked`);
      for (i = typeIndex + 1; i < types.length; i++) {
        result += createTypeSwitchItemTemplate(types[i].name, ``);
      }
    }
  } else {
    for (i = types.length - 3; i < types.length; i++) {
      result += createTypeSwitchItemTemplate(types[i].name, ``);
    }
  }

  return result;
};

const createOfferSwitchItemTemplate = (offer, checked) => {
  const {title, price} = offer;
  const titleWords = title.split(` `);
  const reducedTitle = titleWords[titleWords.length - 1];

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${reducedTitle}-1" type="checkbox" name="event-offer-${reducedTitle}" ${checked}>
      <label class="event__offer-label" for="event-offer-${reducedTitle}-1">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const createOfferSwitchTemplate = (offers, offerIndexes) => {
  let result = ``;
  const unorderedOfferIndexes = new Set(offerIndexes);
  let checked;
  for (let i = 0; i < offers.length; i++) {
    if (unorderedOfferIndexes.has(i)) {
      checked = `checked`;
    } else {
      checked = ``;
    }
    result += createOfferSwitchItemTemplate(offers[i], checked);
  }

  return result;
};

const createOptionTemplate = (destinationName) => {
  return `<option value="${destinationName}"></option>`;
};

const createOptionsTemplate = () => {
  return destinations.map(
      ({name}) => createOptionTemplate(name)
  ).join(``);
};

const createOffersSectionTemplate = (offers, offerIndexes) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOfferSwitchTemplate(offers, offerIndexes)}
      </div>
    </section>`
  );
};

const createPictureTemplate = (picture) => {
  const {src, description} = picture;

  return `<img class="event__photo" src="${src}" alt="${description}">`;
};

const createPicturesTemplate = (pictures) => {
  return pictures.map(
      (picture) => createPictureTemplate(picture)
  ).join(``);
};

const createDestinationSectionTemplate = (destination) => {
  let result;
  if (destination) {
    const {description, pictures} = destination;
    result = (
      `<section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${createPicturesTemplate(pictures)}
          </div>
        </div>
      </section>`
    );
  } else {
    result = ``;
  }

  return result;
};

const createEditFormTemplate = (point = {basePrice: 0, dateFrom: new Date(), dateTo: new Date(), destinationIndex: 0, id: 0, isFavorite: false, offerIndexes: [], typeIndex: 0}) => {
  const {basePrice, dateFrom, dateTo, destinationIndex, id, offerIndexes, typeIndex} = point;
  let destination;
  let destinationName = ``;
  destination = destinations[destinationIndex];
  destinationName = destination.name;
  let typeName = ``; let preposition = ``; let offers = [];
  const type = types[typeIndex];
  typeName = type.name;
  preposition = type.preposition;
  offers = type.offers;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeName.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createTransferTypeSwitchTemplate(typeIndex)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createActivityTypeSwitchTemplate(typeIndex)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeName}&nbsp;${preposition}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1" data-prev-value="">
          <datalist id="destination-list-1">
            ${createOptionsTemplate()}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        ${createButtonsTemplate(!id)}
      </header>
      <section class="event__details">
        ${createOffersSectionTemplate(offers, offerIndexes)}
        ${createDestinationSectionTemplate(destination)}
      </section>
    </form>`
  );
};

export {
  createOfferSwitchTemplate,
  createOffersSectionTemplate,
  createPicturesTemplate,
  createDestinationSectionTemplate,
  createEditFormTemplate
};
