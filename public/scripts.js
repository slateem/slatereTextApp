//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//GET ROUTE FOR SAMPLE TEXT: BELOW
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var wordsUsed = [];

//I WILL SEND A WORD TO WILLS API AND RETURN A PARAGRAPH
document.getElementById("sampleContent_submit").addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    
    //get the word to be sent to the scraping api
    var sampleWord = document.getElementById('sampleContent_input').value

    //push word used to wordsUsed array
    wordsUsed.push(sampleWord);

    //Group member will tell me where to send the word to access the scraper
    //var webLink = "address/scraper?word=" + sampleWord;    
  
    //this is a test weblink
    var scrapeLink = "https://portfive.net/language-game/scrape?word=" + sampleWord;

    console.log(scrapeLink);
    //open GET request
    req.open("GET", scrapeLink, true);
    console.log("translate text sent")

    //create an asynchronous call by adding a listener on the request's load event.
    req.addEventListener('load', function() {
        if(req.status >= 200 && req.status < 400) {
            console.log(req.response)
            //var response = JSON.parse(req.responseText);
            //console.log(response);
            //get variables for output
            var scrapedContent = req.response;
            document.getElementById('sampleContent_Output').textContent = scrapedContent;
            document.getElementById('wordsUsed_Output').textContent = wordsUsed;

            } else {
                console.log("Error in network request: " + req.statusText);
        }});

    req.send(null);//this is a get request so you are sending null.   
    event.preventDefault();//
})




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Translator: Gets the text inputted into the form, and sends it to my translator in the index.js file via a GET request. 
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("translation_submit").addEventListener('click', function(event){

    var req = new XMLHttpRequest();
    
    //Get the content to translate from the HTML form
    var word = document.getElementById('translation_input').value

    //Create link to be sent in the GET request
    var webLink = "http://flip3.engr.oregonstate.edu:5456/translate?word1="+word;


    //Open GET request
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




//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Word Counter: Sums up the count of each word in content it is passed. 
//Sources referenced: https://stackoverflow.com/questions/30906807/word-frequency-in-javascript
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
document.getElementById("analyze_submit").addEventListener('click', function(event) {

    var result = {}; //words and word counts will be added here
    var get_words = document.getElementById("analyze_input").value; //get the string of words to count
    console.log(get_words);//console log for testing

    //replace the periods, commas, and parenthasis, etc...and then split the string on whitespace. Words will be a list of words.
    var words = get_words.replace(/[.]/g, '').replace(/[,]/g, '').replace(/[(]/g, '').replace(/[)]/g, '').replace(/[:]/g, '').replace(/[']/g, '').split(/\s+/);
    console.log(words)

    var wordCount = {};//object for word counts

    //for each word, see if it exists in wordCount, if it does, increment it, if it does not then add it to the object
    words.forEach(function(x) {
        if (!wordCount[x]) {
            wordCount[x] = 0;
        }
        wordCount[x] += 1;
    });
    event.preventDefault();
    
    console.log(wordCount);//console log for testing

    console.log(Object.keys(wordCount).length);//gets the length of the array

  
    //Create a table with the word counts (Remove old table if it exsists)
     if (document.contains(document.getElementById("tableID"))){
        document.getElementById("tableID").remove();
    }


    //create a table object
    var table = document.createElement('table');

    for (let word in wordCount){
        var tr = document.createElement('tr');//creates new row
        var td1 = document.createElement('td');//creates new cell
        var td2 = document.createElement('td');//creates new cell
        tr.style.border = "thin solid #000000";//adds boarder
        td1.style.border = "thin solid #000000";//adds boarder
        td2.style.border = "thin solid #000000";//adds boarder

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
   
})

window.onpopstate = function (e) {
    console.log("pop")
}