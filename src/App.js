import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = () => {
  fetch('https://type.fit/api/quotes')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Eftersom API:et returnerar en lista med citat,
      // kan du välja ett slumpmässigt citat från listan
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const quote = data[randomIndex]; // Välj ett slumpmässigt citat
        setQuote(quote.text); // 'text' för quote text
        setAuthor(quote.author || 'Unknown'); // Vissa citat har ingen angiven författare
      }
    })
    .catch(error => console.error('Error fetching quote:', error));
};


  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <div id="quote-box">
        <p id="text">{quote}</p>
        <p id="author">- {author}</p>
        <button id="new-quote" onClick={fetchQuote}>Nytt Citat</button>
        <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`} target="_blank">Tweet</a>
      </div>
    </div>
  );
}

export default App;
