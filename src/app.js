import connectDB from './db.js';
import User from './models/userModel.js';
import dotenv from 'dotenv';
import userRouter from './routes/users.js';
import express from 'express';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
connectDB()
.then(() => {
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
})
.catch((err) => console.error('DB connectoin failed:', err));