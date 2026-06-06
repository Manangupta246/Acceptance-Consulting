"use client";
import { AdminDashboard } from "../components";
import { useApp } from "../AppContext";
export default function Page() {
  var { user } = useApp();
  return <AdminDashboard user={user} />;
}
