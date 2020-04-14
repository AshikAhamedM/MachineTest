const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(3001, '127.0.0.1', () => {
  console.log('Listening to requests on port 3001');
});
