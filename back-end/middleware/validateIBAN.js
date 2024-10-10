const isValidLithuanianIBAN = (iban) => {
    const regex = /^LT\d{18}$/;  // IBAN for Lithuania is 'LT' + 18 digits
    return regex.test(iban);
};

const validateIBAN = (req, res, next) => {
    const { iban } = req.body;
    if (!iban || !isValidLithuanianIBAN(iban)) {
        return res.status(400).json({ message: "Netinkamas IBAN kodas. Turi būti tinkamas LT IBAN kodas." });
    }
    next();
};

export default validateIBAN;
