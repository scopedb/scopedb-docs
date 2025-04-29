import type {ReactNode} from 'react';
import './Button.css';

export type ButtonType = 'default' | 'tertiary' | 'primary' | 'info' | 'success' | 'warning' | 'error';
export type ButtonAttrType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  icon?: ReactNode;
  children?: ReactNode;
  type?: ButtonType;
  attrType?: ButtonAttrType;
  disabled?: boolean;
  textColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const typeClassMap: Record<ButtonType, string> = {
  default: 'btn-default',
  tertiary: 'btn-tertiary',
  primary: 'btn-primary',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

export function Button({
  icon,
  children,
  type = 'default',
  attrType = 'button',
  disabled = false,
  textColor,
  className = '',
  style = {},
  onClick,
}: ButtonProps) {
  const colorStyle = textColor ? {color: textColor, ...style} : style;
  return (
    <button
      type={attrType}
      className={`scopedb-btn ${typeClassMap[type]}${disabled ? ' btn-disabled' : ''} ${className}`.trim()}
      style={colorStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children && <span className="btn-content">{children}</span>}
    </button>
  );
}
