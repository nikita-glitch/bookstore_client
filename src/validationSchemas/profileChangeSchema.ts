import * as yup from "yup";

interface PasswordChangeInterface {
  oldPassword: string;
  newPassword: string;
  passwordToCompare: string
}

export const nameChangeSchema = yup.object().shape({
  userName: yup.string().required("Name is required"),
});

export const passwordChangeSchema: yup.ObjectSchema<PasswordChangeInterface> = yup.object({
  oldPassword: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(12, "Password shouldn`t be more than 12 characters long"),
  newPassword: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(12, "Password shouldn`t be more than 12 characters long"),
  passwordToCompare: yup
    .string()
    .required("Password is required")
    .test('password-match', 'Passwords do not match', function() {
      return this.parent.newPassword === this.parent.passwordToCompare;
    })
});
