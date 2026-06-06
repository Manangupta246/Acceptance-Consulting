'use client';
import { useRouter } from 'next/navigation';

const RED = "#ec8283";
const RED_BG = "#fdf0f0";
const DARK = "#1a1a1a";
const GRAY = "#555";
const LIGHT_GRAY = "#f8f8f8";

export default function BlogPostClientPage({ post, slug }) {
  const router = useRouter();

  if (!post) {
    return (
      <div style={{ paddingTop: "120px", minHeight: "100vh", background: "#fff", fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 20px 60px", textAlign: "center" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>📝</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "28px", color: DARK, marginBottom: "12px" }}>Post Not Found</h1>
          <p style={{ color: GRAY, marginBottom: "24px" }}>This post may have been removed or is no longer available.</p>
          <button
            onClick={() => router.push('/blog')}
            style={{ padding: "12px 28px", background: RED, color: "white", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", background: "#fff" }}>
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 20px 60px" }}>
        <button
          onClick={() => router.push('/blog')}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "14px", fontWeight: 600, color: RED, background: "none", border: "none", cursor: "pointer", marginBottom: "28px", display: "flex", alignItems: "center", gap: "6px" }}
        >
          ← Back to Blog
        </button>

        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            style={{ width: "100%", height: "360px", objectFit: "cover", borderRadius: "20px", marginBottom: "32px" }}
          />
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <span style={{ padding: "6px 16px", borderRadius: "50px", background: RED_BG, color: RED, fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 700 }}>
            {post.category}
          </span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: GRAY }}>{date}</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13px", color: GRAY }}>by {post.author_name}</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, color: DARK, marginBottom: "32px", lineHeight: 1.2 }}>
          {post.title}
        </h1>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "17px", color: DARK, lineHeight: 1.85 }}
        />

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.08)", display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {post.tags.map((tag, i) => (
              <span key={i} style={{ padding: "6px 14px", borderRadius: "50px", background: LIGHT_GRAY, fontFamily: "'DM Sans',sans-serif", fontSize: "12px", fontWeight: 600, color: GRAY }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
