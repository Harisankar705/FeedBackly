import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  nationality: text("nationality").notNull(),
  email: text("email").notNull(),
  phonenumber: text("phonenumber").notNull(),
  address: text("address").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSurveySchema = createInsertSchema(surveys).omit({
  id: true,
  createdAt: true,
});

export const validationSurveySchema = insertSurveySchema.extend({
  name: z.string()
    .trim()
    .min(1, "Name is required")
    .refine(val => val.trim().length > 0, {
      message: "Name cannot be just whitespace"
    }),
    
  gender: z.string()
    .min(1, "Gender selection is required")
    .refine(val => val.trim().length > 0, {
      message: "Please select a valid gender"
    }),
    
  nationality: z.string()
    .min(1, "Nationality selection is required")
    .refine(val => val.trim().length > 0, {
      message: "Please select a valid nationality"
    }),
    
  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .refine(val => val.trim().length > 0, {
      message: "Email cannot be just whitespace"
    }),
    
  phonenumber: z.string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^(\+\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/, {
      message: "Invalid phone number format (e.g., +1 234 567 8900)"
    })
    .refine(val => val.trim().length > 0, {
      message: "Phone number cannot be just whitespace"
    }),
    
  address: z.string()
    .trim()
    .min(1, "Address is required")
    .refine(val => val.trim().length > 0, {
      message: "Address cannot be just whitespace"
    }),
    
  message: z.string()
    .trim()
    .min(1, "Message is required")
    .refine(val => val.trim().length > 0, {
      message: "Message cannot be just whitespace"
    }),
    
  antispam: z.string()
    .refine(val => val === "12", {
      message: "Incorrect answer. Please try again."
    })
});
// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSurvey = z.infer<typeof insertSurveySchema>;
export type Survey = typeof surveys.$inferSelect;
export type LoginCredentials = z.infer<typeof loginSchema>;
