import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type SidebarProps = {
  className?: string;
  children: any; // TODO
  logo?: string;
  userName: string;
  email: string;
};

type SidebarItemProps = {
  className?: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  alert?: boolean;
  onClick?: () => void;
};

type SidebarContextProps = {
  expanded?: boolean;
};

const defaultValue: SidebarContextProps = {
  expanded: true,
};

const SidebarContext = React.createContext<SidebarContextProps>(defaultValue);
export function Sidebar({
  children,
  className,
  logo,
  userName,
  email,
}: SidebarProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <aside className={`${className}`}>
      <nav className='flex h-full flex-col rounded-r-lg bg-white opacity-95 shadow-lg'>
        <div className='flex items-center justify-between p-4 pb-2'>
          <img
            src='logo-pink.jpeg'
            className={`overflow-hidden rounded-full transition-all ${
              expanded ? 'w-24' : 'w-0'
            }`}
            alt='Logo oficial'
          ></img>

          <button
            onClick={() => {
              setExpanded((curr) => !curr);
            }}
            className='rounded-full bg-gray-200 p-1.5 hover:bg-gray-300'
          >
            {expanded ? (
              <FaChevronLeft size={30} />
            ) : (
              <FaChevronRight size={30} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SidebarContext.Provider>

        <div className='flex border-t p-3'>
          <img
            src={`${logo ?? 'logo-pink.jpeg'}`}
            className='size-12 rounded-full'
            alt='`Profile picture'
          />
          <div
            className={`flex items-center justify-between overflow-hidden rounded-full transition-all ${
              expanded ? 'ms-3 w-52' : 'w-0'
            }`}
          >
            <div className='ms-2 leading-4'>
              <h4 className='font-cute'>{userName}</h4>
              <span className='text-xs text-gray-600'>{email}</span>
            </div>
            <BsThreeDotsVertical />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  alert,
  className,
  onClick,
}) => {
  const { expanded } = React.useContext(SidebarContext);
  return (
    <li
      onClick={onClick}
      className={
        `group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-all duration-100 ease-in-out hover:scale-105 hover:rounded-xl hover:brightness-110 active:scale-75 ${
          active ? '' : 'text-gray-600 hover:bg-indigo-50'
        }` + className
      }
      style={{
        background:
          'linear-gradient(90deg, rgba(175,122,197,1) 0%, rgba(248,187,208,1) 100%, rgba(0,212,255,1) 100%)',
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ?? false ? 'ml-3 w-52' : 'w-0'
        }`}
      >
        {text}
      </span>
      {(alert ?? false) && (
        <div
          className={`absolute right-2 size-2 rounded bg-neutral-800 ${
            expanded ?? false ? '' : 'top-2'
          }`}
        />
      )}
    </li>
  );
};
