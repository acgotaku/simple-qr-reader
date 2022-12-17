import React from 'react';

export type ButtonColor = 'standard' | 'primary' | 'danger' | 'outline';

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
}
