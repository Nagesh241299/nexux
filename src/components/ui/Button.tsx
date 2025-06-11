import React, { forwardRef, MouseEvent, ReactNode } from 'react';
import classNames from 'classnames';

type ButtonVariant = 'solid' | 'default' | 'plain';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type ButtonShape = 'round' | 'circle' | 'none';
type IconAlignment = 'start' | 'end';

interface SimpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  icon?: ReactNode;
  iconAlignment?: IconAlignment;
  block?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'text-xs px-3 py-1',
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
};

const shapeClasses: Record<ButtonShape, string> = {
  round: 'rounded-lg',
  circle: 'rounded-full',
  none: 'rounded-none',
};

const getVariantClasses = (
  variant: ButtonVariant,
  disabled: boolean
): string => {
  if (disabled) return 'opacity-50 cursor-not-allowed';

  switch (variant) {
    case 'solid':
      return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'default':
      return 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600';
    case 'plain':
      return 'bg-transparent text-blue-600 hover:text-blue-800';
    default:
      return '';
  }
};

export const Button = forwardRef<HTMLButtonElement, SimpleButtonProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      shape = 'round',
      loading = false,
      icon,
      iconAlignment = 'start',
      block = false,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={classNames(
          'inline-flex items-center justify-center transition duration-150 ease-in-out font-medium',
          sizeClasses[size],
          shapeClasses[shape],
          getVariantClasses(variant, !!isDisabled),
          block && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...rest}
      >
        {loading && <span className="loader mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
        {icon && iconAlignment === 'start' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconAlignment === 'end' && <span className="ml-2">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
