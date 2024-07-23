import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

interface JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    //console.log("Token: ", token);

    if (!token) {
      //console.error("Not authorized, token is missing.");
      return res
        .status(401)
        .json({ message: "Not authorized, token is missing" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      const user = await User.findById(decoded.id).select("-password");

      if (user) {
        req.user = user as IUser;
        next();
      } else {
        res.status(401).json({ message: "Not authorized, user not found" });
      }
    } catch (error) {
      //console.error("Token verification failed:", error);
      res
        .status(401)
        .json({ message: "Not authorized, token verification failed" });
    }
  } else {
   // console.error("Not authorized, token is missing.");
    res.status(401).json({ message: "Not authorized, token is missing" });
  }
};
