import http from 'node:http';

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'GET' && url === '/users') {
    response.setHeader('Content-type', 'application/json');
    return response.end(JSON.stringify(users)+`\n`);
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@exemple.com'
    })
    response.writeHead(201);
    return response.end('Criação de usuários\n');
  }
  

  response.writeHead(404).end();
})

server.listen(3333);