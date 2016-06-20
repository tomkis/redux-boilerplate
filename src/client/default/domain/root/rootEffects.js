export const fetchInitialCounterValue = () => fetch(`${process.env.API_BASE}/initial-counter`)
  .then(response => {
    if (response.status > 400) {
      throw new Error('Error while fetching from the server');
    } else {
      return response.json();
    }
  })
  .then(body => body.value);
