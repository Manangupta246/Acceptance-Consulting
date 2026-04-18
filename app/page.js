'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from '@supabase/supabase-js';

/* ── Supabase ── */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);
const ADMIN_EMAIL = "manangupta246@gmail.com";

/* ── Config ── */
const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/L6upA5MYtSEGOYLU8UTBs1";
const WHATSAPP_CONNECT = "https://wa.me/+919813866629?text=";
const LOGO = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/A0xw1L5325CZlXWJ/picture9-m5KL5O2506Fzx5RM.png";
const RED = "#ec8283";
const RED_DARK = "#d45d5e";
const RED_BG = "#fdf0f0";
const DARK = "#1a1a1a";
const GRAY = "#555";
const LIGHT_GRAY = "#f8f8f8";
const avatar = (n) => `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(n)}&backgroundColor=fce4e4`;

/* ── Counter ── */
function AnimatedCounter({ target, suffix = "" }) {
  const [c, setC] = useState(0);
  const ref = useRef(null);
  const num = parseInt(target.replace(/\D/g, ""));
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0; const step = Math.ceil(num / 80);
        const t = setInterval(() => { s += step; if (s >= num) { setC(num); clearInterval(t); } else setC(s); }, 20);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{c}{suffix}</span>;
}

/* ── Data ── */
const stats = [
  { number: "150", suffix: "+", label: "Successful Applicants" },
  { number: "96", suffix: "%", label: "Acceptance Rate" },
  { number: "92", suffix: "%", label: "Final Admit Rate" },
  { number: "100", suffix: "%", label: "Reapplicant Success" },
];
const schools = [
  { name: "ISB", color: "#1B3A5C" }, { name: "INSEAD", color: "#003D6B" },
  { name: "LBS", color: "#2C1654" }, { name: "Stanford GSB", color: "#8C1515" },
  { name: "NUS Business", color: "#003D7C" }, { name: "IESE", color: "#00205B" },
  { name: "Said (Oxford)", color: "#002147" }, { name: "SP Jain", color: "#C8102E" },
  { name: "& Other Top Schools", color: RED },
];
const services = [
  { icon: "\u{1F50D}", title: "Profile Deep-Dive & School Selection", desc: "We sit with your story, decode your strengths, & help you pick schools where you will truly belong." },
  { icon: "\u{1F4C4}", title: "Resume Tailored to School Style", desc: "We help translate your experiences into a format that speaks the language of B-schools." },
  { icon: "\u{1F4DD}", title: "Essay Brainstorming & Unlimited Edits", desc: "We help you make sense of your story & build essays that make admissions teams remember you." },
  { icon: "\u{1F3A4}", title: "Mock Interviews Tailored to School Style", desc: "From traditional panels to case-style and behavioral interviews, we prepare you for the real thing." },
  { icon: "\u{2709}\u{FE0F}", title: "LOR + Application Strategy", desc: "Your application is not just about what you say - it is also about what others say about you." },
  { icon: "\u{1F393}", title: "Maximize Your Scholarship", desc: "We dig into optional essays, diversity angles, and need/merit tactics." },
];
const isbServices = ["Profile Deep-Dive & YL/PGP Track Guidance","Resume Tailoring","Essay Brainstorming & Unlimited Edits","Application Form Strategy","Mock Interview with Real ISB Questions","Reapplicant Strategy"];
const intlServices = ["School Shortlisting","Resume Revamp Tailored to School Style","Essay Brainstorming & Unlimited Edits","LOR + Application Strategy","Mock Interview Tailored to School Style","Maximize Your Scholarship"];
const howItWorks = [
  { step: "01", title: "Book a Free Call", desc: "Tell us where you are in your journey. No commitments, no pressure - just a real conversation.", icon: "\u{1F4DE}" },
  { step: "02", title: "We Deep-Dive Your Profile", desc: "We break down your story, identify your unique edge, and map out a strategy tailored to your target schools.", icon: "\u{1F9E0}" },
  { step: "03", title: "We Build It Together", desc: "From essays to interviews, we walk with you every step. Unlimited revisions, real-time support, midnight voice notes - the works.", icon: "\u{1F91D}" },
];
const team = [
  { name: "Tanya Mehta", image: avatar("TanyaMehta"), bio: "Tanya Mehta is an MBA graduate, Chartered Accountant (CA) and CFA Level 1 who secured admits from top global business schools and ISB, giving her a well-rounded understanding of MBA admissions worldwide. She also teaches strategy to MBA students, further strengthening her insights into what top schools seek in candidates." },
  { name: "Manan Gupta", image: avatar("MananGupta"), bio: "Manan Gupta is an MBA graduate from ISB and a management consultant with 4+ years of work experience at Bain and Kepler Cannon. He brings a wealth of experience in storytelling and career mentorship. With an insider perspective on top-tier MBA programs, he has guided 100+ candidates in crafting high-impact applications that stand out." },
];
const testimonialCategories = [
  { category: "Overall Journey", icon: "\u{1F31F}", items: [
    { name: "Nandeta Agrawala", school: "ISB Co'26", image: avatar("Nandeta"), text: "One thing I can say with 100% confidence is that the level of belief and confidence Tanya and Manan instill in their mentees is beyond extraordinary and I genuinely owe a large part of my success to them. Their mentorship felt personal, thoughtful, and deeply committed." },
    { name: "Rhythm Garg", school: "ISB Co'26", image: avatar("Rhythm"), text: "With just a week left to apply, I was overwhelmed and full of doubt. That is when Tanya and Manan stepped in - not just as consultants, but as true mentors. What meant the most was how much they believed in me, especially in moments I could not believe in myself." },
    { name: "Shiv Bhasin", school: "ISB Co'26", image: avatar("ShivAll"), text: "They had prepared me for every scenario and it is because of them that I could handle the entire process and secure an admit. The biggest thank you for my application journey goes to them!" },
  ]},
  { category: "Interview Prep", icon: "\u{1F3A4}", items: [
    { name: "Rachit Shukla", school: "ISB Co'26", image: avatar("Rachit"), text: "She did not just help me prepare answers but also guided me to understand why my story mattered and how to bring it out authentically. The clarity, structure, and confidence I walked into the actual interview with had a lot to do with those mocks." },
    { name: "Shiv Bhasin", school: "ISB Co'26", image: avatar("ShivB"), text: "Initially, I was a bit overconfident about the interview but an initial call with Manan made me realise how wrong my approach was. Post that, Tanya put in a huge amount of effort to help me polish and structure my answers." },
    { name: "Nandeta Agrawala", school: "ISB Co'26", image: avatar("NandetaI"), text: "The mock interviews they conducted were not just rehearsals, they were transformative learning experiences. I made it a point to incorporate their feedback every time and it made all the difference." },
  ]},
  { category: "Essays & Applications", icon: "\u{1F4DD}", items: [
    { name: "Rhythm Garg", school: "ISB Co'26", image: avatar("RhythmE"), text: "They helped me dig deep, reflect on my journey, and bring out stories I did not even realise were worth telling. Every single essay went through multiple rounds, not to make it sound fancy, but to make it sound authentic." },
    { name: "Nandeta Agrawala", school: "ISB Co'26", image: avatar("NandetaE"), text: "Their ability to break things down helped me understand my own story better. They never treated me like just another candidate. I can say without a doubt that if it were not for them, I would not be at ISB today." },
    { name: "Rhythm Garg", school: "ISB Co'26", image: avatar("RhythmE2"), text: "From essay and resume edits to interview prep, they were there for every step of the process, often more invested in my application than I was. If you are looking for people who actually care, you will not find a better team." },
  ]},
];
const faqs = [
  { q: "When should I start preparing?", a: "The earlier the better - but it is never too late. Ideally, start 4-6 months before your target deadline. That gives us time to do a proper profile deep-dive, work through multiple essay drafts, and run thorough mock interviews. That said, we have helped people with just a week left. Whenever you start, we will make it work." },
  { q: "Do you help with reapplications?", a: "Absolutely - and we are proud to say we have a 100% reapplicant success rate. If you were rejected before, we tear apart what went wrong, rebuild your narrative from scratch, and position you differently. A rejection is not the end of your story. It is just a plot twist." },
  { q: "What if I do not get in?", a: "We will not sugarcoat it - no one can guarantee an admit. But with a 96% acceptance rate, the odds are strongly in your favour when you work with us. If things do not go as planned, we stick around. We help you reapply, rethink your strategy, or explore alternate schools. We do not disappear after the result." },
  { q: "How is this different from other consultants?", a: "Most consultants give you templates and checklists. We give you ourselves. We are not a factory - we take on a limited number of applicants each cycle so we can go deep with each one. You get direct access to us (yes, even midnight voice notes), unlimited essay revisions, and mentors who genuinely care whether you get in." },
  { q: "How many schools can I apply to with your help?", a: "There is no fixed limit. Most applicants work with us on 2-5 schools, but we have supported people applying to 8+ programs in a single cycle. Each school gets tailored attention - we do not copy-paste essays or recycle strategies." },
  { q: "Can I just get interview prep without the full package?", a: "Yes! We offer standalone interview prep - mock interviews tailored to the specific school format and question style. Whether it is ISB panel format, INSEAD alumni interviews, or a case-style discussion, we have got you covered." },
];
const communityProof = [
  { type: "chat", caption: "Late-night essay brainstorming in the community group", placeholder: "Community WhatsApp Screenshot" },
  { type: "chat", caption: "Admit celebrations - this never gets old", placeholder: "Admit Celebration Screenshot" },
  { type: "webinar", caption: "Free ISB admissions webinar - 200+ attendees", placeholder: "Webinar Screenshot" },
  { type: "chat", caption: "Real questions, real answers - no gatekeeping", placeholder: "Q&A Discussion Screenshot" },
  { type: "webinar", caption: "Panel discussion with ISB alumni", placeholder: "Panel Discussion Photo" },
  { type: "chat", caption: "When the community rallies around a reapplicant", placeholder: "Support Thread Screenshot" },
];
const linkedinPosts = [
  { title: "How we helped 50+ applicants get into ISB in one cycle", placeholder: "LinkedIn Post Screenshot 1" },
  { title: "The reapplicant who turned rejection into an admit", placeholder: "LinkedIn Post Screenshot 2" },
  { title: "Why your MBA essay probably is not working", placeholder: "LinkedIn Post Screenshot 3" },
];

const BLOG_CATEGORIES = ["All","MBA Strategy","ISB Admissions","International B-Schools","Essay Tips","Interview Prep","Scholarships","Reapplication"];

/* ── Styles ── */
const hs = (sz="clamp(32px,5vw,48px)") => ({ fontFamily:"'Playfair Display',serif", fontSize:sz, fontWeight:800, color:DARK, lineHeight:1.15, margin:0 });
const bs = { fontFamily:"'DM Sans',sans-serif", fontSize:"16px", color:GRAY, lineHeight:1.75 };
const lbs = { fontFamily:"'DM Sans',sans-serif", fontSize:"12px", fontWeight:700, color:RED, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"12px" };
const bps = { display:"inline-block", padding:"16px 40px", borderRadius:"50px", fontWeight:700, fontSize:"14px", textDecoration:"none", fontFamily:"'DM Sans',sans-serif", letterSpacing:"0.5px", textTransform:"uppercase", transition:"all 0.3s", cursor:"pointer", border:"none", background:RED, color:"#fff", boxShadow:"0 4px 20px rgba(236,130,131,0.25)" };
const bos = { ...bps, background:"transparent", color:RED, border:`2px solid ${RED}`, boxShadow:"none" };
const mws = { maxWidth:"1100px", margin:"0 auto" };
const sps = { padding:"100px 24px" };

/* ── Auth Modal ── */
function AuthModal({ onClose, onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailAuth = async () => {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email, password,
          options: { data: { full_name: name } }
        });
        if (err) throw err;
        if (data.user && data.user.identities && data.user.identities.length === 0) {
          setError("An account with this email already exists. Please log in instead.");
        } else {
          setSuccess("Check your email for a confirmation link to complete signup.");
        }
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        if (data.user) { onAuth(data.user); onClose(); }
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError(""); setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin + "/auth/callback" }
      });
      if (err) throw err;
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.12)", fontFamily: "'DM Sans',sans-serif",
    fontSize: "15px", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s"
  };

  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:"24px",padding:"40px 32px",maxWidth:"420px",width:"100%",position:"relative",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
        <button onClick={onClose} style={{position:"absolute",top:"16px",right:"20px",background:"none",border:"none",fontSize:"22px",color:GRAY,cursor:"pointer"}}>{"\u2715"}</button>
        <div style={{textAlign:"center",marginBottom:"28px"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"22px",color:DARK,marginBottom:"4px"}}><span style={{color:RED}}>Acceptance</span> Consulting</div>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:GRAY,margin:0}}>{mode==="login"?"Welcome back!":"Create your account"}</p>
        </div>
        <button onClick={handleGoogle} disabled={loading} style={{width:"100%",padding:"14px",borderRadius:"12px",border:"1px solid rgba(0,0,0,0.12)",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"15px",color:DARK,marginBottom:"20px",transition:"background 0.2s"}}>
          <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
          Continue with Google
        </button>
        <div style={{display:"flex",alignItems:"center",gap:"12px",margin:"20px 0"}}>
          <div style={{flex:1,height:"1px",background:"rgba(0,0,0,0.1)"}}></div>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:GRAY}}>or</span>
          <div style={{flex:1,height:"1px",background:"rgba(0,0,0,0.1)"}}></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {mode==="signup" && (
            <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} style={inputStyle} />
          )}
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle}
            onKeyDown={e=>{if(e.key==="Enter")handleEmailAuth();}} />
        </div>
        {error && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#DC2626",margin:"12px 0 0",textAlign:"center"}}>{error}</p>}
        {success && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#16A34A",margin:"12px 0 0",textAlign:"center"}}>{success}</p>}
        <button onClick={handleEmailAuth} disabled={loading} style={{...bps,width:"100%",marginTop:"20px",textAlign:"center",opacity:loading?0.6:1}}>
          {loading ? "Please wait..." : (mode==="login" ? "Log In" : "Sign Up")}
        </button>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:GRAY,textAlign:"center",margin:"20px 0 0"}}>
          {mode==="login" ? "Do not have an account? " : "Already have an account? "}
          <span onClick={()=>{setMode(mode==="login"?"signup":"login");setError("");setSuccess("");}} style={{color:RED,fontWeight:700,cursor:"pointer"}}>
            {mode==="login" ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ── User Menu ── */
function UserMenu({ user, onLogout, onAdmin }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  const isAdmin = user.email === ADMIN_EMAIL;
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} style={{position:"relative",flexShrink:0}}>
      <button onClick={()=>setOpen(!open)} style={{width:"40px",height:"40px",borderRadius:"50%",background:RED,color:"#fff",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {initials}
      </button>
      {open && (
        <div style={{position:"absolute",top:"48px",right:0,background:"#fff",borderRadius:"16px",boxShadow:"0 8px 30px rgba(0,0,0,0.12)",border:"1px solid rgba(0,0,0,0.06)",padding:"16px 20px",minWidth:"200px",zIndex:1100}}>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"15px",color:DARK,marginBottom:"4px"}}>{displayName}</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:GRAY,marginBottom:"16px",wordBreak:"break-all"}}>{user.email}</div>
          <div style={{height:"1px",background:"rgba(0,0,0,0.08)",margin:"0 -20px",marginBottom:"12px"}}></div>
          {isAdmin && (<button onClick={()=>{setOpen(false);if(onAdmin)onAdmin();}} style={{width:"100%",padding:"10px 0",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",color:"#111827",textAlign:"left",marginBottom:8}}>Admin Dashboard</button>)}
          <button onClick={()=>{setOpen(false);onLogout();}} style={{width:"100%",padding:"10px 0",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",color:RED,textAlign:"left"}}>Log Out</button>
        </div>
      )}
    </div>
  );
}

/* ──────── BLOG COMPONENTS ──────── */

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* ── Rich Text Editor ── */
function RichEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current && editorRef.current) {
      editorRef.current.innerHTML = value || '';
      isInitialMount.current = false;
    }
  }, [value]);

  const exec = (cmd, val) => {
    document.execCommand(cmd, false, val || null);
    editorRef.current?.focus();
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => {
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  const addImage = () => {
    const url = prompt("Enter image URL:");
    if (url) exec('insertHTML', '<img src="' + url + '" style="max-width:100%;border-radius:12px;margin:16px 0;" />');
  };

  const tbtn = (label, cmd, val) => (
    <button key={cmd+label} onClick={()=>exec(cmd,val)} style={{padding:"6px 10px",background:"none",border:"1px solid rgba(0,0,0,0.1)",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK}} title={label}>{label}</button>
  );

  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"4px",marginBottom:"8px",padding:"8px",background:LIGHT_GRAY,borderRadius:"10px"}}>
        {tbtn("B","bold")}
        {tbtn("I","italic")}
        {tbtn("U","underline")}
        {tbtn("H2","formatBlock","h2")}
        {tbtn("H3","formatBlock","h3")}
        {tbtn("UL","insertUnorderedList")}
        {tbtn("OL","insertOrderedList")}
        {tbtn("Quote","formatBlock","blockquote")}
        <button onClick={addImage} style={{padding:"6px 10px",background:"none",border:"1px solid rgba(0,0,0,0.1)",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK}} title="Image">IMG</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        style={{
          minHeight:"300px",padding:"20px",borderRadius:"12px",
          border:"1px solid rgba(0,0,0,0.12)",fontFamily:"'DM Sans',sans-serif",
          fontSize:"16px",lineHeight:1.8,color:DARK,outline:"none",
          background:"#fff",overflowY:"auto",maxHeight:"500px"
        }}
      />
    </div>
  );
}

