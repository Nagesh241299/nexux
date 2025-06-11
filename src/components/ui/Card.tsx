import React, { ReactNode, MouseEvent } from 'react';

interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  clickable?: boolean;
  bordered?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

function Card(props: CardProps): JSX.Element {
  const {
    header,
    footer,
    children,
    className = '',
    bodyClassName = '',
    clickable = false,
    bordered = true,
    onClick,
  } = props;

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-sm transition 
        ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''} 
        ${clickable ? 'cursor-pointer hover:shadow-md' : ''} 
        ${className}
      `}
      onClick={onClick}
    >
      {header && (
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-primary font-extrabold text-2xl">
          {header}
        </div>
      )}

      <div className={`px-4 py-4 text-gray-700 ${bodyClassName}`}>
        {children}
      </div>

      {footer && (
        <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
