import mongoose from "mongoose";
import {$FIXME} from "@utils/constant";

const connection: $FIXME = {}

//FUNCTION TO CONNECT MONGO DB
export const dbConnect = async () => {

    //CHECK IF CONNECTED
    if (connection.isConnected) {
        return;
    }
    //ELSE CONNECT
    const db = await mongoose.connect(
        'mongodb://localhost:27017/barry-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
            promiseLibrary: global.Promise,
            connectTimeoutMS: 30000,

        }
    )
    connection.isConnected = db.connection.readyState
    console.log(connection.isConnected)
}
