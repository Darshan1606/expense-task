import React from "react";
import Modal from "react-modal";
import classNames from "classnames";
import { motion } from "framer-motion";
import { theme } from "twin.macro";
import useWindowSize from "../../../hooks/useWindowSize";

const Dialog = (props) => {
  const currentSize = useWindowSize();

  const {
    children,
    className,
    width,
    height,
    style,
    isOpen,
    onClose,
    bodyOpenClassName,
    portalClassName,
    overlayClassName,
    contentClassName,
    closeTimeoutMS,
    ...rest
  } = props;

  const contentStyle = {
    content: {
      inset: "unset",
    },
    ...style,
  };

  if (width !== undefined) {
    contentStyle.content.width = width;

    if (
      currentSize.width <=
      parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ""))
    ) {
      contentStyle.content.width = "auto";
    }
  }
  if (height !== undefined) {
    contentStyle.content.height = height;
  }

  const defaultDialogContentClass = "dialog-content";

  const dialogClass = classNames(defaultDialogContentClass, contentClassName);

  return (
    <Modal
      className={{
        base: classNames("dialog", className),
        afterOpen: "dialog-after-open",
        beforeClose: "dialog-before-close",
      }}
      overlayClassName={{
        base: classNames("dialog-overlay", overlayClassName),
        afterOpen: "dialog-overlay-after-open",
        beforeClose: "dialog-overlay-before-close",
      }}
      portalClassName={classNames("dialog-portal", portalClassName)}
      bodyOpenClassName={classNames("dialog-open", bodyOpenClassName)}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{ ...contentStyle }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ transform: "scale(0.9)" }}
        animate={{
          transform: isOpen ? "scale(1)" : "scale(0.9)",
        }}
      >
        {children}
      </motion.div>
    </Modal>
  );
};

export default Dialog;
