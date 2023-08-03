
const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader = document.getElementById('loader')


let apiQuotes=[];

//show loading
function loading()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

//hide loading
function complete()
{
    quoteContainer.hidden=false;
    loader.hidden=true;
}




//show new quote
function newQuote()
{
    loading()
    // pick a random quote
    const quote= apiQuotes[Math.floor(Math.random() * apiQuotes.length)] ;

    //check if author blank
    if(!quote.author)
    {
        authorText.textContent = 'Unknown'
    }
    else
    {
        authorText.textContent= quote.author;
    }

    //check quote length
    if(quote.text.length > 120)
    {
        quoteText.classList.add('long-quote')
    }
    else
    {
        quoteText.classList.remove('long-quote')
    }
    //set quote hide loader
    quoteText.textContent=quote.text;
    complete();

    
}

//  Get Quote from API
async function getQuotes()
{
    loading()
    const apiUrl ='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    }
    catch(error)
    {
        //catch error
    }
}

//Tweet Quote
function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

//Event listeners

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote)


getQuotes();