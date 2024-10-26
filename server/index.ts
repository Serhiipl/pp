import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = 5001;
const jwtSecret = process.env.JWT_SECRET || "default_secret";

app.use(bodyParser.json());

interface AuthenticatedRequest extends Request {
  email?: string;
}

const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    const payload = decoded as jwt.JwtPayload;
    req.email = payload.email;
    next();
  });
};

app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, jwtSecret, { expiresIn: "1h" });
  res.json({ token });
});

app.post(
  "/api/services",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    const { name, description, price, time, active } = req.body;

    try {
      const service = await prisma.services.create({
        data: {
          name,
          description,
          price,
          time,
          active,
        },
      });
      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

app.get("/api/services", async (req: Request, res: Response) => {
  try {
    const services = await prisma.services.findMany();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
