import "server-only";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function getAuth() {
  const session = await auth();
  const { name, email, id, image } = session?.user || {};
  if (!session || !email || !id || !name) redirect("/login");

  return { name, email, id, image };
}
