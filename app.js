import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import routes from './routes';

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const models = app.datasource.models;

app.use('/', routes(models));

export default app;
