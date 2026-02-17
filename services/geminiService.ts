
import api from './api';

export interface ValuationInput {
  location: string;
  sqft: number;
  propertyType: string;
  beds: number;
  baths: number;
}

export const getAIValuation = async (input: ValuationInput) => {
  try {
    // We now call our backend route which handles the @google/genai logic securely
    const response = await api.post('/ai/valuation', input);
    return response.data;
  } catch (error) {
    console.error("AI Valuation API Error:", error);
    return null;
  }
};
