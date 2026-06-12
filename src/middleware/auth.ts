import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from '../types/AuthRequest';
import dotenv from "dotenv";

dotenv.config();

interface UserPayload extends JwtPayload {
  id: string;
  email: string;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token de autenticação não fornecido"
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({
      message: "Formato do token inválido"
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      cargo: decoded.cargo
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token de autenticação inválido"
    });
  }
};