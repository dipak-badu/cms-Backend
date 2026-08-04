import z from "zod";

export const LogininDTO = z.object({
  username: z.string().nonempty("username is required").nonoptional(),
  password: z.string().nonempty("password is required").nonoptional(),
});
