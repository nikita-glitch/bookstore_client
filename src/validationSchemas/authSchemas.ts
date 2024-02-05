import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(12, "Password shouldn`t be more than 12 characters long"),
});

export const signUpSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(12, "Password shouldn`t be more than 12 characters long"),
  passwordToCompare: yup
    .string()
    .required("Password is required")
    .test('password-match', 'Passwords do not match', function() {
      return this.parent.password === this.parent.passwordToCompare;
    })
});
