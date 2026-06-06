"use client";
import { createContext, useContext } from "react";

export const AppContext = createContext({
  user: null,
  onLoginClick: function() {},
  onOpenChat: function() {},
  onLogout: function() {},
});

export function useApp() {
  return useContext(AppContext);
}
