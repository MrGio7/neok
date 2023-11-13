import z from "zod";

export default z
  .object({
    PORT: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    ACCESS_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_SECRET: z.string().min(1),
  })
  .parse(process.env);
