var express = require('express');
var path = require('path');

router = express.Router();

router.get('/', (req,res,next) => {
    // res.writeHead(200);
    res.render("homepage.html", {
        layout: "Layouts/Main.html",
        Title: "SOUNDAPI | Home",
    });
});

router.get('/about', (req,res,next) => {
    // res.writeHead(200);
    res.render("about-us.html", {
        layout: "Layouts/Main.html",
        Title: "SOUNDAPI | About",
    });
});

router.get('/our-apis', (req,res,next) => {
    // res.writeHead(200);
    res.render("our-apis.html", {
        layout: "Layouts/Main.html",
        Title: "SOUNDAPI | APIs",
    });
});

router.get('/contact', (req,res,next) => {
    // res.writeHead(200);
    res.render("contact-us.html", {
        layout: "Layouts/Main.html",
        Title: "SOUNDAPI | Contact",
    });
});

router.post('/html-page-router', (req,res,next) => {
    //console.log(req.body)
    var page = req.body.page;
//console.log(path.join(__dirname + `../../views/api-views/${page}.html`))
    try {
        res.sendFile(path.join(__dirname + `../../views/api-views/${page}.html`));
    } catch (ex) {
        res.sendFile(path.join(__dirname + '../../views/api-views/api-error.html'));
    }
});


module.exports = router;