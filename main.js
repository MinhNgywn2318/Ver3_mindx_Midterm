import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);

const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.6v4qlgk.mongodb.net`;


async function main() {
    try {
        console.log("chuẩn bị connect tới DB")
        // mongoose hổ trợ kết nối và giữ connection
        await mongoose.connect(DB_CONNECTION_STRING);

        console.log("connect tới database thành công")
        console.log("chuẩn bị start server")

        app.listen(PORT, () => {
            console.log(`Server start thành công ${PORT}`)
        })
    } catch (error) {
      console.log("error connect to database");
    }
}

main()