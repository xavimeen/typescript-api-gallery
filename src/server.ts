import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

const app = express();

import indexRoutes from './routes/index.routes';

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', indexRoutes);

// Static files
app.use('/uploads', express.static(path.resolve('uploads')));

export default app;