/* ── Blog Editor (Admin Only) ── */
function BlogEditor({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [category, setCategory] = useState(post?.category || "MBA Strategy");
  const [tagsStr, setTagsStr] = useState(post?.tags?.join(", ") || "");
  const [published, setPublished] = useState(post?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = {
    width:"100%",padding:"14px 16px",borderRadius:"12px",
    border:"1px solid rgba(0,0,0,0.12)",fontFamily:"'DM Sans',sans-serif",
    fontSize:"15px",outline:"none",boxSizing:"border-box"
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) { setError("Title and content are required."); return; }
    setSaving(true); setError("");
    const slug = post?.slug || slugify(title) + '-' + Date.now().toString(36);
    const tags = tagsStr.split(",").map(t=>t.trim()).filter(Boolean);
    const postData = {
      title, slug, content, excerpt: excerpt || title,
      cover_image: coverImage || null, category, tags, published,
      author_name: "Acceptance Consulting",
      author_email: ADMIN_EMAIL,
      updated_at: new Date().toISOString()
    };
    try {
      if (post?.id) {
        const { error: err } = await supabase.from('posts').update(postData).eq('id', post.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('posts').insert([postData]);
        if (err) throw err;
      }
      onSave();
    } catch (err) {
      setError(err.message || "Failed to save post.");
    }
    setSaving(false);
  };

  return (
    <div style={{paddingTop:"100px",minHeight:"100vh",background:"#fff"}}>
      <div style={{...sps,...mws,maxWidth:"800px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"36px",flexWrap:"wrap",gap:"12px"}}>
          <h1 style={{...hs("clamp(24px,4vw,36px)"),margin:0}}>{post?.id ? "Edit Post" : "New Blog Post"}</h1>
          <button onClick={onCancel} style={{...bos,padding:"10px 24px",fontSize:"13px"}}>Cancel</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
          <div>
            <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK,marginBottom:"6px",display:"block"}}>Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Post title" style={inputStyle} />
          </div>
          <div>
            <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK,marginBottom:"6px",display:"block"}}>Excerpt (short summary)</label>
            <input value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Brief summary for the blog list" style={inputStyle} />
          </div>
          <div>
            <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK,marginBottom:"6px",display:"block"}}>Cover Image URL (optional)</label>
            <input value={coverImage} onChange={e=>setCoverImage(e.target.value)} placeholder="https://example.com/image.jpg" style={inputStyle} />
            {coverImage && <img src={coverImage} alt="Cover preview" style={{marginTop:"8px",maxWidth:"100%",maxHeight:"200px",borderRadius:"12px",objectFit:"cover"}} />}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
            <div>
              <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK,marginBottom:"6px",display:"block"}}>Category</label>
              <select value={category} onChange={e=>setCategory(e.target.value)} style={{...inputStyle,cursor:"pointer"}}>
                {BLOG_CATEGORIES.filter(c=>c!=="All").map(c=>(<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div>
              <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK,marginBottom:"6px",display:"block"}}>Tags (comma separated)</label>
              <input value={tagsStr} onChange={e=>setTagsStr(e.target.value)} placeholder="gmat, essays, isb" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:DARK,marginBottom:"6px",display:"block"}}>Content</label>
            <RichEditor value={content} onChange={setContent} />
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <label style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:DARK,display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}}>
              <input type="checkbox" checked={published} onChange={e=>setPublished(e.target.checked)} style={{width:"18px",height:"18px",accentColor:RED}} />
              Publish immediately
            </label>
          </div>
          {error && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:"#DC2626",margin:0}}>{error}</p>}
          <div style={{display:"flex",gap:"12px"}}>
            <button onClick={handleSave} disabled={saving} style={{...bps,opacity:saving?0.6:1}}>
              {saving ? "Saving..." : (post?.id ? "Update Post" : "Create Post")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Blog Post View ── */
function BlogPostView({ post, onBack }) {
  const date = new Date(post.created_at).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  return (
    <div style={{paddingTop:"100px",minHeight:"100vh",background:"#fff"}}>
      <div style={{...sps,...mws,maxWidth:"780px"}}>
        <button onClick={onBack} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:RED,background:"none",border:"none",cursor:"pointer",marginBottom:"28px",display:"flex",alignItems:"center",gap:"6px"}}>{"\u2190"} Back to Blog</button>
        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} style={{width:"100%",height:"360px",objectFit:"cover",borderRadius:"20px",marginBottom:"32px"}} />
        )}
        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px",flexWrap:"wrap"}}>
          <span style={{padding:"6px 16px",borderRadius:"50px",background:RED_BG,color:RED,fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:700}}>{post.category}</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:GRAY}}>{date}</span>
          <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:GRAY}}>by {post.author_name}</span>
        </div>
        <h1 style={{...hs("clamp(28px,5vw,44px)"),marginBottom:"32px"}}>{post.title}</h1>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{__html: post.content}}
          style={{fontFamily:"'DM Sans',sans-serif",fontSize:"17px",color:DARK,lineHeight:1.85}}
        />
        {post.tags && post.tags.length > 0 && (
          <div style={{marginTop:"40px",paddingTop:"24px",borderTop:"1px solid rgba(0,0,0,0.08)",display:"flex",gap:"8px",flexWrap:"wrap"}}>
            {post.tags.map((tag,i)=>(<span key={i} style={{padding:"6px 14px",borderRadius:"50px",background:LIGHT_GRAY,fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:600,color:GRAY}}>#{tag}</span>))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Blog List Page ── */
function BlogPage({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewingPost, setViewingPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const isAdmin = user?.email === ADMIN_EMAIL;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (!isAdmin) {
      query = query.eq('published', true);
    }
    const { data, error } = await query;
    if (!error && data) setPosts(data);
    setLoading(false);
  }, [isAdmin]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  if (showEditor || editingPost) {
    return (
      <BlogEditor
        post={editingPost}
        onSave={() => { setShowEditor(false); setEditingPost(null); fetchPosts(); }}
        onCancel={() => { setShowEditor(false); setEditingPost(null); }}
      />
    );
  }

  if (viewingPost) {
    return <BlogPostView post={viewingPost} onBack={() => setViewingPost(null)} />;
  }

  const filtered = posts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase())) || (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
    return matchCat && matchSearch;
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  };

  return (
    <div style={{paddingTop:"100px",minHeight:"100vh",background:"#fff"}}>
      <div style={{...sps,...mws}}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <p style={lbs}>Our Blog</p>
          <h1 style={hs()}>Insights & Advice</h1>
          <p style={{...bs,maxWidth:"550px",margin:"12px auto 0"}}>Tips, strategies, and stories from the admissions trenches to help you on your MBA journey.</p>
        </div>

        {isAdmin && (
          <div style={{display:"flex",justifyContent:"center",marginBottom:"32px"}}>
            <button onClick={()=>setShowEditor(true)} style={bps}>+ Write New Post</button>
          </div>
        )}

        <div style={{maxWidth:"500px",margin:"0 auto 28px",position:"relative"}}>
          <input
            value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search posts..."
            style={{width:"100%",padding:"14px 16px 14px 44px",borderRadius:"50px",border:"1px solid rgba(0,0,0,0.1)",fontFamily:"'DM Sans',sans-serif",fontSize:"15px",outline:"none",boxSizing:"border-box",background:LIGHT_GRAY}}
          />
          <span style={{position:"absolute",left:"16px",top:"50%",transform:"translateY(-50%)",fontSize:"18px",color:GRAY}}>{"\u{1F50D}"}</span>
        </div>

        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"40px",flexWrap:"wrap"}}>
          {BLOG_CATEGORIES.map(c=>(<button key={c} onClick={()=>setActiveCategory(c)} style={{padding:"8px 20px",borderRadius:"50px",border:activeCategory===c?"none":"1px solid rgba(0,0,0,0.1)",background:activeCategory===c?RED:"#fff",color:activeCategory===c?"#fff":DARK,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"13px",cursor:"pointer",transition:"all 0.3s"}}>{c}</button>))}
        </div>

        {loading ? (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{...bs,color:GRAY}}>Loading posts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{textAlign:"center",padding:"60px 0"}}>
            <p style={{fontSize:"48px",marginBottom:"12px"}}>{"\u{1F4DD}"}</p>
            <p style={{...bs,fontWeight:600,color:DARK}}>No posts found</p>
            <p style={{...bs,fontSize:"14px"}}>{search ? "Try a different search term." : "Check back soon for new content!"}</p>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"24px"}}>
            {filtered.map(post => {
              const date = new Date(post.created_at).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
              return (
                <div key={post.id} style={{borderRadius:"20px",overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)",background:"#fff",transition:"box-shadow 0.3s",cursor:"pointer"}}
                  onClick={()=>setViewingPost(post)}
                  onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,0.08)";}}
                  onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";}}>
                  {post.cover_image ? (
                    <img src={post.cover_image} alt={post.title} style={{width:"100%",height:"200px",objectFit:"cover"}} />
                  ) : (
                    <div style={{width:"100%",height:"200px",background:"linear-gradient(135deg," + RED_BG + ",#fce7e7)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span style={{fontSize:"48px"}}>{"\u{1F4F0}"}</span>
                    </div>
                  )}
                  <div style={{padding:"24px 20px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"12px",flexWrap:"wrap"}}>
                      <span style={{padding:"4px 12px",borderRadius:"50px",background:RED_BG,color:RED,fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>{post.category}</span>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:GRAY}}>{date}</span>
                      {isAdmin && !post.published && (
                        <span style={{padding:"4px 10px",borderRadius:"50px",background:"#FEF3C7",color:"#92400E",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:700}}>Draft</span>
                      )}
                    </div>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:800,color:DARK,marginBottom:"8px",lineHeight:1.3}}>{post.title}</h3>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:GRAY,lineHeight:1.6,marginBottom:"16px",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{post.excerpt}</p>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,color:RED}}>Read more {"\u2192"}</span>
                      {isAdmin && (
                        <div style={{display:"flex",gap:"8px"}} onClick={e=>e.stopPropagation()}>
                          <button onClick={()=>setEditingPost(post)} style={{padding:"6px 12px",borderRadius:"8px",background:LIGHT_GRAY,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:600,color:DARK}}>Edit</button>
                          <button onClick={()=>handleDelete(post.id)} style={{padding:"6px 12px",borderRadius:"8px",background:"#FEE2E2",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"12px",fontWeight:600,color:"#DC2626"}}>Delete</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────── MAIN SITE COMPONENTS ──────── */

function Navbar({ page, setPage, user, onLoginClick, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;
    const fn = () => { if (!ticking) { requestAnimationFrame(() => { setScrolled(window.scrollY > 50); ticking = false; }); ticking = true; } };
    window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label:"Home", action:()=>{setPage("home");window.scrollTo({top:0,behavior:"smooth"});} },
    { label:"Blog", action:()=>{setPage("blog");window.scrollTo(0,0);} },
    { label:"Testimonials", action:()=>{setPage("home");setTimeout(()=>document.getElementById("testimonials")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"Our Team", action:()=>{setPage("home");setTimeout(()=>document.getElementById("our-team")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"FAQ", action:()=>{setPage("faq");window.scrollTo(0,0);} },
    { label:"Leaderboard", action:()=>{setPage("leaderboard");window.scrollTo(0,0);} },
    { label:"Study Partner", action:()=>{setPage("partners");window.scrollTo(0,0);} },
    { label:"Forum", action:()=>{setPage("forum");window.scrollTo(0,0);} },
  ];
  const isActive = (l) => (page==="faq"&&l.label==="FAQ")||(page==="blog"&&l.label==="Blog")||(page==="leaderboard"&&l.label==="Leaderboard")||(page==="partners"&&l.label==="Study Partner")||(page==="forum"&&l.label==="Forum");
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:scrolled?"8px 24px":"12px 24px",background:scrolled?"rgba(255,255,255,0.97)":"rgba(255,255,255,0.95)",backdropFilter:"blur(16px)",boxShadow:scrolled?"0 2px 20px rgba(0,0,0,0.06)":"none",transition:"padding 0.3s,box-shadow 0.3s",display:"flex",alignItems:"center",gap:"16px"}}>
      <a onClick={()=>{setPage("home");window.scrollTo(0,0);}} style={{cursor:"pointer",flexShrink:0}}><img src={LOGO} alt="AC" style={{height:"36px"}} /></a>
      <div style={{flex:1,display:"flex",justifyContent:"center",gap:"16px",alignItems:"center",overflow:"hidden"}} className="dt-nav">
        {links.map(l=>(<a key={l.label} onClick={()=>{l.action();setMenuOpen(false);}} style={{color:isActive(l)?RED:GRAY,textDecoration:"none",fontSize:"11.5px",fontFamily:"'DM Sans',sans-serif",fontWeight:600,letterSpacing:"0.5px",textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap"}}>{l.label}</a>))}
      </div>
      <div style={{display:"flex",gap:"10px",alignItems:"center",flexShrink:0}} className="dt-nav">
        {user ? (
          <UserMenu user={user} onLogout={onLogout} onAdmin={function(){setPage("admin");window.scrollTo(0,0);}} />
        ) : (
          <button onClick={onLoginClick} style={{...bps,padding:"10px 22px",fontSize:"11.5px"}}>Log In</button>
        )}
        <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={{...bos,padding:"10px 22px",fontSize:"11.5px"}}>Join Community</a>
      </div>
      <button onClick={()=>setMenuOpen(!menuOpen)} className="mob-btn" style={{display:"none",background:"none",border:"none",fontSize:"28px",color:RED,cursor:"pointer"}}>{menuOpen?"\u2715":"\u2630"}</button>
      {menuOpen&&(<div style={{position:"fixed",top:"65px",left:0,right:0,bottom:0,background:"rgba(255,255,255,0.99)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"28px",zIndex:999}}>
        {links.map(l=>(<a key={l.label} onClick={()=>{l.action();setMenuOpen(false);}} style={{color:DARK,textDecoration:"none",fontSize:"20px",fontFamily:"'DM Sans',sans-serif",fontWeight:600,cursor:"pointer"}}>{l.label}</a>))}
        {user ? (
          <button onClick={()=>{setMenuOpen(false);onLogout();}} style={{...bos,padding:"14px 36px"}}>Log Out</button>
        ) : (
          <button onClick={()=>{setMenuOpen(false);onLoginClick();}} style={bps}>Log In</button>
        )}
        <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={bos}>Join Community</a>
      </div>)}
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"140px 24px 80px",background:`linear-gradient(180deg,${RED_BG} 0%,#fff 60%)`}}>
      <div style={{display:"inline-block",padding:"8px 20px",borderRadius:"50px",border:"1px solid rgba(236,130,131,0.2)",background:"rgba(236,130,131,0.05)",marginBottom:"28px"}}>
        <span style={{...lbs,marginBottom:0,fontSize:"11px"}}>ISB . INSEAD . LBS . Wharton . & More</span>
      </div>
      <h1 style={{...hs("clamp(40px,7vw,80px)"),maxWidth:"850px",marginBottom:"20px"}}>Get Accepted to Your <span style={{color:RED}}>Dream B-School</span></h1>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(14px,2vw,18px)",fontWeight:700,color:RED,letterSpacing:"4px",textTransform:"uppercase",marginBottom:"28px"}}>Affordable. Personalised. Proven.</p>
      <p style={{...bs,fontSize:"clamp(16px,2vw,19px)",maxWidth:"580px",margin:"0 auto 40px"}}>Not your typical consultants. We are the friends who have been in your shoes, sat in those classrooms, and now sit in your corner.</p>
      <div style={{display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:"center"}}>
        <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={bps}>Get Free Profile Evaluation</a>
        <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={bos}>Join 1000+ Community</a>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"20px",maxWidth:"780px",width:"100%",marginTop:"72px",padding:"36px 28px",background:"#fff",borderRadius:"20px",boxShadow:"0 8px 40px rgba(0,0,0,0.06)",border:"1px solid rgba(0,0,0,0.04)"}}>
        {stats.map((s,i)=>(<div key={i} style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,46px)",fontWeight:800,color:RED}}><AnimatedCounter target={s.number} suffix={s.suffix}/></div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:GRAY,marginTop:"6px",fontWeight:600,letterSpacing:"0.3px",textTransform:"uppercase"}}>{s.label}</div>
        </div>))}
      </div>
    </section>
  );
}

function SchoolLogos() {
  return (
    <section style={{padding:"48px 24px",background:"#fff",borderBottom:"1px solid rgba(0,0,0,0.04)"}}>
      <div style={mws}>
        <p style={{textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:600,color:GRAY,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"28px"}}>Our Applicants Have Been Admitted To</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px"}}>
          {schools.map((s,i)=>(<div key={i} style={{padding:"10px 22px",borderRadius:"50px",background:s.color,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,letterSpacing:"0.5px",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>{s.name}</div>))}
        </div>
      </div>
    </section>
  );
}

function NotTypical() {
  return (
    <section id="about" style={{...sps,background:LIGHT_GRAY}}>
      <div style={{...mws,maxWidth:"800px",textAlign:"center"}}>
        <p style={lbs}>Who We Are</p>
        <h2 style={{...hs(),marginBottom:"12px"}}>Not Your Typical Consultants</h2>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,2.5vw,22px)",color:RED,fontStyle:"italic",marginBottom:"40px"}}>And honestly? We hate that word.</p>
        <div style={{...bs,textAlign:"left",maxWidth:"650px",margin:"0 auto"}}>
          <p style={{marginBottom:"20px"}}>We are not &quot;consultants.&quot; You are not &quot;applicants.&quot; And what we do here is not transactional.</p>
          <p style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(18px,2.5vw,21px)",color:RED,fontStyle:"italic",margin:"32px 0"}}>Zoom Rooms, Voice Notes & Way Too Many Google Docs</p>
          <p style={{marginBottom:"20px"}}>We have taken 1-on-1 calls, run group sessions, rewritten essays live, and stayed back after mock interviews to talk through imposter syndrome.</p>
          <p>The people we work with - <strong style={{color:DARK}}>we do not call them clients</strong>. We call them ours. Because they become a part of this thing we have built.</p>
        </div>
      </div>
    </section>
  );
}

function CommunityProof() {
  return (
    <section style={{...sps,background:"#fff"}}>
      <div style={mws}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <p style={lbs}>See It In Action</p>
          <h2 style={hs()}>Real Conversations. Real Impact.</h2>
          <p style={{...bs,maxWidth:"550px",margin:"12px auto 0"}}>This is what our community actually looks like - no staged photos, no stock images.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px"}}>
          {communityProof.map((c,i)=>(<div key={i} style={{borderRadius:"16px",overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)"}}>
            <div style={{height:"220px",background:c.type==="chat"?"linear-gradient(135deg,#E8F5E9,#C8E6C9)":"linear-gradient(135deg,#E3F2FD,#BBDEFB)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"8px"}}>
              <span style={{fontSize:"40px"}}>{c.type==="chat"?"\u{1F4AC}":"\u{1F3A5}"}</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:"rgba(0,0,0,0.4)",padding:"0 20px",textAlign:"center"}}>{c.placeholder}</span>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"rgba(0,0,0,0.3)"}}>Upload your screenshot here</span>
            </div>
            <div style={{padding:"16px 20px",background:"#fff"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:DARK,fontWeight:600,margin:0}}>{c.caption}</p></div>
          </div>))}
        </div>
      </div>
    </section>
  );
}

function LinkedInFeatures() {
  return (
    <section style={{padding:"64px 24px",background:LIGHT_GRAY}}>
      <div style={mws}>
        <div style={{textAlign:"center",marginBottom:"36px"}}>
          <p style={lbs}>As Featured On</p>
          <h2 style={{...hs("clamp(24px,4vw,36px)"),marginBottom:"8px"}}>LinkedIn</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px"}}>
          {linkedinPosts.map((p,i)=>(<div key={i} style={{background:"#fff",borderRadius:"16px",overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)"}}>
            <div style={{height:"180px",background:"linear-gradient(135deg,#E8EAF6,#C5CAE9)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"8px"}}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"rgba(0,0,0,0.35)"}}>Upload LinkedIn screenshot</span>
            </div>
            <div style={{padding:"16px 20px"}}><p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:DARK,margin:0}}>{p.title}</p></div>
          </div>))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{...sps,background:"#fff"}}>
      <div style={mws}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={lbs}>The Process</p>
          <h2 style={hs()}>How It Works</h2>
          <p style={{...bs,maxWidth:"500px",margin:"12px auto 0"}}>Three steps. Zero complexity. One goal - getting you in.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"28px"}}>
          {howItWorks.map((hi,i)=>(<div key={i} style={{padding:"36px 28px",borderRadius:"20px",background:i===1?RED:"#fff",border:i===1?"none":"1px solid rgba(0,0,0,0.06)",boxShadow:i===1?"0 12px 40px rgba(236,130,131,0.15)":"0 2px 12px rgba(0,0,0,0.03)",textAlign:"center",position:"relative"}}>
            <div style={{fontSize:"36px",marginBottom:"12px"}}>{hi.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"48px",fontWeight:900,color:i===1?"rgba(255,255,255,0.15)":"rgba(236,130,131,0.08)",position:"absolute",top:"16px",right:"20px"}}>{hi.step}</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:800,color:i===1?"#fff":DARK,marginBottom:"12px"}}>{hi.title}</h3>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:i===1?"rgba(255,255,255,0.85)":GRAY,lineHeight:1.7}}>{hi.desc}</p>
          </div>))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" style={{...sps,background:LIGHT_GRAY}}>
      <div style={mws}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={lbs}>What We Help With</p>
          <h2 style={hs()}>Turning Aspiration Into Acceptance</h2>
          <p style={{...bs,maxWidth:"600px",margin:"12px auto 0"}}>From <strong>ISB YL, PGP & other programs</strong> to <strong>top international programs</strong> like INSEAD, LBS, Wharton, and more.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px"}}>
          {services.map((s,i)=>(<div key={i} style={{padding:"32px 28px",borderRadius:"16px",background:"#fff",border:"1px solid rgba(0,0,0,0.06)",transition:"border-color 0.3s,box-shadow 0.3s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=RED;e.currentTarget.style.boxShadow="0 8px 30px rgba(236,130,131,0.08)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,0.06)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{fontSize:"28px",marginBottom:"14px"}}>{s.icon}</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:700,color:DARK,marginBottom:"10px"}}>{s.title}</h3>
            <p style={{...bs,fontSize:"15px"}}>{s.desc}</p>
          </div>))}
        </div>
      </div>
    </section>
  );
}

function AdmissionsSection() {
  const [tab,setTab]=useState("isb");
  const isISB=tab==="isb";
  return (
    <section style={{...sps,background:"#fff"}}>
      <div style={{...mws,maxWidth:"850px"}}>
        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <p style={lbs}>Our Programs</p>
          <h2 style={hs()}>Tailored For Your Target School</h2>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"40px",flexWrap:"wrap"}}>
          {[["isb","ISB Admissions"],["intl","International B-Schools"]].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} style={{padding:"12px 28px",borderRadius:"50px",border:`2px solid ${RED}`,background:tab===k?RED:"transparent",color:tab===k?"#fff":RED,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"14px",cursor:"pointer",transition:"all 0.3s"}}>{l}</button>))}
        </div>
        <div style={{background:LIGHT_GRAY,borderRadius:"20px",padding:"40px 36px"}}>
          <p style={{...bs,marginBottom:"28px"}}>{isISB?"We have been in your shoes, and now we are in your corner. After going through the grind ourselves and sitting inside those ISB classrooms, we have seen firsthand what actually gets someone in. It is not just big brand names or perfect GPAs - it is about the diversity you bring.":"Every international B-school has its own lens - some value global exposure more, others prioritize social impact or leadership potential. Some want sharp career clarity, others look for a non-linear story done right. We have studied these nuances, decoded what each program truly values, and helped applicants crack them all."}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"12px"}}>
            {(isISB?isbServices:intlServices).map((s,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",borderRadius:"10px",background:"#fff"}}><span style={{color:RED,fontWeight:800}}>{"\u2192"}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:DARK}}>{s}</span></div>))}
          </div>
          <p style={{...bs,marginTop:"28px",fontStyle:"italic",fontSize:"15px",color:RED}}>This may be the most personalized MBA admissions support you will ever experience.</p>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section style={{...sps,background:LIGHT_GRAY}}>
      <div style={{...mws,display:"flex",flexWrap:"wrap",gap:"48px",alignItems:"center",justifyContent:"center"}}>
        <div style={{flex:"1 1 350px",minWidth:"280px"}}>
          <p style={lbs}>Our Community</p>
          <h2 style={{...hs("clamp(28px,4vw,40px)"),marginBottom:"16px"}}>Free Informational Webinars</h2>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:RED,fontWeight:700,marginBottom:"20px"}}>1000+ Applicants Community</h3>
          <p style={{...bs,marginBottom:"28px"}}>Join a community of ambitious MBA aspirants. We host regular information sharing sessions, Q&As, and discussions to help you navigate the admissions journey.</p>
          <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={bps}>Join Community</a>
        </div>
        <div style={{flex:"0 0 auto"}}><img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,fit=crop/A0xw1L5325CZlXWJ/community-picture-YX4xw5VM0zT9xNPw.jpg" alt="Community" style={{borderRadius:"20px",width:"100%",maxWidth:"380px",boxShadow:"0 8px 30px rgba(0,0,0,0.08)"}} /></div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="our-team" style={{...sps,background:"#fff"}}>
      <div style={mws}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={lbs}>Meet The Team</p>
          <h2 style={hs()}>We Are Fun To Work With!</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"36px",maxWidth:"800px",margin:"0 auto"}}>
          {team.map((t,i)=>(<div key={i} style={{background:LIGHT_GRAY,borderRadius:"20px",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.05)"}}>
            <div style={{width:"100%",height:"300px",background:RED_BG,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src={t.image} alt={t.name} style={{width:"180px",height:"180px",borderRadius:"50%",objectFit:"cover",border:`4px solid ${RED}`}} />
            </div>
            <div style={{padding:"28px 24px"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",fontWeight:800,color:DARK,marginBottom:"12px"}}>{t.name}</h3>
              <p style={{...bs,fontSize:"15px"}}>{t.bio}</p>
            </div>
          </div>))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [ac,setAc]=useState(0);
  const [pg,setPg]=useState(0);
  const perPage=3;
  const items=testimonialCategories[ac].items;
  const totalPages=Math.ceil(items.length/perPage);
  const visible=items.slice(pg*perPage,pg*perPage+perPage);
  const canPrev=pg>0;
  const canNext=pg<totalPages-1;
  const switchCat=(i)=>{setAc(i);setPg(0);};
  const arrowBtn=(dir,enabled)=>({
    width:"44px",height:"44px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
    fontSize:"18px",fontWeight:800,cursor:enabled?"pointer":"default",transition:"all 0.3s",border:"none",
    background:enabled?(dir==="next"?RED:"#fff"):"rgba(0,0,0,0.05)",
    color:enabled?(dir==="next"?"#fff":RED):"rgba(0,0,0,0.2)",
    boxShadow:enabled?(dir==="next"?"0 2px 12px rgba(236,130,131,0.3)":"0 2px 12px rgba(0,0,0,0.1)"):"none",
    ...(dir==="prev"&&enabled?{border:`2px solid ${RED}`}:{}),
  });
  return (
    <section id="testimonials" style={{...sps,background:LIGHT_GRAY}}>
      <div style={mws}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <p style={lbs}>Testimonials</p>
          <h2 style={hs()}>The Impact We Are Proud Of</h2>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"10px",marginBottom:"36px",flexWrap:"wrap"}}>
          {testimonialCategories.map((c,i)=>(<button key={i} onClick={()=>switchCat(i)} style={{padding:"10px 24px",borderRadius:"50px",border:ac===i?"none":"1px solid rgba(0,0,0,0.1)",background:ac===i?RED:"#fff",color:ac===i?"#fff":DARK,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",cursor:"pointer",transition:"all 0.3s",boxShadow:ac===i?"0 4px 16px rgba(236,130,131,0.2)":"none",display:"flex",alignItems:"center",gap:"8px"}}><span>{c.icon}</span>{c.category}</button>))}
        </div>
        <div style={{position:"relative"}}>
          {totalPages>1&&(<button onClick={()=>canPrev&&setPg(pg-1)} style={{...arrowBtn("prev",canPrev),position:"absolute",left:"-22px",top:"50%",transform:"translateY(-50%)",zIndex:2}}>{"\u2190"}</button>)}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>
            {visible.map((t,i)=>(<div key={`${ac}-${pg}-${i}`} style={{background:"#fff",borderRadius:"20px",padding:"28px 24px",border:"1px solid rgba(0,0,0,0.06)",display:"flex",flexDirection:"column"}}>
              <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"18px"}}>
                <img src={t.image} alt={t.name} style={{width:"52px",height:"52px",borderRadius:"50%",objectFit:"cover",border:`2px solid ${RED_BG}`,background:RED_BG}} />
                <div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"15px",color:DARK}}>{t.name}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:RED,fontWeight:600}}>{t.school}</div>
                </div>
              </div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"28px",color:RED,lineHeight:1,marginBottom:"6px"}}>{"\u201C"}</div>
              <p style={{...bs,fontSize:"14px",fontStyle:"italic",flex:1,lineHeight:1.7}}>{t.text}</p>
            </div>))}
          </div>
          {totalPages>1&&(<button onClick={()=>canNext&&setPg(pg+1)} style={{...arrowBtn("next",canNext),position:"absolute",right:"-22px",top:"50%",transform:"translateY(-50%)",zIndex:2}}>{"\u2192"}</button>)}
        </div>
        {totalPages>1&&(<div style={{display:"flex",justifyContent:"center",gap:"8px",marginTop:"28px"}}>
          {Array.from({length:totalPages}).map((_,i)=>(<button key={i} onClick={()=>setPg(i)} style={{width:pg===i?"28px":"10px",height:"10px",borderRadius:"5px",border:"none",cursor:"pointer",background:pg===i?RED:"rgba(0,0,0,0.15)",transition:"all 0.3s"}} />))}
        </div>)}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" style={{...sps,background:"#fff"}}>
      <div style={{...mws,maxWidth:"750px",textAlign:"center",padding:"64px 40px",borderRadius:"24px",background:RED,position:"relative",overflow:"hidden"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,42px)",fontWeight:800,color:"#fff",marginBottom:"16px"}}>Ready to Start?</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"17px",color:"rgba(255,255,255,0.85)",marginBottom:"36px",lineHeight:1.7}}>No sales pitch. No pressure. Just a conversation about where you are, where you want to be, and how we can help you get there.</p>
        <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#fff",color:RED,padding:"18px 48px",borderRadius:"50px",fontWeight:800,fontSize:"15px",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.5px",textTransform:"uppercase",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>Connect With Us {"\u2192"}</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{padding:"40px 24px 28px",textAlign:"center",borderTop:"1px solid rgba(0,0,0,0.06)",background:LIGHT_GRAY}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"20px",color:DARK,marginBottom:"10px"}}><span style={{color:RED}}>Acceptance</span> Consulting</div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:GRAY,marginBottom:"6px"}}>Affordable. Personalised. Proven.</p>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#aaa"}}>{"\u00A9"} 2026 Acceptance Consulting. All rights reserved.</p>
    </footer>
  );
}

function StickyWhatsApp() {
  return (
    <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:"28px",right:"28px",zIndex:900,width:"60px",height:"60px",borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)"}}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  );
}

function FAQPage() {
  const [open,setOpen]=useState(null);
  return (
    <div style={{paddingTop:"100px",minHeight:"100vh",background:"#fff"}}>
      <div style={{...sps,...mws,maxWidth:"800px"}}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={lbs}>Got Questions?</p>
          <h1 style={hs()}>Frequently Asked Questions</h1>
          <p style={{...bs,maxWidth:"500px",margin:"16px auto 0"}}>Everything you are wondering but have not asked yet. And if your question is not here - just text us.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {faqs.map((f,i)=>(<div key={i} style={{borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",overflow:"hidden",background:open===i?RED_BG:"#fff",transition:"background 0.3s"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",padding:"24px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:"16px"}}>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"17px",fontWeight:700,color:DARK,flex:1}}>{f.q}</span>
              <span style={{width:"32px",height:"32px",borderRadius:"50%",background:open===i?RED:"rgba(0,0,0,0.05)",color:open===i?"#fff":GRAY,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:700,flexShrink:0,transition:"all 0.3s"}}>{open===i?"\u2212":"+"}</span>
            </button>
            {open===i&&(<div style={{padding:"0 28px 24px"}}><p style={{...bs,fontSize:"15px",margin:0}}>{f.a}</p></div>)}
          </div>))}
        </div>
        <div style={{textAlign:"center",marginTop:"56px"}}>
          <p style={{...bs,marginBottom:"20px"}}>Still have questions? We are always happy to chat.</p>
          <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={bps}>Ask Us Anything {"\u2192"}</a>
        </div>
      </div>
    </div>
  );
}

/* ── Leaderboard Icons ── */
function LbTrophyIcon({ color }) {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color||"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>);
}
function LbFireIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>);
}
function LbTargetIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
}
function LbChartIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>);
}
function LbUserIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
}
function LbPlusIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
}

