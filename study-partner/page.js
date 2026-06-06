"use client";
import { AccountabilityPage } from "../components";
import { useApp } from "../AppContext";
export default function Page() {
  var { user, onLoginClick, onOpenChat } = useApp();
  return <AccountabilityPage user={user} onLoginClick={onLoginClick} onOpenChat={onOpenChat} />;
}
