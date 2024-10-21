import { mkdir, access } from "node:fs/promises";
import multer from "multer";

export const storage = multer.diskStorage({
  destination: async (req, file, next) => {
    const uploadsDir = "./uploads"; // Make sure this path exists or is created
    try {
      await access(uploadsDir);
    } catch {
      await mkdir(uploadsDir, { recursive: true });
    }
    next(null, uploadsDir);
  },
  filename: (req, file, next) => {
    const timestamp = Date.now();
    const randomNum = Math.round(Math.random() * 1e9);
    const originalExt = file.originalname.split(".").pop(); // Get file extension
    const uniqueFilename = `${timestamp}-${randomNum}.${originalExt}`;
    next(null, uniqueFilename);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, next) => {
    
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return next(
        new Error("Netinkamas failo formatas. Ledžiami tik, .jpeg, .png, .webp. formato failai."),
        false
      );
    }
    next(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});