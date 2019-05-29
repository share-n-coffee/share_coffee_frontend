import React, { useState } from "react";
import List from "./List";
import { ReactComponent as DropdownArrowIcon } from "../../icons/DropdownArrow.svg";

let timeOutId = null;

const getLabelByValue = (options, value) => {
  const option = (options || []).find(option => option.value === value);

  return option.label;
};

/**
 * Atomic dropdown component
 * @param options (array of label-value objects)
 * example: [{label: "label1", value: "value1"}, {label: "label2", value: "value2"}]
 */
const Dropdown = ({ options, selectedValue, onSelect }) => {
  const [isOpened, setIsOpened] = useState(false);
  const selection = selectedValue ? getLabelByValue(options, selectedValue) : "Select department";

  return (
    <div
      onFocus={() => clearTimeout(timeOutId)}
      onBlur={() => {
        timeOutId = setTimeout(() => {
          setIsOpened(false);
        });
      }}
      className={`department-dropdown_container ${isOpened ? "department-focused" : undefined}`}
    >
      <div tabIndex="0" className="department-selection" onClick={() => setIsOpened(!isOpened)}>
        {selection}
        <DropdownArrowIcon
          className={`department-arrow ${isOpened ? "department-rotated" : undefined}`}
        />
      </div>
      {isOpened && (
        <List
          onItemClick={value => {
            onSelect(value);
            setIsOpened(false);
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default Dropdown;
