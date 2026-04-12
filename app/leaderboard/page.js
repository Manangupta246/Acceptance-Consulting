"use client";
import { useState, useEffect, useCallback } from "react";

// ============================================================
// SUPABASE CLIENT (inline to keep single-file simplicity)
// ============================================================
const SUPABASE_URL = "https://lbrcrknnivxkqvryzamr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicmNya25uaXZ4a3F2cnl6YW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5OTMzNzIsImV4cCI6MjA5MTU2OTM3Mn0.1Nc188JkXxX_Sip3lWBFaHivW4DyUYu5H2zAELaD3Ss";

let supabaseInstance = null;

function getSupabase() {
  if (supabaseInstance) return supabaseInstance;
  if (typeof window !== "undefined" && window.__supabase) return window.__supabase;

  const { createClient } = require("@supabase/supabase-js");
  supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  if (typeof window !== "undefined") window.__supabase = supabaseInstance;
  return supabaseInstance;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function getDateRange(period) {
  const now = new Date();
  let start;
  if (period === "daily") {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  } else if (period === "weekly") {
    const day = now.getDay();
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
  } else if (period === "monthly") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    start = new Date(2020, 0, 1);
  }
  return start.toISOString();
}

function formatScore(val) {
  if (val === null || val === undefined) return "--";
  return Number(val).toFixed(1);
}

