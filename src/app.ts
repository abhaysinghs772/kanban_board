import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

dotenv.config();

/* ROUTES */
import { authRoute } from './routes/index';

/* APP */
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authRoute);

/* mongoDB connection */
// chnage this string to your own db's connection string
const uri = `mongodb+srv://${process.env.MONGO_USERID}:${process.env.MONGO_PASSWORD}@cluster0.ljrgvuv.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
} 

// Only for Test
app.get('/', (req: Request, res:Response)=> {
	res.status(200).json({ message: 'this is root route' });	
});

app.listen(3000, async () => {
  await connectDB();
  console.log(`server is up and running on port 3000`);
});
