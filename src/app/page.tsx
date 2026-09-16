import { redirect, RedirectType } from "next/navigation";

export default function HomePage() {
  redirect("/web", RedirectType.replace);
}
