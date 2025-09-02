import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  console.log(session);

  if (!session) {
    return redirect("/sign-in");
  }

  const role = (session.user as { role?: string } | undefined)?.role;
  if (role !== "admin") {
    return redirect("/dashboard");
  }

  return <AdminDashboardClient />;
}
