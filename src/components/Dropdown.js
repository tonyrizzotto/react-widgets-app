import React, { useState } from 'react';

const Dropdown = ({ options, selected, onSelectedChange }) => {
  // Initialize state for the opening/closing of dropdown
  const [open, setOpen] = useState(false);

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
    <div className="ui form">
      <div className="field">
        <label className="label">Select a Color</label>
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
  );
};

export default Dropdown;