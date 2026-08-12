import { Request, Response } from "express";

export interface ImageType {
  filename?: string;
  path?: string;
  size?: number;

  mimetype?: string;
  type?: string;
  url?: string;
}

export interface IAuthRequest extends Request {
  loggedInUser?: {
    _id: String;
    email: string;
    name: string;
    username: string;
    image?: ImageType;
    role: string;
    phone?: string;
    address?: string;
  };
}
