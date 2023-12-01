// const mongoose = require('mongoose')
import mongoose from 'mongoose'

// export const connectDB = (url) => {
//     return mongoose.connect(url)
// }

const ConnectDB = (url) => {
    return mongoose.connect(url, console.log('Connected'))

}

export default ConnectDB
