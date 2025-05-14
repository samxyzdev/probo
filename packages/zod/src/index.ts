import { password } from "bun";
import { z } from "zod";

export const SignupUser = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});

export const SigninUser = z.object({
  username: z.string(),
  password: z.string(),
});

export const UserWallet = z.object({
  amount: z.string(),
});

export const Trade = z.object({
  price: z.string(),
});
