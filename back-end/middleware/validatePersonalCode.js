import Account from '../models/account.js'; 

const isValidPersonalCode = (code) => {
    const regex = /^\d{11}$/;
    return regex.test(code);
};

const validatePersonalCode = async (req, res, next) => {
    const { personalID } = req.body;

    if (!isValidPersonalCode(personalID)) {
        return res.status(400).json({ message: "Netinakams asmeninis kodas. Turi būti 11 skaičių." });
    }

    const existingAccount = await Account.findOne({ personalID });
    if (existingAccount) {
        return res.status(400).json({ message: "Toks asmeninis kodas jau egzistuoja." });
    }

    next();  
};

export default validatePersonalCode;
