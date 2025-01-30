import React from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

const Input = (props) => {
  const {
    children,
    label,
    size,
    variant,
    block,
    className,
    disabled,
    type,
    value,
    placeholder,
    error,
    errorMessage,
    ...rest
  } = props;

  const defaultClass = ``;

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
        sizeClass = classNames(`w-full h-[48px]  text-[14px] rounded-lg `);
        break;
    }
    return sizeClass;
  };

  const classes = classNames(
    defaultClass,
    getButtonSize(),
    className,
    disabled ? "opacity-50 cursor-not-allowed " : ""
  );

  return (
    <div>
      <label
        className={`text-xs font-bold ${
          error ? "text-accent-red" : "text-text-darkGray"
        } `}
      >
        {label}
      </label>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, marginTop: -10 }}
          animate={{ opacity: 1, marginTop: 3, bottom: -21 }}
          exit={{ opacity: 0, marginTop: -10 }}
          transition={{ duration: 0.15, type: "tween" }}
        >
          <div className="relative mt-2">
            <input
              className={`${classes} outline-none py-4 px-5 ${
                error
                  ? "border border-accent-red"
                  : "border border-primary-dark"
              }`}
              value={value}
              type={type}
              placeholder={placeholder}
              {...rest}
              disabled={disabled ? true : false}
            />
          </div>
          {error && (
            <span className="text-accent-red font-bold mt-1 text-xs">
              {errorMessage}
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Input;
