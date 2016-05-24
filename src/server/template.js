export default (content, state) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="icon" href="favicon.png" type="image/png" />
    <title>Redux Boilerplate</title>
    <script type="text/javascript">
      window.reduxState = '${JSON.stringify(state)}';
    </script>
  </head>
  <body>
    <div id="app">${content}</div>
    <script type="text/javascript" src="/client.js"></script>
  </body>
</html>
`;
