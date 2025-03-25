import { users, type User, type InsertUser, surveys, type Survey, type InsertSurvey } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Survey operations
  getSurvey(id: number): Promise<Survey | undefined>;
  getAllSurveys(): Promise<Survey[]>;
  createSurvey(survey: InsertSurvey): Promise<Survey>;
  deleteSurvey(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private surveys: Map<number, Survey>;
  private userCurrentId: number;
  private surveyCurrentId: number;

  constructor() {
    this.users = new Map();
    this.surveys = new Map();
    this.userCurrentId = 1;
    this.surveyCurrentId = 1;
    
    // Create default admin user
    this.createUser({
      username: "admin",
      password: "password",
      isAdmin: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Survey methods
  async getSurvey(id: number): Promise<Survey | undefined> {
    return this.surveys.get(id);
  }
  
  async getAllSurveys(): Promise<Survey[]> {
    return Array.from(this.surveys.values()).sort((a, b) => {
      if (b.createdAt && a.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }
  
  async createSurvey(insertSurvey: InsertSurvey): Promise<Survey> {
    const id = this.surveyCurrentId++;
    const now = new Date();
    const survey: Survey = { ...insertSurvey, id, createdAt: now };
    this.surveys.set(id, survey);
    return survey;
  }
  
  async deleteSurvey(id: number): Promise<boolean> {
    return this.surveys.delete(id);
  }
}

export const storage = new MemStorage();
