import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import analysisRoutes from "./routes/analysisRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(cors());
app.use(helmet());//helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev"));//log the requests

//apply arcjet rate limit to all routes

app.use(async (req,res,next)=>{
    try {
        const decision=await aj.protect(req,{
            requested:1//specifies that each request uses 1 token
        });

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({error:"Too Many Requests"});
            }
            else if(decision.reason.isBot())
            {
                res.status(403).json({error:"Bot access denied"});
            }
            else{
                res.status(403).json({error:"Forbidden"});
            }
        }

        if(decision.results.some((result)=>result.reason.isBot()&& result.reason.isSpoofed())){
            res.status(403).json({error:"Spoofed bot detected"});
            return;
        }
        next();
    } catch (error) {
        console.log("Arcjet error",error);
        next(error);        
    }
})


async function initDB(){
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;
        await sql`
            CREATE TABLE IF NOT EXISTS analyses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL
                REFERENCES users(id)
                ON DELETE CASCADE,
            resume_text TEXT NOT NULL,
            job_description TEXT NOT NULL,
            result JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `
        console.log("Database succesfully initialized");
    } catch (error) {
        console.log("Error initDB",error);
    }
}

app.use("/api/auth",authRoutes);
app.use("/api/analysis",analysisRoutes);

initDB().then(()=>{
    app.listen(PORT,"0.0.0.0",()=>{
        console.log("Server running on port "+PORT);
    });
});