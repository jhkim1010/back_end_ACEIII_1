const express = require('express');
// const router  = require('../routers/codigosRouter');
const {Server} = require("socket.io")
const cors = require("cors")
const { default: helmet } = require('helmet');
const authRouter = require("./routers/authRouter")
const cookieParser = require('cookie-parser');
const { createToken } = require('./routers/JWT');

const app = express();

const server = require('http').createServer(app); 

const port = process.env.PORT || 4000;

const io = new Server(server, 
    {
        cors : "http://localhost:3000", 
        credentials : "true"
    }
); 

app.use(
  cors({
    origin : "http://localhost:3000", 
    credentials : true ,
  })
)
app.use(helmet()); 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter); 

io.on("connect", socket => {}); 

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
  
