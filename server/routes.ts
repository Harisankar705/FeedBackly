import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveySchema, loginSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);
  
  // Set up session management
  const SessionStore = MemoryStore(session);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'survey_app_secret',
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: { 
      secure: false, // set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
  
  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure passport local strategy
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Invalid password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  // Serialize and deserialize user for session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  // Authentication middleware
  const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };
  
  // Admin middleware
  const isAdmin = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated() && (req.user as any)?.isAdmin) {
      return next();
    }
    res.status(403).json({ message: "Forbidden - Admin access required" });
  };
  
  // Auth routes
  app.post("/api/auth/login", (req, res, next) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      passport.authenticate("local", (err: Error, user: any, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({ message: info.message || "Invalid username or password" });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.json({ message: "Login successful", user: { id: user.id, username: user.username, isAdmin: user.isAdmin } });
        });
      })(req, res, next);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.post("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.json({ message: "Logout successful" });
    });
  });
  
  app.get("/api/auth/status", (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      res.json({ 
        isAuthenticated: true, 
        user: { 
          id: user.id, 
          username: user.username,
          isAdmin: user.isAdmin 
        } 
      });
    } else {
      res.json({ isAuthenticated: false });
    }
  });
  
  // Survey routes
  app.post("/api/surveys", async (req, res) => {
    try {
      // Exclude antispam field from what gets stored in the database
      const { antispam, ...surveyData } = req.body;
      
      // Parse and validate the input
      const validatedData = insertSurveySchema.parse(surveyData);
      
      // Store survey in the database
      const survey = await storage.createSurvey(validatedData);
      
      res.status(201).json({ message: "Survey submitted successfully", survey });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
  
  app.get("/api/surveys", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const surveys = await storage.getAllSurveys();
      res.json(surveys);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get("/api/surveys/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid survey ID" });
      }
      
      const survey = await storage.getSurvey(id);
      if (!survey) {
        return res.status(404).json({ message: "Survey not found" });
      }
      
      res.json(survey);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.delete("/api/surveys/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid survey ID" });
      }
      
      const deleted = await storage.deleteSurvey(id);
      if (!deleted) {
        return res.status(404).json({ message: "Survey not found" });
      }
      
      res.json({ message: "Survey deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
