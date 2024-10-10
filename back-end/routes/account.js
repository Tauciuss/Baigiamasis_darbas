import express from 'express';
import { createAccount, addFunds, withdrawFunds, getAllAccounts } from '../controllers/account.js';
import auth from '../middleware/authMiddleware.js';  // JWT verification
import validateIBAN from '../middleware/validateIBAN.js';  // IBAN validation
import validatePersonalCode from '../middleware/validatePersonalCode.js';  // Personal Code validation
import validateAmount from '../middleware/validateAmount.js';  // Amount validation

const router = express.Router();

router.post('/create', auth, validateIBAN, validatePersonalCode, createAccount);

router.post('/add-funds', auth, validateAmount, addFunds);

router.post('/withdraw-funds', auth, validateAmount, withdrawFunds);

router.get('/accounts', auth, getAllAccounts);

export default router;
