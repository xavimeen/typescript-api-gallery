import {Router} from 'express';
import multer from '../libs/multer';
import {
    createPhoto,
    getPhotos,
    getPhoto,
    deletePhoto,
    updatePhoto } from '../controllers/photo.controller';

const router = Router();

router.get('/photos', getPhotos);
router.post('/photos', multer.single('image') , createPhoto);

router.get('/photos/:id', getPhoto);
router.put('/photos/:id', updatePhoto);
router.delete('/photos/:id', deletePhoto);


export default router;