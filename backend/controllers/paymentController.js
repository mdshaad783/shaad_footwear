import PaytmChecksum from "paytmchecksum";
import dotenv from "dotenv";
dotenv.config();

export const initiatePaytmPayment = async (req, res) => {
  const { orderId, amount, email } = req.body;

  const paytmParams = {
    MID: process.env.PAYTM_MID,
    WEBSITE: "WEBSTAGING",
    INDUSTRY_TYPE_ID: "Retail",
    CHANNEL_ID: "WEB",
    ORDER_ID: orderId,
    CUST_ID: email,
    TXN_AMOUNT: amount,
    CALLBACK_URL: "http://localhost:5000/api/paytm/callback",
    EMAIL: email,
  };

  const checksum = await PaytmChecksum.generateSignature(
    paytmParams,
    process.env.PAYTM_MKEY
  );
  const fullParams = { ...paytmParams, CHECKSUMHASH: checksum };

  res.json(fullParams);
};
