import z from "zod";
import { ImageType } from "../types/Request";

export const LogininDTO = z.object({
  username: z.string().nonempty("username is required").nonoptional(),
  password: z.string().nonempty("password is required").nonoptional(),
});

export const RegisterDTO = z
  .object({
    name: z.string().nonempty("name is required").nonoptional(),
    username: z.string().nonempty("username is required").nonoptional(),
    email: z
      .email("Invalid email address")
      .nonempty("email is required")
      .nonoptional(),
    //   password: z.string().min(6, "password must be at least 6 characters").max(20).regex(/^[a-zA-Z0-9!@#$%^&*()-+]/)
    role: z.enum(["user", "admin"]).optional(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      ),
    confirmPassword: z
      .string()
      .nonempty("confirm password is required")
      .nonoptional(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterDTOType = z.infer<typeof RegisterDTO> & {
  image?: ImageType;
};