// ============================================================
// ICONS (inline SVG components)
// ============================================================
function TrophyIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ============================================================
// MAIN LEADERBOARD PAGE COMPONENT
// ============================================================
export default function LeaderboardPage() {
  const [examType, setExamType] = useState("GMAT");
  const [period, setPeriod] = useState("weekly");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Score submission form state
  const [scoreForm, setScoreForm] = useState({
    quant_score: "",
    verbal_score: "",
    total_score: "",
    questions_attempted: "",
    questions_correct: "",
    study_hours: "",
    notes: ""
  });

  // Check auth
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getUser().then(({ data }) => {
      if (data && data.user) {
        setUser(data.user);
        // Fetch profile
        supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) setUserProfile(profile);
          });
      }
    });
  }, []);

  // Fetch leaderboard data
  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    const supabase = getSupabase();
    const startDate = getDateRange(period);

    try {
      const { data, error } = await supabase
        .from("daily_scores")
        .select("*, profiles(full_name, avatar_url, target_exam)")
        .eq("exam_type", examType)
        .gte("score_date", startDate.split("T")[0])
        .order("total_score", { ascending: false });

      if (error) {
        console.error("Leaderboard fetch error:", error);
        setLeaderboardData([]);
      } else {
        // Aggregate by user: sum scores, compute averages
        const userMap = {};
        (data || []).forEach((row) => {
          const uid = row.user_id;
          if (!userMap[uid]) {
            userMap[uid] = {
              user_id: uid,
              full_name: row.profiles ? row.profiles.full_name : "Anonymous",
              avatar_url: row.profiles ? row.profiles.avatar_url : null,
              target_exam: row.profiles ? row.profiles.target_exam : null,
              total_scores: [],
              quant_scores: [],
              verbal_scores: [],
              questions_attempted: 0,
              questions_correct: 0,
              study_hours: 0,
              days_active: 0
            };
          }
          if (row.total_score) userMap[uid].total_scores.push(row.total_score);
          if (row.quant_score) userMap[uid].quant_scores.push(row.quant_score);
          if (row.verbal_score) userMap[uid].verbal_scores.push(row.verbal_score);
          userMap[uid].questions_attempted += row.questions_attempted || 0;
          userMap[uid].questions_correct += row.questions_correct || 0;
          userMap[uid].study_hours += row.study_hours || 0;
          userMap[uid].days_active += 1;
        });

        // Convert to array and compute composite score
        const aggregated = Object.values(userMap).map((u) => {
          const avgTotal = u.total_scores.length > 0
            ? u.total_scores.reduce((a, b) => a + b, 0) / u.total_scores.length
            : 0;
          const avgQuant = u.quant_scores.length > 0
            ? u.quant_scores.reduce((a, b) => a + b, 0) / u.quant_scores.length
            : 0;
          const avgVerbal = u.verbal_scores.length > 0
            ? u.verbal_scores.reduce((a, b) => a + b, 0) / u.verbal_scores.length
            : 0;
          const accuracy = u.questions_attempted > 0
            ? (u.questions_correct / u.questions_attempted) * 100
            : 0;

          // Composite: weighted blend of score, consistency (days), accuracy, volume
          const consistencyScore = Math.min(u.days_active * 10, 100);
          const volumeScore = Math.min(u.questions_attempted * 0.5, 100);
          const composite = (avgTotal * 0.4) + (accuracy * 0.25) + (consistencyScore * 0.2) + (volumeScore * 0.15);

          return {
            ...u,
            avg_total: avgTotal,
            avg_quant: avgQuant,
            avg_verbal: avgVerbal,
            accuracy: accuracy,
            composite: composite
          };
        });

        aggregated.sort((a, b) => b.composite - a.composite);
        setLeaderboardData(aggregated);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setLeaderboardData([]);
    }
    setLoading(false);
  }, [examType, period]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Submit score
  async function handleSubmitScore(e) {
    e.preventDefault();
    if (!user) return alert("Please sign in to submit a score.");
    setSubmitting(true);

    const supabase = getSupabase();
    const today = new Date().toISOString().split("T")[0];

    const payload = {
      user_id: user.id,
      exam_type: examType,
      score_date: today,
      quant_score: scoreForm.quant_score ? Number(scoreForm.quant_score) : null,
      verbal_score: scoreForm.verbal_score ? Number(scoreForm.verbal_score) : null,
      total_score: scoreForm.total_score ? Number(scoreForm.total_score) : null,
      questions_attempted: scoreForm.questions_attempted ? Number(scoreForm.questions_attempted) : null,
      questions_correct: scoreForm.questions_correct ? Number(scoreForm.questions_correct) : null,
      study_hours: scoreForm.study_hours ? Number(scoreForm.study_hours) : null,
      notes: scoreForm.notes || null
    };

    const { error } = await supabase.from("daily_scores").insert([payload]);

    if (error) {
      console.error("Submit error:", error);
      alert("Error submitting score. You may have already logged today, or please check your inputs.");
    } else {
      setShowScoreModal(false);
      setScoreForm({
        quant_score: "",
        verbal_score: "",
        total_score: "",
        questions_attempted: "",
        questions_correct: "",
        study_hours: "",
        notes: ""
      });
      fetchLeaderboard();
    }
    setSubmitting(false);
  }

  // Medal colors for top 3
  function getMedalStyle(index) {
    if (index === 0) return { bg: "#FEF3C7", border: "#F59E0B", text: "#92400E", icon: "#F59E0B" };
    if (index === 1) return { bg: "#F3F4F6", border: "#9CA3AF", text: "#4B5563", icon: "#9CA3AF" };
    if (index === 2) return { bg: "#FED7AA", border: "#EA580C", text: "#9A3412", icon: "#EA580C" };
    return { bg: "transparent", border: "#E5E7EB", text: "#374151", icon: "#6B7280" };
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAFAFA" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .lb-page * {
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }
        .lb-page h1, .lb-page h2, .lb-page h3 {
          font-family: 'Playfair Display', serif;
        }

        .lb-tab {
          padding: 10px 20px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          color: #6B7280;
          border-bottom: 3px solid transparent;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .lb-tab:hover {
          color: #B91C1C;
        }
        .lb-tab-active {
          color: #B91C1C;
          border-bottom-color: #B91C1C;
          font-weight: 600;
        }

        .lb-period-btn {
          padding: 8px 18px;
          border: 1px solid #E5E7EB;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #6B7280;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .lb-period-btn:hover {
          border-color: #B91C1C;
          color: #B91C1C;
        }
        .lb-period-active {
          background: #B91C1C;
          color: white;
          border-color: #B91C1C;
        }
        .lb-period-active:hover {
          background: #991B1B;
          color: white;
        }

        .lb-row {
          display: grid;
          grid-template-columns: 60px 1fr 100px 100px 100px 80px 90px;
          align-items: center;
          padding: 16px 24px;
          border-bottom: 1px solid #F3F4F6;
          transition: background-color 0.15s ease;
        }
        .lb-row:hover {
          background-color: #FEF2F2;
        }

        .lb-header-row {
          display: grid;
          grid-template-columns: 60px 1fr 100px 100px 100px 80px 90px;
          align-items: center;
          padding: 12px 24px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #9CA3AF;
          border-bottom: 2px solid #F3F4F6;
        }

        .lb-card-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 28px 20px;
          border-radius: 16px;
          border: 2px solid;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .lb-card-top:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        .lb-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          color: white;
        }

        .lb-avatar-small {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          color: white;
        }

        .lb-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        .lb-modal {
          background: white;
          border-radius: 20px;
          padding: 36px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
        }

        .lb-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #E5E7EB;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s ease;
          outline: none;
          background: #FAFAFA;
        }
        .lb-input:focus {
          border-color: #B91C1C;
          background: white;
        }

        .lb-submit-btn {
          width: 100%;
          padding: 14px;
          background: #B91C1C;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease;
        }
        .lb-submit-btn:hover {
          background: #991B1B;
        }
        .lb-submit-btn:disabled {
          background: #D1D5DB;
          cursor: not-allowed;
        }

        .lb-stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          background: #F9FAFB;
          color: #6B7280;
        }

        .lb-empty-state {
          text-align: center;
          padding: 80px 20px;
          color: #9CA3AF;
        }

        .lb-skeleton {
          background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 8px;
          height: 60px;
          margin-bottom: 8px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .lb-row, .lb-header-row {
            grid-template-columns: 40px 1fr 70px 70px;
          }
          .lb-hide-mobile {
            display: none;
          }
          .lb-top-cards {
            flex-direction: column;
          }
          .lb-card-top {
            width: 100%;
          }
          .lb-modal {
            padding: 24px;
          }
        }
      `}</style>

      <div className="lb-page" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        {/* Back to Home + Header */}
        <div style={{ paddingTop: 24, paddingBottom: 8 }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#6B7280",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 20
            }}
          >
            <ArrowLeftIcon /> Back to Home
          </a>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 12 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2 }}>
                Prep Leaderboard
              </h1>
              <p style={{ fontSize: 15, color: "#6B7280", marginTop: 6, marginBottom: 0 }}>
                Track your {examType} prep progress. Compete with fellow aspirants.
              </p>
            </div>

            {user && (
              <button
                onClick={() => setShowScoreModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "#B91C1C",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.2s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "#991B1B"}
                onMouseOut={(e) => e.currentTarget.style.background = "#B91C1C"}
              >
                <PlusIcon /> Log Today&#39;s Score
              </button>
            )}
          </div>
        </div>

        {/* Exam Type Tabs */}
        <div style={{ display: "flex", borderBottom: "2px solid #F3F4F6", marginTop: 24, gap: 0 }}>
          {["GMAT", "GRE"].map((exam) => (
            <button
              key={exam}
              className={`lb-tab ${examType === exam ? "lb-tab-active" : ""}`}
              onClick={() => setExamType(exam)}
            >
              {exam} Leaderboard
            </button>
          ))}
        </div>

        {/* Period Filter */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          {[
            { key: "daily", label: "Today" },
            { key: "weekly", label: "This Week" },
            { key: "monthly", label: "This Month" },
            { key: "all", label: "All Time" }
          ].map((p) => (
            <button
              key={p.key}
              className={`lb-period-btn ${period === p.key ? "lb-period-active" : ""}`}
              onClick={() => setPeriod(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ marginTop: 32 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="lb-skeleton" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && leaderboardData.length === 0 && (
          <div className="lb-empty-state">
            <div style={{ fontSize: 48, marginBottom: 16 }}>&#128202;</div>
            <h3 style={{ fontSize: 20, color: "#374151", marginBottom: 8 }}>No scores yet for this period</h3>
            <p style={{ fontSize: 14, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
              Be the first to log your {examType} practice score and claim the top spot on the leaderboard.
            </p>
            {user && (
              <button
                onClick={() => setShowScoreModal(true)}
                style={{
                  marginTop: 20,
                  padding: "12px 28px",
                  background: "#B91C1C",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Log Your First Score
              </button>
            )}
            {!user && (
              <p style={{ marginTop: 16, fontSize: 13, color: "#9CA3AF" }}>
                <a href="/" style={{ color: "#B91C1C", textDecoration: "underline" }}>Sign in</a> to start logging scores.
              </p>
            )}
          </div>
        )}

        {/* Top 3 Podium Cards */}
        {!loading && leaderboardData.length > 0 && (
          <>
            <div className="lb-top-cards" style={{ display: "flex", gap: 16, marginTop: 32, justifyContent: "center" }}>
              {leaderboardData.slice(0, Math.min(3, leaderboardData.length)).map((entry, idx) => {
                const medal = getMedalStyle(idx);
                const initials = (entry.full_name || "A")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <div
                    key={entry.user_id}
                    className="lb-card-top"
                    style={{
                      backgroundColor: medal.bg,
                      borderColor: medal.border,
                      flex: idx === 0 ? "1.2" : "1",
                      minWidth: 200
                    }}
                  >
                    {/* Rank Badge */}
                    <div style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: medal.border,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700
                    }}>
                      {idx + 1}
                    </div>

                    <TrophyIcon color={medal.icon} />

                    <div className="lb-avatar" style={{
                      background: medal.border,
                      marginTop: 12,
                      width: idx === 0 ? 56 : 48,
                      height: idx === 0 ? 56 : 48,
                      fontSize: idx === 0 ? 20 : 18
                    }}>
                      {initials}
                    </div>

                    <h3 style={{
                      fontSize: idx === 0 ? 18 : 16,
                      fontWeight: 600,
                      color: medal.text,
                      marginTop: 10,
                      marginBottom: 4,
                      textAlign: "center"
                    }}>
                      {entry.full_name || "Anonymous"}
                    </h3>

                    <div style={{ fontSize: 26, fontWeight: 800, color: medal.text, fontFamily: "'Playfair Display', serif" }}>
                      {formatScore(entry.avg_total)}
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 12 }}>avg score</div>

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                      <span className="lb-stat-pill">
                        <TargetIcon /> {formatScore(entry.accuracy)}%
                      </span>
                      <span className="lb-stat-pill">
                        <FireIcon /> {entry.days_active}d streak
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full Leaderboard Table */}
            <div style={{
              marginTop: 32,
              background: "white",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              marginBottom: 60
            }}>
              <div className="lb-header-row">
                <span>Rank</span>
                <span>Name</span>
                <span>Avg Score</span>
                <span>Quant</span>
                <span className="lb-hide-mobile">Verbal</span>
                <span className="lb-hide-mobile">Accuracy</span>
                <span className="lb-hide-mobile">Days</span>
              </div>

              {leaderboardData.map((entry, idx) => {
                const initials = (entry.full_name || "A")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                const isCurrentUser = user && entry.user_id === user.id;
                const colors = ["#B91C1C", "#2563EB", "#059669", "#7C3AED", "#D97706", "#DB2777"];
                const avatarColor = colors[idx % colors.length];

                return (
                  <div
                    key={entry.user_id}
                    className="lb-row"
                    style={{
                      backgroundColor: isCurrentUser ? "#FEF2F2" : "transparent",
                      borderLeft: isCurrentUser ? "3px solid #B91C1C" : "3px solid transparent"
                    }}
                  >
                    <span style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: idx < 3 ? getMedalStyle(idx).icon : "#9CA3AF"
                    }}>
                      {idx + 1}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div className="lb-avatar-small" style={{ background: avatarColor, flexShrink: 0 }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>
                          {entry.full_name || "Anonymous"}
                          {isCurrentUser && (
                            <span style={{
                              marginLeft: 8,
                              fontSize: 10,
                              fontWeight: 600,
                              background: "#B91C1C",
                              color: "white",
                              padding: "2px 8px",
                              borderRadius: 10
                            }}>
                              YOU
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: "#9CA3AF" }}>
                          {entry.study_hours}h studied
                        </div>
                      </div>
                    </div>

                    <span style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>
                      {formatScore(entry.avg_total)}
                    </span>

                    <span style={{ fontSize: 14, color: "#374151" }}>
                      {formatScore(entry.avg_quant)}
                    </span>

                    <span className="lb-hide-mobile" style={{ fontSize: 14, color: "#374151" }}>
                      {formatScore(entry.avg_verbal)}
                    </span>

                    <span className="lb-hide-mobile" style={{ fontSize: 14, color: "#374151" }}>
                      {formatScore(entry.accuracy)}%
                    </span>

                    <span className="lb-hide-mobile" style={{ fontSize: 14, color: "#374151" }}>
                      {entry.days_active}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Not signed in banner */}
        {!user && !loading && (
          <div style={{
            marginTop: 32,
            padding: "24px 28px",
            background: "#FEF2F2",
            borderRadius: 12,
            border: "1px solid #FECACA",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 40
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#991B1B" }}>Join the leaderboard</div>
              <div style={{ fontSize: 13, color: "#B91C1C", marginTop: 2 }}>
                Sign in to log your daily practice scores and compete with fellow aspirants.
              </div>
            </div>
            <a
              href="/"
              style={{
                padding: "10px 24px",
                background: "#B91C1C",
                color: "white",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600
              }}
            >
              Sign In
            </a>
          </div>
        )}

        {/* Scoring Methodology */}
        <div style={{
          marginTop: 16,
          marginBottom: 60,
          padding: "28px",
          background: "white",
          borderRadius: 16,
          border: "1px solid #E5E7EB"
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", marginTop: 0, marginBottom: 16 }}>
            How Rankings Work
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { icon: <ChartIcon />, label: "Average Score", weight: "40%", desc: "Your mean practice test score" },
              { icon: <TargetIcon />, label: "Accuracy", weight: "25%", desc: "Questions correct / attempted" },
              { icon: <FireIcon />, label: "Consistency", weight: "20%", desc: "Number of days you logged scores" },
              { icon: <UserIcon />, label: "Volume", weight: "15%", desc: "Total questions you attempted" }
            ].map((item, i) => (
              <div key={i} style={{
                padding: "16px",
                background: "#F9FAFB",
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 6
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#B91C1C" }}>
                  {item.icon}
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{item.label}</span>
                  <span style={{
                    marginLeft: "auto",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#B91C1C",
                    background: "#FEF2F2",
                    padding: "2px 8px",
                    borderRadius: 10
                  }}>{item.weight}</span>
                </div>
                <span style={{ fontSize: 12, color: "#6B7280" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Submission Modal */}
      {showScoreModal && (
        <div className="lb-modal-overlay" onClick={() => setShowScoreModal(false)}>
          <div className="lb-modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>
                Log {examType} Score
              </h2>
              <button
                onClick={() => setShowScoreModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 24,
                  color: "#9CA3AF",
                  cursor: "pointer",
                  padding: 4
                }}
              >
                &#10005;
              </button>
            </div>

            <form onSubmit={handleSubmitScore}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                    Quant Score
                  </label>
                  <input
                    type="number"
                    className="lb-input"
                    placeholder={examType === "GMAT" ? "60-90" : "130-170"}
                    value={scoreForm.quant_score}
                    onChange={(e) => setScoreForm({ ...scoreForm, quant_score: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                    Verbal Score
                  </label>
                  <input
                    type="number"
                    className="lb-input"
                    placeholder={examType === "GMAT" ? "60-90" : "130-170"}
                    value={scoreForm.verbal_score}
                    onChange={(e) => setScoreForm({ ...scoreForm, verbal_score: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                  Total Score *
                </label>
                <input
                  type="number"
                  className="lb-input"
                  placeholder={examType === "GMAT" ? "205-805" : "260-340"}
                  value={scoreForm.total_score}
                  onChange={(e) => setScoreForm({ ...scoreForm, total_score: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                    Questions Attempted
                  </label>
                  <input
                    type="number"
                    className="lb-input"
                    placeholder="e.g. 50"
                    value={scoreForm.questions_attempted}
                    onChange={(e) => setScoreForm({ ...scoreForm, questions_attempted: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                    Questions Correct
                  </label>
                  <input
                    type="number"
                    className="lb-input"
                    placeholder="e.g. 38"
                    value={scoreForm.questions_correct}
                    onChange={(e) => setScoreForm({ ...scoreForm, questions_correct: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                  Study Hours Today
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="lb-input"
                  placeholder="e.g. 3.5"
                  value={scoreForm.study_hours}
                  onChange={(e) => setScoreForm({ ...scoreForm, study_hours: e.target.value })}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>
                  Notes (optional)
                </label>
                <textarea
                  className="lb-input"
                  rows={3}
                  placeholder="What did you practice today?"
                  value={scoreForm.notes}
                  onChange={(e) => setScoreForm({ ...scoreForm, notes: e.target.value })}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button
                type="submit"
                className="lb-submit-btn"
                disabled={submitting || !scoreForm.total_score}
                style={{ marginTop: 24 }}
              >
                {submitting ? "Submitting..." : "Submit Score"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
