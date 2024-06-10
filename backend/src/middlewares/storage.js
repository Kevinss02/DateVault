import multer from 'multer';

const saveImage = multer.diskStorage({
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
const filter = (req, file, cb) => {
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
export const deleteImage = multer;
