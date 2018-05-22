const http = require('http');

http.createServer((request, response) => {
  request.pipe(response);
}).listen(8080);
