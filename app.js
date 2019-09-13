const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

// app.get('/', (req, res) => {
//     res.send('Hello Ben!');
// });

// app.get('/sum', (req, res) => {
//     const {a, b} = res.query;

//     if(!a) {
//         return res.status(400).send('a is required');
//     }

//     if(!b) {
//         return res.status(400).send('b is required');
//     }

//     const numA = parseFloat(a);
//     const numB = parseFloat(b);
//     const c = numA + numB;

//     const responseString = `The sum of ${numA} and ${numB} is ${c}`;

//     res.status(200).send(responseString);
// });

// app.get('/cipher', (req, res) => {
//     const { text, shift } = req.query;
//     const newText = text.split("").map(letter => {
//         const charCode = letter.charCodeAt(0);
//         console.log(charCode);
//         const newCharCode = parseInt(charCode, 10) + parseInt(shift, 10);
//         console.log(newCharCode);
//         return String.fromCharCode(newCharCode);
//     });
//     console.log(newText);
//     const newString = newText.join('');
//     res.send(newString);
// });

// app.get('/lotto', (req, res) => {
//     const pickedNums = req.query.number.map(num => parseInt(num, 10));
//     console.log(pickedNums);

//     let lottoNums = Array.from({length: 6}, () => Math.floor(Math.random() * 20));
//     console.log(lottoNums);

//    let correctNums = 0;

//    for(let i = 0; i < pickedNums.length; i++) {
//        if(lottoNums.find(pickedNums[i])) {
//            correctNums++;
//        }
//        return correctNums
//    }

//    console.log(correctNums);
    
// });

app.get('/grade', (req, res) => {
    // get the mark from the query
    const { mark } = req.query;
  
    // do some validation
    if(!mark) {
      // mark is required
      return res
        .status(400)
        .send("Please provide a mark");
    }
  
    const numericMark = parseFloat(mark);
    if(Number.isNaN(numericMark)) {
      // mark must be a number
      return res
        .status(400)
        .send("Mark must be a numeric value");
    }
  
    if(numericMark < 0 || numericMark > 100) {
      // mark must be in range 0 to 100
      return res
        .status(400)
        .send("Mark must be in range 0 to 100");
    }
  
    if(numericMark >= 90) {
      return res
        .send("A");
    } 
  
    if(numericMark > 80) {
      return res
        .send("B");
    }
  
    if(numericMark >= 70) {
      return res
        .send("C");
    }
  
    res
      .send("F");
  });


app.listen(8000, () => {
    console.log('Express is listening on port 8000!')
});


