import { Router } from "express";
import multer from "multer";
import Account from "../models/account.js";
import { upload } from "../middleware/upload.js";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

// Multer upload error handler
const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer-specific error occurred
    return res
      .status(400)
      .json({ message: `Nepavyko ikelti failo: ${err.message}` });
  } else if (err) {
    // Any other unknown error occurred
    return res
      .status(500)
      .json({ message: "Ivyko klaida failo kelime" });
  }
  next();
};

// Route to fetch accounts for the authenticated user, sorted by last name (secondName)
router.get("/accounts", checkAuth, async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.session.user.id }).sort({
      secondName: 1,
    });

    res.status(200).json(accounts); 
  } catch (error) {
    console.error("Nepavyko gauti akauntus:", error);
    res
      .status(500)
      .json({ message: "Nepavyko susisiekti su serveriu", error: error.message });
  }
});
router.delete("/:id", checkAuth, async (req, res) => {
  const { id } = req.params; 

  try {
    const account = await Account.findById(id);

    if (!account) {
      return res.status(404).json({ message: "Sąskaita nerasta" });
    }

    if (account.wallet !== 0) {
      return res.status(400).json({
        message: "Sąskaita negali būti ištrinta nebent suma yra 0",
      });
    }


    await Account.findByIdAndDelete(id);

    res.status(200).json({ message: "Sąskaita sėkmingai ištrinta" });
  } catch (error) {
    console.error("Klaida ištrinant sąskaita:", error);
    res.status(500).json({ message: "Klaida ištrinant sąskaita" });
  }
});

router.get("/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id); 
    if (!account) {
      return res.status(404).json({ message: "Sąskaita nerasta" });
    }
    res.status(200).json(account);
  } catch (error) {
    console.error("Klaida gaunant sąskaitas:", error);
    res.status(500).json({ message: "Klaida gaunant sąskatos informacija" });
  }
});

router.put("/:id/balance", async (req, res) => {
  const { id } = req.params;
  console.log(`Gautas sąskaitos ID: ${id}`); // Log ID

  const { wallet } = req.body;

  try {
    const account = await Account.findById(id); 
    if (!account) {
      return res.status(404).json({ message: "Sąskaita nerasta" });
    }

    account.wallet += wallet; 
    await account.save(); 
    res.status(200).json(account); 
  } catch (error) {
    console.error("Klaida atnaujinant sąskaitos suma:", error); 
    res.status(500).json({ message: "Klaida atnaujinant sąskaitos suma" });
  }
});

router.post(  "/create-account",checkAuth, upload.single("idPhoto"), uploadErrorHandler, async (req, res) => {
    try {
      const { firstName, secondName, iban, idNumber } = req.body;

      if (!firstName || !secondName || !iban || !idNumber || !req.file) {
        return res.status(400).json({
          message:
            "All fields (firstName, secondName, iban, idNumber, idPhoto) are required",
        });
      }

      const newAccount = new Account({
        firstName,
        secondName,
        iban,
        idNumber,
        idPhoto: req.file.filename, // File uploaded by multer
        user: req.session.user.id, // User ID from the session
      });

  
      const savedAccount = await newAccount.save();

      // Send success response
      res.status(201).json({
        data: savedAccount,
        message: "Sąskaita sukurta",
      });
    } catch (error) {
      console.error("Klaida kuriant sąskaita:", error);
      res.status(500).json({
        message: "Nepavyko pasiekti serverio",
        error: error.message,
      });
    }
  }
);

export default router;