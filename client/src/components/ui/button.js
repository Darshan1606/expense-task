import React from "react";
import classNames from "classnames";
import { motion } from "framer-motion";

const Button = (props) => {
  const {
    children,
    size,
    variant,
    block,
    className,
    loading,
    disabled,
    startIcon,
    endIcon,
    width,
    ...rest
  } = props;

  const defaultClass = `button`;

  const getButtonSize = () => {
    let sizeClass = "";
    switch (size) {
      case "large":
        sizeClass = classNames(
          `${
            width ? `w-[${width}px]` : `w-fit`
          }   px-[28px] py-[18px]  text-base rounded-xl`
        );
        break;
      case "medium":
        sizeClass = classNames(
          `${
            width ? `w-[${width}px]` : `w-fit`
          }  px-[24px] py-[12px] text-sm rounded-lg`
        );
        break;
      case "small":
        sizeClass = classNames(
          `${
            width ? `w-[${width}px]` : `w-fit`
          } px-[16px] py-[8px] text-sm rounded-lg`
        );
        break;
      default:
        sizeClass = classNames(
          `${
            width ? `w-[${width}px]` : `w-fit`
          }  px-[20px] py-[10px] 1xl:px-[24px] 1xl:py-[12px] text-sm rounded-lg`
        );
        break;
    }
    return sizeClass;
  };

  const getButtonVariant = () => {
    let variantClass = "";
    switch (variant) {
      case "contained":
        variantClass = classNames(`bg-primary-dark rounded-md text-white`);
        break;
      case "outlined":
        variantClass = classNames(
          `hover:text-primary-dark text-primary-dark bg-white`
        );
        break;
      case "smalloutlined":
        variantClass = classNames(
          `border border-primary-dark rounded-md outline-none text-primary-dark`
        );
        break;
      default:
        variantClass = classNames(`hover:text-white`);
        break;
    }
    return variantClass;
  };

  const classes = classNames(
    defaultClass,
    getButtonSize(),
    getButtonVariant(),
    className,
    block ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : ""
  );

  const handleClick = (e) => {
    const { onClick } = props;
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`${classes} `}
        disabled={disabled || loading}
        {...rest}
      >
        <div className="flex justify-center items-center gap-2">
          {startIcon && <span>{startIcon}</span>}
          <span className="whitespace-nowrap font-medium">{children}</span>
          {endIcon && <span>{endIcon}</span>}
        </div>
      </motion.button>
    </>
  );
};

export default Button;
