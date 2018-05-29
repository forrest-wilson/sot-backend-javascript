const express = require('express');
const app = express();
const path = require('path');

const Twitter = require('twitter');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let client = new Twitter({
    consumer_key: 'Qr4aLdymVjqPa0yfo3PDhOIzV',
    consumer_secret: '4ONlJHN4sB2wcIT5TlVv6qAp241EbaRpfvHSYVA0BRt2dbcs7a',
    access_token_key: '49913463-vDAqrW57QEJ3MeIdjGZ44SySVIUyxuejBTMvK0Zex',
    access_token_secret: 'vnUeDACnevhjrWuVDppKevuvwzU0cntFiuliHs7Uu0xm0'
});

const subjects = [];

app.post('/api/subjects', (req, res) => {
    let newSubject = req.body.subject;
    subjects.push(newSubject);

    res.redirect('/'); // Refresh page
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/results', (req, res) => {
    client.get('search/tweets', { q: subjects.join(' OR '), count: 100 }, (error, tweets, response) => {
        res.json(tweets);
    });
});

app.get('/api/subjects', (req, res) => {
    res.json(subjects);
});

app.listen(3000, () => console.log('Our app is listening on port 3000!'));