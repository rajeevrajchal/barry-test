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
        'mongodb+srv://rrajchal:freelance@barry-test.5gyfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
