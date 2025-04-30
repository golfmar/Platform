"use client";
import React from "react";
import "./InputCheck.scss";

// =================================

interface InputCheckProps {
  type: string;
  data: string;
  value: string;
  checkedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// =================================

const InputCheck: React.FC<InputCheckProps> = ({
  type,
  data,
  value,
  checkedValue,
  onChange,
}) => {
  return (
    <div className="fildset-checkbox flex items-center">
      <input
        id={data}
        name={data}
        type={type}
        checked={value === checkedValue}
        onChange={(e) => {
          onChange(e);
        }}
        required
      />
      <label className="relative flex items-center" htmlFor={data}>
        {data}
      </label>
    </div>
  );
};

export default InputCheck;
