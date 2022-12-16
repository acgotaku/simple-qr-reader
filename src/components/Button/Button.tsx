import  { forwardRef, useMemo } from 'react';
import cls from 'clsx';
import styles from './button.module.css';
import { IButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      color = 'primary',
      loading = false,
      type = 'button',
      disabled = false,
      className = '',
      ...rest
    }: IButtonProps,
    ref
  ) => {
    const disableState = useMemo(
      () => disabled || loading,
      [disabled, loading]
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disableState}
        className={cls(
          styles.button,
          { [styles[color]]: !disableState },
          className
        )}
        {...rest}
      >
        <span className={styles.text}> {children} </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
