const http = require('http');
const port = 3000;

let students = ['Filip', 'Philip'];

let todo = [
  { task: 'Go for a run', status: false },
  { task: 'Walk the dog', status: true },
];

function requestHandler (request, response) {

  if (request.url === '/') {

    response.writeHead(202);
    response.end('Welcome');

  } else if (request.url === '/students') {

    response.writeHead(202, {
      'Content-Type': 'application/json'
    });

    response.end(JSON.stringify(students));

  } else if (request.method === 'GET' && request.url === '/api/todos') {

    response.writeHead(202, {
      'Content-Type': 'application/json'
    });

    response.end(JSON.stringify(todo));
    
  } else if (request.method === 'POST' && request.url === '/api/todos') {

    let body = '';

    request.on('data', (chunk) => {
      console.log(`BODY', ${chunk}`);
      body += chunk;
    });

    request.on('end', (chunk) => {
      todo.push(JSON.parse(body));
    });

    response.writeHead(200);
    response.end();

  } else if (request.url === '/api/todos/teapot') {

    response.writeHead(418);
    response.end('418: I am a teapot');

  } else {

    response.writeHead(404);
    response.end();

  };
};

const server = http.createServer(requestHandler);

console.log(`Server is running on port ${port}`);
server.listen(port);
