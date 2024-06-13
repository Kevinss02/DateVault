import cn from 'classnames';
import React from 'react';

type AddButtonProps = {
  className?: string;
  onClick?: () => void;
  title: string;
};

const AddButton: React.FC<AddButtonProps> = ({ className, onClick, title }) => {
  return (
    <div
      className={cn(
        'rounded-sm text-sm group cursor-pointer duration-200 hover:rotate-90',
        className,
      )}
    >
      <button title={title} onClick={onClick} className=' '>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='90px'
          height='90px'
          viewBox='0 0 24 24'
          className='fill-neutral-200 stroke-neutral-900 duration-200 group-active:fill-slate-600'
        >
          <path
            d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
            strokeWidth='1.5'
          ></path>
          <path d='M8 12H16' strokeWidth='1.5'></path>
          <path d='M12 16V8' strokeWidth='1.5'></path>
        </svg>
      </button>
    </div>
  );
};

export default AddButton;
