quote = document.getElementById("quote");
quotee = document.getElementById("quotee");
var newQuote;

function setup() {
  loadJSON("scripts/musicQuotes.json", function (data) {
    randIndex = Math.floor(Math.random() * data.quotes.length);
    console.log(randIndex);
    quote.innerHTML = data.quotes[randIndex]["quote"];
    quotee.innerHTML = "-" + data.quotes[randIndex]["quotee"];
  });
}
