"use client";
import { BlogPage } from "../components";
import { useApp } from "../AppContext";
export default function Page() {
  var { user } = useApp();
  return <BlogPage user={user} />;
}
