import express from "express";
import { prisma } from "@rep/db/prisma";
import { SignupUser, SigninUser } from "@repo/zod/zodSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware, MiddlewareRequest } from "./middleware.js";

export const JWT_SECRET = "12345314";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = SignupUser.safeParse(req.body);
  if (!userData.success) {
    res.status(411).json({
      msg: "Please Enter Correct Credentials",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(userData.data.password, 10);
  const createUser = await prisma.user.create({
    data: {
      username: userData.data.username,
      password: hashedPassword,
    },
  });
  const token = jwt.sign({ userId: createUser.id }, JWT_SECRET);
  res.status(200).json({
    msg: "User created successfully",
    jwt: token,
  });
});

app.post("/signin", async (req, res) => {
  const userData = SigninUser.safeParse(req.body);
  if (!userData.success) {
    res.status(411).json({
      msg: "Please Enter Correct Credentials",
    });
    return;
  }
  const dbPassword = await prisma.user.findFirst({
    where: {
      username: userData.data.username,
    },
  });
  if (!dbPassword) {
    res.json({
      msg: "User doesn't exist",
    });
    return;
  }
  const comparePassword = await bcrypt.compare(
    userData.data.password,
    dbPassword.password
  );
  const token = jwt.verify(dbPassword.id, JWT_SECRET);
  if (!token) {
    res.json({
      msg: "You are not authorized",
    });
    return;
  }
  res.status(200).json({
    jwt: token,
  });
});

app.get("/:eventId", authMiddleware, (req: MiddlewareRequest, res) => {
  console.log(req.id);
});
app.post("/trade", (req, res) => {});
app.get("/orderbook", (req, res) => {});
app.get("/walletBalance", (req, res) => {});

// create an endpoint for creating an event
