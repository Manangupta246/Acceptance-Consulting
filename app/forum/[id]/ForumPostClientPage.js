'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useApp } from '../../AppContext';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const RED = "#ec8283";
const RED_BG = "#fdf0f0";
const DARK = "#1a1a1a";
const GRAY = "#6B7280";

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  if (diff < 604800) return Math.floor(diff / 86400) + "d ago";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function ForumPostClientPage({ post: initialPost, comments: initialComments, postId }) {
  const router = useRouter();
  const { user, onLoginClick } = useApp();
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myVotes, setMyVotes] = useState({});

  if (!post) {
    return (
      <div style={{ paddingTop: "120px", minHeight: "100vh", background: "#FAFAFA", fontFamily: "'DM Sans',sans-serif" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px 60px", textAlign: "center" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px" }}>💬</p>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "28px", color: DARK, marginBottom: "12px" }}>Post Not Found</h1>
          <p style={{ color: GRAY, marginBottom: "24px" }}>This discussion may have been removed.</p>
          <button
            onClick={() => router.push('/forum')}
            style={{ padding: "12px 28px", background: RED, color: "white", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          >
            ← Back to Forum
          </button>
        </div>
      </div>
    );
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!user) { onLoginClick(); return; }
    if (!newComment.trim()) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("forum_comments")
      .insert([{ post_id: post.id, author_id: user.id, content: newComment.trim(), parent_id: null }])
      .select("*, profiles:forum_comments_author_id_fkey(full_name, avatar_url)")
      .single();
    if (!error && data) {
      setComments(prev => [...prev, data]);
      setNewComment("");
      await supabase.from("forum_posts").update({ comment_count: (post.comment_count || 0) + 1 }).eq("id", post.id);
      setPost(prev => ({ ...prev, comment_count: (prev.comment_count || 0) + 1 }));
    }
    setSubmitting(false);
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!user || !replyContent.trim() || !replyTo) return;
    setSubmitting(true);
    const { data, error } = await supabase
      .from("forum_comments")
      .insert([{ post_id: post.id, author_id: user.id, content: replyContent.trim(), parent_id: replyTo }])
      .select("*, profiles:forum_comments_author_id_fkey(full_name, avatar_url)")
      .single();
    if (!error && data) {
      setComments(prev => [...prev, data]);
      setReplyTo(null);
      setReplyContent("");
      await supabase.from("forum_posts").update({ comment_count: (post.comment_count || 0) + 1 }).eq("id", post.id);
      setPost(prev => ({ ...prev, comment_count: (prev.comment_count || 0) + 1 }));
    }
    setSubmitting(false);
  }

  async function handleVote(type, id, direction) {
    if (!user) { onLoginClick(); return; }
    const key = type + "_" + id;
    const current = myVotes[key] || 0;
    if (current === direction) {
      await supabase.from("forum_votes").delete().eq("user_id", user.id).eq(type === "post" ? "post_id" : "comment_id", id);
      const newVotes = { ...myVotes };
      delete newVotes[key];
      setMyVotes(newVotes);
      if (type === "post") {
        await supabase.from("forum_posts").update({ upvotes: post.upvotes - direction }).eq("id", id);
        setPost(prev => ({ ...prev, upvotes: prev.upvotes - direction }));
      } else {
        setComments(prev => prev.map(c => c.id === id ? { ...c, upvotes: c.upvotes - direction } : c));
      }
    } else {
      const diff = current === 0 ? direction : direction * 2;
      await supabase.from("forum_votes").upsert(
        { user_id: user.id, [type === "post" ? "post_id" : "comment_id"]: id, vote_type: direction },
        { onConflict: type === "post" ? "user_id,post_id" : "user_id,comment_id" }
      );
      setMyVotes({ ...myVotes, [key]: direction });
      if (type === "post") {
        await supabase.from("forum_posts").update({ upvotes: post.upvotes + diff }).eq("id", id);
        setPost(prev => ({ ...prev, upvotes: prev.upvotes + diff }));
      } else {
        setComments(prev => prev.map(c => c.id === id ? { ...c, upvotes: c.upvotes + diff } : c));
      }
    }
  }

  const topComments = comments.filter(c => !c.parent_id);
  const inputStyle = { width: "100%", padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: 14, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#FAFAFA", boxSizing: "border-box" };

  return (
    <div style={{ paddingTop: 120, minHeight: "100vh", background: "#FAFAFA", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px 60px" }}>

        <button
          onClick={() => router.push('/forum')}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: GRAY, fontSize: 14, fontWeight: 500, cursor: "pointer", padding: 0, marginBottom: 20 }}
        >
          ← Back to Forum
        </button>

        {/* Post */}
        <div style={{ background: "white", borderRadius: 16, border: "1px solid #E5E7EB", padding: 28, marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {/* Vote */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
              <button onClick={() => handleVote("post", post.id, 1)} style={{ background: "none", border: "none", cursor: "pointer", color: myVotes["post_" + post.id] === 1 ? RED : "#9CA3AF", padding: 2, fontSize: 18 }}>▲</button>
              <span style={{ fontSize: 16, fontWeight: 700, color: myVotes["post_" + post.id] ? RED : "#374151" }}>{post.upvotes || 0}</span>
              <button onClick={() => handleVote("post", post.id, -1)} style={{ background: "none", border: "none", cursor: "pointer", color: myVotes["post_" + post.id] === -1 ? "#2563EB" : "#9CA3AF", padding: 2, fontSize: 18 }}>▼</button>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {post.is_pinned && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: RED, marginBottom: 8 }}>📌 PINNED</span>
              )}
              <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 8px", fontFamily: "'Playfair Display',serif", lineHeight: 1.3 }}>
                {post.title}
              </h1>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 16 }}>
                {(post.profiles?.full_name || "Anonymous")} in {post.forum_categories ? post.forum_categories.icon + " " + post.forum_categories.name : "General"} · {timeAgo(post.created_at)}
              </div>
              <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{post.content}</div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827", marginBottom: 16 }}>
            {(post.comment_count || 0)} Comment{(post.comment_count || 0) !== 1 ? "s" : ""}
          </h3>

          {user ? (
            <form onSubmit={handleAddComment} style={{ marginBottom: 24, display: "flex", gap: 8 }}>
              <input type="text" style={{ ...inputStyle, borderRadius: 24 }} placeholder="Add a comment..." value={newComment} onChange={e => setNewComment(e.target.value)} />
              <button type="submit" disabled={submitting || !newComment.trim()} style={{ padding: "10px 20px", background: newComment.trim() ? RED : "#E5E7EB", color: "white", border: "none", borderRadius: 24, fontSize: 13, fontWeight: 600, cursor: newComment.trim() ? "pointer" : "default", flexShrink: 0 }}>
                Post
              </button>
            </form>
          ) : (
            <div style={{ padding: "16px 20px", background: RED_BG, borderRadius: 12, marginBottom: 24, fontSize: 13, color: RED }}>
              <button onClick={onLoginClick} style={{ background: "none", border: "none", color: RED, fontWeight: 600, cursor: "pointer", textDecoration: "underline", fontFamily: "'DM Sans',sans-serif", fontSize: 13, padding: 0 }}>Sign in</button> to join the discussion.
            </div>
          )}

          {topComments.map(c => {
            const replies = comments.filter(r => r.parent_id === c.id);
            return (
              <div key={c.id} style={{ marginBottom: 16 }}>
                <div style={{ background: "white", borderRadius: 12, border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, flexShrink: 0 }}>
                      <button onClick={() => handleVote("comment", c.id, 1)} style={{ background: "none", border: "none", cursor: "pointer", color: myVotes["comment_" + c.id] === 1 ? RED : "#D1D5DB", padding: 1, fontSize: 14 }}>▲</button>
                      <span style={{ fontSize: 13, fontWeight: 700, color: myVotes["comment_" + c.id] ? RED : GRAY }}>{c.upvotes || 0}</span>
                      <button onClick={() => handleVote("comment", c.id, -1)} style={{ background: "none", border: "none", cursor: "pointer", color: myVotes["comment_" + c.id] === -1 ? "#2563EB" : "#D1D5DB", padding: 1, fontSize: 14 }}>▼</button>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{(c.profiles?.full_name || "Anonymous")} · {timeAgo(c.created_at)}</div>
                      <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.6 }}>{c.content}</div>
                      {user && (
                        <button onClick={() => { setReplyTo(replyTo === c.id ? null : c.id); setReplyContent(""); }} style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "4px 0", fontFamily: "'DM Sans',sans-serif" }}>
                          {replyTo === c.id ? "Cancel" : "Reply"}
                        </button>
                      )}
                    </div>
                  </div>
                  {replyTo === c.id && (
                    <form onSubmit={handleReply} style={{ marginTop: 12, marginLeft: 40, display: "flex", gap: 8 }}>
                      <input type="text" style={{ ...inputStyle, borderRadius: 20, fontSize: 13, padding: "8px 14px" }} placeholder="Write a reply..." value={replyContent} onChange={e => setReplyContent(e.target.value)} />
                      <button type="submit" disabled={submitting || !replyContent.trim()} style={{ padding: "8px 16px", background: replyContent.trim() ? RED : "#E5E7EB", color: "white", border: "none", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: replyContent.trim() ? "pointer" : "default", flexShrink: 0 }}>
                        Reply
                      </button>
                    </form>
                  )}
                </div>
                {replies.length > 0 && (
                  <div style={{ marginLeft: 40, marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                    {replies.map(r => (
                      <div key={r.id} style={{ background: "#F9FAFB", borderRadius: 10, border: "1px solid #F3F4F6", padding: "12px 16px" }}>
                        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>{(r.profiles?.full_name || "Anonymous")} · {timeAgo(r.created_at)}</div>
                        <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{r.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
