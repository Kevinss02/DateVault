/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';

type ImgCarouselProps = {
  urls: string[];
  deleteSize: number;
  onClickDelete: (img: string) => void;
};

const ImgCarousel: React.FC<ImgCarouselProps> = ({
  urls,
  deleteSize,
  onClickDelete,
}) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = currentIndex === urls.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleImageDelete = (img: string) => {
    onClickDelete(img);
    urls.filter((_url, index) => index !== currentIndex);
    setCurrentIndex(0); // Reset to the first image after deletion
  };

  return (
    <div className='group relative size-full'>
      <div className='relative h-full w-80'>
        <TiDelete
          size={deleteSize}
          className='absolute -top-5 right-4 hidden cursor-pointer rounded-full bg-black/20 text-3xl text-white group-hover:block'
          onClick={() => {
            handleImageDelete(urls[currentIndex] ?? '');
          }}
        />
        <img
          src={`${import.meta.env['VITE_BACKEND_URI']}${urls[currentIndex]}`}
          className='mx-auto h-80 w-60 select-none rounded-xl object-cover group-hover:shadow-2xl'
          alt='thumbnail'
        />
      </div>
      {urls.length > 1 && (
        <>
          {/* Left Arrow */}
          <div className='absolute -left-5 top-[50%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className='absolute -right-5 top-[50%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className='absolute mt-3 flex w-full justify-center'>
            {urls.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => {
                  goToSlide(slideIndex);
                }}
                className={`cursor-pointer p-1 ${
                  slideIndex === currentIndex
                    ? 'text-4xl'
                    : 'text-2xl text-white'
                }`}
              >
                <AiFillHeart />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImgCarousel;
