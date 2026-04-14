import { redirect } from "next/navigation";

// /login → /account/login
export default function LoginRedirect() {
  redirect("/account/login");
}
