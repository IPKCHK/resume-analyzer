import { GoogleGenAI } from "@google/genai";
import { sql } from "../config/db.js";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const createAnalysis = async (req, res) => {
    try {
        const userId = req.user.id;

        const { resumeText, jobDescription } = req.body;

        if (!resumeText || !jobDescription) {
            return res.status(400).json({
                message: "Resume and job description are required"
            });
        }

        const prompt = `
            You are an expert technical recruiter.

            Analyze the following resume against the job description.

            RESUME:
            ${resumeText}

            JOB DESCRIPTION:
            ${jobDescription}

            Return ONLY valid JSON in this exact structure:

            {
                "matchPercentage": 0,
                "matchingSkills": [],
                "missingSkills": [],
                "keywords": [],
                "suggestions": [],
                "interviewQuestions": []
            }

            Do not include markdown or explanations outside the JSON.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt
        });

        const text = response.text;

        const cleanedText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(cleanedText);

        const savedAnalysis = await sql`
            INSERT INTO analyses (
                user_id,
                resume_text,
                job_description,
                result
            )
            VALUES (
                ${userId},
                ${resumeText},
                ${jobDescription},
                ${result}
            )
            RETURNING *
        `;

        res.status(201).json({
            success: true,
            analysis: savedAnalysis[0]
        });

    } catch (error) {
        console.log("Analysis error:", error);

        if (error.status === 503) {
            return res.status(503).json({
                message: "AI service is temporarily busy. Please try again."
            });
        }

        if (error.status === 429) {
            return res.status(429).json({
                message: "Too many requests. Please try again later."
            });
        }

        if (error instanceof SyntaxError) {
            return res.status(500).json({
                message: "AI returned an invalid analysis. Please try again."
            });
        }

        res.status(500).json({
            message: "Failed to analyse resume"
        });
    }
};


export const getAnalyses = async (req, res) => {
    try {
        const userId = req.user.id;

        const analyses = await sql`
            SELECT *
            FROM analyses
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        res.status(200).json(analyses);

    } catch (error) {
        console.log("Error in getting analyses", error);

        res.status(500).json({
            message: "Failed to fetch analyses"
        });
    }
};