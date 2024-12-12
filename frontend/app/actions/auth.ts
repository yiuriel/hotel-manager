import { SignupFormSchema, FormState } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { createSession } from "../lib/session";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it

  const user = {
    name,
    email,
    password,
  };

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.email);
  // 5. Redirect user
  redirect("/profile");
}
