import { forwardRef, useMemo } from "react";
import cls from "clsx";
import styles from "./button.module.css";
import { IButtonProps } from "./Button.types";

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      color = "primary",
      type = "button",
      disabled = false,
      className = "",
      ...rest
    }: IButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cls(
          styles.button,
          { [styles[color]]: !disabled },
          className
        )}
        {...rest}
      >
        <span className={styles.text}> {children} </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
