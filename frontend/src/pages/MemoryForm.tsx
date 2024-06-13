/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMemStore } from '../store/memStore';
import { MemoryData, MemoryDataResponse } from '../types/types';

function MemoryForm(): React.JSX.Element {
  const [memory, setMemory] = React.useState<MemoryData & { _id: string }>({
    title: '',
    description: '',
    feelings: '',
    date: '',
    location: '',
    imagesUrl: [],
    _id: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  const { mems, createMem, editMem } = useMemStore();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMemory({
      ...memory,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (params['id'] != null) {
      void editMem(memory, params['id']);
      navigate(`/vault/view/${params['id']}`);
    } else {
      void createMem(memory);
      navigate('/vault');
    }
  };

  React.useEffect(() => {
    if (params['id'] != null) {
      const newMem =
        mems?.find((mem: MemoryDataResponse) => mem._id === params['id']) ??
        null;

      if (newMem != null) {
        setMemory(newMem);
      }
    }
  }, [mems, params]);

  return (
    <div className='flex h-screen items-center justify-center'>
      <form onSubmit={handleSubmit} className='m-auto max-w-sm bg-zinc-800 p-4'>
        <label htmlFor='title' className='mb-2 block text-sm font-bold'>
          Title:
        </label>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={memory.title}
          onChange={handleChange}
          className='mb-5 w-full rounded-md bg-zinc-600 p-2'
        />

        <label htmlFor='description' className='mb-2 block text-sm font-bold'>
          Description:
        </label>
        <textarea
          name='description'
          placeholder='description'
          value={memory.description}
          onChange={handleChange}
          className='mb-3 w-full rounded-md bg-zinc-600 p-2'
        />

        <label htmlFor='location' className='mb-2 block text-sm font-bold'>
          Location:
        </label>
        <textarea
          name='location'
          placeholder='location'
          value={memory.location}
          onChange={handleChange}
          className='mb-3 w-full rounded-md bg-zinc-600 p-2'
        />

        <label htmlFor='feelings' className='mb-2 block text-sm font-bold'>
          Feelings:
        </label>
        <textarea
          name='feelings'
          placeholder='How did you feel?'
          value={memory.feelings}
          onChange={handleChange}
          className='mb-3 w-full rounded-md bg-zinc-600 p-2'
        />

        <label htmlFor='date' className='mb-2 block text-sm font-bold'>
          Date:
        </label>
        <textarea
          name='date'
          placeholder='28/04/2023'
          value={memory.date}
          onChange={handleChange}
          className='mb-3 w-full rounded-md bg-zinc-600 p-2'
        />

        <div className='flex justify-center'>
          <button className='rounded-md bg-indigo-600 px-2 py-1'>Save</button>
        </div>
      </form>
    </div>
  );
}

export default MemoryForm;
