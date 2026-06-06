'use client';
import { useRouter } from 'next/navigation';

const RED = "#ec8283";
const DARK = "#1a1a1a";
const GRAY = "#555";

export default function NotFound() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", fontFamily: "'DM Sans',sans-serif", padding: "20px" }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <p style={{ fontSize: "72px", margin: "0 0 16px" }}>🔍</p>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: DARK, marginBottom: "12px" }}>
          Page Not Found
        </h1>
        <p style={{ fontSize: "16px", color: GRAY, lineHeight: 1.7, marginBottom: "32px" }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <button
          onClick={() => router.push('/')}
          style={{ display: "inline-block", padding: "14px 36px", background: RED, color: "white", borderRadius: "12px", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(197,48,48,0.3)" }}
        >
          Go Home →
        </button>
      </div>
    </div>
  );
}
