import express from "express"
import User from "../models/UserModel.js"

export const Login = async(req, res) => {
    
}

export const Register = async(req, res) => {

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
