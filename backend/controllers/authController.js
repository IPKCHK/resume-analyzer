import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";


export const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await sql`
            SELECT id
            FROM users
            WHERE email = ${email}
        `;

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await sql`
            INSERT INTO users (
                name,
                email,
                password
            )
            VALUES (
                ${name},
                ${email},
                ${hashedPassword}
            )
            RETURNING id, name, email
        `;

        res.status(201).json({
            message: "Signup successful",
            user: newUser[0]
        });

    } catch (error) {

        console.log("Signup error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const users = await sql`
            SELECT *
            FROM users
            WHERE email = ${email}
        `;

        if (users.length === 0) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log("Login error:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
};