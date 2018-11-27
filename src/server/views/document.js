module.exports = () => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" href= "/css/styles.css">' : ''}
    </head>
    <body>
      <section id="root"></section>
      <script src="${process.env.NODE_ENV === 'production' ? '/js/client.js' : 'client.js'}"></script>
    </body>
  </html>
`;