/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AddButton from '../components/AddButton';
import FileUpload from '../components/FileUpload';
import ImgCarousel from '../components/ImgCarousel';
import TipTap from '../components/Tiptap';
import { useMemStore } from '../store/memStore';
import { MemoryDataResponse } from '../types/types';
import { htmlToPlainText } from '../utils/functions';

function MemoryView(): React.JSX.Element {
  const [memory, setMemory] = React.useState<MemoryDataResponse>({
    title: '',
    description: '',
    feelings: '',
    date: '',
    location: '',
    imagesUrl: [],
    _id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const navigate = useNavigate();
  const params = useParams();

  const { mems, deleteMem, editMem, deleteImg, loadMems } = useMemStore();

  const [uploaded, setUploaded] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleDelete = (id: string) => {
    void deleteMem(id);
    navigate('/vault');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  React.useEffect(() => {
    if (params['id'] != null) {
      const newMem = mems?.find((mem) => mem._id === params['id']) ?? undefined;
      if (newMem == null) {
        console.log('Load');
        void loadMems();
      }
    }
  }, [loadMems, mems, params]);

  React.useEffect(() => {
    if (params['id'] != null) {
      const newMem = mems?.find((mem) => mem._id === params['id']) ?? undefined;
      if (newMem != null) {
        setMemory(newMem);
      }
    }
  }, [params, mems, uploaded]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const fileInputRef2 = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      try {
        void editMem({ ...memory, images: file }, memory._id);
        setUploaded(true);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        setUploaded(false);
      }
    }
  };

  const handleSecondImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file != null) {
      try {
        void editMem({ ...memory, images: file }, memory._id);
        setUploaded(true);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        setUploaded(false);
      }
    }
  };

  const handleImageDelete = (img: string) => {
    if (img != null) {
      try {
        const newImagesUrl = memory.imagesUrl.filter((i) => i !== img);
        void editMem({ ...memory, imagesUrl: newImagesUrl }, memory._id);
        void deleteImg(img);
        if (newImagesUrl.length === 0) {
          setUploaded(false);
        } else {
          setUploaded(true);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  const handleSaveTitle = (title: string) => {
    const newTitle = htmlToPlainText(title);
    setMemory((prevMemory) => {
      void editMem({ ...prevMemory, title: newTitle }, prevMemory._id);
      return { ...prevMemory, title: newTitle };
    });
  };

  const handleSaveDate = (date: string) => {
    const newDate = htmlToPlainText(date);
    setMemory((prevMemory) => {
      void editMem({ ...prevMemory, date: newDate }, prevMemory._id);
      return { ...prevMemory, date: newDate };
    });
  };

  const handleSaveLocation = (location: string) => {
    const newLocation = htmlToPlainText(location);
    setMemory((prevMemory) => {
      void editMem({ ...prevMemory, location: newLocation }, prevMemory._id);
      return { ...prevMemory, location: newLocation };
    });
  };

  const handleSaveDescription = (newDescription: string) => {
    setMemory((prevMemory) => {
      void editMem(
        { ...prevMemory, description: newDescription },
        prevMemory._id,
      );
      return { ...prevMemory, description: newDescription };
    });
  };

  return (
    <section className='custom-scrollbar relative flex min-h-[100vh] w-full min-w-min items-center justify-center overflow-hidden bg-zinc-600'>
      <div className='absolute top-0 mt-[6%] h-[92%] w-[85%] rounded-2xl bg-zinc-600 opacity-45 mix-blend-multiply blur-2xl xl:mt-[3%] xl:h-[93%] 2xl:mt-[7%] 2xl:h-[75%]'></div>

      <div className='relative m-5 flex h-screen w-full min-w-min rounded-3xl bg-neutral-900 p-4 shadow-xl sm:p-20'>
        <div className='flex w-2/3 flex-col overflow-y-auto rounded-l-3xl bg-neutral-800 text-slate-200'>
          <div className='font-cute mx-auto mt-12 flex justify-between italic tracking-wide text-slate-200'>
            <TipTap
              edit={isEditing}
              toolbar={false}
              description={memory.title}
              onChange={handleSaveTitle}
              className='font-cute mx-auto text-4xl capitalize'
            />
            <TipTap
              edit={isEditing}
              toolbar={false}
              description={memory.date}
              onChange={handleSaveDate}
              className='font-cute relative start-full text-lg'
            />
          </div>

          <TipTap
            edit={isEditing}
            toolbar={false}
            description={memory.location}
            onChange={handleSaveLocation}
            className='font-cute mt-3 flex justify-center capitalize italic tracking-wide'
          />
          <div className='font-magic mt-10 text-slate-200'>
            <TipTap
              edit={isEditing}
              description={memory.description}
              onChange={handleSaveDescription}
              className='mt-3  px-5 text-left text-xl'
              toolbarClassName='text-neutral-800 bg-white rounded-lg mb-3'
            />
          </div>

          {/* Edit / Save & Delete */}
          <div className='grow'></div>
          <div className='font-cute sticky bottom-5 mx-auto mt-5 flex h-10  select-none justify-between gap-5 bg-neutral-800 text-white'>
            <button
              onClick={() => {
                isEditing ? setIsEditing(false) : handleEdit();
              }}
              className=' rounded-lg'
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
              onClick={() => {
                handleDelete(params['id'] ?? '');
              }}
              className=' select-none rounded-lg'
            >
              Delete
            </button>
          </div>
        </div>

        <div className='custom-pink-gradient relative flex w-1/2 items-center justify-center rounded-r-3xl'>
          <div
            className={`relative flex flex-col items-center justify-center ${
              memory.imagesUrl.length > 0 ? 'hidden' : ''
            }`}
          >
            <div className='absolute flex h-52 w-56 items-center justify-center rounded-full bg-neutral-800' />
            <div className='absolute h-[50%] w-[75%] rounded-2xl bg-zinc-600 opacity-30 mix-blend-multiply blur-lg'></div>
            <div className='relative grid'>
              <img
                src='/polaroids.png'
                className='relative top-3 h-auto w-[19rem] select-none'
              />
              <AddButton
                title='Upload Image'
                onClick={() => {
                  if (fileInputRef.current != null) {
                    fileInputRef.current.click();
                  }
                }}
                className='relative -end-24 -top-2 w-28'
              />
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
            <div
              className={`font-cute relative mt-4 text-3xl font-bold text-neutral-800 ${
                memory.imagesUrl.length > 0 ? 'hidden' : ''
              }`}
            >
              <p>Upload images</p>
            </div>
          </div>

          {memory.imagesUrl.length > 0 && (
            <div className='mb-24 flex items-center justify-center'>
              <ImgCarousel
                urls={memory.imagesUrl}
                deleteSize={40}
                onClickDelete={handleImageDelete}
              />

              <div className='absolute bottom-7 right-10'>
                <FileUpload
                  size={40}
                  className='w-24'
                  onClick={() => {
                    if (fileInputRef2.current != null) {
                      fileInputRef2.current.click();
                    }
                  }}
                />
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef2}
                  style={{ display: 'none' }}
                  onChange={handleSecondImageUpload}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MemoryView;
