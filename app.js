import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import routes from './routes';
import authorization from './auth';

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const auth = authorization(app);

app.use(auth.initialize());
app.auth = auth;

app.use('/', routes(app));

export default app;
