import Router from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

// User registration
router.post("/register", async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if the username and password are provided
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Naudotojo vardas ir slaptažodis yra privalomas" });
    }
   
    if (userName.length < 3 || userName.length > 20) {
      return res
        .status(400)
        .json({ message: "Naudotojo vardas turi būti nuo 3 iki 20 radžių." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Slaptažodis turi būti bent 6 simbolių." });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Naudotojo vardas jau egzistuoja." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      password: hashedPassword,
    });
    console.log("Iškviečiamas naudotojo registravimas...")
    res.status(201).json({
      data: { id: user._id, userName: user.userName },
      message: "Naudojotas sėkmingai užregistruotas.",
    });
  } catch (e) {
    console.error("Klaida registracijoje:", e);
    res.status(500).json({ message: "Nepavyko susisiekti su serveriu registracijos metu. " + e,  });
  }
});

// User authentication
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Naudotojo vardas ir slaptažodis yra privalomas" });
    }

    const user = await User.findOne({ userName });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Neteisingi prisijungimo duomenys" });
    }

    req.session.user = { id: user._id, userName: user.userName };

    res.status(200).json({
      message: "Prisijungimas pavyko",
      data: { id: user._id, userName: user.userName },
    });
  } catch (e) {
    console.error("Klaida prisijungime:", e);
    res.status(500).json({ message: "Nepavyko susisiekti su serveriu" });
  }
});

//Checking the user
router.get("/check-user", checkAuth, (req, res) => {

  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Neautarizuotas" });
  }

  res.json({
    id: req.session.user.id,
    userName: req.session.user.userName,
  });
});

//Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Negalima atsijungti" });
    }
    res.status(200).json({ message: "Atsijungimas pavyko." });
  });
});

export default router;