import dotenv from 'dotenv';

dotenv.config();

import app from './server';
import {startConnection} from './database';


async function main() {
    startConnection();
    await app.listen(app.get('port'));
    console.log(`Servidor en el puerto`, app.get('port'));
};

main();