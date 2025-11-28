import serverless from "@vendia/serverless-express";
import app from "./index";

export const handler = serverless({ app });