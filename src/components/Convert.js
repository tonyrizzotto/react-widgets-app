import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');

  const [debouncedText, setDebouncedText] = useState(text);

  //need to create 2 useEffects to implement a debounced term. One as a timer that auto refreshes and another that actually makes the request.

  //useEffect #1 - updated the debouncedTerm state and cleanup every 500ms. Should run when initally reloaded, or when text is updated.
  useEffect(() => {
    const timerId = setTimeout(() => {
      //update debounced text
      setDebouncedText(text);
    }, 500);

    //clear out the timerId
    return () => {
      clearTimeout(timerId);
      {
      }
    };
  }, [text]);

  //useEffect #2 - make a request using the debounced term piece of state
  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: debouncedText,
            target: language.value,
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
          },
        }
      );
      setTranslated(data.data.translations[0].translatedText);
    };

    doTranslation();
  }, [language, debouncedText]);
  return (
    <div>
      <h2>{translated}</h2>
    </div>
  );
};

export default Convert;
