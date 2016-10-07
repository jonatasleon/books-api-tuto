import Debug from 'debug';
import app from './app';

const debug = new Debug('books-api:server');

app.listen(app.get('port'), () => {
  debug(`magic happens on port ${app.get('port')}`);
});
