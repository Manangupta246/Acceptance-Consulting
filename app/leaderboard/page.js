"use client";
import { LeaderboardPage } from "../components";
import { useApp } from "../AppContext";
export default function Page() {
  var { user, onLoginClick, onOpenChat } = useApp();
  return <LeaderboardPage user={user} onOpenChat={onOpenChat} onLoginClick={onLoginClick} />;
}
