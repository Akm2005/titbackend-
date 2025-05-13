import express from 'express';
import pool from './config/db.js';
import mainRouter from './route/index.js';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v1', mainRouter);
const testconnection = async()=>{
    try{
        const result = await pool.query('SELECT NOW()');
        console.log(result.rows[0].now);
        console.log('Connected to the database');
    }catch(error){
        console.error('Error connecting to the database:', error);
    }
}
testconnection();
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
