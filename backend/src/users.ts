import bcrypt from "bcryptjs";

export interface User {
  id: number;
  email: string;
  password: string;
  isVerified: boolean;
}

export const users: User[] = [];

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    isVerified: false,
  };
  users.push(newUser);
  return newUser;
};
