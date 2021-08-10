const express = require('express');
const app = express();
const { syncAndSeed } = require('./db');
const theRoutes = require('./routes/theRoutes');


app.get('/', (req, res) => {
    res.send('Hi');
})

app.use('/api', theRoutes);

const init = async () => {
    await syncAndSeed();
    app.listen(3000);
}
init();