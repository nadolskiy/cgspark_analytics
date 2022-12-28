const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// const screenSizes = require('./routes/api/screen-sizes'); 
const ss_etorox   = require('./routes/api/etorox'); 

// app.use('/', screenSizes);
app.use('/api/etorox/', ss_etorox);

const port = process.env.PORT || 3000 

app.listen(port, () => console.log(`Server app listening at http://localhost:${port}`));