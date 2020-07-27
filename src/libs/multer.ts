import multer from 'multer';
import {v4 as uuid} from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname)); // Null: no hay error, creo un id único + la extensión del archivo original
    }
});

export default multer({storage});