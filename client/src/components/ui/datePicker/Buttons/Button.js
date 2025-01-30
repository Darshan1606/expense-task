import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useConfig } from "../ConfigProvider";

const SIZES = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
};

const CONTROL_SIZES = {
  [SIZES.XS]: 7,
  [SIZES.SM]: 9,
  [SIZES.MD]: 11,
  [SIZES.LG]: 14,
};
const Button = React.forwardRef((props, ref) => {
  const {
    children,
    size,
    color,
    shape,
    variant,
    block,
    icon,
    className,
    disabled,
    loading,
    active,
    danger,
    ...rest
  } = props;
  const { themeColor, controlSize } = useConfig();

  const defaultClass = "button";
  const sizeIconClass = "inline-flex items-center justify-center";

  const splitedColor = color.split("-");

  const buttonSize = size || controlSize;
  const buttonColor = splitedColor[0] || themeColor;
  const getButtonSize = () => {
    let sizeClass = "";
    switch (buttonSize) {
      case SIZES.LG:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.lg}`,
          icon && !children
            ? `w-${CONTROL_SIZES.lg} ${sizeIconClass} text-2xl`
            : "px-8 py-2 text-base"
        );
        break;
      case SIZES.SM:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.sm}`,
          icon && !children
            ? `w-${CONTROL_SIZES.sm} ${sizeIconClass} text-lg`
            : "px-3 py-2 text-sm"
        );
        break;
      case SIZES.XS:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.xs}`,
          icon && !children
            ? `w-${CONTROL_SIZES.xs} ${sizeIconClass} text-base`
            : "px-3 py-1 text-xs"
        );
        break;
      default:
        sizeClass = classNames(
          `h-${CONTROL_SIZES.md}`,
          icon && !children
            ? `w-${CONTROL_SIZES.md} ${sizeIconClass} text-xl`
            : "px-8 py-2"
        );
        break;
    }
    return sizeClass;
  };

  const disabledClass = "opacity-50 cursor-not-allowed";

  const solidColor = () => {
    const btn = {
      bgColor: active ? `bg-${buttonColor}` : `bg-${buttonColor}`,
      textColor: "text-white",
      hoverColor: active ? "" : `hover:bg-${buttonColor}`,
      activeColor: `active:bg-${buttonColor}`,
    };
    return getBtnColor(btn);
  };

  const twoToneColor = () => {
    const btn = {
      bgColor: active
        ? `bg-${buttonColor} `
        : `bg-${buttonColor} `,
      textColor: `text-${buttonColor}`,
      hoverColor: active
        ? ""
        : `hover:bg-${buttonColor}-100 `,
      activeColor: `active:bg-${buttonColor}`,
    };
    return getBtnColor(btn);
  };

  const defaultColor = () => {
    const btn = {
      bgColor: active
        ? `bg-gray-100 border border-gray-300`
        : `bg-white border border-gray-300`,
      textColor: `text-gray-600 `,
      hoverColor: active ? "" : `hover:bg-gray-100`,
      activeColor: `active:bg-gray-100`,
    };
    return getBtnColor(btn);
  };

  const plainColor = () => {
    const btn = {
      bgColor: active
        ? `bg-gray-100`
        : "bg-transparent border border-transparent",
      textColor: `text-gray-600 `,
      hoverColor: active ? "" : `hover:bg-gray-100 rounded-lg`,
      activeColor: `active:bg-gray-100`,
    };
    return getBtnColor(btn);
  };

  const getBtnColor = ({ bgColor, hoverColor, activeColor, textColor }) => {
    return `${bgColor} ${
      disabled || loading ? disabledClass : hoverColor + " " + activeColor
    } ${textColor}`;
  };

  const btnColor = () => {
    switch (variant) {
      case "solid":
        return solidColor();
      case "twoTone":
        return twoToneColor();
      case "plain":
        return plainColor();
      case "default":
        return defaultColor();
      default:
        return defaultColor();
    }
  };

  const classes = classNames(
    defaultClass,
    btnColor(),
    `radius-${shape}`,
    getButtonSize(),
    className,
    block ? "w-full" : ""
  );

  const handleClick = (e) => {
    const { onClick } = props;
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const renderChildren = () => {
    if (icon && !children && !loading) {
      return <>{icon}</>;
    }

    if (icon && children && !loading) {
      return (
        <span className="flex items-center justify-center">
          <span className="text-lg">{icon}</span>
          <span className="ltr:ml-1 rtl:mr-1">{children}</span>
        </span>
      );
    }

    return <>{children}</>;
  };

  return (
    <button ref={ref} className={classes} {...rest} onClick={handleClick}>
      {renderChildren()}
    </button>
  );
});

Button.propTypes = {
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  shape: PropTypes.oneOf(["round", "circle", "none"]),
  className: PropTypes.string,
  size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.XS, SIZES.MD]),
  color: PropTypes.string,
  variant: PropTypes.oneOf(["solid", "twoTone", "plain", "default"]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  active: PropTypes.bool,
};

Button.defaultProps = {
  variant: "default",
  shape: "round",
  active: false,
  loading: false,
  disabled: false,
  color: "",
};

export default Button;
