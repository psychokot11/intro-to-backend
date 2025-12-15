import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        //basic validation
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // check if user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ message: "User already exists." });
        }

        //create new user
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

export { registerUser };