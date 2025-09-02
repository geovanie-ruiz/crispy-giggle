import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();

  console.log(session);

  if (!session) {
    return redirect("/sign-in");
  }

  // const role = (session.userId as { role?: string } | undefined)?.role;
  // if (role !== "admin") {
  //   return redirect("/dashboard");
  // }

  return <AdminDashboardClient />;
}
