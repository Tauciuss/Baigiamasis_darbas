const validateAmount = (req, res, next) => {
    const { amount } = req.body;

    if (amount == null || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: "Suma turi būti teigiama." });
    }

    next();
};

export default validateAmount;
