// Main backend file. It runs everything

import express from 'express';
import cors from 'cors';
import connect from './database/conn.js';
import router from './router/route.js';


const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
})

/** middlewares */
// const corsOptions = {
//     origin: {localhost:3000, localhost:8080} // frontend URI (ReactJS)

// }
const corsOptions = {
    origin: '*' // frontend URI (ReactJS)
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.json({limit: '50mb'}));

app.disable('x-powered-by'); // less hackers know about our stack

const port = 5000;

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

app.use('/uploads', express.static('uploads'));
/** api routes */
app.use('/api', router)


/** start server only when we have valid connection */
connect().then(() => {
    try {
     app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
   // const wss = new SocketServer({ server });
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => {
    console.log("Invalid database connection...!");
})
