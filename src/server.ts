import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
require('dotenv').config()

const app = express();
// const cons = require('consolidate')
// const cors = require('cors');
// require('dotenv').config()
const api = express();

const port : number = 3000

app.use(cors<Request>());
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api', api);

require('./app/routes/api')(api);

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

http.createServer(app).listen(port, function() {
  console.log(`App is listening to port: ${port}, Instance ID: ${process.env.INSTANCE_ID}`,)
});
