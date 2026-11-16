/** Compose the V1 HTTP API and connect to PostgreSQL before accepting requests. */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const authRoute = require('./routes/authRoutes.js')
const projectRoute = require('./routes/projectRoutes.js');
const taskRoute = require('./routes/taskRoutes.js');
const dashboardRoute = require('./routes/dashboardRoutes');
const errorHandler = require('./middleware/errorHandler.js');
const { checkServer } = require('./config/db.js');
const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
}))
//Authentication
app.use('/api/auth',authRoute);


app.use('/api/projects',projectRoute);
app.use('/api/projects/:projectId/tasks',taskRoute);
app.use('/api/dashboard',dashboardRoute);

//Error Handling
app.use(errorHandler);

app.get('/health',(req,res)=>{
    res.status(200).json({
        "status":"ok"
    })
})

const startServer = async() => {
    try {
        await checkServer();
        app.listen(process.env.PORT, '0.0.0.0',
            () => console.log(`Server running on port : ${process.env.PORT}`)
        )
    } catch (err) {
        console.log("Failed to start server: ",err.message);
        process.exit(1);
    }

}

startServer();
