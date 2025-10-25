// API Response Types

export interface WelcomeResponse {
  message: string;
  endpoints: string[];
}

export interface AboutData {
  name: string;
  version: string;
  description: string;
  author: string;
  environment: string;
  uptime: string;
}

export interface AboutResponse {
  success: boolean;
  data: AboutData;
  timestamp: string;
}

export interface NameData {
  firstName: string;
  lastName: string;
  fullName: string;
  initials: string;
}

export interface NameResponse {
  success: boolean;
  data: NameData;
  timestamp: string;
}

// Error Response Type
export interface ApiError {
  message: string;
  statusCode?: number;
}

