//Eric Slater -- CS 361 Project

const express = require('express');
const app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//For Google Translate API
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

app.use(express.json());
app.set('port', 5465);

//if the client is requesting a static file, that file will be in the public folder
//if you go to http://flip3.engr.oregonstate.edu:5465/home.html, it will return my home.html file
app.use(express.static('public'))



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//GET request route for the Translation Service: Recieves a string of Spanish text via a GET request and returns the english translation. 
//Uses Google API. 
//Sources Referenced: I used this reference for help using the API: https://github.com/RajKKapadia/Google_Translate_Youtube_Demo
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get('/translate', function (req, res) {
    
    let word1 = req.query.word1;
    
    // Configuration for the client
    const translate = new Translate({
        credentials: CREDENTIALS,
        projectId: CREDENTIALS.project_id   
    });

    //function to send the text and target language to the translator
    const translateText = async (text, targetLanguage) => {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    };
    
    //get translated content as a response and send back to users GET request
    translateText(word1, 'en')
     .then((newWord) => {
         res.send(newWord);
     })
       .catch((err) => {
         console.log(err);
     });
});



//Error Handling------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(function (req, res) {
    res.status(404);
    res.send("404");
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.send("500");
});

app.listen(app.get('port'), () => {
    console.log(`Express started on port ${app.get(`port`)}`);
});

