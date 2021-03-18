const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoUri');

// Connect to Mongo
mongoose
    .connect(db, {
         useNewUrlParser: true,
         useCreateIndex: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
app.use('/api/passcode', require('./routes/passcode'));
app.use('/api/confession', require('./routes/confession'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('mairahquiz/build'));

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'mairahquiz', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));