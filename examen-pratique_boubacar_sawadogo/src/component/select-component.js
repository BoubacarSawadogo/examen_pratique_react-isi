import React from "react";

const SelectComponent = ({ id, label, type, options, onSave }) => (
    <div className="form-group row">
        <label htmlFor={id} className="col-sm-2 col-form-label">
            {label}
        </label>
        <select id={id} onChange={onSave}>
            {options.map((option, index) => (
                <option value={option.value} key={index}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default SelectComponent;
