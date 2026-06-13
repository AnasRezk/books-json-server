const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(require('./db.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);

const rewriter = jsonServer.rewriter({
  '/GetAllCombos': '/combos',
  '/GetComboById/:id': '/combos/:id'
});
server.use(rewriter);

server.post('/CreateCombo', (req, res, next) => {
  req.url = '/combos';
  next();
});

server.put('/UpdateCombo/:id', (req, res, next) => {
  req.url = `/combos/${req.params.id}`;
  next();
});

server.delete('/DeleteCombo/:id', (req, res, next) => {
  req.url = `/combos/${req.params.id}`;
  next();
});

server.use(router);

server.listen(port);