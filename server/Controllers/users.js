import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../Models/user.js";

export const signin = async (req,res) => {
    const {email,password} = req.body;
    
    try {
        const existingUser = await User.findOne({email:email});

        if(!existingUser)  //! USer Doesnt Exists
            return res.status(404).json({message:"User Doesn't Exists"});
        
        //* If User Exists
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        //! If Wrong Password
        if(!isPasswordCorrect) 
            return res.status(400).json({message:"Invalid Credentials"});
        
        //* If Password Correct 
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},"secret",{expiresIn:"1h"});
        res.status(200).json({result:existingUser,token:token});

    } catch (error) {
        res.status(500).json({message:"Something went Wrong"});
    }
}

export const signup = async (req,res) => {
    const {email,password,confirmPassword,firstName,lastName} = req.body;

    try {
        
        const existingUser = await User.findOne({email:email});

        if(existingUser)  //! USer Already Exists
            return res.status(400).json({message:"User Already Exists"});

        if(password !== confirmPassword) //! Password Doesnt Match
            return res.status(400).json({message:"Password Doesn't Match"});

        const hashPassword = await bcrypt.hash(password,12);//? Encrypting Passwprd

        console.log(email,firstName,lastName,password,confirmPassword);
        //* Creating New User
        const newUser = await User.create({email:email,name:`${firstName} ${lastName}`,password:hashPassword});

        const token = jwt.sign({email:newUser.email,id:newUser._id},"secret",{expiresIn:"1h"});
        res.status(200).json({result:newUser,token:token});

    } catch (error) {
        res.status(500).json({error});
    }
}