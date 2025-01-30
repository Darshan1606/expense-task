import React from "react";
import classNames from "classnames";
import Select from "react-select";

const SelectField = (props) => {
  let {
    options,
    labelName,
    value,
    size,
    className,
    disabled,
    placeholder,
    onChange,
    error,
    errorMessage,
  } = props;

  const getButtonSize = () => {
    let sizeClass = "";
    switch (size) {
      case "large":
        sizeClass = classNames(`w-full h-[56px] text-base rounded-lg `);
        break;
      case "medium":
        sizeClass = classNames(`w-full h-[48px]  text-[14px] rounded-lg `);
        break;
      case "small":
        sizeClass = classNames(`w-full h-[40px] text-[14px] rounded-[5px] `);
        break;
      default:
        sizeClass = classNames(`w-full h-[48px]  text-[14px] rounded-lg`);
        break;
    }
    return sizeClass;
  };

  const classes = classNames(
    getButtonSize(),
    className,
    disabled ? "opacity-50 cursor-not-allowed border border-primary-dark" : ""
  );

  return (
    <div>
      <label
        className={`text-[12px] font-bold  ${
          error ? "text-accent-red" : "text-dark"
        }`}
      >
        {labelName}
      </label>

      <div className="mt-2 bg-white ">
        <Select
          value={value}
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          className={`${classes} w-full text-[14px]  border ${
            error ? "border-accent-red" : "border-primary-dark"
          } focus:border-none  rounded-lg`}
          components={{
            IndicatorSeparator: () => null,
          }}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#8390F520",
              primary: "#5A6DD8",
            },
          })}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: 0,
              borderColor: error ? "#CF5F5F" : "#0E0D0D",
              borderRadius: "8px",
              height: "46px",
              boxShadow: "none",
              minWidth: "167px",
            }),
            menu: (styles) => ({
              ...styles,
              color: "#0E0D0D",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }),
          }}
        />
      </div>

      {error && (
        <span className="text-accent-red font-bold mt-8 text-[12px]">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default SelectField;
