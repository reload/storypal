// Various mock data, to be used randomly in the stories.

export function getItem(items) {
  // Right now, we're just returning the last item in a list.
  // If we don't, our visual tests will always fail, as the content
  // will be different on each page load.
  // In the long run, it would be nice if we could do some kind of environment
  // check here, to see if it's the visual regression run - but that is
  // probably not possible.
  return items[items.length - 1];

  // Return an actual random item from the list.
  // return items[Math.floor(Math.random() * items.length)];
}

export const titles = [
  "Title1",
  "Title2",
];

export const title = getItem(titles);

export const genres = [
  "Genre1",
  "Genre2"
];

export const genre = getItem(genres);
