// routes/index.js
import express from "express";
const router = express.Router();
import { TestNetWallet, Wallet } from "mainnet-js";
// import walletSchema from "./wallet_model.js";

// Define routes
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Endpoint to create a wallet
router.route('/create_wallet').get(async (req, res) => {
    try {
        const wallet = await Wallet.newRandom();
        const walletInfo = {
            cashaddr: wallet.cashaddr,
        };

        const balance = await wallet.getBalance();

        // const existingEmail = await walletSchema.findOne({ wallet_address: walletInfo.cashaddr })
        // if (existingEmail) return res.json({ message: "Wallet Address already Exists", success: false, status: 201 })

        // // Generate Password Hash
        // const result = await walletSchema.create({
        //     wallet_address: walletInfo.cashaddr,
        //     balance: balance.bch
        // })

        res.json({
            status: 200,
            data: {
                wallet_address: walletInfo.cashaddr,
                balance: balance.bch
            }
        });
    } catch (error) {
        // console.error("Error creating wallet:", error);
        res.status(500).json({ error: "Error creating wallet", message: error.message });
    }
});

// Endpoint to perform a transaction using TestNetWallet
router.route("/performTransaction").post(async (req, res) => {
    try {
        try {
            const { amount, user_wallet_address } = req.body
            const adminWallet = "bitcoincash:qrm2h4zsu67z78g0n90pu8hgkgtz78z3l543rkz336" //Admin wallet Address here;
            let balance = await adminWallet.waitForBalance(
                amount, //set amount
                "bch"
            );

            console.log(`${balance} bch are available! Sending...`);

            const result = await adminWallet.send([
                [user_wallet_address, amount, "bch"],
            ]);
            // note that you can send to multiple addresses in one command
            res.json({
                status: 200,
                data: result
            });
        } catch (error) {
            console.error("Error performing transaction:", error);
            res.status(500).json({ error: "Error performing transaction" });
        }
        // const seller = await TestNetWallet.named("seller");
        // const txData = await TestNetWallet.send([
        //     {
        //         cashaddr: seller.getDepositAddress(),
        //         value: 0.01,
        //         unit: "usd",
        //     },
        // ]);

        // res.json({
        //     transactionData: txData,
        // });
    } catch (error) {
        console.error("Error performing transaction:", error);
        res.status(500).json({ error: "Error performing transaction" });
    }
});

router.route('/fetch_price').post(async (req, res) => {
    try {
        const amount = req.body.amount
        // console.log("🚀 ~ file: controller.js:56 ~ router.route ~ amount:", amount)
        if (!amount) {
            res.status(500).json({ error: "Amount Field is required" });
        } else {
            const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=btc");
            if (!response.ok) { throw new Error("Network response was not ok."); }

            console.log(typeof amount)

            const data = await response.json();
            const ethPrice = data.usd.btc;
            const priceInBTC = ethPrice * amount;

            console.log(`Current price usd->btc: $${ethPrice}`);
            res.json({ status: 200, data: priceInBTC });
        }
    } catch (error) {
        console.log("🚀 ~ file: controller.js:73 ~ router.route ~ error:", error.message)
        res.json({ status: 400, message: "Something went wrong" });
    }
})

// Export the router
export default router;
// module.exports = router;
