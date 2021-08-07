const express = require('express');
const app = express();
const { syncAndSeed } = require('./db');


app.get('/', (req, res) => {
    res.send('Hi');
})


const init = async () => {
    await syncAndSeed();
    app.listen(3000);
}
init();