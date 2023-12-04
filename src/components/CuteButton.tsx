import PropTypes from 'prop-types';
import type React from 'react';

type CuteButtonProps = {
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const CuteButton = function ({
  onClick,
  className,
  style,
  children,
  type = 'button',
}: CuteButtonProps): React.JSX.Element {
  return (
    <button
      className={`custom-pink-gradient mb-3 w-full select-none rounded pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-gray-750 outline-none
        transition-all duration-100 ease-in-out hover:scale-105 hover:rounded-xl hover:brightness-110 active:scale-75 ${className}`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

CuteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default CuteButton;
