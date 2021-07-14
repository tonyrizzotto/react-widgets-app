import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  // Initialize state for the opening/closing of dropdown
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      // the 'contains' method belongs to all DOM elements
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  const renderedOptions = options.map((option) => {
    // check if the currently selected item is = to the option.value
    if (option.value === selected.value) {
      // in React, null means render nothing
      return null;
    }

    return (
      <div
        key={option.value}
        className="item"
        onClick={() => {
          onSelectedChange(option);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div>
      <div className="ui form" ref={ref}>
        <div className="field">
          <label className="label">{label}</label>
          {/* Close dropdown by removing 'visible active' and 'visible transition' from the menu */}
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className={`ui selection dropdown ${open ? 'visible active' : ''}`}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="ui container">
        <p
          style={{
            color: `${selected.value}`,
            paddingTop: '25px',
            fontSize: '20px',
          }}
        >
          The selected color is {selected.value}!
        </p>
      </div> */}
    </div>
  );
};

export default Dropdown;
