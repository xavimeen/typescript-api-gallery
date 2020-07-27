import {connect} from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function startConnection() {
    try {
        await connect(MONGODB_URI || 'localDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log(`DB conectada`);
    } catch (error) {
        console.log(error);
    }
};