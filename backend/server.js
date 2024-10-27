const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;


app.use('/api', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));