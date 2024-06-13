import { motion, useScroll, useTransform } from 'framer-motion';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { MemoryDataResponse } from '../../types/types';
import { cn } from '../../utils/cn';
import ThreeDCard from '../ThreeDCard';

export const ParallaxScroll = ({
  memories,
  className,
  title,
}: {
  memories: MemoryDataResponse[] | null;
  className?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
}) => {
  const gridRef = React.useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ['start start', 'end start'], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const firstPart: MemoryDataResponse[] = [];
  const secondPart: MemoryDataResponse[] = [];
  const thirdPart: MemoryDataResponse[] = [];

  const navigate = useNavigate();

  memories?.forEach((mem, index) => {
    if (index % 3 === 0) {
      firstPart.push(mem);
    } else if (index % 3 === 1) {
      secondPart.push(mem);
    } else {
      thirdPart.push(mem);
    }
  });

  return (
    <div
      className={cn(
        'h-[40rem] items-start py-6 overflow-y-auto w-full',
        className,
      )}
      ref={gridRef}
    >
      <h1 className='font-cute mb-5 mt-3 select-none text-5xl font-bold tracking-widest text-zinc-600'>
        {title}
      </h1>

      <div
        className='mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 px-10 md:grid-cols-2 lg:grid-cols-3'
        ref={gridRef}
      >
        <div className='grid gap-10'>
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={'grid-1' + idx + 1}
            >
              <ThreeDCard
                data={el}
                height='h-72'
                onClick={(id: string) => {
                  navigate(`/vault/view/${id}`);
                }}
                className='!m-0 w-full max-w-xs gap-10 rounded-lg object-cover object-left-top !p-0'
              />
            </motion.div>
          ))}
        </div>
        <div className='grid gap-10'>
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={'grid-2' + idx}>
              <ThreeDCard
                data={el}
                height='h-72'
                onClick={(id: string) => {
                  navigate(`/vault/view/${id}`);
                }}
                className='!m-0 w-full max-w-xs gap-10 overflow-hidden rounded-lg object-cover object-left-top !p-0'
              />
            </motion.div>
          ))}
        </div>
        <div className='grid gap-10'>
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={'grid-3' + idx}>
              <ThreeDCard
                data={el}
                height='h-72'
                onClick={(id: string) => {
                  navigate(`/vault/view/${id}`);
                }}
                className='!m-0 w-full max-w-xs gap-10 overflow-hidden rounded-lg object-cover object-left-top !p-0'
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
