import express from "express"
import { Login, Logout, Register, getUser } from "../controllers/auth.js"

const router = express.Router()

router.post('/login', Login)
router.get('/users', getUser)
router.post('/register', Register)

export default router