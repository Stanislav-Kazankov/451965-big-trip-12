const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const removeContent = (container) => {
  container.innerHTML = ``;
}

const refreshContent = (container, newContent) => {
  removeContent(container);
  render(container, newContent);
}

const getIndexOfObjectByName = (objects, name) => {
  return (
    objects.map(
      (object) => {return object.name}
    ).indexOf(name)
  )
}

const capitalize = (string) => {
  return string.split(` `).map(
    (word) => {return word.charAt(0).toUpperCase() + word.slice(1)}
  ).join(` `)
}

export {render, refreshContent, getIndexOfObjectByName, capitalize}
