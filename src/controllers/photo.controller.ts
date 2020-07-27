import {Request, Response} from 'express';
import Photo from '../models/Photo';
import path from 'path';
import fs from 'fs-extra';

export async function getPhotos(req: Request, res: Response): Promise<Response> {
    try {
        const photos = await Photo.find();
        return res.json(photos);
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'No se pudo encontrar las fotos en la DB',
            error
        });
    }
};

export async function getPhoto(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const photo = await Photo.findById(id);
        return res.json(photo);
    } catch (error) {
        console.log(error)
        res.json({
            message: 'No se pudo encontrar las fotos en la DB',
            error
        });
    }
};

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    try {
        const {title, description} = req.body;
        const newPhoto = {
            title,
            description,
            imagePath: req.file.path
        };
        const photo = new Photo(newPhoto);
        await photo.save();
        return res.json({
            message: 'Foto subida correctamente',
            photo
        });
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Hubo un error al intentar subir la foto, intente luego',
            error
        });
    }
};

export async function updatePhoto(req: Request, res: Response): Promise<Response> {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        const photo = await Photo.findByIdAndUpdate(id, {
            title,
            description
        }, {new: true});
        return res.json({
            message: 'Foto actualizada correctamente.',
            photo
        });
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Hubo un error al intentar actualizar la foto, intente luego',
            error
        });
    }
};

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
    try {
        const {id} = req.params;
        const photo = await Photo.findByIdAndDelete(id); // eliminamos datos de la DB
        if(photo) {
            // TO DO: si el archivo no existe
            await fs.unlink( path.resolve(photo.imagePath) ); // eliminamos archivo del server
        }
        return res.json({
            message: 'Foto eliminada correctamente.',
            photo
        });
    } catch (error) {
        console.log(error);
        return res.json({
            message: 'Hubo un error al intentar actualizar la foto, intente luego',
            error
        });
    }
};
