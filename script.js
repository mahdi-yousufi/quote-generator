//
const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBTn = document.getElementById("new-quote")
const loader = document.getElementById("loader");

let apiQuotes = [];

function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function compelet() {
    quoteContainer.hidden = false
    loader.hidden = true
}
// show new quotes
function newQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (!quote.author) {
        authorText.textContent = "unknown"
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 70) {
        quoteText.classList.add("long-quote")
    }
    else {
        quoteText.classList.remove("long-quote")
    }

    quoteText.textContent = quote.text;
    compelet()
}


async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote()
    } catch (error) {
        // alert(error.message)
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBTn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuotes();