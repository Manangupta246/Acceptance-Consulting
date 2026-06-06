"use client";
import { SchoolFinderPage } from "../components";
import { useApp } from "../AppContext";
export default function Page() {
  var { user, onLoginClick } = useApp();
  return <SchoolFinderPage user={user} onLoginClick={onLoginClick} />;
}
