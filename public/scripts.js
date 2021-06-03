
var wordsUsed = [];//used to output words user used

//function for getting the content to be sent to teamates scraper service------------------------------------------------------------------------------------------------ 
document.getElementById("sampleContent_submit").addEventListener('click', function(event){

    //get the word to be sent to the scraping api
    var sampleWord = document.getElementById('sampleContent_input').value

    //push word used to wordsUsed array
    wordsUsed.push(sampleWord);   
  
    //Creates weblink to be sent via a GET request
    var scrapeLink = "https://portfive.net/language-game/scrape?word=" + sampleWord;

    //function to send get request and handle response
    sendWordGetContent(scrapeLink);

})




//function for sending the GET request to the scraper service------------------------------------------------------------------------------------------------ 
function sendWordGetContent(linkToSend){

    var req = new XMLHttpRequest();

    req.open("GET", linkToSend, true);
    console.log("translate text sent");
    console.log(linkToSend);

    //create an asynchronous call by adding a listener on the request's load event.
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            console.log(req.response)
           
            //get variables for output
            var scrapedContent = req.response;
            document.getElementById('sampleContent_Output').textContent = scrapedContent;
            document.getElementById('wordsUsed_Output').textContent = wordsUsed;

            } else {
                console.log("Error in network request: " + req.statusText);
        }});

    req.send(null);//this is a get request so you are sending null.   
    event.preventDefault();
}




//Translator: Gets the text inputted into the form, and sends it to my translator in the index.js file via a GET request.------------------------------------------------------ 
document.getElementById("translation_submit").addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    
    //Get the content to translate from the HTML form
    var word = document.getElementById('translation_input').value

    //Create link to be sent in the GET request
    var webLink = "https://portfive.net/text_app/translate?word1="+word;

    req.open("GET", webLink, true);
    
    //Create an asynchronous call by adding a listener on the request's load event.
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
           
            //Recived the translated text
            var response = req.responseText;
            console.log(response);

            //Send the translated text to the HTML form
            document.getElementById('translation_Output').textContent = response;

           } else {
                console.log("Error in network request: " + req.statusText);
        }});

    req.send(null);//this is a get request so you are sending null.   
    event.preventDefault();
})




//Word Counter: Sums up the count of each word in content it is passed. ---------------------------------------------------------------------------------------------------------
//Sources referenced: https://stackoverflow.com/questions/30906807/word-frequency-in-javascript
//Sources reference for replacing words: https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
document.getElementById("analyze_submit").addEventListener('click', function(event) {

    var getWords = document.getElementById("analyze_input").value; 
    getWords= getWords.toLowerCase();

    //replace the periods, commas, and parenthasis, etc.
    //var words = getWords.replace(/[.;#0123456789&,():']/g, '').split(/\s+/);
    var words = getWords.split(/\s+/);
    //words = wordCleaner(words);
   
    var wordCount = {};

    //for each word, see if it exists in wordCount, if it does, increment it, if it does not then add it to the object
    words.forEach(function(wordInList) {
        if (!wordCount[wordInList]) {
            wordCount[wordInList] = 0;
        }
        wordCount[wordInList] += 1;
    });
    event.preventDefault();
    
    tableCreator(wordCount);
})

//NEW WORD COUNTER --- USES MY CLEANING FUNCTIONALITY
document.getElementById("analyze_submit_clean").addEventListener('click', function(event) {

    var getWords = document.getElementById("analyze_input").value; 
    getWords= getWords.toLowerCase();

    //replace the periods, commas, and parenthasis, etc.
    var words = getWords.replace(/[.;#0123456789&,():']/g, '').split(/\s+/);
    words = wordCleaner(words);
   
    var wordCount = {};

    //for each word, see if it exists in wordCount, if it does, increment it, if it does not then add it to the object
    words.forEach(function(wordInList) {
        if (!wordCount[wordInList]) {
            wordCount[wordInList] = 0;
        }
        wordCount[wordInList] += 1;
    });
    event.preventDefault();
    
    tableCreator(wordCount);
})

//function to add a border to content table---------------------------------------------------------------------------------------------------------------------------------------
function addBorder(listToAddBorders){

    for(var x=0; x<listToAddBorders.length; x++)
        listToAddBorders[x].style.border = "thin solid #000000";
}




//function for dropping unimportant words-------------------------------------------------------------------------------------------------------------------
function wordCleaner(listToClean){
     
     wordsToDrop = ['a','an','the','is','this','and','as','of'
                    ,'than','then','to','by','in','what', 'other', 'on', 'are', 'or', 'that', 'also', 'for'];
     
     for (var i = 0; i< wordsToDrop.length; i++){
         listToClean = listToClean.filter(listToClean => listToClean != wordsToDrop[i]);
     }

    return listToClean;
}



//create table function------------------------------------------------------------------------------------------------------------------------------------------
function tableCreator(wordCount){
    //Create a table with the word counts (Remove old table if it exsists)
    if (document.contains(document.getElementById("tableID"))){
        document.getElementById("tableID").remove();
    }

    var table = document.createElement('table');

    for (let word in wordCount){
        var tr = document.createElement('tr');//creates new row
        var td1 = document.createElement('td');//creates new cell
        var td2 = document.createElement('td');//creates new cell
        
        var borderList = [tr, td1, td2];
        
        addBorder(borderList);

        var text1 = document.createTextNode(word);//adds word to first cell
        var text2 = document.createTextNode(wordCount[word]);//adds word count to second cell

        //append cells
        td1.appendChild(text1);
        td2.appendChild(text2);
        tr.appendChild(td1);
        tr.appendChild(td2);

        //append rows to table
        table.appendChild(tr);
}
document.body.appendChild(table).setAttribute("id", "tableID");;
}