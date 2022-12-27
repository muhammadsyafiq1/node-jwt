import express from "express"
import { Login, Logout, Register, getUser } from "../controllers/auth.js"
import { verifyToken } from "../middleware/VerifyToken.js"

const router = express.Router()

router.post('/login', verifyToken , Login)
router.get('/users', getUser)
router.post('/register', Register)

export default router