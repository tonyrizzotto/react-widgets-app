import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resultingClientExists } from 'workbox-core/_private';

const Search = () => {
  const [term, setTerm] = useState('');

  // you need to store the results of an api call into state, so it can be accessed.
  const [results, setResults] = useState([]);

  // whenever the component rerenders, and the state of Term has changed, run this code.
  useEffect(() => {
    //you can't use Async/Await inside of useEffect without defining a new function or IIFE
    const search = async () => {
      // save data as 'result' state.
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    // only make a request if there is a term and no results yet. This would be the first request on initial render
    if (term && !results.length) {
      search();
    } else {
      // if term is blank, don't run a search
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);
      // The only thing you can return in useEffect is another function. This one is used as a cleanup to reset the timer while someone is typing. This will prevent multiple unnecessary requests to the API
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]);

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            target="_blank"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>

          {/* Only use dangerouslySetInnerHTML when you absolutely trust the source, otherwise XSS is possible */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  //below is the main return statement of Search component
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Word</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;
