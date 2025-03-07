import { redirect } from "next/navigation";
import StyledButton from "./components/StyledButton";

export default function Home() {
  redirect("/assessment");

  // This code won't execute due to the redirect
  return null;
}
