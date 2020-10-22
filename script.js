const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loader
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    loading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        //if author is provided, write 'Unknown' for authoer
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        if (data.quoteText.length > 120 ) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');    
        }
        quoteText.innerText = data.quoteText;

        //stop loader, show quoter
        complete();

    } catch (error) {
        //getQuote();
    }
}

//Tweet tweet bitches.
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuote();

