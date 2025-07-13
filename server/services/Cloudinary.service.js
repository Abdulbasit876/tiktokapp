import cloudinary from '../config/cloudinary.config.js'; 
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
   resource_type: 'auto', 
   public_id: (req, file) => {
      return file.fieldname + '-' + Date.now(); 
  },
}
}   );

const upload = multer({ storage: storage });
export default upload;
