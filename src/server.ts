import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import route from './router/route';
import bodyParser from 'body-parser';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(5000, () => {
  console.log('Server running on http://localhost:5000/');
});

export const database = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  try {
    mongoose.connect(
      '' //URL Your DB
    );
    console.log("Database connection succesfuly.")
  } catch (error) {
    console.log(error);
    console.log("Database connection failded.");
  }
};

mongoose.Promise = Promise;
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', route);