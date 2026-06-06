"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AppContext } from "./AppContext";
import {
  supabase, ADMIN_EMAILS, RED, DARK,
  Navbar, Footer, AuthModal, ResetPasswordModal, ChatPanel, NotificationPrompt,
  playNotificationSound, sendBrowserNotification
} from "./components";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Map pathname to page name for navbar active state
  function getPageFromPath(p) {
    if (p === "/") return "home";
    if (p === "/schools") return "schools";
    if (p === "/leaderboard") return "leaderboard";
    if (p === "/study-partner") return "partners";
    if (p.startsWith("/forum")) return "forum";
    if (p.startsWith("/blog")) return "blog";
    if (p === "/faq") return "faq";
    if (p === "/admin") return "admin";
    return "home";
  }

  var page = getPageFromPath(pathname);

  function setPage(p) {
    var routes = {
      home: "/", schools: "/schools", leaderboard: "/leaderboard",
      partners: "/study-partner", forum: "/forum", blog: "/blog",
      faq: "/faq", admin: "/admin"
    };
    var route = routes[p] || "/";
    router.push(route);
    window.scrollTo(0, 0);
  }

  // Force light mode
  useEffect(function () {
    var meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "color-scheme"; document.head.appendChild(meta); }
    meta.content = "light only";
    document.documentElement.style.colorScheme = "light only";
  }, []);

  // Handle legacy hash URLs - redirect to new routes
  useEffect(function () {
    if (typeof window !== "undefined" && window.location.hash) {
      var hash = window.location.hash.replace("#", "");
      var redirectMap = {
        schools: "/schools", leaderboard: "/leaderboard", partners: "/study-partner",
        forum: "/forum", blog: "/blog", faq: "/faq", admin: "/admin"
      };
      if (redirectMap[hash]) {
        router.replace(redirectMap[hash]);
      }
    }
  }, []);

  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const chatOpenRef = useRef(false);
  const [chatDmUserId, setChatDmUserId] = useState(null);
  const [chatDmUserName, setChatDmUserName] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const lastSeenRef = useRef({});
  const activeRoomRef = useRef(null);

  useEffect(function () {
    try {
      var saved = localStorage.getItem("ac_chat_last_seen");
      if (saved) lastSeenRef.current = JSON.parse(saved);
    } catch (e) { }
  }, []);

  var lastNotifIdRef = useRef(null);
  useEffect(function () { chatOpenRef.current = chatOpen; }, [chatOpen]);
  useEffect(function () {
    if (!user) return;
    var notifChannel = supabase.channel("global-notif-" + user.id + "-" + Date.now()).on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, function (payload) {
      var newMsg = payload.new;
      if (newMsg.sender_id === user.id) return;
      if (chatOpenRef.current && activeRoomRef.current === newMsg.room_id) return;
      if (lastNotifIdRef.current === newMsg.id) return;
      lastNotifIdRef.current = newMsg.id;
      supabase.from("chat_members").select("room_id").eq("user_id", user.id).eq("room_id", newMsg.room_id).then(function (res) {
        if (res.data && res.data.length > 0) {
          playNotificationSound();
          supabase.from("profiles").select("full_name").eq("id", newMsg.sender_id).single().then(function (pRes) {
            var senderName = (pRes.data && pRes.data.full_name) ? pRes.data.full_name : "Someone";
            sendBrowserNotification("New message from " + senderName, newMsg.content ? (newMsg.content.length > 50 ? newMsg.content.slice(0, 50) + "..." : newMsg.content) : "Sent a message");
          });
        }
      });
    }).subscribe();
    return function () { supabase.removeChannel(notifChannel); };
  }, [user]);

  function saveLastSeen() {
    try { localStorage.setItem("ac_chat_last_seen", JSON.stringify(lastSeenRef.current)); } catch (e) { }
  }

  useEffect(() => {
    if (!user) { setUnreadCount(0); return; }
    async function checkUnread() {
      var { data: memberships } = await supabase.from("chat_members").select("room_id").eq("user_id", user.id);
      if (!memberships || memberships.length === 0) { setUnreadCount(0); return; }
      var roomIds = memberships.map(function (m) { return m.room_id; });
      var count = 0;
      for (var i = 0; i < roomIds.length; i++) {
        var { data: msgs } = await supabase.from("chat_messages").select("id, sender_id, created_at").eq("room_id", roomIds[i]).order("created_at", { ascending: false }).limit(1);
        if (msgs && msgs[0] && msgs[0].sender_id !== user.id) {
          var lastSeen = lastSeenRef.current[roomIds[i]] || null;
          if (!lastSeen || new Date(msgs[0].created_at) > new Date(lastSeen)) { count++; }
        }
      }
      setUnreadCount(count);
    }
    checkUnread();
    var interval = setInterval(checkUnread, 10000);
    return () => clearInterval(interval);
  }, [user, chatOpen]);

  const markRoomSeen = (roomId) => {
    lastSeenRef.current[roomId] = new Date().toISOString();
    saveLastSeen();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "PASSWORD_RECOVERY") { setShowResetPassword(true); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const openChat = (userId, userName) => {
    setChatDmUserId(userId || null);
    setChatDmUserName(userName || null);
    setChatOpen(true);
  };

  // Provide shared props to children via context-like approach
  // We clone children and pass props
  var childProps = {
    user: user,
    onLoginClick: function () { setShowAuth(true); },
    onOpenChat: openChat,
    onLogout: handleLogout,
  };

  return (
    <AppContext.Provider value={childProps}>
    <div style={{ background: "#fff", minHeight: "100vh", color: DARK, overflowX: "hidden" }}>
      <Navbar page={page} setPage={setPage} user={user} onLoginClick={() => setShowAuth(true)} onLogout={handleLogout} />
      {children}
      <Footer />
      {user && !chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 900, width: 56, height: 56, borderRadius: "50%", background: RED, color: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(236,130,131,0.35)", cursor: "pointer" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
          {unreadCount > 0 && (<span style={{ position: "absolute", top: -2, right: -2, width: 22, height: 22, borderRadius: "50%", background: "#EF4444", color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid white", fontFamily: "'DM Sans',sans-serif" }}>{unreadCount > 9 ? "9+" : unreadCount}</span>)}
        </button>
      )}
      <ChatPanel user={user} isOpen={chatOpen} onClose={() => { setChatOpen(false); setChatDmUserId(null); setChatDmUserName(null); activeRoomRef.current = null; }} initialDmUserId={chatDmUserId} initialDmUserName={chatDmUserName} onMarkSeen={markRoomSeen} activeRoomRef={activeRoomRef} />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={setUser} />}
      {showResetPassword && <ResetPasswordModal onClose={() => setShowResetPassword(false)} />}
      <NotificationPrompt user={user} />
    </div>
    </AppContext.Provider>
  );
}

// Export for use in page components that need user/auth
export { supabase } from "./components";
