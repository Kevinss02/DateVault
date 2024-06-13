import React from 'react';
import { RiImageAddFill } from 'react-icons/ri';

type FileUploadProps = {
  className?: string;
  size: number;
  onClick: () => void;
};

const FileUpload: React.FC<FileUploadProps> = ({
  className,
  size,
  onClick,
}) => {
  return (
    <label
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full bg-neutral-800 py-3 shadow-lg transition duration-300 ease-in-out hover:bg-neutral-700 hover:shadow-xl ${className}`}
      title='Upload Image'
    >
      <RiImageAddFill
        size={size}
        className='text-gray-300 transition duration-300 ease-in-out hover:text-white'
      />
    </label>
  );
};

export default FileUpload;
