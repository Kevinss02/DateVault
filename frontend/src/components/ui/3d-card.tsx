/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '../../utils/cn';

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

type CardContainerProps = {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onClick?: () => void;
};

export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
  containerClassName,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current == null) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (containerRef.current == null) return;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current == null) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onClick}
          className={cn(
            'flex items-center justify-center relative transition-all duration-200 ease-linear',
            className,
          )}
          style={{
            transformStyle: 'preserve-3d',
            width: '100%', // Asegurar que el contenido interno ocupe todo el contenedor
            height: '100%', // Asegurar que el contenido interno ocupe todo el contenedor
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
  return (
    <div
      className={cn(
        'h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleAnimations = () => {
    if (ref.current == null) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/explicit-function-return-type
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider');
  }
  return context;
};
