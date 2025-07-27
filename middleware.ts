// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/upload(.*)",
    "/note(.*)",
    "/ai-assistant(.*)",
  ],
};
