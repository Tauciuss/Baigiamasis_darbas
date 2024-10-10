import Account from '../models/account.js';

//Naujos saskaitos kūrimas
export const createAccount = async (req, res) => {
    const { owner, personalID, passportCopy } = req.body;

    try {
        // Patikrinimas ar saskaita jau egzistuoja
        const existingAccount = await Account.findOne({ personalID });
        if (existingAccount) {
            return res.status(400).json({ message: 'Su tokiu ID jau egzistuoja' });
        }

        // Generuojamas IBAN LT standartu
        const iban = 'LT' + Math.floor(1000000000 + Math.random() * 9000000000);

        const newAccount = new Account({
            owner,
            iban,
            personalID,
            passportCopy
        });

        await newAccount.save();

        return res.status(201).json({ message: 'Saskaita sėkmingai sukurta!', account: newAccount });
    } catch (error) {
        return res.status(500).json({ message: 'Kažkas netaip sąskaitos kūrime.' });
    }
};

// Pridėti pinigus prie account
export const addFunds = async (req, res) => {
    const { accountId, amount } = req.body;

    try {
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Sąskaita nerasta.' });
        }


        account.balance += amount;
        await account.save();

        return res.status(200).json({ message: 'Prinigai pridėti!', balance: account.balance });
    } catch (error) {
        return res.status(500).json({ message: 'Kažkas netaip pinigų pridėjime.' });
    }
};

//Išsiimti pinigus iš sąskaitos
export const withdrawFunds = async (req, res) => {
    const { accountId, amount } = req.body;

    try {
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Sąskaita nerasta' });
        }

        if (account.balance < amount) {
            return res.status(400).json({ message: 'Nepakanka pinigu' });
        }

        
        account.balance -= amount;
        await account.save();

        return res.status(200).json({ message: 'Pinigai sėkmingai išsiimti!', balance: account.balance });
    } catch (error) {
        return res.status(500).json({ message: 'Kažkas netaip pinigų išsiėmime.' });
    }
};

// Gauti visas saskaitas
export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().populate('owner', 'name surname');
        return res.status(200).json(accounts);
    } catch (error) {
        return res.status(500).json({ message: 'Kažkas netaip gaunant visas saskaitas.' });
    }
};
