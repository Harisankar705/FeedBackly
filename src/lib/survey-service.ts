import { InsertSurvey, Survey, surveys } from './../../shared/schema';
import { createInsertSchema } from 'drizzle-zod';
export const insertSurveySchema = createInsertSchema(surveys).omit({
  id: true,
  createdAt: true,
});
import { apiRequest } from "./queryClient";

export const submitSurvey = async (data: InsertSurvey & { antispam: string }): Promise<Survey> => {
  const response = await apiRequest("POST", "/api/surveys", data);
  return response.json();
};

export const fetchSurveys = async (): Promise<Survey[]> => {
  const response = await apiRequest("GET", "/api/surveys", undefined);
  return response.json();
};

export const fetchSurvey = async (id: number): Promise<Survey> => {
  const response = await apiRequest("GET", `/api/surveys/${id}`, undefined);
  return response.json();
};

export const deleteSurvey = async (id: number): Promise<void> => {
  await apiRequest("DELETE", `/api/surveys/${id}`, undefined);
};

export const exportSurveysToCSV = (surveys: Survey[]): string => {
  if (!surveys.length) return "";
  
  // Get headers from first survey
  const headers = Object.keys(surveys[0]).filter(key => key !== 'id');
  
  // Create CSV header row
  const csvRows = [headers.join(',')];
  
  // Add data rows
  for (const survey of surveys) {
    const values = headers.map(header => {
      const val = survey[header as keyof Survey];
      // Handle comma in values by wrapping in quotes
      const escaped = String(val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

export const downloadCSV = (data: string, filename: string): void => {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
