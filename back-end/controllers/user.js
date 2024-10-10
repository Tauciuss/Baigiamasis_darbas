import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const registerUser = async (req, res) => {
    const { name, surname, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Naudotojas jau egzistuoja' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: 'Naudotojas sėkmingai prisiregistravo!' });
    } catch (error) {
        return res.status(500).json({ message: 'Kažkas netaip registracijoje' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Naudotojas nerastas' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Neteisinga prisijungimo informacija' });
        }

        //Autentifikavimas
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ result: user, token });
    } catch (error) {
        return res.status(500).json({ message: 'Kažkas netaip prisijungime.' });
    }
};
