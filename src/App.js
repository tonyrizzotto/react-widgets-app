import React from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
//Custom data to pull for the Accordion
const items = [
  {
    title: 'What is React?',
    content: 'React is a front-end Javascript framework',
  },
  {
    title: 'Why use React JS?',
    content: 'React is a favorite JS library among engineers',
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components.',
  },
];

const App = (props) => {
  return (
    <div className="ui container">
      {/* <Accordion items={items} /> */}
      <Search />
    </div>
  );
};

export default App;
