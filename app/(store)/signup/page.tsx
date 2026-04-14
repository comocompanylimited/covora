import { redirect } from "next/navigation";

// /signup → /account/signup
export default function SignupRedirect() {
  redirect("/account/signup");
}
