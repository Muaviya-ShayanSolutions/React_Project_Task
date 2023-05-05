import React, { useState } from "react";
import "../.././index.css"
import "./dropdownstyle.css"
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Filter by Region
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={toggleDropdown}>Option 1</li>
          <li onClick={toggleDropdown}>Option 2</li>
          <li onClick={toggleDropdown}>Option 3</li>
          <li onClick={toggleDropdown}>Option 4</li>
          <li onClick={toggleDropdown}>Option 5</li>
          <li onClick={toggleDropdown}>Option 6</li>
          <li onClick={toggleDropdown}>Option 7</li>

        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
