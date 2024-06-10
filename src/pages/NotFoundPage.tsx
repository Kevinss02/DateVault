import type React from 'react';
import { useNavigate } from 'react-router-dom';

import CuteButton from '../components/CuteButton';

function NotFoundPage(): React.JSX.Element {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleBackHomeClick = () => {
    navigate('/');
  };
  return (
    <section className='flex min-h-screen min-w-min items-center justify-center bg-zinc-600'>
      <div className='absolute top-0 mt-[6%] h-[92%] w-[85%] rounded-2xl bg-zinc-600 opacity-45 mix-blend-multiply blur-2xl xl:mt-[3%] xl:h-[93%] 2xl:mt-[7%] 2xl:h-[75%]'></div>
      <div className='fixed flex h-[90%] w-[80%] items-center justify-center overflow-hidden rounded-2xl bg-slate-200'>
        <div className='font-cute fixed top-0 mt-24 select-none text-5xl font-bold tracking-widest text-zinc-600'>
          <h1>Oooops!</h1>
          <p>Page Not found</p>
        </div>

        <p className='font-cute fixed me-12 select-none text-5xl font-bold tracking-widest text-zinc-600 '>
          404!
        </p>

        <img src='404cats.png' className='absolute w-[50%]'></img>

        <CuteButton
          onClick={handleBackHomeClick}
          className='font-cute relative -right-96 top-48 ms-5 mt-30 w-1/6  border-4 border-black text-xl'
        >
          Back Home
        </CuteButton>
      </div>
    </section>
  );
}

export default NotFoundPage;
