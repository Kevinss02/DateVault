import React from 'react';

import { MemoryDataResponse } from '../types/types';
import { htmlToPlainText } from '../utils/functions';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

type CardProps = {
  className?: string;
  data: MemoryDataResponse;
  height: string;
  onClick: (id: string) => void;
};

const ThreeDCard: React.FC<CardProps> = ({
  className,
  data,
  height,
  onClick,
}) => {
  return (
    <CardContainer
      onClick={() => {
        onClick(data._id);
      }}
    >
      <CardBody
        className={`group/card flex w-auto flex-col rounded-xl border border-black/[0.1] bg-gray-50 p-6 shadow-lg sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] ${
          data.imagesUrl.length > 0 ? 'h-auto' : height
        }`}
      >
        <CardItem
          translateZ='50'
          className='text-xl font-bold text-neutral-600 dark:text-white'
        >
          {data.title}
        </CardItem>

        <CardItem
          as='p'
          translateZ='60'
          className='mx-auto mt-2 max-w-sm text-xs text-neutral-500 dark:text-neutral-300'
        >
          {data._id}
        </CardItem>
        <CardItem
          as='p'
          translateZ='60'
          className='mx-auto mt-2 line-clamp-3 max-w-sm text-sm text-neutral-500 dark:text-neutral-300'
        >
          {htmlToPlainText(data.description)}
        </CardItem>
        <div className='mt-auto'>
          <CardItem
            translateZ='100'
            rotateX={20}
            rotateZ={-5}
            className={`mt-4 flex h-full w-full  items-center justify-center ${
              data.imagesUrl.length === 0 ? 'hidden' : ''
            }`}
          >
            <img
              src={``}
              className={`select-none rounded-xl object-cover group-hover/card:shadow-xl ${className}`}
              alt='thumbnail'
            />
          </CardItem>
          <CardItem
            as='p'
            translateZ='60'
            className='mt-2 max-w-sm truncate text-sm text-neutral-500 dark:text-neutral-300'
          >
            {data.location}
          </CardItem>

          <CardItem
            as='p'
            translateZ='60'
            className='mt-2 flex w-48 max-w-sm justify-end text-sm text-neutral-500 dark:text-neutral-300 '
          >
            {data.date}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ThreeDCard;
