// server.js
// where your node app starts
const PORT = process.env.PORT || 8000

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
    res.json({ greeting: 'hello API' });
});

function getTime(time, res) {
    const req_time = new Date(time)
    if (req_time == 'Invalid Date') {
        res.json({ error: 'Invalid Date' })
    } else {
        res.json({
            unix: req_time.getTime(),
            utc: req_time.toUTCString()
        })
    }
    return true
}

app.get('/api/timestamp/:date_string', (req, res) => {
    if (!isNaN(req.params.date_string)) {
        getTime(Number(req.params.date_string), res)
    } else {
        getTime(req.params.date_string, res)
    }

})

app.get('/api/timestamp', (req, res) => {
    getTime(null, res)
})

// listen for requests :)
app.listen(PORT, () => console.log(`running on port ${PORT}`))