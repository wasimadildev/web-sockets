import express from 'express';
import { setupWebSocket } from './websocket.js';
import mongoose from 'mongoose';
import http from 'http';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { middleware } from './middleware.js';
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const MONGO_URI = 'mongodb://localhost:27017/chatapp';
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(express.json());
setupWebSocket(server);
// Schema 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    accessToken: { type: String },
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
// Register
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).send({ message: 'Server error' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: 'Invalid credentials' });
        }
        const accessToken = jwt.sign({ userId: user._id }, 'access_secret', { expiresIn: '3d' });
        const refreshToken = jwt.sign({ userId: user._id }, 'refresh_secret', { expiresIn: '7d' });
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save();
        res.send({ accessToken, refreshToken });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Server error' });
    }
});
// join room 
app.post('/join', middleware, (req, res) => {
    res.send({ message: `User ${req} joined the room` });
});
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
