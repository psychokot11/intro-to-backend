import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ message: "User already exists." });
        }

        const newUser = new User({
            username,
            password,
            email,
            loggedIn: false,
        });

        await newUser.save();

        return res.status(201).json({ 
            message: "User registered successfully.",
            user: { _id: newUser._id, email: newUser.email, username: newUser.username } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ 
            email: email.toLowerCase() 
        });

        if (!user) return res.status(404).json({ 
            message: "User not found." 
        });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(401).json({ 
            message: "Invalid credentials." 
        });

        return res.status(200).json({ 
            message: "Login successful.",
            user: { _id: user._id, email: user.email, username: user.username } 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};

export { registerUser, loginUser };