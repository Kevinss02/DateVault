import { Request } from 'express';
import multer, { FileFilterCallback, StorageEngine } from 'multer';

const saveImage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    if (file !== null) {
      const ext = file.originalname.split('.').pop();
      cb(null, `${Date.now()}.${ext}`);
    }
  },
});

const filter = (
  req: Request,
  file: { mimetype: string },
  cb: FileFilterCallback,
): void => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const uploadImage = multer({ storage: saveImage, fileFilter: filter });
