
import express from 'express';
import { GoogleGenAI, Type } from "@google/genai";

const router = express.Router();

router.post('/valuation', async (req, res) => {
  const { location, sqft, propertyType, beds, baths } = req.body;
  
  if (!location || !sqft) {
    return res.status(400).json({ error: 'Missing required valuation data' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a detailed real estate market valuation for a ${propertyType} in ${location}. 
                 Size: ${sqft} sqft, ${beds} beds, ${baths} baths.
                 Provide a price range, market trend analysis, and top selling points.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedPrice: { type: Type.NUMBER },
            lowEstimate: { type: Type.NUMBER },
            highEstimate: { type: Type.NUMBER },
            marketTrend: { type: Type.STRING },
            sellingPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["estimatedPrice", "lowEstimate", "highEstimate", "marketTrend", "sellingPoints"]
        }
      }
    });

    const valuation = JSON.parse(response.text || '{}');
    res.json(valuation);
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(502).json({ error: 'AI Valuation failed', details: error.message });
  }
});

export default router;
