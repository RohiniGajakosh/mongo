import bodyParser from 'body-parser';
import express from 'express';

import eventRoutes from './routes/events.js';
import heroesRoutes from './routes/heroes.js';

const app = express();

app.use(bodyParser.json());

app.use(eventRoutes);
app.use(heroesRoutes);

const port = process.env.PORT || 8080;
app.listen(port);