function lbGetDateRange(period) {
  var now = new Date();
  var start;
  if (period === "daily") { start = new Date(now.getFullYear(), now.getMonth(), now.getDate()); }
  else if (period === "weekly") { var day = now.getDay(); start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day); }
  else if (period === "monthly") { start = new Date(now.getFullYear(), now.getMonth(), 1); }
  else { start = new Date(2020, 0, 1); }
  return start.toISOString().split("T")[0];
}

function lbFormatScore(val) {
  if (val === null || val === undefined || isNaN(val)) return "--";
  return Number(val).toFixed(1);
}

function lbGetMedalStyle(index) {
  if (index === 0) return { bg: "#FEF3C7", border: "#F59E0B", text: "#92400E", icon: "#F59E0B" };
  if (index === 1) return { bg: "#F3F4F6", border: "#9CA3AF", text: "#4B5563", icon: "#9CA3AF" };
  if (index === 2) return { bg: "#FED7AA", border: "#EA580C", text: "#9A3412", icon: "#EA580C" };
  return { bg: "transparent", border: "#E5E7EB", text: "#374151", icon: "#6B7280" };
}

/* ── Leaderboard Page ── */
function LeaderboardPage({ user, onOpenChat, onLoginClick }) {
  var [examType, setExamType] = useState("GMAT");
  var [period, setPeriod] = useState("weekly");
  var [leaderboardData, setLeaderboardData] = useState([]);
  var [loading, setLoading] = useState(true);
  var [showScoreModal, setShowScoreModal] = useState(false);
  var [submitting, setSubmitting] = useState(false);
  var [scoreForm, setScoreForm] = useState({ log_date:"", study_hours:"", questions_solved:"", questions_correct:"" });
  var [selectedProfile, setSelectedProfile] = useState(null);
  var [selectedProfileData, setSelectedProfileData] = useState(null);
  var [selectedConnStatus, setSelectedConnStatus] = useState(null);
  var [connections, setConnections] = useState([]);

  // Fetch user connections for profile modal
  useEffect(function() {
    if (!user) return;
    supabase.from("connections").select("*").or("requester_id.eq." + user.id + ",receiver_id.eq." + user.id).then(function(res) {
      setConnections(res.data || []);
    });
  }, [user]);

  function getConnectionForUser(profileId) {
    return connections.find(function(c) {
      return ((c.requester_id === profileId || c.receiver_id === profileId) && c.status !== "rejected" && c.status !== "blocked");
    });
  }

  // Get period start date with 4am daily reset
  function getPeriodDates(p) {
    var now = new Date();
    var todayAt4am = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4, 0, 0);
    var effectiveDate = now < todayAt4am ? new Date(now.getTime() - 86400000) : now;
    var ed = new Date(effectiveDate.getFullYear(), effectiveDate.getMonth(), effectiveDate.getDate());
    var today = ed.toISOString().split("T")[0];

    if (p === "daily") {
      return { start: today, end: today, exact: true };
    } else if (p === "weekly") {
      var day = ed.getDay();
      var mondayOffset = day === 0 ? 6 : day - 1;
      var monday = new Date(ed.getTime() - mondayOffset * 86400000);
      var sunday = new Date(monday.getTime() + 6 * 86400000);
      return { start: monday.toISOString().split("T")[0], end: sunday.toISOString().split("T")[0], exact: false };
    } else if (p === "monthly") {
      var monthStart = new Date(ed.getFullYear(), ed.getMonth(), 1);
      var monthEnd = new Date(ed.getFullYear(), ed.getMonth() + 1, 0);
      return { start: monthStart.toISOString().split("T")[0], end: monthEnd.toISOString().split("T")[0], exact: false };
    }
    return { start: "2020-01-01", end: "2099-12-31", exact: false };
  }

  var fetchLeaderboard = useCallback(async function() {
    setLoading(true);
    var dates = getPeriodDates(period);
    try {
      var query = supabase.from("daily_scores").select("*").eq("exam_type", examType);
      if (dates.exact) {
        query = query.eq("log_date", dates.start);
      } else {
        query = query.gte("log_date", dates.start).lte("log_date", dates.end);
      }
      var { data, error } = await query.order("log_date", { ascending: false });
      if (error) { console.error("Leaderboard fetch error:", error); setLeaderboardData([]); }
      else {
        // Aggregate by user
        var userMap = {};
        (data || []).forEach(function(row) {
          var uid = row.user_id;
          if (!userMap[uid]) { userMap[uid] = { user_id: uid, questions_solved: 0, questions_correct: 0, study_hours: 0, days_active: new Set(), log_dates: [] }; }
          userMap[uid].questions_solved += row.questions_solved || 0;
          userMap[uid].questions_correct += row.questions_correct || 0;
          userMap[uid].study_hours += row.study_hours || 0;
          userMap[uid].days_active.add(row.log_date);
          userMap[uid].log_dates.push(row.log_date);
        });

        // Fetch profile names for all users
        var userIds = Object.keys(userMap);
        var profileMap = {};
        if (userIds.length > 0) {
          var { data: profiles } = await supabase.from("profiles").select("id, full_name, avatar_url, target_exam, target_score, exam_date").in("id", userIds);
          (profiles || []).forEach(function(p) { profileMap[p.id] = p; });
        }

        var aggregated = Object.values(userMap).map(function(u) {
          var accuracy = u.questions_solved > 0 ? (u.questions_correct / u.questions_solved) * 100 : 0;
          var daysActive = u.days_active.size;
          // Composite: accuracy 35%, volume 25%, consistency 25%, study hours 15%
          var composite = (accuracy * 0.35) + (Math.min(u.questions_solved * 0.5, 100) * 0.25) + (Math.min(daysActive * 15, 100) * 0.25) + (Math.min(u.study_hours * 5, 100) * 0.15);
          var prof = profileMap[u.user_id] || {};
          return { user_id: u.user_id, full_name: prof.full_name || "Anonymous", avatar_url: prof.avatar_url, target_exam: prof.target_exam, target_score: prof.target_score, exam_date: prof.exam_date, questions_solved: u.questions_solved, questions_correct: u.questions_correct, study_hours: u.study_hours, days_active: daysActive, accuracy: accuracy, composite: composite };
        });
        aggregated.sort(function(a, b) { return b.composite - a.composite; });
        setLeaderboardData(aggregated);
      }
    } catch(err) { console.error("Fetch error:", err); setLeaderboardData([]); }
    setLoading(false);
  }, [examType, period]);

  useEffect(function() { fetchLeaderboard(); }, [fetchLeaderboard]);

  async function handleSubmitScore(e) {
    e.preventDefault();
    if (!user) { if (onLoginClick) onLoginClick(); return; }
    setSubmitting(true);
    var logDate = scoreForm.log_date || new Date().toISOString().split("T")[0];
    var qSolved = Number(scoreForm.questions_solved) || 0;
    var qCorrect = Number(scoreForm.questions_correct) || 0;
    var payload = { user_id: user.id, exam_type: examType, log_date: logDate, study_hours: Number(scoreForm.study_hours) || 0, questions_solved: qSolved, questions_correct: qCorrect, questions_wrong: qSolved - qCorrect, section: "general" };
    var { error } = await supabase.from("daily_scores").insert([payload]);
    if (error) { alert("Error submitting score: " + error.message); }
    else { setShowScoreModal(false); setScoreForm({ log_date: "", study_hours: "", questions_solved: "", questions_correct: "" }); fetchLeaderboard(); }
    setSubmitting(false);
  }

  // Open profile modal
  async function openProfile(userId) {
    var { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    setSelectedProfileData(data);
    var conn = getConnectionForUser(userId);
    setSelectedConnStatus(conn ? { status: conn.status, id: conn.id, isRequester: conn.requester_id === user.id } : null);
    setSelectedProfile(userId);
  }

  async function sendConnectionFromProfile(receiverId) {
    if (!user) { if (onLoginClick) onLoginClick(); return; }
    var { error } = await supabase.from("connections").insert([{ requester_id: user.id, receiver_id: receiverId, status: "pending" }]);
    if (error) { alert("Error: " + error.message); return; }
    var { data } = await supabase.from("connections").select("*").or("requester_id.eq." + user.id + ",receiver_id.eq." + user.id);
    setConnections(data || []);
    var conn = (data || []).find(function(c) { return c.requester_id === receiverId || c.receiver_id === receiverId; });
    setSelectedConnStatus(conn ? { status: conn.status, id: conn.id, isRequester: conn.requester_id === user.id } : null);
  }

  var lbInputStyle = { width: "100%", padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: "10px", fontSize: "14px", fontFamily: "'DM Sans',sans-serif", outline: "none", background: "#FAFAFA", boxSizing: "border-box" };

  return (
    <div style={{paddingTop: "120px", minHeight: "100vh", background: "#FAFAFA"}}>
      <div style={{maxWidth: 1100, margin: "0 auto", padding: "0 20px"}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24}}>
          <div>
            <h1 style={{fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,36px)", fontWeight: 700, color: "#111827", margin: 0}}>Prep Leaderboard</h1>
            <p style={{fontSize: 15, color: "#6B7280", marginTop: 6, marginBottom: 0, fontFamily: "'DM Sans',sans-serif"}}>{"Track your " + examType + " prep progress. Compete with fellow aspirants."}</p>
          </div>
          {user && (<button onClick={function() {setShowScoreModal(true);}} style={{display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: RED, color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}><LbPlusIcon /> Log Study Session</button>)}
        </div>

        {/* Exam Tabs */}
        <div style={{display: "flex", borderBottom: "2px solid #F3F4F6", gap: 0}}>
          {["GMAT", "GRE"].map(function(exam) {return (<button key={exam} onClick={function() {setExamType(exam);}} style={{padding: "10px 20px", border: "none", background: "transparent", cursor: "pointer", fontSize: 15, fontWeight: examType === exam ? 600 : 500, color: examType === exam ? RED : "#6B7280", borderBottom: examType === exam ? "3px solid " + RED : "3px solid transparent", fontFamily: "'DM Sans',sans-serif"}}>{exam + " Leaderboard"}</button>);})}
        </div>

        {/* Period Filter */}
        <div style={{display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap"}}>
          {[{key: "daily", label: "Daily"}, {key: "weekly", label: "Weekly"}, {key: "monthly", label: "Monthly"}, {key: "all", label: "All Time"}].map(function(p) {return (<button key={p.key} onClick={function() {setPeriod(p.key);}} style={{padding: "8px 18px", border: "1px solid " + (period === p.key ? RED : "#E5E7EB"), background: period === p.key ? RED : "white", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500, color: period === p.key ? "white" : "#6B7280", fontFamily: "'DM Sans',sans-serif"}}>{p.label}</button>);})}
          <span style={{fontSize: 12, color: "#9CA3AF", alignSelf: "center", marginLeft: 8}}>
            {period === "daily" ? "Resets at 4:00 AM daily" : period === "weekly" ? "Monday to Sunday" : period === "monthly" ? "1st to end of month" : ""}
          </span>
        </div>

        {/* Loading */}
        {loading && (<div style={{marginTop: 32}}>{[1, 2, 3, 4, 5].map(function(i) {return <div key={i} style={{background: "linear-gradient(90deg,#F3F4F6 25%,#E5E7EB 50%,#F3F4F6 75%)", backgroundSize: "200% 100%", animation: "lbShimmer 1.5s infinite", borderRadius: 8, height: 60, marginBottom: 8}} />;})}<style>{"@keyframes lbShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}"}</style></div>)}

        {/* Empty */}
        {!loading && leaderboardData.length === 0 && (<div style={{textAlign: "center", padding: "80px 20px", color: "#9CA3AF"}}><div style={{fontSize: 48, marginBottom: 16}}>&#128202;</div><h3 style={{fontSize: 20, color: "#374151", marginBottom: 8, fontFamily: "'Playfair Display',serif"}}>No scores yet for this period</h3><p style={{fontSize: 14, maxWidth: 400, margin: "0 auto", lineHeight: 1.6, fontFamily: "'DM Sans',sans-serif"}}>{"Be the first to log your " + examType + " study session and claim the top spot."}</p>{user && (<button onClick={function() {setShowScoreModal(true);}} style={{marginTop: 20, padding: "12px 28px", background: RED, color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>Log Your First Session</button>)}</div>)}

        {/* Top 3 Podium */}
        {!loading && leaderboardData.length > 0 && (<div>
          <div style={{display: "flex", gap: 16, marginTop: 32, justifyContent: "center", flexWrap: "wrap"}}>
            {leaderboardData.slice(0, Math.min(3, leaderboardData.length)).map(function(entry, idx) {
              var medal = lbGetMedalStyle(idx);
              var initials = (entry.full_name || "A").split(" ").map(function(w) {return w[0];}).join("").toUpperCase().slice(0, 2);
              return (<div key={entry.user_id} onClick={function() {if (user) openProfile(entry.user_id);}} style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 20px", borderRadius: 16, border: "2px solid " + medal.border, backgroundColor: medal.bg, flex: idx === 0 ? "1.2" : "1", minWidth: 200, maxWidth: 300, position: "relative", cursor: user ? "pointer" : "default"}}>
                <div style={{position: "absolute", top: 12, left: 12, width: 28, height: 28, borderRadius: "50%", background: medal.border, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700}}>{idx + 1}</div>
                <LbTrophyIcon color={medal.icon} />
                <div style={{width: idx === 0 ? 56 : 48, height: idx === 0 ? 56 : 48, borderRadius: "50%", background: medal.border, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: idx === 0 ? 20 : 18, color: "white", marginTop: 12}}>{initials}</div>
                <h3 style={{fontSize: idx === 0 ? 18 : 16, fontWeight: 600, color: medal.text, marginTop: 10, marginBottom: 4, textAlign: "center", fontFamily: "'Playfair Display',serif"}}>{entry.full_name || "Anonymous"}</h3>
                <div style={{display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 8}}>
                  <span style={{display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: "#F9FAFB", color: "#6B7280"}}><LbTargetIcon /> {lbFormatScore(entry.accuracy) + "%"}</span>
                  <span style={{display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: "#F9FAFB", color: "#6B7280"}}>{entry.questions_solved + " Qs"}</span>
                  <span style={{display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500, background: "#F9FAFB", color: "#6B7280"}}><LbFireIcon /> {entry.days_active + "d"}</span>
                </div>
              </div>);
            })}
          </div>

          {/* Table */}
          <div style={{marginTop: 32, background: "white", borderRadius: 16, border: "1px solid #E5E7EB", overflow: "hidden", marginBottom: 32}}>
            <div style={{display: "grid", gridTemplateColumns: "50px 1fr 90px 90px 70px 70px 70px", alignItems: "center", padding: "12px 20px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#9CA3AF", borderBottom: "2px solid #F3F4F6", fontFamily: "'DM Sans',sans-serif"}}><span>#</span><span>Name</span><span>Solved</span><span>Correct</span><span>Acc%</span><span>Hours</span><span>Days</span></div>
            {leaderboardData.map(function(entry, idx) {
              var initials = (entry.full_name || "A").split(" ").map(function(w) {return w[0];}).join("").toUpperCase().slice(0, 2);
              var isMe = user && entry.user_id === user.id;
              var colors = ["#ec8283", "#2563EB", "#059669", "#7C3AED", "#D97706", "#DB2777"];
              return (<div key={entry.user_id} onClick={function() {if (user) openProfile(entry.user_id);}} style={{display: "grid", gridTemplateColumns: "50px 1fr 90px 90px 70px 70px 70px", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid #F3F4F6", backgroundColor: isMe ? "#fdf0f0" : "transparent", borderLeft: isMe ? "3px solid " + RED : "3px solid transparent", cursor: user ? "pointer" : "default"}}>
                <span style={{fontSize: 14, fontWeight: 700, color: idx < 3 ? lbGetMedalStyle(idx).icon : "#9CA3AF"}}>{idx + 1}</span>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                  <div style={{width: 32, height: 32, borderRadius: "50%", background: colors[idx % colors.length], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 12, color: "white", flexShrink: 0}}>{initials}</div>
                  <div>
                    <div style={{fontSize: 13, fontWeight: 600, color: "#111827"}}>{entry.full_name || "Anonymous"}{isMe && (<span style={{marginLeft: 6, fontSize: 9, fontWeight: 600, background: RED, color: "white", padding: "1px 6px", borderRadius: 8}}>YOU</span>)}</div>
                  </div>
                </div>
                <span style={{fontSize: 13, fontWeight: 600, color: "#111827"}}>{entry.questions_solved}</span>
                <span style={{fontSize: 13, color: "#374151"}}>{entry.questions_correct}</span>
                <span style={{fontSize: 13, color: "#374151"}}>{lbFormatScore(entry.accuracy) + "%"}</span>
                <span style={{fontSize: 13, color: "#374151"}}>{entry.study_hours + "h"}</span>
                <span style={{fontSize: 13, color: "#374151"}}>{entry.days_active}</span>
              </div>);
            })}
          </div>
        </div>)}

        {/* How Rankings Work */}
        <div style={{marginTop: 16, marginBottom: 60, padding: 28, background: "white", borderRadius: 16, border: "1px solid #E5E7EB"}}>
          <h3 style={{fontSize: 18, fontWeight: 600, color: "#111827", marginTop: 0, marginBottom: 16, fontFamily: "'Playfair Display',serif"}}>How Rankings Work</h3>
          <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16}}>
            {[{icon: <LbTargetIcon />, label: "Accuracy", weight: "35%", desc: "Questions correct / solved"}, {icon: <LbChartIcon />, label: "Volume", weight: "25%", desc: "Total questions attempted"}, {icon: <LbFireIcon />, label: "Consistency", weight: "25%", desc: "Number of active study days"}, {icon: <LbUserIcon />, label: "Study Hours", weight: "15%", desc: "Total hours studied"}].map(function(item, i) {
              return (<div key={i} style={{padding: 16, background: "#F9FAFB", borderRadius: 12, display: "flex", flexDirection: "column", gap: 6}}>
                <div style={{display: "flex", alignItems: "center", gap: 8, color: RED}}>{item.icon}<span style={{fontSize: 14, fontWeight: 600, color: "#111827"}}>{item.label}</span><span style={{marginLeft: "auto", fontSize: 12, fontWeight: 700, color: RED, background: "#fdf0f0", padding: "2px 8px", borderRadius: 10}}>{item.weight}</span></div>
                <span style={{fontSize: 12, color: "#6B7280"}}>{item.desc}</span>
              </div>);
            })}
          </div>
        </div>
      </div>

      {/* Score Modal */}
      {showScoreModal && (<div onClick={function() {setShowScoreModal(false);}} style={{position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: 20}}>
        <div onClick={function(e) {e.stopPropagation();}} style={{background: "white", borderRadius: 20, padding: 36, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24}}>
            <h2 style={{fontSize: 22, fontWeight: 700, color: "#111827", margin: 0, fontFamily: "'Playfair Display',serif"}}>Log Study Session</h2>
            <button onClick={function() {setShowScoreModal(false);}} style={{background: "none", border: "none", fontSize: 24, color: "#9CA3AF", cursor: "pointer"}}>&#10005;</button>
          </div>
          <form onSubmit={handleSubmitScore}>
            <div style={{marginBottom: 16}}>
              <label style={{fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block"}}>Study Date *</label>
              <input type="date" style={lbInputStyle} value={scoreForm.log_date} onChange={function(e) {setScoreForm(Object.assign({}, scoreForm, {log_date: e.target.value}));}} max={new Date().toISOString().split("T")[0]} required />
            </div>
            <div style={{marginBottom: 16}}>
              <label style={{fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block"}}>Study Hours *</label>
              <input type="number" step="0.5" min="0" style={lbInputStyle} placeholder="e.g. 3.5" value={scoreForm.study_hours} onChange={function(e) {setScoreForm(Object.assign({}, scoreForm, {study_hours: e.target.value}));}} required />
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16}}>
              <div>
                <label style={{fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block"}}>Questions Attempted *</label>
                <input type="number" min="0" style={lbInputStyle} placeholder="e.g. 50" value={scoreForm.questions_solved} onChange={function(e) {setScoreForm(Object.assign({}, scoreForm, {questions_solved: e.target.value}));}} required />
              </div>
              <div>
                <label style={{fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block"}}>Questions Correct *</label>
                <input type="number" min="0" style={lbInputStyle} placeholder="e.g. 38" value={scoreForm.questions_correct} onChange={function(e) {setScoreForm(Object.assign({}, scoreForm, {questions_correct: e.target.value}));}} required />
              </div>
            </div>
            {scoreForm.questions_solved && scoreForm.questions_correct && (
              <div style={{padding: "12px 16px", background: "#F9FAFB", borderRadius: 10, marginBottom: 16, fontSize: 13, color: "#6B7280"}}>
                {"Accuracy: " + (Number(scoreForm.questions_solved) > 0 ? Math.round((Number(scoreForm.questions_correct) / Number(scoreForm.questions_solved)) * 100) : 0) + "% | Wrong: " + (Number(scoreForm.questions_solved) - Number(scoreForm.questions_correct))}
              </div>
            )}
            <button type="submit" disabled={submitting || !scoreForm.log_date || !scoreForm.study_hours || !scoreForm.questions_solved || !scoreForm.questions_correct} style={{width: "100%", padding: 14, background: submitting ? "#D1D5DB" : RED, color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer", fontFamily: "'DM Sans',sans-serif"}}>{submitting ? "Submitting..." : "Submit"}</button>
          </form>
        </div>
      </div>)}

      {/* Profile Modal */}
      {selectedProfile && selectedProfileData && (<div onClick={function() {setSelectedProfile(null);}} style={{position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: 20}}>
        <div onClick={function(e) {e.stopPropagation();}} style={{background: "white", borderRadius: 20, padding: 32, width: "100%", maxWidth: 420, boxShadow: "0 25px 60px rgba(0,0,0,0.15)"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20}}>
            <h3 style={{fontSize: 18, fontWeight: 700, color: "#111827", margin: 0, fontFamily: "'Playfair Display',serif"}}>Profile</h3>
            <button onClick={function() {setSelectedProfile(null);}} style={{background: "none", border: "none", fontSize: 22, color: "#9CA3AF", cursor: "pointer"}}>&#10005;</button>
          </div>
          {(function() {
            var p = selectedProfileData;
            var initials = (p.full_name || "A").split(" ").map(function(w) {return w[0];}).join("").toUpperCase().slice(0, 2);
            var isMe = user && p.id === user.id;
            return (<div>
              <div style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 20}}>
                <div style={{width: 56, height: 56, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, color: "white"}}>{initials}</div>
                <div>
                  <div style={{fontSize: 18, fontWeight: 700, color: "#111827"}}>{p.full_name || "Anonymous"}</div>
                  <div style={{fontSize: 13, color: "#6B7280"}}>{p.target_exam || "Not set"}{p.target_score ? " | Target: " + p.target_score : ""}</div>
                </div>
              </div>
              <div style={{display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16}}>
                {p.exam_date && (<span style={{fontSize: 12, padding: "5px 12px", borderRadius: 20, background: "#F3F4F6", color: "#374151"}}>{"Exam: " + new Date(p.exam_date).toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}</span>)}
                {p.target_schools && (<span style={{fontSize: 12, padding: "5px 12px", borderRadius: 20, background: "#F3F4F6", color: "#374151"}}>{p.target_schools}</span>)}
                {p.study_style && (<span style={{fontSize: 12, padding: "5px 12px", borderRadius: 20, background: "#F3F4F6", color: "#374151"}}>{p.study_style}</span>)}
              </div>
              {p.bio && (<p style={{fontSize: 13, color: "#6B7280", lineHeight: 1.6, margin: "0 0 20px"}}>{p.bio}</p>)}
              {!isMe && (<div style={{display: "flex", gap: 10}}>
                {!selectedConnStatus && (<button onClick={function() {sendConnectionFromProfile(p.id);}} style={{flex: 1, padding: "12px", background: RED, color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>Connect</button>)}
                {selectedConnStatus && selectedConnStatus.status === "pending" && (<span style={{flex: 1, padding: "12px", background: "#FEF3C7", color: "#92400E", borderRadius: 10, fontSize: 13, fontWeight: 600, textAlign: "center"}}>{selectedConnStatus.isRequester ? "Invite Sent" : "Pending"}</span>)}
                {selectedConnStatus && selectedConnStatus.status === "accepted" && (<button onClick={function() {if (typeof onOpenChat === "function") {onOpenChat(p.id, p.full_name); setSelectedProfile(null);}}} style={{flex: 1, padding: "12px", background: RED, color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>Message</button>)}
              </div>)}
            </div>);
          })()}
        </div>
      </div>)}
    </div>
  );
}

/* ── Accountability Matching Icons ── */
function AccHeartIcon() {
  return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>);
}
function AccCheckIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
}
function AccClockIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
}
function AccXIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
}
function AccSendIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
}
function AccEditIcon() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
}

/* ── Accountability Matching Page ── */
function AccountabilityPage({ user, onLoginClick, onOpenChat }) {
  var [tab, setTab] = useState("browse");
  var [profiles, setProfiles] = useState([]);
  var [connections, setConnections] = useState([]);
  var [loading, setLoading] = useState(true);
  var [myProfile, setMyProfile] = useState(null);
  var [showProfileModal, setShowProfileModal] = useState(false);
  var [profileForm, setProfileForm] = useState({ target_exam:"GMAT", target_score:"", exam_date:"", target_schools:"", study_style:"", bio:"" });
  var [saving, setSaving] = useState(false);

  // Fetch my profile
  useEffect(function() {
    if (!user) { setLoading(false); return; }
    async function load() {
      setLoading(true);
      var { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (prof) {
        setMyProfile(prof);
        setProfileForm({ target_exam:prof.target_exam||"GMAT", target_score:prof.target_score||"", exam_date:prof.exam_date||"", target_schools:prof.target_schools||"", study_style:prof.study_style||"", bio:prof.bio||"" });
      }
      setLoading(false);
    }
    load();
  }, [user]);

  // Fetch browse profiles
  useEffect(function() {
    if (!user) return;
    async function loadProfiles() {
      var { data } = await supabase.from("profiles").select("*").neq("id", user.id).not("target_exam", "is", null);
      // Filter out blocked users
      var blockedIds = connections.filter(function(c) { return c.status === "blocked"; }).map(function(c) { return c.requester_id === user.id ? c.receiver_id : c.requester_id; });
      var filtered = (data || []).filter(function(p) { return blockedIds.indexOf(p.id) === -1; });
      setProfiles(filtered);
    }
    loadProfiles();
  }, [user, myProfile, connections]);

  // Fetch connections
  var [connRefresh, setConnRefresh] = useState(0);
  useEffect(function() {
    if (!user) return;
    async function loadConnections() {
      var { data, error } = await supabase.from("connections").select("*, requester:profiles!connections_requester_id_profiles_fkey(id, full_name, avatar_url, target_exam, target_score, exam_date), receiver:profiles!connections_receiver_id_profiles_fkey(id, full_name, avatar_url, target_exam, target_score, exam_date)").or("requester_id.eq." + user.id + ",receiver_id.eq." + user.id);
      if (error) console.error("Connections fetch error:", error);
      setConnections(data || []);
    }
    loadConnections();
  }, [user, connRefresh]);

  // Save profile
  async function handleSaveProfile(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    var payload = { id:user.id, target_exam:profileForm.target_exam, target_score:profileForm.target_score||null, exam_date:profileForm.exam_date||null, target_schools:profileForm.target_schools||null, study_style:profileForm.study_style||null, bio:profileForm.bio||null };
    var { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    if (error) { alert("Error saving profile: " + error.message); }
    else {
      var { data: updated } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (updated) setMyProfile(updated);
      setShowProfileModal(false);
    }
    setSaving(false);
  }

  // Send connection request
  async function sendRequest(receiverId) {
    if (!user) return;
    var existing = connections.find(function(c) {
      return (c.requester_id === user.id && c.receiver_id === receiverId) || (c.receiver_id === user.id && c.requester_id === receiverId);
    });
    if (existing && existing.status === "rejected") {
      // Delete the old rejected connection first so we can send a fresh request
      await supabase.from("connections").delete().eq("id", existing.id);
    } else if (existing) {
      alert("You already have a connection with this person.");
      return;
    }
    var { error } = await supabase.from("connections").insert([{ requester_id: user.id, receiver_id: receiverId, status: "pending" }]);
    if (error) {
      if (error.message && error.message.indexOf("duplicate") !== -1) {
        alert("You already have a pending or existing connection with this person.");
      } else {
        alert("Error sending request: " + error.message);
      }
    }
    else {
      setConnRefresh(function(prev) { return prev + 1; });
    }
  }

  // Accept/reject connection
  async function updateConnection(connId, newStatus) {
    var { error } = await supabase.from("connections").update({ status: newStatus }).eq("id", connId);
    if (error) { alert("Error updating connection: " + error.message); }
    else { setConnRefresh(function(prev) { return prev + 1; }); }
  }

  // Block user
  async function blockUser(otherUserId) {
    if (!user) return;
    if (!confirm("Are you sure you want to block this user? They will not be able to see your profile or send you requests.")) return;
    var existing = connections.find(function(c) {
      return (c.requester_id === user.id && c.receiver_id === otherUserId) || (c.receiver_id === user.id && c.requester_id === otherUserId);
    });
    if (existing) {
      var { error } = await supabase.from("connections").update({ status: "blocked" }).eq("id", existing.id);
      if (error) { alert("Error blocking user: " + error.message); }
      else { setConnRefresh(function(prev) { return prev + 1; }); }
    } else {
      var { error } = await supabase.from("connections").insert([{ requester_id: user.id, receiver_id: otherUserId, status: "blocked" }]);
      if (error) { alert("Error blocking user: " + error.message); }
      else { setConnRefresh(function(prev) { return prev + 1; }); }
    }
  }

  // Unblock / delete connection entirely
  async function deleteConnection(connId) {
    var { error } = await supabase.from("connections").delete().eq("id", connId);
    if (error) { alert("Error removing connection: " + error.message); }
    else { setConnRefresh(function(prev) { return prev + 1; }); }
  }

  // Compute suggested matches
  function getSuggestedProfiles() {
    if (!myProfile || !myProfile.target_exam) return [];
    var myExamDate = myProfile.exam_date ? new Date(myProfile.exam_date) : null;
    var scored = profiles.map(function(p) {
      var score = 0;
      if (p.target_exam === myProfile.target_exam) score += 50;
      if (myExamDate && p.exam_date) {
        var diff = Math.abs(new Date(p.exam_date) - myExamDate) / (1000*60*60*24);
        if (diff <= 14) score += 40;
        else if (diff <= 30) score += 20;
        else if (diff <= 60) score += 10;
      }
      if (p.study_style && myProfile.study_style && p.study_style === myProfile.study_style) score += 10;
      return { profile: p, score: score };
    });
    scored.sort(function(a, b) { return b.score - a.score; });
    return scored.filter(function(s) { return s.score > 0; });
  }

  function getConnectionStatus(profileId) {
    var conn = connections.find(function(c) {
      return (c.requester_id === profileId || c.receiver_id === profileId) && c.status !== "rejected";
    });
    if (!conn) return null;
    return { status: conn.status, id: conn.id, isRequester: conn.requester_id === user.id };
  }

  function formatDate(d) {
    if (!d) return "Not set";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  var accInputStyle = { width:"100%", padding:"12px 16px", border:"1px solid #E5E7EB", borderRadius:"10px", fontSize:"14px", fontFamily:"'DM Sans',sans-serif", outline:"none", background:"#FAFAFA", boxSizing:"border-box" };

  // Not logged in
  if (!user) {
    return (
      <div style={{paddingTop:"120px",minHeight:"100vh",background:"#FAFAFA"}}>
        <div style={{maxWidth:600,margin:"0 auto",padding:"80px 20px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>&#129309;</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"#111827",marginBottom:12}}>Find Your Study Partner</h1>
          <p style={{fontSize:15,color:"#6B7280",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",maxWidth:450,margin:"0 auto 24px"}}>Get matched with fellow aspirants preparing for the same exam around the same time. Hold each other accountable and stay on track.</p>
          <button onClick={onLoginClick} style={{padding:"14px 36px",background:RED,color:"white",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Sign In to Get Started</button>
        </div>
      </div>
    );
  }

  // Profile not set up
  if (!loading && user && (!myProfile || !myProfile.target_exam)) {
    return (
      <div style={{paddingTop:"120px",minHeight:"100vh",background:"#FAFAFA"}}>
        <div style={{maxWidth:600,margin:"0 auto",padding:"80px 20px",textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>&#128221;</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:"#111827",marginBottom:12}}>Complete Your Profile</h1>
          <p style={{fontSize:15,color:"#6B7280",lineHeight:1.7,fontFamily:"'DM Sans',sans-serif",maxWidth:450,margin:"0 auto 24px"}}>Tell us about your exam goals so we can match you with the right study partners.</p>
          <button onClick={function(){setShowProfileModal(true);}} style={{padding:"14px 36px",background:RED,color:"white",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Set Up Profile</button>
          {renderProfileModal()}
        </div>
      </div>
    );
  }

  function renderProfileModal() {
    if (!showProfileModal) return null;
    return (
      <div onClick={function(){setShowProfileModal(false);}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1100,padding:20}}>
        <div onClick={function(e){e.stopPropagation();}} style={{background:"white",borderRadius:20,padding:36,width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 25px 60px rgba(0,0,0,0.15)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
            <h2 style={{fontSize:22,fontWeight:700,color:"#111827",margin:0,fontFamily:"'Playfair Display',serif"}}>Your Study Profile</h2>
            <button onClick={function(){setShowProfileModal(false);}} style={{background:"none",border:"none",fontSize:24,color:"#9CA3AF",cursor:"pointer"}}>&#10005;</button>
          </div>
          <form onSubmit={handleSaveProfile}>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Target Exam *</label>
              <select style={accInputStyle} value={profileForm.target_exam} onChange={function(e){setProfileForm(Object.assign({},profileForm,{target_exam:e.target.value}));}}>
                <option value="GMAT">GMAT</option>
                <option value="GRE">GRE</option>
              </select>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
              <div><label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Target Score</label><input type="number" style={accInputStyle} placeholder={profileForm.target_exam==="GMAT"?"e.g. 720":"e.g. 325"} value={profileForm.target_score} onChange={function(e){setProfileForm(Object.assign({},profileForm,{target_score:e.target.value}));}}/></div>
              <div><label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Exam Date</label><input type="date" style={accInputStyle} value={profileForm.exam_date} onChange={function(e){setProfileForm(Object.assign({},profileForm,{exam_date:e.target.value}));}}/></div>
            </div>
            <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Target Schools</label><input type="text" style={accInputStyle} placeholder="e.g. ISB, INSEAD, LBS" value={profileForm.target_schools} onChange={function(e){setProfileForm(Object.assign({},profileForm,{target_schools:e.target.value}));}}/></div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Study Style</label>
              <select style={accInputStyle} value={profileForm.study_style} onChange={function(e){setProfileForm(Object.assign({},profileForm,{study_style:e.target.value}));}}>
                <option value="">Select...</option>
                <option value="morning">Morning person</option>
                <option value="evening">Evening person</option>
                <option value="night">Night owl</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div style={{marginBottom:16}}><label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Short Bio</label><textarea style={{...accInputStyle,resize:"vertical"}} rows={3} placeholder="Tell potential study partners about yourself..." value={profileForm.bio} onChange={function(e){setProfileForm(Object.assign({},profileForm,{bio:e.target.value}));}}/></div>
            <button type="submit" disabled={saving||!profileForm.target_exam} style={{width:"100%",padding:14,background:saving?"#D1D5DB":RED,color:"white",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:saving?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif"}}>{saving?"Saving...":"Save Profile"}</button>
          </form>
        </div>
      </div>
    );
  }

  var suggested = getSuggestedProfiles();
  var pendingReceived = connections.filter(function(c){ return c.receiver_id===user.id && c.status==="pending"; });
  var pendingSent = connections.filter(function(c){ return c.requester_id===user.id && c.status==="pending"; });
  var accepted = connections.filter(function(c){ return c.status==="accepted"; });
  var blocked = connections.filter(function(c){ return c.status==="blocked" && c.requester_id===user.id; });

  return (
    <div style={{paddingTop:"120px",minHeight:"100vh",background:"#FAFAFA"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:24}}>
          <div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,36px)",fontWeight:700,color:"#111827",margin:0}}>Accountability Partners</h1>
            <p style={{fontSize:15,color:"#6B7280",marginTop:6,marginBottom:0,fontFamily:"'DM Sans',sans-serif"}}>Find study partners preparing for the same exam around the same time.</p>
          </div>
          <button onClick={function(){setShowProfileModal(true);}} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",background:"white",color:"#374151",border:"1px solid #E5E7EB",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccEditIcon/> Edit Profile</button>
        </div>

        {/* My Profile Card */}
        {myProfile && (
          <div style={{background:"white",borderRadius:16,border:"1px solid #E5E7EB",padding:"20px 24px",marginBottom:24,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
            <div style={{width:48,height:48,borderRadius:"50%",background:RED,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:18,color:"white"}}>{(myProfile.full_name||"M").charAt(0).toUpperCase()}</div>
            <div style={{flex:1,minWidth:200}}>
              <div style={{fontSize:16,fontWeight:600,color:"#111827",fontFamily:"'DM Sans',sans-serif"}}>{myProfile.full_name||"You"}</div>
              <div style={{fontSize:13,color:"#6B7280",marginTop:2}}>{myProfile.target_exam||"--"} | Target: {myProfile.target_score||"--"} | Exam: {formatDate(myProfile.exam_date)}</div>
            </div>
            <div style={{display:"flex",gap:12,fontSize:13,color:"#6B7280"}}>
              <span style={{background:"#fdf0f0",color:RED,padding:"4px 12px",borderRadius:20,fontWeight:600}}>{accepted.length + " partner" + (accepted.length !== 1 ? "s" : "")}</span>
              {pendingReceived.length > 0 && (<span style={{background:"#FEF3C7",color:"#92400E",padding:"4px 12px",borderRadius:20,fontWeight:600}}>{pendingReceived.length + " pending"}</span>)}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"2px solid #F3F4F6",gap:0,marginBottom:24}}>
          {[{key:"browse",label:"Browse Profiles"},{key:"suggested",label:"Suggested Matches" + (suggested.length>0?" ("+suggested.length+")":"")},{key:"connections",label:"My Connections" + (pendingReceived.length>0?" ("+pendingReceived.length+" new)":"")}].map(function(t){
            return (<button key={t.key} onClick={function(){setTab(t.key);}} style={{padding:"10px 20px",border:"none",background:"transparent",cursor:"pointer",fontSize:14,fontWeight:tab===t.key?600:500,color:tab===t.key?RED:"#6B7280",borderBottom:tab===t.key?"3px solid "+RED:"3px solid transparent",fontFamily:"'DM Sans',sans-serif"}}>{t.label}</button>);
          })}
        </div>

        {/* Browse Tab */}
        {tab==="browse" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16,marginBottom:60}}>
            {profiles.length===0 && (<div style={{gridColumn:"1/-1",textAlign:"center",padding:"60px 20px",color:"#9CA3AF"}}><div style={{fontSize:40,marginBottom:12}}>&#128100;</div><p style={{fontSize:14}}>No profiles found yet. Be the first to set up your study profile.</p></div>)}
            {profiles.map(function(p){
              var connStatus = getConnectionStatus(p.id);
              var initials = (p.full_name||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
              var colors=["#ec8283","#2563EB","#059669","#7C3AED","#D97706","#DB2777"];
              var color = colors[p.full_name ? p.full_name.length % colors.length : 0];
              return (
                <div key={p.id} style={{background:"white",borderRadius:16,border:"1px solid #E5E7EB",padding:24,display:"flex",flexDirection:"column",gap:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:16,color:"white",flexShrink:0}}>{initials}</div>
                    <div>
                      <div style={{fontSize:15,fontWeight:600,color:"#111827"}}>{p.full_name||"Anonymous"}</div>
                      <div style={{fontSize:12,color:"#6B7280"}}>{p.target_exam||"--"} | Target: {p.target_score||"--"}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {p.exam_date && (<span style={{fontSize:12,padding:"4px 10px",borderRadius:20,background:"#F3F4F6",color:"#374151"}}>Exam: {formatDate(p.exam_date)}</span>)}
                    {p.target_schools && (<span style={{fontSize:12,padding:"4px 10px",borderRadius:20,background:"#F3F4F6",color:"#374151"}}>{p.target_schools}</span>)}
                    {p.study_style && (<span style={{fontSize:12,padding:"4px 10px",borderRadius:20,background:"#F3F4F6",color:"#374151"}}>{p.study_style}</span>)}
                  </div>
                  {p.bio && (<p style={{fontSize:13,color:"#6B7280",margin:0,lineHeight:1.5}}>{p.bio}</p>)}
                  <div style={{marginTop:"auto",paddingTop:8,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                    {!connStatus && (<button onClick={function(){sendRequest(p.id);}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",background:RED,color:"white",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccSendIcon/> Connect</button>)}
                    {connStatus && connStatus.status==="pending" && connStatus.isRequester && (<span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#FEF3C7",color:"#92400E",borderRadius:8,fontSize:13,fontWeight:600}}><AccClockIcon/> Invite Sent</span>)}
                    {connStatus && connStatus.status==="pending" && !connStatus.isRequester && (<><button onClick={function(){updateConnection(connStatus.id,"accepted");}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"8px 16px",background:"#059669",color:"white",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccCheckIcon/> Accept Invite</button><button onClick={function(){updateConnection(connStatus.id,"rejected");}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"8px 16px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccXIcon/> Decline</button></>)}
                    {connStatus && connStatus.status==="accepted" && (<span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",background:"#D1FAE5",color:"#065F46",borderRadius:8,fontSize:13,fontWeight:600}}><AccCheckIcon/> Connected</span>)}
                    {connStatus && connStatus.status!=="blocked" && (<button onClick={function(){blockUser(p.id);}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"8px 12px",background:"none",color:"#D1D5DB",border:"none",borderRadius:8,fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} title="Block user"><AccXIcon/> Block</button>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Suggested Tab */}
        {tab==="suggested" && (
          <div style={{marginBottom:60}}>
            {suggested.length===0 && (<div style={{textAlign:"center",padding:"60px 20px",color:"#9CA3AF"}}><div style={{fontSize:40,marginBottom:12}}>&#128269;</div><p style={{fontSize:14}}>No suggested matches yet. Complete your profile with exam date and target score for better matching.</p></div>)}
            {suggested.map(function(s,idx){
              var p = s.profile;
              var matchPct = Math.min(Math.round(s.score), 100);
              var connStatus = getConnectionStatus(p.id);
              var initials = (p.full_name||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
              var colors=["#ec8283","#2563EB","#059669","#7C3AED","#D97706","#DB2777"];
              var color = colors[idx % colors.length];
              return (
                <div key={p.id} style={{background:"white",borderRadius:16,border:"1px solid #E5E7EB",padding:24,marginBottom:12,display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                  <div style={{width:48,height:48,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:18,color:"white",flexShrink:0}}>{initials}</div>
                  <div style={{flex:1,minWidth:200}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <span style={{fontSize:15,fontWeight:600,color:"#111827"}}>{p.full_name||"Anonymous"}</span>
                      <span style={{fontSize:11,fontWeight:700,color:matchPct>=70?RED:"#D97706",background:matchPct>=70?"#fdf0f0":"#FEF3C7",padding:"2px 8px",borderRadius:10}}>{matchPct + "% match"}</span>
                    </div>
                    <div style={{fontSize:13,color:"#6B7280",marginTop:2}}>{p.target_exam} | Target: {p.target_score||"--"} | Exam: {formatDate(p.exam_date)}</div>
                    {p.bio && (<p style={{fontSize:13,color:"#9CA3AF",margin:"6px 0 0",lineHeight:1.5}}>{p.bio}</p>)}
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    {!connStatus && (<button onClick={function(){sendRequest(p.id);}} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"10px 24px",background:RED,color:"white",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccSendIcon/> Connect</button>)}
                    {connStatus && connStatus.status==="pending" && connStatus.isRequester && (<span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"10px 24px",background:"#FEF3C7",color:"#92400E",borderRadius:8,fontSize:13,fontWeight:600}}><AccClockIcon/> Invite Sent</span>)}
                    {connStatus && connStatus.status==="pending" && !connStatus.isRequester && (<><button onClick={function(){updateConnection(connStatus.id,"accepted");}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"10px 20px",background:"#059669",color:"white",border:"none",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccCheckIcon/> Accept Invite</button><button onClick={function(){updateConnection(connStatus.id,"rejected");}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"10px 20px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}><AccXIcon/> Decline</button></>)}
                    {connStatus && connStatus.status==="accepted" && (<span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"10px 24px",background:"#D1FAE5",color:"#065F46",borderRadius:8,fontSize:13,fontWeight:600}}><AccCheckIcon/> Connected</span>)}
                    {connStatus && connStatus.status!=="blocked" && (<button onClick={function(){blockUser(p.id);}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"10px 12px",background:"none",color:"#D1D5DB",border:"none",borderRadius:8,fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} title="Block user"><AccXIcon/> Block</button>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Connections Tab */}
        {tab==="connections" && (
          <div style={{marginBottom:60}}>
            {/* Pending Received */}
            {pendingReceived.length > 0 && (<div style={{marginBottom:32}}>
              <h3 style={{fontSize:16,fontWeight:600,color:"#111827",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>Pending Requests</h3>
              {pendingReceived.map(function(c){
                var other = c.requester;
                var initials = (other.full_name||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
                return (
                  <div key={c.id} style={{background:"#FEF3C7",borderRadius:12,padding:"16px 20px",marginBottom:8,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:"#D97706",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:"white"}}>{initials}</div>
                    <div style={{flex:1,minWidth:180}}>
                      <div style={{fontSize:14,fontWeight:600,color:"#111827"}}>{other.full_name||"Anonymous"}</div>
                      <div style={{fontSize:12,color:"#6B7280"}}>{other.target_exam||"--"} | Target: {other.target_score||"--"} | Exam: {formatDate(other.exam_date)}</div>
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={function(){updateConnection(c.id,"accepted");}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"8px 16px",background:"#059669",color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}><AccCheckIcon/> Accept</button>
                      <button onClick={function(){updateConnection(c.id,"rejected");}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"8px 16px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}><AccXIcon/> Decline</button>
                    </div>
                  </div>
                );
              })}
            </div>)}

            {/* Accepted */}
            <h3 style={{fontSize:16,fontWeight:600,color:"#111827",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>Your Partners</h3>
            {accepted.length===0 && (<div style={{textAlign:"center",padding:"40px 20px",color:"#9CA3AF",background:"white",borderRadius:12,border:"1px solid #E5E7EB"}}><p style={{fontSize:14,margin:0}}>No accountability partners yet. Browse profiles and send connection requests to get started.</p></div>)}
            {accepted.map(function(c){
              var other = c.requester_id===user.id ? c.receiver : c.requester;
              var initials = (other.full_name||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
              var colors=["#ec8283","#2563EB","#059669","#7C3AED","#D97706"];
              var color = colors[(other.full_name||"A").length % colors.length];
              return (
                <div key={c.id} style={{background:"white",borderRadius:12,border:"1px solid #E5E7EB",padding:"16px 20px",marginBottom:8,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                  <div style={{width:40,height:40,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:"white"}}>{initials}</div>
                  <div style={{flex:1,minWidth:180}}>
                    <div style={{fontSize:14,fontWeight:600,color:"#111827"}}>{other.full_name||"Anonymous"}</div>
                    <div style={{fontSize:12,color:"#6B7280"}}>{other.target_exam||"--"} | Target: {other.target_score||"--"} | Exam: {formatDate(other.exam_date)}</div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <button onClick={function(){if(typeof onOpenChat==="function")onOpenChat(other.id,other.full_name);}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 14px",background:RED,color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>&#128172; Message</button>
                    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 14px",background:"#D1FAE5",color:"#065F46",borderRadius:8,fontSize:12,fontWeight:600}}><AccHeartIcon/> Partner</span>
                    <button onClick={function(){blockUser(other.id);}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 10px",background:"none",color:"#D1D5DB",border:"none",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} title="Block user"><AccXIcon/></button>
                  </div>
                </div>
              );
            })}

            {/* Blocked */}
            {blocked.length > 0 && (<div style={{marginTop:32}}>
              <h3 style={{fontSize:16,fontWeight:600,color:"#111827",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>Blocked Users</h3>
              {blocked.map(function(c){
                var other = c.requester_id===user.id ? c.receiver : c.requester;
                if (!other) return null;
                var initials = (other.full_name||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
                return (
                  <div key={c.id} style={{background:"white",borderRadius:12,border:"1px solid #E5E7EB",padding:"16px 20px",marginBottom:8,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",opacity:0.6}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:"#9CA3AF",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:"white"}}>{initials}</div>
                    <div style={{flex:1,minWidth:180}}>
                      <div style={{fontSize:14,fontWeight:600,color:"#111827"}}>{other.full_name||"Anonymous"}</div>
                      <div style={{fontSize:12,color:"#9CA3AF"}}>Blocked</div>
                    </div>
                    <button onClick={function(){deleteConnection(c.id);}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"6px 14px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Unblock</button>
                  </div>
                );
              })}
            </div>)}

            {/* Pending Sent */}
            {pendingSent.length > 0 && (<div style={{marginTop:32}}>
              <h3 style={{fontSize:16,fontWeight:600,color:"#111827",marginBottom:12,fontFamily:"'Playfair Display',serif"}}>Sent Requests</h3>
              {pendingSent.map(function(c){
                var other = c.receiver;
                var initials = (other.full_name||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
                return (
                  <div key={c.id} style={{background:"white",borderRadius:12,border:"1px solid #E5E7EB",padding:"16px 20px",marginBottom:8,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",opacity:0.7}}>
                    <div style={{width:40,height:40,borderRadius:"50%",background:"#9CA3AF",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:"white"}}>{initials}</div>
                    <div style={{flex:1,minWidth:180}}>
                      <div style={{fontSize:14,fontWeight:600,color:"#111827"}}>{other.full_name||"Anonymous"}</div>
                      <div style={{fontSize:12,color:"#6B7280"}}>{other.target_exam||"--"} | Exam: {formatDate(other.exam_date)}</div>
                    </div>
                    <span style={{fontSize:12,color:"#9CA3AF",fontWeight:600}}>Awaiting response...</span>
                  </div>
                );
              })}
            </div>)}
          </div>
        )}
      </div>
      {renderProfileModal()}
    </div>
  );
}

/* ── Forum Icons ── */
function FmUpIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>); }
function FmDownIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M19 12l-7 7-7-7"/></svg>); }
function FmCommentIcon() { return (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>); }
function FmPinIcon() { return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/></svg>); }
function FmBackIcon() { return (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>); }

/* ── Forum Page ── */
function ForumPage({ user, onLoginClick }) {
  var [categories, setCategories] = useState([]);
  var [posts, setPosts] = useState([]);
  var [selectedCategory, setSelectedCategory] = useState(null);
  var [selectedPost, setSelectedPost] = useState(null);
  var [comments, setComments] = useState([]);
  var [myVotes, setMyVotes] = useState({});
  var [loading, setLoading] = useState(true);
  var [showNewPost, setShowNewPost] = useState(false);
  var [postForm, setPostForm] = useState({ title:"", content:"", category_id:"" });
  var [newComment, setNewComment] = useState("");
  var [replyTo, setReplyTo] = useState(null);
  var [replyContent, setReplyContent] = useState("");
  var [submitting, setSubmitting] = useState(false);
  var [sortBy, setSortBy] = useState("newest");

  // Load categories
  useEffect(function() {
    async function load() {
      var { data } = await supabase.from("forum_categories").select("*").order("sort_order");
      setCategories(data || []);
      setLoading(false);
    }
    load();
  }, []);

  // Load posts
  useEffect(function() {
    async function loadPosts() {
      setLoading(true);
      var query = supabase.from("forum_posts").select("*, profiles:author_id(full_name, avatar_url), forum_categories(name, slug, icon)");
      if (selectedCategory) query = query.eq("category_id", selectedCategory);
      if (sortBy === "newest") query = query.order("is_pinned", { ascending: false }).order("created_at", { ascending: false });
      else if (sortBy === "popular") query = query.order("is_pinned", { ascending: false }).order("upvotes", { ascending: false });
      else if (sortBy === "discussed") query = query.order("is_pinned", { ascending: false }).order("comment_count", { ascending: false });
      var { data } = await query.limit(50);
      setPosts(data || []);
      setLoading(false);
    }
    if (!selectedPost) loadPosts();
  }, [selectedCategory, sortBy, selectedPost]);

  // Load my votes
  useEffect(function() {
    if (!user) return;
    async function loadVotes() {
      var { data } = await supabase.from("forum_votes").select("*").eq("user_id", user.id);
      var voteMap = {};
      (data || []).forEach(function(v) {
        if (v.post_id) voteMap["post_" + v.post_id] = v.vote_type;
        if (v.comment_id) voteMap["comment_" + v.comment_id] = v.vote_type;
      });
      setMyVotes(voteMap);
    }
    loadVotes();
  }, [user, selectedPost]);

  // Load comments for selected post
  useEffect(function() {
    if (!selectedPost) { setComments([]); return; }
    async function loadComments() {
      var { data } = await supabase.from("forum_comments").select("*, profiles:author_id(full_name, avatar_url)").eq("post_id", selectedPost.id).order("created_at", { ascending: true });
      setComments(data || []);
    }
    loadComments();
  }, [selectedPost]);

  // Vote on post or comment
  async function handleVote(type, id, direction) {
    if (!user) { onLoginClick(); return; }
    var key = type + "_" + id;
    var current = myVotes[key] || 0;
    if (current === direction) {
      // Remove vote
      await supabase.from("forum_votes").delete().eq("user_id", user.id).eq(type === "post" ? "post_id" : "comment_id", id);
      var newVotes = Object.assign({}, myVotes);
      delete newVotes[key];
      setMyVotes(newVotes);
      // Update count
      if (type === "post") {
        await supabase.from("forum_posts").update({ upvotes: (posts.find(function(p){return p.id===id;})||{upvotes:0}).upvotes - direction }).eq("id", id);
        setPosts(function(prev) { return prev.map(function(p) { return p.id === id ? Object.assign({}, p, { upvotes: p.upvotes - direction }) : p; }); });
        if (selectedPost && selectedPost.id === id) setSelectedPost(function(prev) { return Object.assign({}, prev, { upvotes: prev.upvotes - direction }); });
      } else {
        await supabase.from("forum_comments").update({ upvotes: (comments.find(function(c){return c.id===id;})||{upvotes:0}).upvotes - direction }).eq("id", id);
        setComments(function(prev) { return prev.map(function(c) { return c.id === id ? Object.assign({}, c, { upvotes: c.upvotes - direction }) : c; }); });
      }
    } else {
      var diff = current === 0 ? direction : direction * 2;
      await supabase.from("forum_votes").upsert({ user_id: user.id, [type === "post" ? "post_id" : "comment_id"]: id, vote_type: direction }, { onConflict: type === "post" ? "user_id,post_id" : "user_id,comment_id" });
      setMyVotes(Object.assign({}, myVotes, { [key]: direction }));
      if (type === "post") {
        var post = posts.find(function(p){return p.id===id;});
        if (post) {
          await supabase.from("forum_posts").update({ upvotes: post.upvotes + diff }).eq("id", id);
          setPosts(function(prev) { return prev.map(function(p) { return p.id === id ? Object.assign({}, p, { upvotes: p.upvotes + diff }) : p; }); });
          if (selectedPost && selectedPost.id === id) setSelectedPost(function(prev) { return Object.assign({}, prev, { upvotes: prev.upvotes + diff }); });
        }
      } else {
        var cmt = comments.find(function(c){return c.id===id;});
        if (cmt) {
          await supabase.from("forum_comments").update({ upvotes: cmt.upvotes + diff }).eq("id", id);
          setComments(function(prev) { return prev.map(function(c) { return c.id === id ? Object.assign({}, c, { upvotes: c.upvotes + diff }) : c; }); });
        }
      }
    }
  }

  // Create post
  async function handleCreatePost(e) {
    e.preventDefault();
    if (!user) { onLoginClick(); return; }
    if (!postForm.title.trim() || !postForm.content.trim() || !postForm.category_id) return;
    setSubmitting(true);
    var { data, error } = await supabase.from("forum_posts").insert([{ title: postForm.title.trim(), content: postForm.content.trim(), category_id: postForm.category_id, author_id: user.id }]).select("*, profiles:author_id(full_name, avatar_url), forum_categories(name, slug, icon)").single();
    if (error) { alert("Error creating post: " + error.message); }
    else { setPosts(function(prev) { return [data].concat(prev); }); setShowNewPost(false); setPostForm({ title:"", content:"", category_id:"" }); }
    setSubmitting(false);
  }

  // Add comment
  async function handleAddComment(e) {
    e.preventDefault();
    if (!user) { onLoginClick(); return; }
    if (!newComment.trim() || !selectedPost) return;
    setSubmitting(true);
    var { data, error } = await supabase.from("forum_comments").insert([{ post_id: selectedPost.id, author_id: user.id, content: newComment.trim(), parent_id: null }]).select("*, profiles:author_id(full_name, avatar_url)").single();
    if (error) { alert("Error adding comment: " + error.message); }
    else {
      setComments(function(prev) { return prev.concat([data]); });
      setNewComment("");
      await supabase.from("forum_posts").update({ comment_count: (selectedPost.comment_count || 0) + 1 }).eq("id", selectedPost.id);
      setSelectedPost(function(prev) { return Object.assign({}, prev, { comment_count: (prev.comment_count || 0) + 1 }); });
    }
    setSubmitting(false);
  }

  // Reply to comment
  async function handleReply(e) {
    e.preventDefault();
    if (!user || !replyContent.trim() || !replyTo || !selectedPost) return;
    setSubmitting(true);
    var { data, error } = await supabase.from("forum_comments").insert([{ post_id: selectedPost.id, author_id: user.id, content: replyContent.trim(), parent_id: replyTo }]).select("*, profiles:author_id(full_name, avatar_url)").single();
    if (error) { alert("Error adding reply: " + error.message); }
    else {
      setComments(function(prev) { return prev.concat([data]); });
      setReplyTo(null);
      setReplyContent("");
      await supabase.from("forum_posts").update({ comment_count: (selectedPost.comment_count || 0) + 1 }).eq("id", selectedPost.id);
      setSelectedPost(function(prev) { return Object.assign({}, prev, { comment_count: (prev.comment_count || 0) + 1 }); });
    }
    setSubmitting(false);
  }

  function timeAgo(dateStr) {
    var diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
    if (diff < 60) return "just now";
    if (diff < 3600) return Math.floor(diff / 60) + "m ago";
    if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
    if (diff < 604800) return Math.floor(diff / 86400) + "d ago";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  var fmInputStyle = { width:"100%", padding:"12px 16px", border:"1px solid #E5E7EB", borderRadius:10, fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none", background:"#FAFAFA", boxSizing:"border-box" };

  // Post detail view
  if (selectedPost) {
    var topComments = comments.filter(function(c) { return !c.parent_id; });
    return (
      <div style={{paddingTop:120,minHeight:"100vh",background:"#FAFAFA"}}>
        <div style={{maxWidth:800,margin:"0 auto",padding:"0 20px 60px"}}>
          <button onClick={function(){setSelectedPost(null);}} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#6B7280",fontSize:14,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",padding:0,marginBottom:20}}><FmBackIcon/> Back to Forum</button>

          {/* Post */}
          <div style={{background:"white",borderRadius:16,border:"1px solid #E5E7EB",padding:28,marginBottom:24}}>
            <div style={{display:"flex",gap:16}}>
              {/* Vote */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,flexShrink:0}}>
                <button onClick={function(){handleVote("post",selectedPost.id,1);}} style={{background:"none",border:"none",cursor:"pointer",color:myVotes["post_"+selectedPost.id]===1?RED:"#9CA3AF",padding:2}}><FmUpIcon/></button>
                <span style={{fontSize:16,fontWeight:700,color:myVotes["post_"+selectedPost.id]?RED:"#374151"}}>{selectedPost.upvotes||0}</span>
                <button onClick={function(){handleVote("post",selectedPost.id,-1);}} style={{background:"none",border:"none",cursor:"pointer",color:myVotes["post_"+selectedPost.id]===-1?"#2563EB":"#9CA3AF",padding:2}}><FmDownIcon/></button>
              </div>
              <div style={{flex:1,minWidth:0}}>
                {selectedPost.is_pinned && (<span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:600,color:RED,marginBottom:8}}><FmPinIcon/> PINNED</span>)}
                <h1 style={{fontSize:24,fontWeight:700,color:"#111827",margin:"0 0 8px",fontFamily:"'Playfair Display',serif",lineHeight:1.3}}>{selectedPost.title}</h1>
                <div style={{fontSize:13,color:"#9CA3AF",marginBottom:16}}>
                  {(selectedPost.profiles?selectedPost.profiles.full_name:"Anonymous") + " in " + (selectedPost.forum_categories?selectedPost.forum_categories.icon+" "+selectedPost.forum_categories.name:"General") + " - " + timeAgo(selectedPost.created_at)}
                </div>
                <div style={{fontSize:15,color:"#374151",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{selectedPost.content}</div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div style={{marginBottom:16}}>
            <h3 style={{fontSize:16,fontWeight:600,color:"#111827",marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>{(selectedPost.comment_count||0) + " Comment" + ((selectedPost.comment_count||0)!==1?"s":"")}</h3>

            {/* New comment */}
            {user ? (
              <form onSubmit={handleAddComment} style={{marginBottom:24,display:"flex",gap:8}}>
                <input type="text" style={{...fmInputStyle,borderRadius:24}} placeholder="Add a comment..." value={newComment} onChange={function(e){setNewComment(e.target.value);}} />
                <button type="submit" disabled={submitting||!newComment.trim()} style={{padding:"10px 20px",background:newComment.trim()?RED:"#E5E7EB",color:"white",border:"none",borderRadius:24,fontSize:13,fontWeight:600,cursor:newComment.trim()?"pointer":"default",fontFamily:"'DM Sans',sans-serif",flexShrink:0}}>Post</button>
              </form>
            ) : (
              <div style={{padding:"16px 20px",background:"#fdf0f0",borderRadius:12,marginBottom:24,fontSize:13,color:RED}}>
                <button onClick={onLoginClick} style={{background:"none",border:"none",color:RED,fontWeight:600,cursor:"pointer",textDecoration:"underline",fontFamily:"'DM Sans',sans-serif",fontSize:13,padding:0}}>Sign in</button> to join the discussion.
              </div>
            )}

            {/* Comment list */}
            {topComments.map(function(c) {
              var replies = comments.filter(function(r) { return r.parent_id === c.id; });
              return (
                <div key={c.id} style={{marginBottom:16}}>
                  <div style={{background:"white",borderRadius:12,border:"1px solid #E5E7EB",padding:"16px 20px"}}>
                    <div style={{display:"flex",gap:12}}>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,flexShrink:0}}>
                        <button onClick={function(){handleVote("comment",c.id,1);}} style={{background:"none",border:"none",cursor:"pointer",color:myVotes["comment_"+c.id]===1?RED:"#D1D5DB",padding:1}}><FmUpIcon/></button>
                        <span style={{fontSize:13,fontWeight:700,color:myVotes["comment_"+c.id]?RED:"#6B7280"}}>{c.upvotes||0}</span>
                        <button onClick={function(){handleVote("comment",c.id,-1);}} style={{background:"none",border:"none",cursor:"pointer",color:myVotes["comment_"+c.id]===-1?"#2563EB":"#D1D5DB",padding:1}}><FmDownIcon/></button>
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:12,color:"#9CA3AF",marginBottom:4}}>{(c.profiles?c.profiles.full_name:"Anonymous") + " - " + timeAgo(c.created_at)}</div>
                        <div style={{fontSize:14,color:"#374151",lineHeight:1.6}}>{c.content}</div>
                        {user && (<button onClick={function(){setReplyTo(replyTo===c.id?null:c.id);setReplyContent("");}} style={{background:"none",border:"none",color:"#9CA3AF",fontSize:12,fontWeight:600,cursor:"pointer",padding:"4px 0",fontFamily:"'DM Sans',sans-serif"}}>{replyTo===c.id?"Cancel":"Reply"}</button>)}
                      </div>
                    </div>
                    {replyTo===c.id && (
                      <form onSubmit={handleReply} style={{marginTop:12,marginLeft:40,display:"flex",gap:8}}>
                        <input type="text" style={{...fmInputStyle,borderRadius:20,fontSize:13,padding:"8px 14px"}} placeholder="Write a reply..." value={replyContent} onChange={function(e){setReplyContent(e.target.value);}} />
                        <button type="submit" disabled={submitting||!replyContent.trim()} style={{padding:"8px 16px",background:replyContent.trim()?RED:"#E5E7EB",color:"white",border:"none",borderRadius:20,fontSize:12,fontWeight:600,cursor:replyContent.trim()?"pointer":"default",flexShrink:0}}>Reply</button>
                      </form>
                    )}
                  </div>
                  {/* Replies */}
                  {replies.length>0 && (
                    <div style={{marginLeft:40,marginTop:8,display:"flex",flexDirection:"column",gap:8}}>
                      {replies.map(function(r) {
                        return (
                          <div key={r.id} style={{background:"#F9FAFB",borderRadius:10,border:"1px solid #F3F4F6",padding:"12px 16px"}}>
                            <div style={{fontSize:12,color:"#9CA3AF",marginBottom:4}}>{(r.profiles?r.profiles.full_name:"Anonymous") + " - " + timeAgo(r.created_at)}</div>
                            <div style={{fontSize:13,color:"#374151",lineHeight:1.5}}>{r.content}</div>
                          </div>
                        );
                      })}
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

  // Forum listing view
  return (
    <div style={{paddingTop:120,minHeight:"100vh",background:"#FAFAFA"}}>
      <div style={{maxWidth:900,margin:"0 auto",padding:"0 20px 60px"}}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16,marginBottom:24}}>
          <div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,4vw,36px)",fontWeight:700,color:"#111827",margin:0}}>Community Forum</h1>
            <p style={{fontSize:15,color:"#6B7280",marginTop:6,marginBottom:0,fontFamily:"'DM Sans',sans-serif"}}>Ask questions, share experiences, help each other out.</p>
          </div>
          {user && (<button onClick={function(){setShowNewPost(true);}} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"12px 24px",background:RED,color:"white",border:"none",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>+ New Post</button>)}
        </div>

        {/* Category Pills */}
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
          <button onClick={function(){setSelectedCategory(null);}} style={{padding:"8px 16px",borderRadius:20,border:"1px solid "+(selectedCategory===null?RED:"#E5E7EB"),background:selectedCategory===null?RED:"white",color:selectedCategory===null?"white":"#6B7280",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>All</button>
          {categories.map(function(cat) {
            var isActive = selectedCategory === cat.id;
            return (<button key={cat.id} onClick={function(){setSelectedCategory(isActive?null:cat.id);}} style={{padding:"8px 16px",borderRadius:20,border:"1px solid "+(isActive?RED:"#E5E7EB"),background:isActive?RED:"white",color:isActive?"white":"#6B7280",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{cat.icon + " " + cat.name}</button>);
          })}
        </div>

        {/* Sort */}
        <div style={{display:"flex",gap:8,marginBottom:20}}>
          {[{key:"newest",label:"Newest"},{key:"popular",label:"Most Upvoted"},{key:"discussed",label:"Most Discussed"}].map(function(s) {
            return (<button key={s.key} onClick={function(){setSortBy(s.key);}} style={{padding:"6px 14px",borderRadius:8,border:"none",background:sortBy===s.key?"#111827":"#F3F4F6",color:sortBy===s.key?"white":"#6B7280",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{s.label}</button>);
          })}
        </div>

        {/* Loading */}
        {loading && (<div style={{textAlign:"center",padding:60,color:"#9CA3AF"}}>Loading...</div>)}

        {/* Posts */}
        {!loading && posts.length===0 && (<div style={{textAlign:"center",padding:"60px 20px",color:"#9CA3AF"}}><div style={{fontSize:40,marginBottom:12}}>&#128490;</div><p style={{fontSize:14}}>No posts yet. Be the first to start a discussion.</p></div>)}

        {!loading && posts.map(function(post) {
          var authorName = post.profiles ? post.profiles.full_name : "Anonymous";
          var catName = post.forum_categories ? post.forum_categories.icon + " " + post.forum_categories.name : "";
          var initials = (authorName||"A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
          var colors = ["#ec8283","#2563EB","#059669","#7C3AED","#D97706","#DB2777"];
          var color = colors[(authorName||"A").length % colors.length];
          return (
            <div key={post.id} onClick={function(){setSelectedPost(post);}} style={{background:"white",borderRadius:12,border:"1px solid #E5E7EB",padding:"16px 20px",marginBottom:10,cursor:"pointer",display:"flex",gap:14,transition:"box-shadow 0.15s"}}>
              {/* Vote */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0,flexShrink:0,minWidth:36}} onClick={function(e){e.stopPropagation();}}>
                <button onClick={function(){handleVote("post",post.id,1);}} style={{background:"none",border:"none",cursor:"pointer",color:myVotes["post_"+post.id]===1?RED:"#D1D5DB",padding:1}}><FmUpIcon/></button>
                <span style={{fontSize:14,fontWeight:700,color:myVotes["post_"+post.id]?RED:"#6B7280"}}>{post.upvotes||0}</span>
                <button onClick={function(){handleVote("post",post.id,-1);}} style={{background:"none",border:"none",cursor:"pointer",color:myVotes["post_"+post.id]===-1?"#2563EB":"#D1D5DB",padding:1}}><FmDownIcon/></button>
              </div>
              {/* Content */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                  {post.is_pinned && (<span style={{display:"inline-flex",alignItems:"center",gap:3,fontSize:10,fontWeight:700,color:RED}}><FmPinIcon/> PINNED</span>)}
                  {catName && (<span style={{fontSize:11,color:"#9CA3AF",fontWeight:500}}>{catName}</span>)}
                </div>
                <h3 style={{fontSize:16,fontWeight:600,color:"#111827",margin:"0 0 6px",lineHeight:1.3,fontFamily:"'DM Sans',sans-serif"}}>{post.title}</h3>
                <p style={{fontSize:13,color:"#6B7280",margin:0,lineHeight:1.5,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{post.content}</p>
                <div style={{display:"flex",alignItems:"center",gap:12,marginTop:10,fontSize:12,color:"#9CA3AF"}}>
                  <div style={{display:"flex",alignItems:"center",gap:4}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"white"}}>{initials}</div>
                    {authorName}
                  </div>
                  <span>{timeAgo(post.created_at)}</span>
                  <span style={{display:"inline-flex",alignItems:"center",gap:4}}><FmCommentIcon/> {post.comment_count||0}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div onClick={function(){setShowNewPost(false);}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1100,padding:20}}>
          <div onClick={function(e){e.stopPropagation();}} style={{background:"white",borderRadius:20,padding:36,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto",boxShadow:"0 25px 60px rgba(0,0,0,0.15)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24}}>
              <h2 style={{fontSize:22,fontWeight:700,color:"#111827",margin:0,fontFamily:"'Playfair Display',serif"}}>New Discussion</h2>
              <button onClick={function(){setShowNewPost(false);}} style={{background:"none",border:"none",fontSize:24,color:"#9CA3AF",cursor:"pointer"}}>&#10005;</button>
            </div>
            <form onSubmit={handleCreatePost}>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Category *</label>
                <select style={fmInputStyle} value={postForm.category_id} onChange={function(e){setPostForm(Object.assign({},postForm,{category_id:e.target.value}));}} required>
                  <option value="">Select a category...</option>
                  {categories.map(function(cat) { return (<option key={cat.id} value={cat.id}>{cat.icon + " " + cat.name}</option>); })}
                </select>
              </div>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Title *</label>
                <input type="text" style={fmInputStyle} placeholder="What do you want to discuss?" value={postForm.title} onChange={function(e){setPostForm(Object.assign({},postForm,{title:e.target.value}));}} required />
              </div>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:13,fontWeight:600,color:"#374151",marginBottom:6,display:"block"}}>Content *</label>
                <textarea style={{...fmInputStyle,resize:"vertical"}} rows={6} placeholder="Share your thoughts, questions, or experiences..." value={postForm.content} onChange={function(e){setPostForm(Object.assign({},postForm,{content:e.target.value}));}} required />
              </div>
              <button type="submit" disabled={submitting||!postForm.title.trim()||!postForm.content.trim()||!postForm.category_id} style={{width:"100%",padding:14,background:submitting?"#D1D5DB":RED,color:"white",border:"none",borderRadius:10,fontSize:15,fontWeight:600,cursor:submitting?"not-allowed":"pointer",fontFamily:"'DM Sans',sans-serif"}}>{submitting?"Posting...":"Post Discussion"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Chat Panel ── */
function ChatPanel({ user, isOpen, onClose, initialDmUserId, initialDmUserName }) {
  var [rooms, setRooms] = useState([]);
  var [activeRoom, setActiveRoom] = useState(null);
  var [activeRoomName, setActiveRoomName] = useState("");
  var [messages, setMessages] = useState([]);
  var [newMessage, setNewMessage] = useState("");
  var [sending, setSending] = useState(false);
  var [view, setView] = useState("rooms");
  var [showNewGroup, setShowNewGroup] = useState(false);
  var [groupName, setGroupName] = useState("");
  var [groupMembers, setGroupMembers] = useState([]);
  var [contacts, setContacts] = useState([]);
  var [loadingRooms, setLoadingRooms] = useState(true);
  var [chatSearch, setChatSearch] = useState("");
  var [showEditMembers, setShowEditMembers] = useState(false);
  var [editRoomId, setEditRoomId] = useState(null);
  var [editMembers, setEditMembers] = useState([]);
  var [editMemberProfiles, setEditMemberProfiles] = useState([]);
  var [addMemberSearch, setAddMemberSearch] = useState("");
  var [addMemberSelections, setAddMemberSelections] = useState([]);
  var [showAddMember, setShowAddMember] = useState(false);
  var messagesEndRef = useRef(null);
  var subscriptionRef = useRef(null);

  // Fetch accepted connections as contacts for group creation
  useEffect(function() {
    if (!user || !isOpen) return;
    async function loadContacts() {
      var { data } = await supabase.from("connections").select("*, requester:profiles!connections_requester_id_profiles_fkey(id, full_name), receiver:profiles!connections_receiver_id_profiles_fkey(id, full_name)").or("requester_id.eq." + user.id + ",receiver_id.eq." + user.id).eq("status", "accepted");
      if (data) {
        var contactList = data.map(function(c) {
          var other = c.requester_id === user.id ? c.receiver : c.requester;
          return other;
        }).filter(Boolean);
        setContacts(contactList);
      }
    }
    loadContacts();
  }, [user, isOpen]);

  // Load rooms
  useEffect(function() {
    if (!user || !isOpen) return;
    async function loadRooms() {
      setLoadingRooms(true);
      var { data: memberships } = await supabase.from("chat_members").select("room_id, chat_rooms(id, name, room_type, max_members, created_at)").eq("user_id", user.id);
      if (memberships) {
        var roomList = memberships.map(function(m) { return m.chat_rooms; }).filter(Boolean);
        var enriched = [];
        for (var i = 0; i < roomList.length; i++) {
          var r = roomList[i];
          if (r.room_type === "direct") {
            var { data: members } = await supabase.from("chat_members").select("user_id").eq("room_id", r.id).neq("user_id", user.id);
            var otherUserId = (members && members[0]) ? members[0].user_id : null;
            r.other_user_id = otherUserId;
            if (otherUserId) {
              var { data: profile } = await supabase.from("profiles").select("full_name").eq("id", otherUserId).single();
              r.display_name = (profile && profile.full_name) ? profile.full_name : "Chat";
            } else {
              r.display_name = "Chat";
            }
          } else {
            r.display_name = r.name || "Study Group";
          }
          // Fetch last message for preview
          var { data: lastMsgs } = await supabase.from("chat_messages").select("content, created_at, sender_id").eq("room_id", r.id).order("created_at", { ascending: false }).limit(1);
          if (lastMsgs && lastMsgs[0]) {
            r.last_message = lastMsgs[0].content;
            r.last_message_time = lastMsgs[0].created_at;
            r.last_message_sender = lastMsgs[0].sender_id;
          } else {
            r.last_message = null;
            r.last_message_time = null;
          }
          enriched.push(r);
        }
        // Sort by last message time (most recent first)
        enriched.sort(function(a, b) {
          var ta = a.last_message_time ? new Date(a.last_message_time).getTime() : 0;
          var tb = b.last_message_time ? new Date(b.last_message_time).getTime() : 0;
          return tb - ta;
        });
        setRooms(enriched);
      }
      setLoadingRooms(false);
    }
    loadRooms();
  }, [user, isOpen]);

  // Handle initial DM open
  var dmProcessingRef = useRef(false);
  useEffect(function() {
    if (!user || !isOpen || !initialDmUserId || dmProcessingRef.current) return;
    dmProcessingRef.current = true;
    async function openDm() {
      try {
        // Check if DM room already exists by querying DB directly
        var { data: myRooms } = await supabase.from("chat_members").select("room_id").eq("user_id", user.id);
        var { data: theirRooms } = await supabase.from("chat_members").select("room_id").eq("user_id", initialDmUserId);
        if (myRooms && theirRooms) {
          var myRoomIds = myRooms.map(function(r) { return r.room_id; });
          var sharedRoomIds = theirRooms.filter(function(r) { return myRoomIds.indexOf(r.room_id) !== -1; }).map(function(r) { return r.room_id; });
          if (sharedRoomIds.length > 0) {
            var { data: directRooms } = await supabase.from("chat_rooms").select("id, name, room_type").in("id", sharedRoomIds).eq("room_type", "direct");
            if (directRooms && directRooms.length > 0) {
              setActiveRoom(directRooms[0].id);
              setActiveRoomName(initialDmUserName || "Chat");
              setView("chat");
              dmProcessingRef.current = false;
              return;
            }
          }
        }
        // Create new DM room only if none exists
        var { data: room, error } = await supabase.from("chat_rooms").insert([{ name: null, room_type: "direct", created_by: user.id }]).select().single();
        if (error || !room) { dmProcessingRef.current = false; return; }
        await supabase.from("chat_members").insert([{ room_id: room.id, user_id: user.id }, { room_id: room.id, user_id: initialDmUserId }]);
        room.display_name = initialDmUserName || "Chat";
        room.other_user_id = initialDmUserId;
        setRooms(function(prev) { return [room].concat(prev); });
        setActiveRoom(room.id);
        setActiveRoomName(room.display_name);
        setView("chat");
      } catch(err) {
        console.error("openDm error:", err);
      }
      dmProcessingRef.current = false;
    }
    openDm();
  }, [user, isOpen, initialDmUserId]);

  // Profile name cache
  var [profileNames, setProfileNames] = useState({});

  async function enrichMessagesWithNames(msgs) {
    var uniqueIds = [];
    msgs.forEach(function(m) {
      if (m.sender_id && !profileNames[m.sender_id] && uniqueIds.indexOf(m.sender_id) === -1) {
        uniqueIds.push(m.sender_id);
      }
    });
    if (uniqueIds.length > 0) {
      var { data } = await supabase.from("profiles").select("id, full_name").in("id", uniqueIds);
      if (data) {
        var newNames = Object.assign({}, profileNames);
        data.forEach(function(p) { newNames[p.id] = p.full_name || "Anonymous"; });
        setProfileNames(newNames);
      }
    }
  }

  // Load messages for active room
  useEffect(function() {
    if (!activeRoom) return;
    async function loadMessages() {
      var { data } = await supabase.from("chat_messages").select("*").eq("room_id", activeRoom).order("created_at", { ascending: true }).limit(100);
      if (data) {
        setMessages(data);
        enrichMessagesWithNames(data);
      }
      setTimeout(function() { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); }, 100);
    }
    loadMessages();

    // Real-time subscription
    if (subscriptionRef.current) { supabase.removeChannel(subscriptionRef.current); }
    var channel = supabase.channel("room-" + activeRoom).on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: "room_id=eq." + activeRoom }, function(payload) {
      var newMsg = payload.new;
      // Fetch sender name
      supabase.from("profiles").select("full_name").eq("id", newMsg.sender_id).single().then(function(res) {
        if (res.data) {
          setProfileNames(function(prev) {
            var updated = Object.assign({}, prev);
            updated[newMsg.sender_id] = res.data.full_name || "Anonymous";
            return updated;
          });
        }
        setMessages(function(prev) {
          if (prev.find(function(m) { return m.id === newMsg.id; })) return prev;
          return prev.concat([newMsg]);
        });
        setTimeout(function() { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); }, 100);
      });
    }).subscribe();
    subscriptionRef.current = channel;

    return function() { if (subscriptionRef.current) supabase.removeChannel(subscriptionRef.current); };
  }, [activeRoom]);

  // Send message
  async function handleSend(e) {
    e.preventDefault();
    if (!newMessage.trim() || !activeRoom || !user) return;
    var msgText = newMessage.trim();
    setNewMessage("");
    setSending(true);

    // Insert the message
    var { error } = await supabase.from("chat_messages").insert([{ room_id: activeRoom, sender_id: user.id, content: msgText }]);
    if (error) {
      console.error("Chat insert error:", error);
      alert("Error sending message: " + error.message);
      setSending(false);
      return;
    }

    // Wait a tiny bit for DB commit then reload
    await new Promise(function(r) { setTimeout(r, 300); });
    var { data: reloaded, error: reloadErr } = await supabase.from("chat_messages").select("*").eq("room_id", activeRoom).order("created_at", { ascending: true }).limit(100);
    console.log("Chat reload:", reloaded ? reloaded.length + " messages" : "null", reloadErr);
    if (reloaded && reloaded.length > 0) {
      setMessages(reloaded);
      enrichMessagesWithNames(reloaded);
      setTimeout(function() { if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" }); }, 50);
    }
    setSending(false);
  }

  // Create study group
  async function handleCreateGroup(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!groupName.trim() || !user) return;
    if (groupMembers.length === 0) { alert("Please select at least one member for the group."); return; }
    if (groupMembers.length > 4) { alert("Study groups can have a maximum of 5 members (including you)."); return; }
    var { data: room, error } = await supabase.from("chat_rooms").insert([{ name: groupName.trim(), room_type: "group", created_by: user.id }]).select().single();
    if (error || !room) { alert("Error creating group: " + (error ? error.message : "Unknown error")); return; }
    // Add creator and selected members
    var memberInserts = [{ room_id: room.id, user_id: user.id }];
    groupMembers.forEach(function(mid) { memberInserts.push({ room_id: room.id, user_id: mid }); });
    await supabase.from("chat_members").insert(memberInserts);
    room.display_name = room.name;
    setRooms(function(prev) { return [room].concat(prev); });
    setGroupName("");
    setGroupMembers([]);
    setShowNewGroup(false);
    setActiveRoom(room.id);
    setActiveRoomName(room.display_name);
    setView("chat");
  }

  function toggleGroupMember(memberId) {
    setGroupMembers(function(prev) {
      if (prev.indexOf(memberId) !== -1) {
        return prev.filter(function(id) { return id !== memberId; });
      }
      if (prev.length >= 4) { alert("Maximum 4 additional members (5 total including you)."); return prev; }
      return prev.concat([memberId]);
    });
  }

  // Delete/clear chat
  async function deleteChat(roomId, e) {
    if (e) e.stopPropagation();
    var room = rooms.find(function(r) { return r.id === roomId; });
    if (!room) return;

    if (room.room_type === "group") {
      // Group: leave the room
      if (!confirm("Leave this group? You will no longer see messages from this group.")) return;
      await supabase.from("chat_members").delete().eq("room_id", roomId).eq("user_id", user.id);
      var { data: remaining } = await supabase.from("chat_members").select("user_id").eq("room_id", roomId);
      if (!remaining || remaining.length === 0) {
        await supabase.from("chat_messages").delete().eq("room_id", roomId);
        await supabase.from("chat_rooms").delete().eq("id", roomId);
      }
    } else {
      // DM: clear all messages but keep the room and memberships
      if (!confirm("Clear this conversation? All messages will be deleted for both users.")) return;
      await supabase.from("chat_messages").delete().eq("room_id", roomId);
    }
    setRooms(function(prev) {
      if (room.room_type === "group") {
        return prev.filter(function(r) { return r.id !== roomId; });
      } else {
        return prev.map(function(r) {
          if (r.id === roomId) { r.last_message = null; r.last_message_time = null; }
          return r;
        });
      }
    });
    if (activeRoom === roomId) { setMessages([]); if (room.room_type === "group") { setActiveRoom(null); setView("rooms"); } }
  }

  // Join group
  async function joinGroup(roomId) {
    await supabase.from("chat_members").insert([{ room_id: roomId, user_id: user.id }]);
    setActiveRoom(roomId);
    var r = rooms.find(function(rm) { return rm.id === roomId; });
    setActiveRoomName(r ? r.display_name : "Group");
    setView("chat");
  }

  if (!isOpen || !user) return null;

  var chatInputStyle = { flex:1, padding:"12px 16px", border:"1px solid #E5E7EB", borderRadius:24, fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none", background:"#F9FAFB" };

  return (
    <div style={{position:"fixed",right:0,top:0,bottom:0,width:"min(420px,100vw)",background:"white",boxShadow:"-4px 0 30px rgba(0,0,0,0.1)",zIndex:1200,display:"flex",flexDirection:"column",fontFamily:"'DM Sans',sans-serif"}}>
      {/* Header */}
      <div style={{padding:"16px 20px",borderBottom:"1px solid #E5E7EB",display:"flex",alignItems:"center",gap:12,background:"white",flexShrink:0}}>
        {view==="chat" && (<button onClick={function(){setView("rooms");setActiveRoom(null);setShowEditMembers(false);}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#6B7280",padding:0}}>&#8592;</button>)}
        <div style={{flex:1}}>
          <div style={{fontSize:16,fontWeight:700,color:"#111827"}}>{view==="chat"?activeRoomName:"Messages"}</div>
          {view==="rooms" && (<div style={{fontSize:12,color:"#9CA3AF"}}>{rooms.length + " conversation" + (rooms.length !== 1 ? "s" : "")}</div>)}
        </div>
        {view==="chat" && rooms.find(function(rm){return rm.id===activeRoom && rm.room_type==="group";}) && (
          <button onClick={async function(){
            if (showEditMembers) {
              setShowEditMembers(false);
              setShowAddMember(false);
              setAddMemberSelections([]);
              setAddMemberSearch("");
              return;
            }
            setShowEditMembers(true);
            if (activeRoom) {
              var { data: memberData } = await supabase.from("chat_members").select("user_id").eq("room_id", activeRoom);
              var memberIds = (memberData || []).map(function(m){return m.user_id;});
              setEditMembers(memberIds);
              setEditRoomId(activeRoom);
              // Fetch profile names for members
              if (memberIds.length > 0) {
                var { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", memberIds);
                setEditMemberProfiles(profiles || []);
              }
            }
          }} style={{background:"none",border:"none",fontSize:13,color:RED,cursor:"pointer",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>{showEditMembers ? "Done" : "Members"}</button>
        )}
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#9CA3AF",padding:0}}>&#10005;</button>
      </div>

      {/* Edit Members Panel */}
      {showEditMembers && view==="chat" && (
        <div style={{borderBottom:"1px solid #F3F4F6",background:"#F9FAFB",maxHeight:300,overflowY:"auto"}}>
          {/* Current Members */}
          <div style={{padding:"12px 16px 8px"}}>
            <div style={{fontSize:12,fontWeight:600,color:"#6B7280",marginBottom:8}}>{"Current members (" + editMembers.length + "/5)"}</div>
            {editMemberProfiles.filter(function(p){return editMembers.indexOf(p.id)!==-1;}).map(function(p) {
              var isYou = p.id === user.id;
              var initials = (p.full_name || "A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
              return (
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 10px",borderRadius:8,marginBottom:4,background:"white",border:"1px solid #E5E7EB"}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:RED,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"white"}}>{initials}</div>
                  <span style={{fontSize:13,fontWeight:500,color:"#111827",flex:1}}>{p.full_name || "Anonymous"}{isYou?" (You)":""}</span>
                  {!isYou && (<button onClick={async function(){
                    if (editMembers.length <= 2) { alert("A group needs at least 2 members."); return; }
                    await supabase.from("chat_members").delete().eq("room_id", editRoomId).eq("user_id", p.id);
                    setEditMembers(function(prev){return prev.filter(function(id){return id!==p.id;});});
                    setEditMemberProfiles(function(prev){return prev.filter(function(pr){return pr.id!==p.id;});});
                  }} style={{background:"none",border:"none",color:"#D1D5DB",cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>Remove</button>)}
                </div>
              );
            })}
          </div>

          {/* Add Members */}
          <div style={{padding:"4px 16px 12px"}}>
            {!showAddMember ? (
              <button onClick={function(){setShowAddMember(true);setAddMemberSearch("");setAddMemberSelections([]);}} style={{width:"100%",padding:"8px",background:"white",color:RED,border:"1px dashed "+RED,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>+ Add Member</button>
            ) : (
              <div style={{background:"white",borderRadius:10,border:"1px solid #E5E7EB",padding:12}}>
                <input type="text" placeholder="Search connections..." value={addMemberSearch} onChange={function(e){setAddMemberSearch(e.target.value);}} style={{width:"100%",padding:"8px 12px",border:"1px solid #E5E7EB",borderRadius:8,fontSize:12,fontFamily:"'DM Sans',sans-serif",outline:"none",background:"#F9FAFB",boxSizing:"border-box",marginBottom:8}} />
                <div style={{maxHeight:120,overflowY:"auto"}}>
                  {contacts.filter(function(c){
                    if (editMembers.indexOf(c.id) !== -1) return false;
                    if (addMemberSearch.trim() && (c.full_name||"").toLowerCase().indexOf(addMemberSearch.toLowerCase()) === -1) return false;
                    return true;
                  }).map(function(c) {
                    var selected = addMemberSelections.indexOf(c.id) !== -1;
                    var initials = (c.full_name || "A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
                    return (
                      <div key={c.id} onClick={function(){
                        setAddMemberSelections(function(prev){
                          if (prev.indexOf(c.id) !== -1) return prev.filter(function(id){return id!==c.id;});
                          if (editMembers.length + prev.length >= 5) { alert("Maximum 5 members per group."); return prev; }
                          return prev.concat([c.id]);
                        });
                      }} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:6,cursor:"pointer",background:selected?"#fdf0f0":"transparent",marginBottom:2}}>
                        <div style={{width:24,height:24,borderRadius:"50%",background:selected?RED:"#D1D5DB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"white"}}>{selected?"\u2713":initials}</div>
                        <span style={{fontSize:12,fontWeight:selected?600:400,color:selected?"#111827":"#6B7280"}}>{c.full_name || "Anonymous"}</span>
                      </div>
                    );
                  })}
                  {contacts.filter(function(c){ return editMembers.indexOf(c.id)===-1 && (!addMemberSearch.trim()||(c.full_name||"").toLowerCase().indexOf(addMemberSearch.toLowerCase())!==-1); }).length === 0 && (
                    <div style={{fontSize:12,color:"#9CA3AF",padding:"8px 0",textAlign:"center"}}>No connections to add</div>
                  )}
                </div>
                <div style={{display:"flex",gap:8,marginTop:8}}>
                  <button onClick={function(){setShowAddMember(false);setAddMemberSelections([]);setAddMemberSearch("");}} style={{flex:1,padding:"8px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Cancel</button>
                  <button onClick={async function(){
                    if (addMemberSelections.length === 0) return;
                    var inserts = addMemberSelections.map(function(uid){return {room_id:editRoomId,user_id:uid};});
                    await supabase.from("chat_members").insert(inserts);
                    // Fetch names for new members
                    var { data: newProfiles } = await supabase.from("profiles").select("id, full_name").in("id", addMemberSelections);
                    setEditMembers(function(prev){return prev.concat(addMemberSelections);});
                    setEditMemberProfiles(function(prev){return prev.concat(newProfiles||[]);});
                    setAddMemberSelections([]);
                    setAddMemberSearch("");
                    setShowAddMember(false);
                  }} disabled={addMemberSelections.length===0} style={{flex:1,padding:"8px",background:addMemberSelections.length>0?RED:"#E5E7EB",color:"white",border:"none",borderRadius:8,fontSize:12,fontWeight:600,cursor:addMemberSelections.length>0?"pointer":"default",fontFamily:"'DM Sans',sans-serif"}}>{"Add (" + addMemberSelections.length + ")"}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rooms List */}
      {view==="rooms" && (
        <div style={{flex:1,overflowY:"auto"}}>
          {/* Search */}
          <div style={{padding:"12px 16px 0"}}>
            <input type="text" placeholder="Search conversations..." value={chatSearch} onChange={function(e){setChatSearch(e.target.value);}} style={{width:"100%",padding:"10px 14px",border:"1px solid #E5E7EB",borderRadius:10,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",background:"#F9FAFB",boxSizing:"border-box"}} />
          </div>
          <div style={{padding:"10px 16px",display:"flex",gap:8}}>
            <button onClick={function(){setShowNewGroup(true);}} style={{flex:1,padding:"10px",background:"#fdf0f0",color:RED,border:"1px solid #f9c9c9",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>+ New Study Group</button>
          </div>

          {showNewGroup && (
            <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6"}}>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                <input type="text" placeholder="Group name..." value={groupName} onChange={function(e){setGroupName(e.target.value);}} style={{...chatInputStyle,borderRadius:10,flex:1}} />
                <button onClick={function(){setShowNewGroup(false);setGroupName("");setGroupMembers([]);}} style={{background:"none",border:"none",color:"#9CA3AF",cursor:"pointer",fontSize:18}}>&#10005;</button>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:"#6B7280",marginBottom:8}}>{"Add members (" + groupMembers.length + "/4):"}</div>
              {contacts.length === 0 && (<div style={{fontSize:12,color:"#9CA3AF",padding:"8px 0"}}>No connections yet. Connect with study partners first.</div>)}
              <div style={{maxHeight:150,overflowY:"auto"}}>
                {contacts.map(function(c) {
                  var selected = groupMembers.indexOf(c.id) !== -1;
                  var initials = (c.full_name || "A").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
                  return (
                    <div key={c.id} onClick={function(){toggleGroupMember(c.id);}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:8,cursor:"pointer",background:selected?"#fdf0f0":"transparent",border:selected?"1px solid "+RED:"1px solid transparent",marginBottom:4}}>
                      <div style={{width:28,height:28,borderRadius:"50%",background:selected?RED:"#D1D5DB",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white"}}>{selected?"\u2713":initials}</div>
                      <span style={{fontSize:13,fontWeight:selected?600:400,color:selected?"#111827":"#6B7280"}}>{c.full_name || "Anonymous"}</span>
                    </div>
                  );
                })}
              </div>
              <button onClick={handleCreateGroup} disabled={!groupName.trim() || groupMembers.length === 0} style={{width:"100%",marginTop:10,padding:"10px",background:(!groupName.trim()||groupMembers.length===0)?"#E5E7EB":RED,color:"white",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:(!groupName.trim()||groupMembers.length===0)?"default":"pointer",fontFamily:"'DM Sans',sans-serif"}}>{"Create Group (" + (groupMembers.length + 1) + " members)"}</button>
            </div>
          )}

          {loadingRooms && (<div style={{padding:40,textAlign:"center",color:"#9CA3AF"}}>Loading...</div>)}

          {!loadingRooms && rooms.length === 0 && (<div style={{padding:"40px 20px",textAlign:"center",color:"#9CA3AF"}}><div style={{fontSize:32,marginBottom:8}}>&#128172;</div><p style={{fontSize:13,margin:0}}>No conversations yet. Connect with a study partner to start chatting.</p></div>)}

          {rooms.filter(function(r) {
            if (!chatSearch.trim()) return true;
            return (r.display_name || "").toLowerCase().indexOf(chatSearch.toLowerCase()) !== -1;
          }).map(function(r) {
            var initials = (r.display_name || "C").split(" ").map(function(w){return w[0];}).join("").toUpperCase().slice(0,2);
            var colors = ["#ec8283","#2563EB","#059669","#7C3AED","#D97706"];
            var color = r.room_type === "group" ? "#7C3AED" : colors[(r.display_name||"C").length % colors.length];
            var preview = r.last_message ? (r.last_message.length > 35 ? r.last_message.slice(0, 35) + "..." : r.last_message) : "No messages yet";
            var timeStr = "";
            if (r.last_message_time) {
              var diff = (Date.now() - new Date(r.last_message_time).getTime()) / 1000;
              if (diff < 60) timeStr = "now";
              else if (diff < 3600) timeStr = Math.floor(diff / 60) + "m";
              else if (diff < 86400) timeStr = Math.floor(diff / 3600) + "h";
              else timeStr = Math.floor(diff / 86400) + "d";
            }
            return (
              <div key={r.id} onClick={function(){setActiveRoom(r.id);setActiveRoomName(r.display_name);setView("chat");}} style={{padding:"14px 20px",display:"flex",alignItems:"center",gap:12,cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.15s"}}>
                <div style={{width:44,height:44,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:15,color:"white",flexShrink:0}}>{r.room_type==="group"?"G":initials}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{fontSize:14,fontWeight:600,color:"#111827",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.display_name}</div>
                    {timeStr && (<span style={{fontSize:11,color:"#9CA3AF",flexShrink:0,marginLeft:8}}>{timeStr}</span>)}
                  </div>
                  <div style={{fontSize:12,color:"#9CA3AF",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginTop:2}}>{preview}</div>
                </div>
                <button onClick={function(e){deleteChat(r.id,e);}} style={{background:"none",border:"none",color:"#D1D5DB",cursor:"pointer",padding:4,flexShrink:0,fontSize:14}} title="Delete chat">&#128465;</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Chat View */}
      {view==="chat" && (
        <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:"16px 20px",display:"flex",flexDirection:"column",gap:8}}>
            {messages.length===0 && (<div style={{textAlign:"center",padding:"40px 0",color:"#9CA3AF",fontSize:13}}>No messages yet. Say hello!</div>)}
            {messages.map(function(msg, idx) {
              var isMe = msg.sender_id === user.id;
              var senderName = profileNames[msg.sender_id] || "User";
              var time = new Date(msg.created_at).toLocaleTimeString("en-US", { hour:"numeric", minute:"2-digit" });
              return (
                <div key={msg.id || idx} style={{display:"flex",flexDirection:"column",alignItems:isMe?"flex-end":"flex-start",maxWidth:"80%",alignSelf:isMe?"flex-end":"flex-start"}}>
                  {!isMe && (<span style={{fontSize:11,color:"#9CA3AF",marginBottom:2,paddingLeft:4}}>{senderName}</span>)}
                  <div style={{padding:"10px 16px",borderRadius:isMe?"16px 16px 4px 16px":"16px 16px 16px 4px",background:isMe?RED:"#F3F4F6",color:isMe?"white":"#111827",fontSize:14,lineHeight:1.5,wordBreak:"break-word"}}>
                    {msg.content}
                  </div>
                  <span style={{fontSize:10,color:"#9CA3AF",marginTop:2,paddingLeft:4,paddingRight:4}}>{time}</span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{padding:"12px 16px",borderTop:"1px solid #E5E7EB",display:"flex",gap:8,background:"white",flexShrink:0}}>
            <input type="text" placeholder="Type a message..." value={newMessage} onChange={function(e){setNewMessage(e.target.value);}} style={chatInputStyle} />
            <button type="submit" disabled={sending||!newMessage.trim()} style={{width:42,height:42,borderRadius:"50%",background:newMessage.trim()?RED:"#E5E7EB",color:"white",border:"none",cursor:newMessage.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>&#10148;</button>
          </form>
        </div>
      )}
    </div>
  );
}

/* ── Admin Dashboard ── */
function AdminDashboard({ user }) {
  var [activeTab, setActiveTab] = useState("blog");
  var [data, setData] = useState([]);
  var [loading, setLoading] = useState(false);
  var [editItem, setEditItem] = useState(null);
  var [editForm, setEditForm] = useState({});
  var [searchQuery, setSearchQuery] = useState("");

  var isAdmin = user && user.email === ADMIN_EMAIL;
  if (!isAdmin) return (<div style={{paddingTop:120,minHeight:"100vh",background:"#FAFAFA",textAlign:"center",padding:"200px 20px"}}><h2 style={{fontFamily:"'Playfair Display',serif",color:"#111827"}}>Access Denied</h2><p style={{color:"#6B7280",fontFamily:"'DM Sans',sans-serif"}}>Admin access only.</p></div>);

  var tabs = [
    { key: "blog", label: "Blog Posts", table: "blog_posts" },
    { key: "forum_posts", label: "Forum Posts", table: "forum_posts" },
    { key: "forum_comments", label: "Forum Comments", table: "forum_comments" },
    { key: "profiles", label: "User Profiles", table: "profiles" },
    { key: "scores", label: "Leaderboard Scores", table: "daily_scores" },
    { key: "connections", label: "Connections", table: "connections" },
    { key: "chat_rooms", label: "Chat Rooms", table: "chat_rooms" },
    { key: "categories", label: "Forum Categories", table: "forum_categories" }
  ];

  var currentTab = tabs.find(function(t) { return t.key === activeTab; });

  async function loadData() {
    if (!currentTab) return;
    setLoading(true);
    var { data: rows, error } = await supabase.from(currentTab.table).select("*").order("created_at", { ascending: false }).limit(100);
    if (error) { console.error("Admin load error:", error); setData([]); }
    else { setData(rows || []); }
    setLoading(false);
  }

  useEffect(function() { loadData(); }, [activeTab]);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this item? This cannot be undone.")) return;
    var { error } = await supabase.from(currentTab.table).delete().eq("id", id);
    if (error) { alert("Delete error: " + error.message); return; }
    setData(function(prev) { return prev.filter(function(r) { return r.id !== id; }); });
  }

  async function handleSaveEdit() {
    if (!editItem) return;
    var updates = Object.assign({}, editForm);
    delete updates.id;
    delete updates.created_at;
    var { error } = await supabase.from(currentTab.table).update(updates).eq("id", editItem);
    if (error) { alert("Update error: " + error.message); return; }
    setEditItem(null);
    setEditForm({});
    loadData();
  }

  function startEdit(row) {
    setEditItem(row.id);
    setEditForm(Object.assign({}, row));
  }

  function getDisplayColumns() {
    if (activeTab === "blog") return ["id", "title", "author_name", "category", "published", "created_at"];
    if (activeTab === "forum_posts") return ["id", "title", "is_pinned", "upvotes", "comment_count", "created_at"];
    if (activeTab === "forum_comments") return ["id", "content", "upvotes", "created_at"];
    if (activeTab === "profiles") return ["id", "full_name", "target_exam", "target_score", "exam_date"];
    if (activeTab === "scores") return ["id", "user_id", "exam_type", "questions_solved", "questions_correct", "study_hours", "log_date"];
    if (activeTab === "connections") return ["id", "requester_id", "receiver_id", "status", "created_at"];
    if (activeTab === "chat_rooms") return ["id", "name", "room_type", "created_at"];
    if (activeTab === "categories") return ["id", "name", "slug", "icon", "sort_order"];
    return ["id"];
  }

  function getEditableColumns() {
    if (activeTab === "blog") return ["title", "content", "author_name", "category", "published"];
    if (activeTab === "forum_posts") return ["title", "content", "is_pinned", "upvotes", "comment_count"];
    if (activeTab === "forum_comments") return ["content", "upvotes"];
    if (activeTab === "profiles") return ["full_name", "target_exam", "target_score", "exam_date", "target_schools", "study_style", "bio"];
    if (activeTab === "scores") return ["exam_type", "questions_solved", "questions_correct", "study_hours", "log_date"];
    if (activeTab === "connections") return ["status"];
    if (activeTab === "chat_rooms") return ["name", "room_type"];
    if (activeTab === "categories") return ["name", "slug", "description", "icon", "sort_order"];
    return [];
  }

  var cols = getDisplayColumns();
  var filteredData = searchQuery.trim() ? data.filter(function(row) {
    return JSON.stringify(row).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  }) : data;

  var adminInputStyle = { width: "100%", padding: "8px 12px", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{paddingTop: 120, minHeight: "100vh", background: "#FAFAFA"}}>
      <div style={{maxWidth: 1200, margin: "0 auto", padding: "0 20px 60px"}}>
        <div style={{marginBottom: 24}}>
          <h1 style={{fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,36px)", fontWeight: 700, color: "#111827", margin: 0}}>Admin Dashboard</h1>
          <p style={{fontSize: 15, color: "#6B7280", marginTop: 6, marginBottom: 0, fontFamily: "'DM Sans',sans-serif"}}>Manage all website content and data.</p>
        </div>

        {/* Tabs */}
        <div style={{display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20}}>
          {tabs.map(function(t) {
            return (<button key={t.key} onClick={function() {setActiveTab(t.key); setSearchQuery(""); setEditItem(null);}} style={{padding: "8px 16px", borderRadius: 8, border: "1px solid " + (activeTab === t.key ? RED : "#E5E7EB"), background: activeTab === t.key ? RED : "white", color: activeTab === t.key ? "white" : "#6B7280", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>{t.label}</button>);
          })}
        </div>

        {/* Search + Stats */}
        <div style={{display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap"}}>
          <input type="text" placeholder={"Search " + (currentTab ? currentTab.label : "") + "..."} value={searchQuery} onChange={function(e) {setSearchQuery(e.target.value);}} style={{flex: 1, minWidth: 200, padding: "10px 14px", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontFamily: "'DM Sans',sans-serif", outline: "none", background: "white"}} />
          <span style={{fontSize: 13, color: "#9CA3AF", fontWeight: 600}}>{filteredData.length + " of " + data.length + " rows"}</span>
          <button onClick={function() {loadData();}} style={{padding: "10px 16px", background: "white", color: "#6B7280", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>Refresh</button>
        </div>

        {/* Loading */}
        {loading && (<div style={{textAlign: "center", padding: 40, color: "#9CA3AF"}}>Loading...</div>)}

        {/* Edit Modal */}
        {editItem && (<div onClick={function() {setEditItem(null);}} style={{position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: 20}}>
          <div onClick={function(e) {e.stopPropagation();}} style={{background: "white", borderRadius: 16, padding: 28, width: "100%", maxWidth: 520, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.15)"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20}}>
              <h3 style={{fontSize: 18, fontWeight: 700, color: "#111827", margin: 0, fontFamily: "'Playfair Display',serif"}}>Edit Record</h3>
              <button onClick={function() {setEditItem(null);}} style={{background: "none", border: "none", fontSize: 22, color: "#9CA3AF", cursor: "pointer"}}>&#10005;</button>
            </div>
            {getEditableColumns().map(function(col) {
              var val = editForm[col];
              var isBoolean = val === true || val === false;
              var isLongText = col === "content" || col === "bio" || col === "description";
              return (<div key={col} style={{marginBottom: 14}}>
                <label style={{fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4, display: "block", textTransform: "capitalize"}}>{col.replace(/_/g, " ")}</label>
                {isBoolean ? (
                  <select style={adminInputStyle} value={String(val)} onChange={function(e) {setEditForm(Object.assign({}, editForm, {[col]: e.target.value === "true"}));}}>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : isLongText ? (
                  <textarea style={{...adminInputStyle, resize: "vertical"}} rows={4} value={val || ""} onChange={function(e) {setEditForm(Object.assign({}, editForm, {[col]: e.target.value}));}} />
                ) : (
                  <input type="text" style={adminInputStyle} value={val === null || val === undefined ? "" : String(val)} onChange={function(e) {setEditForm(Object.assign({}, editForm, {[col]: e.target.value}));}} />
                )}
              </div>);
            })}
            <div style={{display: "flex", gap: 10, marginTop: 20}}>
              <button onClick={function() {setEditItem(null);}} style={{flex: 1, padding: 12, background: "white", color: "#6B7280", border: "1px solid #E5E7EB", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>Cancel</button>
              <button onClick={handleSaveEdit} style={{flex: 1, padding: 12, background: RED, color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans',sans-serif"}}>Save Changes</button>
            </div>
          </div>
        </div>)}

        {/* Data Table */}
        {!loading && (
          <div style={{background: "white", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "auto"}}>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'DM Sans',sans-serif"}}>
              <thead>
                <tr style={{borderBottom: "2px solid #F3F4F6"}}>
                  {cols.map(function(col) {
                    return (<th key={col} style={{padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap"}}>{col.replace(/_/g, " ")}</th>);
                  })}
                  <th style={{padding: "10px 12px", textAlign: "right", fontSize: 11, fontWeight: 600, color: "#9CA3AF"}}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map(function(row) {
                  return (<tr key={row.id} style={{borderBottom: "1px solid #F3F4F6"}}>
                    {cols.map(function(col) {
                      var val = row[col];
                      var display = val === null || val === undefined ? "-" : val === true ? "Yes" : val === false ? "No" : String(val);
                      if (display.length > 50) display = display.slice(0, 50) + "...";
                      if (col === "id") display = display.slice(0, 8) + "...";
                      return (<td key={col} style={{padding: "10px 12px", color: "#374151", whiteSpace: "nowrap", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis"}}>{display}</td>);
                    })}
                    <td style={{padding: "10px 12px", textAlign: "right", whiteSpace: "nowrap"}}>
                      <button onClick={function() {startEdit(row);}} style={{background: "none", border: "none", color: RED, cursor: "pointer", fontSize: 12, fontWeight: 600, marginRight: 8, fontFamily: "'DM Sans',sans-serif"}}>Edit</button>
                      <button onClick={function() {handleDelete(row.id);}} style={{background: "none", border: "none", color: "#D1D5DB", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans',sans-serif"}}>Delete</button>
                    </td>
                  </tr>);
                })}
                {filteredData.length === 0 && (<tr><td colSpan={cols.length + 1} style={{padding: 40, textAlign: "center", color: "#9CA3AF"}}>No data found</td></tr>)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage() {
  return (<><Hero/><SchoolLogos/><NotTypical/><CommunityProof/><LinkedInFeatures/><HowItWorks/><ServicesSection/><AdmissionsSection/><CommunitySection/><TeamSection/><TestimonialsSection/><CTA/></>);
}

export default function App() {
  const [page,setPage]=useState("home");
  const [user,setUser]=useState(null);
  const [showAuth,setShowAuth]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [chatDmUserId,setChatDmUserId]=useState(null);
  const [chatDmUserName,setChatDmUserName]=useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
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

  return (
    <div style={{background:"#fff",minHeight:"100vh",color:DARK,overflowX:"hidden"}}>
      <Navbar page={page} setPage={setPage} user={user} onLoginClick={()=>setShowAuth(true)} onLogout={handleLogout} />
      {page==="home"&&<HomePage/>}
      {page==="faq"&&<FAQPage/>}
      {page==="blog"&&<BlogPage user={user}/>}
      {page==="leaderboard"&&<LeaderboardPage user={user} onOpenChat={openChat} onLoginClick={()=>setShowAuth(true)}/>}
      {page==="partners"&&<AccountabilityPage user={user} onLoginClick={()=>setShowAuth(true)} onOpenChat={openChat}/>}
      {page==="forum"&&<ForumPage user={user} onLoginClick={()=>setShowAuth(true)}/>}
      {page==="admin"&&<AdminDashboard user={user}/>}
      <Footer/>
      <StickyWhatsApp/>
      {user && !chatOpen && (
        <button onClick={()=>setChatOpen(true)} style={{position:"fixed",bottom:28,right:100,zIndex:900,width:56,height:56,borderRadius:"50%",background:RED,color:"white",border:"none",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(236,130,131,0.35)",cursor:"pointer",fontSize:24}}>&#128172;</button>
      )}
      <ChatPanel user={user} isOpen={chatOpen} onClose={()=>{setChatOpen(false);setChatDmUserId(null);setChatDmUserName(null);}} initialDmUserId={chatDmUserId} initialDmUserName={chatDmUserName} />
      {showAuth && <AuthModal onClose={()=>setShowAuth(false)} onAuth={setUser} />}
    </div>
  );
}
