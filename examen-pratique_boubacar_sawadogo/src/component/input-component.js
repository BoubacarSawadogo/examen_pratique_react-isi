import React from "react";

const InputComponent = ({ id, label, type, onSave, value }) => (
    <div className="form-group row">
        <label htmlFor={id} className="col-sm-2 col-form-label">
            {label}
        </label>
        <div className="col-sm-10">
            <input
                id={id}
                label={label}
                type={type}
                onChange={onSave}
                value={value}
            />
        </div>
    </div>
);

export default InputComponent;
