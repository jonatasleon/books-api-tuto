import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRoutes from './routes/books';

const app = express();

app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());

const Books = app.datasource.models.Books;

app.use('/books', booksRoutes(Books));

export default app;
