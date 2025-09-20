const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "Email already used" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ name, email, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: "User created" })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User not found" })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(200).json({ token, userId: user._id })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}
