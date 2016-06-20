export const helloAsync = () => fetch(`${process.env.API_BASE}/hello`)
  .then(response => {
    if (response.status > 400) {
      throw new Error('Error while fetching from the server');
    } else {
      return response.json();
    }
  })
  .then(body => body.hello);
