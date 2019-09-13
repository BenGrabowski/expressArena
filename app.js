const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Ben!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here. Never call again');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request: 
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
        Body: ${req.body}
        Fresh: ${req.fresh}
        IP: ${req.ip}
        Params: ${req.params}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name');
    }

    if(!race) {
        return res.status(400).send('Please provide a race');
    }

    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    res.send(greeting);
});

app.get('/sum', (req, res) => {
    const {a, b} = res.query;

    if(!a) {
        return res.status(400).send('a is required');
    }

    if(!b) {
        return res.status(400).send('b is required');
    }

    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const c = numA + numB;

    const responseString = `The sum of ${numA} and ${numB} is ${c}`;

    res.status(200).send(responseString);
});

app.get('/cipher', (req, res) => {
    const { text, shift } = req.query;
    const newText = text.split("").map(letter => {
        const charCode = letter.charCodeAt(0);
        console.log(charCode);
        const newCharCode = parseInt(charCode, 10) + parseInt(shift, 10);
        console.log(newCharCode);
        return String.fromCharCode(newCharCode);
    });
    console.log(newText);
    const newString = newText.join('');
    res.send(newString);
});

app.get('/lotto', (req, res) => {
    const pickedNums = req.query.number.map(num => parseInt(num, 10));
    console.log(pickedNums);

    let lottoNums = Array.from({length: 6}, () => Math.floor(Math.random() * 20));
    console.log(lottoNums);

   let correctNums = 0;

   for(let i = 0; i < pickedNums.length; i++) {
       if(lottoNums.find(pickedNums[i])) {
           correctNums++;
       }
       return correctNums
   }

   console.log(correctNums);
    
});

app.listen(8000, () => {
    console.log('Express is listening on port 8000!')
});


