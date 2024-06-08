import fs from 'fs';
import path from 'path';

export const deleteImage = (imagePath: string): void => {
  const directory = path.dirname(imagePath);
  const filename = path.basename(imagePath, path.extname(imagePath));

  fs.readdir(directory, (err, files) => {
    if (err != null) {
      console.error(`Error al leer el directorio: ${err.message}`);
      return;
    }

    const imagesToDelete = files.filter((file) => {
      const nameWithoutExtension = path.basename(file, path.extname(file));
      return nameWithoutExtension === filename;
    });

    imagesToDelete.forEach((image) => {
      fs.unlink(path.join(directory, image), (err) => {
        if (err != null) {
          console.error(`Error al borrar la imagen ${image}: ${err.message}`);
        } else {
          console.log(`Imagen ${image} borrada correctamente`);
        }
      });
    });
  });
};
