var express = require('express');

router = express.Router();

router.post('/interest-calculate-cc', (req, res, next) => {
    console.log(req.query)
    var period = req.body.period ?  req.body.period : req.query.period;
    var BOOCC = req.body.amount ?  req.body.amount : req.query.amount;
    var APR = req.body.apr ? req.body.apr : req.query.apr;
    //var MP = req.body.mp ? req.body.mp : req.query.mp;

    var MR = APR/period;
    var MRperc = MR/100; 
    var result = MRperc * BOOCC;    

    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(JSON.stringify({'Result': 'SUCCESS', 'Interest': result.toFixed(2)}))
});

module.exports = router;