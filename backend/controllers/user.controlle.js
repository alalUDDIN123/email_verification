const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users.model');
const { sendVerificationEmail } = require('../middleware/Nodemailer.middleware');

const registerUser = async (req, res) => {
    try {
        // Extract user details from the request body
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are required (name, email, password)" });
        }

        const isEmailExists = await UsersModel.findOne({ email: email });
        if (isEmailExists) {
            return res.status(400).send({ message: "Sorry! Email already exists" });
        }

        // Create a new user
        const user = new UsersModel({
            name,
            email,
            password,
            isVerified: false,
            verificationToken: ''
        });

        // Generate a verification token
        const token = jwt.sign({ userId: user._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, { expiresIn: '5m' });
        user.verificationToken = token;

        // Save the user to the database
        await user.save();

        // Send verification email
        await sendVerificationEmail(email, token);

        res.status(201).json({ message: 'Registration successful. Please check your email for verification.' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
};

const verifyEmail = async (req, res) => {
    const token = req.params.token;
    if (!token) {
        return res.status(400).send({ message: "Please provide a token" });
    }
    try {
        // Verify the token without checking the expiration by setting `ignoreExpiration` to `true`
        const decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY, { ignoreExpiration: true });
        // Check if the verification token has expired
        const tokenExpirationTime = new Date(decodedToken.exp * 1000); // Convert expiration time to milliseconds
        const currentTime = new Date();
        if (currentTime > tokenExpirationTime) {
            throw new Error('TokenExpiredError');
        }

        // Find the user by the verification token
        const user = await UsersModel.findOne({ verificationToken: token });
        if (!user) {
            // User not found
            return res.status(400).send({ message: "User not found. Already verified or token expired." });
        }

        if (user.isVerified) {
            // User already verified
            return res.status(200).json({ message: "Email already verified." });
        }

        if (user._id.toString() !== decodedToken.userId) {
            return res.status(400).send({ message: "Invalid token" });
        }

        // Update the user's verification status
        user.isVerified = true;
        user.verificationToken = '';

        // Save the user to the database
        await user.save();

        res.status(200).json({ message: 'Email verification successful.' });
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'TokenExpiredError') {
            // Find and delete the user from the database
            await UsersModel.findOneAndDelete({ verificationToken: token });
            return res.status(400).json({ message: 'Token expired. User data deleted inside catch block.' });
        }
        res.status(400).json({ message: 'Invalid or expired token.', error: error.message });
    }
};




module.exports = {
    registerUser,
    verifyEmail
};
