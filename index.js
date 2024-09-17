const express = require('express');
require('dotenv').config();
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'http://localhost'

app.use(bodyparser.json({ limit: '100mb' }));
app.use(bodyparser.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());
app.use(express.static('public'));
app.use('/api', require('./server/index'));

app.listen(port, () => {
    console.clear();
    console.log(`Server is running on ${host}:${port}`);
});