"use client";
import { ForumPage } from "../components";
import { useApp } from "../AppContext";
export default function Page() {
  var { user, onLoginClick } = useApp();
  return <ForumPage user={user} onLoginClick={onLoginClick} />;
}
