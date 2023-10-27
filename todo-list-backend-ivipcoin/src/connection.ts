import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = 'mongodb://localhost:27017/todoList';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => {
  console.log("MONGO_DB_URL", MONGO_DB_URL)
  console.log("MONGO_URI", process.env.MONGO_URI)
  return mongoose.connect(mongoDatabaseURI);
}

export default connectToDatabase;
