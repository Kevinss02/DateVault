import * as React from 'react';

function HomePage(): React.JSX.Element {
  return (
    <section className='custom-scrollbar flex min-h-screen min-w-min items-center justify-center bg-zinc-600'>
      <div className='absolute top-0 mt-[6%] h-[92%] w-[85%] rounded-2xl bg-zinc-600 opacity-45 mix-blend-multiply blur-2xl xl:mt-[3%] xl:h-[93%] 2xl:mt-[7%] 2xl:h-[75%]'></div>

      <div className='fixed h-[90%] w-[80%] rounded-2xl bg-slate-200'>
        <div className='h-full w-full overflow-hidden'>
          <h1
            className={`font-cute my-5 select-none text-5xl font-bold tracking-widest text-zinc-600`}
          >
            Home Page
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
