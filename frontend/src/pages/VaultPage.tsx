import { Popcorn } from 'lucide-react';
import * as React from 'react';
import { AiFillPicture } from 'react-icons/ai';
import { IoMdHelpCircle } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import AddButton from '../components/AddButton';
import { Sidebar, SidebarItem } from '../components/Sidebar';
import { ParallaxScroll } from '../components/ui/parallax-scroll';
import { useAuthStore } from '../store/authStore';
import { useMemStore } from '../store/memStore';
import { MemoryData, MemoryDataResponse } from '../types/types';
import { formatDate } from '../utils/functions';

function HomePage(): React.JSX.Element {
  const { mems, loadMems, loadedMems, createMem } = useMemStore();
  const { user } = useAuthStore();

  console.log('MEMS:', mems);
  console.log('User', user);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchData = async () => {
      try {
        await loadMems();
      } catch (error) {
        console.error('Error loading mems:', error);
      }
    };

    void fetchData();
  }, [loadMems]);

  const navigate = useNavigate();

  const handleCreateMemory = async (): Promise<void> => {
    const memory: MemoryData = {
      title: 'Insert Title',
      description: 'Insert Description',
      date: formatDate(new Date()),
      feelings: 'good',
      location: 'Insert Location',
      imagesUrl: [],
    };

    try {
      const newMem: MemoryDataResponse | undefined = await createMem(memory);
      console.log(newMem);
      if (newMem?._id != null) {
        console.log(newMem);
        navigate(`/vault/view/${newMem._id}`);
      } else {
        console.error('Error: Memory creation response does not contain _id');
      }
    } catch (error) {
      console.error('Error creating memory:', error);
    }
  };
  return (
    <section className='custom-scrollbar flex min-h-screen min-w-min items-center justify-center bg-zinc-600'>
      <div className='absolute top-0 mt-[6%] h-[92%] w-[85%] rounded-2xl bg-zinc-600 opacity-45 mix-blend-multiply blur-2xl xl:mt-[3%] xl:h-[93%] 2xl:mt-[7%] 2xl:h-[75%]'></div>

      <div className='fixed h-[90%] w-[80%] rounded-2xl bg-slate-200'>
        <div className='h-full w-full overflow-hidden'>
          <h1
            className={`font-cute my-5 select-none text-5xl font-bold tracking-widest text-zinc-600 ${
              loadedMems && 'hidden'
            }`}
          >
            Memories
          </h1>
          <ParallaxScroll
            memories={mems}
            title='Memories'
            className={`${!loadedMems && 'hidden'}`}
          />
        </div>
        <AddButton
          title='Create New Memorie'
          onClick={handleCreateMemory}
          className={`absolute -bottom-8 -right-7 ${
            loadedMems ? '' : 'hidden'
          }`}
        />
      </div>

      <Sidebar
        userName={user?.username ?? ''}
        email={user?.email ?? ''}
        className='fixed start-0 h-screen'
      >
        <p className='my-12' />
        <SidebarItem
          icon={<AiFillPicture size={20} />}
          text='Vault'
          onClick={() => {
            navigate('/vault');
          }}
          active
          alert
        />
        <p className='my-3' />
        <SidebarItem
          icon={<Popcorn size={20} />}
          text='Cinema'
          active
          onClick={() => {
            navigate('/cinema');
          }}
        />

        <hr className='my-3' />

        <SidebarItem
          icon={<IoSettingsSharp size={20} />}
          text='Settings'
          active
        />
        <p className='my-3'></p>
        <SidebarItem icon={<IoMdHelpCircle size={20} />} text='Help' active />
      </Sidebar>

      <div
        className={`absolute mt-10 flex items-center justify-center ${
          loadedMems && 'hidden'
        }`}
      >
        <div
          className='absolute flex h-52 w-56 items-center justify-center rounded-full '
          style={{
            background:
              'linear-gradient(90deg, hsla(282, 39%, 63%, 1) 0%, hsla(339, 81%, 85%, 1) 100%)',
          }}
        />
        <div className='absolute -right-4 -top-1 h-12 w-12 rounded-full bg-custom-purple'></div>
        <div className='absolute -left-1 top-56 ms-4 h-8 w-8 rounded-full bg-custom-purple'></div>
        <div className='absolute -right-0 mt-1 h-7 w-7 rounded-full bg-custom-purple'></div>
        <div className='absolute -right-12 top-12 mt-4 h-9 w-9 rounded-full bg-custom-purple'></div>
        <div className='absolute h-[50%] w-[75%] rounded-2xl bg-zinc-600 opacity-35 mix-blend-multiply blur-lg'></div>
        <div className='relative grid'>
          <img
            src='polaroids.png'
            className='relative top-3 h-auto w-[19rem] select-none'
          />

          <AddButton
            title='Create New Memorie'
            onClick={handleCreateMemory}
            className={`relative -top-2`}
          />
        </div>
      </div>

      <div
        className={`font-cute relative -bottom-60 text-3xl text-zinc-600 ${
          loadedMems && 'hidden'
        }`}
      >
        <p>No Memories :(</p>
      </div>
    </section>
  );
}

export default HomePage;
