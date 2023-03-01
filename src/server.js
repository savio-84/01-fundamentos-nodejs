import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// Query parameters = URL Statefull => filters, pagination, non-mandatory
  // http://localhost:3333/users?userId=1&name=Diego
// Route parameters = Resourses identification
  // GET http://localhost:3333/users/1
// Request body
  // envio de informações de um formulário

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  await json(request, response);

  const route = routes.find(route => route.method === method && route.path.test(url));

  if (route) {
    const routeParams = request.url.match(route.path);
    const { query, ...params } = routeParams.groups; 
    request.params = params;
    request.query = query ? extractQueryParams(query) : {};
    return route.handler(request, response);
  }

  response.writeHead(404).end();
})

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});