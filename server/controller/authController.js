const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
    const user = req.body;
    const takenEmail = await User.findOne({ email: user.email });
    if (!takenEmail) {
        user.password = await bcrypt.hash(req.body.password, 10);
        new User({
            name: user.name.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password,
        }).save();
        res.status(200).json({
            success: true,
            message: "Success",
        });
    } else {
        res.status(409).json({
            success: false,
            message: "User Email Already Been Taken",
        });
    }
};

exports.login = async (req, res) => {
    const userLoggingIn = req.body;    
    const user = await User.findOne({ email: userLoggingIn.email });
    if (!user) {
        res.status(400).json({
            success: false,
            message: "Invalid Email Or Password",
        });
    } else {
        const isPasswordMatch = await bcrypt.compare(userLoggingIn.password, user.password);
        if (isPasswordMatch) {
            const payload = {
                id: user._id,
                email: user.email,
            };
            //generate new token
            const token = jwt.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: { ...payload },
                },
                process.env.JWT_SIGNATURE
            );
            //set cookie
            res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
                httpOnly: true,
                signed: true,
                secure: true,
                sameSite: "none",
                maxAge: process.env.COOKIE_AGE,
            });
            res.status(200).json({
                success: true,
                user: payload,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid Email Or Password",
            });
        }
    }
};

exports.currentUser = async (req, res) => {    
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

exports.logOut = async (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({
        success: true,
        message: "Succefull LogOut",
        user: {},
    });
};
