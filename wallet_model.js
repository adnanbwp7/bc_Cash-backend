import mongoose from "mongoose"

const walletSchema = new mongoose.Schema({
    wallet_address: {
        type: String,
        required: [true, "Username Can't be Null"]
    },
    balance: {
        type: String,
        required: [true, "full_name Can't be Null"]
    },
})

export default mongoose.model('wallet', walletSchema)