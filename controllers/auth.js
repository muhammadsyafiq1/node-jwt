import bcrypt from "bcrypt";
import User from "../models/UserModel.js"
import jwt from "jsonwebtoken"

export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        console.log(user);
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where: {
                id: userId
            }
        });
        //cookie yg akan dikirim ke client
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            //expire coockienya
            maxAge: 24*60*60*1000,
            // secure: true -> gunakan jika pakai https
        })
        res.json({accessToken});
    } catch (error) {
        res.status(400).json({msg: "Email tidak ditemukan"});
    }
}

export const Register = async(req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    if(password !== confirmPassword) return res.status(400).json({msg: "Password tidak sama"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register berhasil"})
    } catch (error) {
        console.log(error);
    }
}

export const Logout = async(req, res) =>{

}

export const getUser = async (req, res)=>{
    try {
        const response = await User.findAll();
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
