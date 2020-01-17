const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');


const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb://bruno:bruno@cluster0-shard-00-00-xbcni.mongodb.net:27017,cluster0-shard-00-01-xbcni.mongodb.net:27017,cluster0-shard-00-02-xbcni.mongodb.net:27017/week10?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json()); // dizendo pro express que estamos utilizando json. tem que vir antes das rotas
app.use(routes);

server.listen(3333);