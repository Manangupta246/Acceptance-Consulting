'use client';
import { useState, useEffect, useRef } from "react";

/* ── Config ── */
const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/L6upA5MYtSEGOYLU8UTBs1";
const WHATSAPP_CONNECT = "https://wa.me/+919813866629?text=";
const LOGO = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/A0xw1L5325CZlXWJ/picture9-m5KL5O2506Fzx5RM.png";
const RED = "#B91C1C";
const RED_BG = "#FEF2F2";
const DARK = "#1a1a1a";
const GRAY = "#555";
const LIGHT_GRAY = "#f8f8f8";
const avatar = (n) => `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(n)}&backgroundColor=fecaca`;

/* ── Hooks ── */
function useInView(th = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: th });
    obs.observe(el); return () => obs.disconnect();
  }, [th]);
  return [ref, v];
}
function AnimatedCounter({ target, suffix = "" }) {
  const [c, setC] = useState(0);
  const [ref, v] = useInView(0.3);
  const num = parseInt(target.replace(/\D/g, ""));
  useEffect(() => {
    if (!v) return; let s = 0; const step = Math.ceil(num / 120);
    const t = setInterval(() => { s += step; if (s >= num) { setC(num); clearInterval(t); } else setC(s); }, 16);
    return () => clearInterval(t);
  }, [v, num]);
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
  { name: "Saïd (Oxford)", color: "#002147" }, { name: "SP Jain", color: "#C8102E" },
  { name: "& Other Top Schools", color: RED },
];
const services = [
  { icon: "🔍", title: "Profile Deep-Dive & School Selection", desc: "We sit with your story, decode your strengths, & help you pick schools where you'll truly belong." },
  { icon: "📄", title: "Resume Tailored to School Style", desc: "We help translate your experiences into a format that speaks the language of B-schools." },
  { icon: "📝", title: "Essay Brainstorming & Unlimited Edits", desc: "We help you make sense of your story & build essays that make admissions teams remember you." },
  { icon: "🎤", title: "Mock Interviews Tailored to School Style", desc: "From traditional panels to case-style and behavioral interviews, we prepare you for the real thing." },
  { icon: "✉️", title: "LOR + Application Strategy", desc: "Your application isn't just about what you say — it's also about what others say about you." },
  { icon: "🎓", title: "Maximize Your Scholarship", desc: "We dig into optional essays, diversity angles, and need/merit tactics." },
];
const isbServices = ["Profile Deep-Dive & YL/PGP Track Guidance","Resume Tailoring","Essay Brainstorming & Unlimited Edits","Application Form Strategy","Mock Interview with Real ISB Questions","Reapplicant Strategy"];
const intlServices = ["School Shortlisting","Resume Revamp Tailored to School Style","Essay Brainstorming & Unlimited Edits","LOR + Application Strategy","Mock Interview Tailored to School Style","Maximize Your Scholarship"];
const howItWorks = [
  { step: "01", title: "Book a Free Call", desc: "Tell us where you are in your journey. No commitments, no pressure — just a real conversation.", icon: "📞" },
  { step: "02", title: "We Deep-Dive Your Profile", desc: "We break down your story, identify your unique edge, and map out a strategy tailored to your target schools.", icon: "🧠" },
  { step: "03", title: "We Build It Together", desc: "From essays to interviews, we walk with you every step. Unlimited revisions, real-time support, midnight voice notes — the works.", icon: "🤝" },
];
const team = [
  { name: "Tanya Mehta", image: avatar("TanyaMehta"), bio: "Tanya Mehta is an MBA graduate, Chartered Accountant (CA) and CFA Level 1 who secured admits from top global business schools and ISB, giving her a well-rounded understanding of MBA admissions worldwide. She also teaches strategy to MBA students, further strengthening her insights into what top schools seek in candidates." },
  { name: "Manan Gupta", image: avatar("MananGupta"), bio: "Manan Gupta is an MBA graduate from ISB and a management consultant with 4+ years of work experience at Bain and Kepler Cannon. He brings a wealth of experience in storytelling and career mentorship. With an insider's perspective on top-tier MBA programs, he has guided 100+ candidates in crafting high-impact applications that stand out." },
];
const testimonialCategories = [
  { category: "Overall Journey", icon: "🌟", items: [
    { name: "Nandeta Agrawala", school: "ISB Co'26", image: avatar("Nandeta"), text: "One thing I can say with 100% confidence is that the level of belief and confidence Tanya and Manan instill in their mentees is beyond extraordinary and I genuinely owe a large part of my success to them. From the very beginning, they brought such clarity to what seemed like an overwhelming and uncertain process. Their mentorship felt personal, thoughtful, and deeply committed." },
    { name: "Rhythm Garg", school: "ISB Co'26", image: avatar("Rhythm"), text: "With just a week left to apply, I was overwhelmed and full of doubt. That's when Tanya and Manan stepped in — not just as consultants, but as true mentors. They asked the right questions, helped me reflect, and patiently worked with me, draft after draft. What meant the most was how much they believed in me, especially in moments I couldn't believe in myself." },
  ]},
  { category: "Interview Prep", icon: "🎤", items: [
    { name: "Rachit Shukla", school: "ISB Co'26", image: avatar("Rachit"), text: "When I was preparing for my ISB interview, I knew I needed guidance not just in terms of structure and strategy, but also confidence and clarity. That's exactly what Tanya brought to the table. She didn't just help me prepare answers but also guided me to understand why my story mattered and how to bring it out authentically." },
    { name: "Shiv Bhasin", school: "ISB Co'26", image: avatar("ShivB"), text: "I can confidently say that I got admitted to ISB because of Tanya and Manan. Initially, I was a bit overconfident about the interview but an initial call with Manan made me realise how wrong my approach was. Post that, Tanya put in a huge amount of effort to help me polish and structure my answers." },
  ]},
  { category: "Essays & Applications", icon: "📝", items: [
    { name: "Rhythm Garg", school: "ISB Co'26", image: avatar("RhythmE"), text: "They helped me dig deep, reflect on my journey, and bring out stories I didn't even realise were worth telling. Every single essay went through multiple rounds, not to make it sound fancy, but to make it sound authentic. They knew when to push, when to listen, and how to bring out my voice." },
    { name: "Nandeta Agrawala", school: "ISB Co'26", image: avatar("NandetaE"), text: "Their ability to break things down helped me understand my own story better and that prepared me for every possible scenario. They never treated me like 'just another candidate.' I can say without a doubt that if it weren't for them, I wouldn't be at ISB today." },
  ]},
];
const faqs = [
  { q: "When should I start preparing?", a: "The earlier the better — but it's never too late. Ideally, start 4-6 months before your target deadline. That gives us time to do a proper profile deep-dive, work through multiple essay drafts, and run thorough mock interviews. That said, we've helped people with just a week left (Rhythm's story is proof). Whenever you start, we'll make it work." },
  { q: "Do you help with reapplications?", a: "Absolutely — and we're proud to say we have a 100% reapplicant success rate. If you were rejected before, we tear apart what went wrong, rebuild your narrative from scratch, and position you differently. A rejection isn't the end of your story. It's just a plot twist." },
  { q: "What if I don't get in?", a: "We won't sugarcoat it — no one can guarantee an admit. But with a 96% acceptance rate, the odds are strongly in your favour when you work with us. If things don't go as planned, we stick around. We help you reapply, rethink your strategy, or explore alternate schools. We don't disappear after the result." },
  { q: "How is this different from other consultants?", a: "Most consultants give you templates and checklists. We give you ourselves. We're not a factory — we take on a limited number of applicants each cycle so we can go deep with each one. You get direct access to us (yes, even midnight voice notes), unlimited essay revisions, and mentors who genuinely care whether you get in. Ask any of our past applicants — they'll tell you this doesn't feel like consulting. It feels like having friends in your corner." },
  { q: "How many schools can I apply to with your help?", a: "There's no fixed limit. Most applicants work with us on 2-5 schools, but we've supported people applying to 8+ programs in a single cycle. Each school gets tailored attention — we don't copy-paste essays or recycle strategies. Your ISB application will look nothing like your INSEAD one, and that's by design." },
  { q: "Can I just get interview prep without the full package?", a: "Yes! We offer standalone interview prep — mock interviews tailored to the specific school's format and question style. Whether it's ISB's panel format, INSEAD's alumni interviews, or a case-style discussion, we've got you covered. Many of our interview-only clients have gone on to secure admits. That said, if you'd like end-to-end support, we're here for that too." },
];
const communityProof = [
  { type: "chat", caption: "Late-night essay brainstorming in the community group", placeholder: "💬 Community WhatsApp Screenshot" },
  { type: "chat", caption: "Admit celebrations — this never gets old", placeholder: "🎉 Admit Celebration Screenshot" },
  { type: "webinar", caption: "Free ISB admissions webinar — 200+ attendees", placeholder: "🎥 Webinar Screenshot" },
  { type: "chat", caption: "Real questions, real answers — no gatekeeping", placeholder: "💬 Q&A Discussion Screenshot" },
  { type: "webinar", caption: "Panel discussion with ISB alumni", placeholder: "🎥 Panel Discussion Photo" },
  { type: "chat", caption: "When the community rallies around a reapplicant", placeholder: "💬 Support Thread Screenshot" },
];
const linkedinPosts = [
  { title: "How we helped 50+ applicants get into ISB in one cycle", placeholder: "LinkedIn Post Screenshot 1" },
  { title: "The reapplicant who turned rejection into an admit", placeholder: "LinkedIn Post Screenshot 2" },
  { title: "Why your MBA essay probably isn't working", placeholder: "LinkedIn Post Screenshot 3" },
];

/* ── Styles ── */
const heading = (sz="clamp(32px,5vw,48px)") => ({ fontFamily:"'Playfair Display',serif", fontSize:sz, fontWeight:800, color:DARK, lineHeight:1.15, margin:0 });
const bodyS = { fontFamily:"'DM Sans',sans-serif", fontSize:"16px", color:GRAY, lineHeight:1.75 };
const labelS = { fontFamily:"'DM Sans',sans-serif", fontSize:"12px", fontWeight:700, color:RED, letterSpacing:"3px", textTransform:"uppercase", marginBottom:"12px" };
const btnP = { display:"inline-block", padding:"16px 40px", borderRadius:"50px", fontWeight:700, fontSize:"14px", textDecoration:"none", fontFamily:"'DM Sans',sans-serif", letterSpacing:"0.5px", textTransform:"uppercase", transition:"all 0.3s", cursor:"pointer", border:"none", background:RED, color:"#fff", boxShadow:"0 4px 20px rgba(185,28,28,0.25)" };
const btnO = { ...btnP, background:"transparent", color:RED, border:`2px solid ${RED}`, boxShadow:"none" };
const maxW = { maxWidth:"1100px", margin:"0 auto" };
const secP = { padding:"100px 24px" };

/* ──────── COMPONENTS ──────── */

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const fn=()=>setScrolled(window.scrollY>50); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); }, []);

  const homeLinks = [
    { label:"Home", action:()=>{setPage("home");setTimeout(()=>document.getElementById("home")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"Services", action:()=>{setPage("home");setTimeout(()=>document.getElementById("services")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"Testimonials", action:()=>{setPage("home");setTimeout(()=>document.getElementById("testimonials")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"Our Team", action:()=>{setPage("home");setTimeout(()=>document.getElementById("our-team")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"About Us", action:()=>{setPage("home");setTimeout(()=>document.getElementById("about")?.scrollIntoView({behavior:"smooth"}),50);} },
    { label:"FAQ", action:()=>{setPage("faq"); window.scrollTo(0,0);} },
    { label:"Contact", action:()=>{setPage("home");setTimeout(()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}),50);} },
  ];

  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:1000,
      padding:scrolled?"10px 32px":"16px 32px",
      background:scrolled?"rgba(255,255,255,0.97)":"rgba(255,255,255,0.95)",
      backdropFilter:"blur(16px)", boxShadow:scrolled?"0 2px 20px rgba(0,0,0,0.06)":"none",
      transition:"all 0.4s", display:"flex", justifyContent:"space-between", alignItems:"center",
    }}>
      <a onClick={()=>{setPage("home");window.scrollTo(0,0);}} style={{ cursor:"pointer" }}>
        <img src={LOGO} alt="AC" style={{ height:"40px" }} />
      </a>
      <div style={{ display:"flex", gap:"24px", alignItems:"center" }} className="dt-nav">
        {homeLinks.map(l=>(
          <a key={l.label} onClick={()=>{l.action();setMenuOpen(false);}} style={{
            color: page==="faq"&&l.label==="FAQ" ? RED : GRAY, textDecoration:"none", fontSize:"13px",
            fontFamily:"'DM Sans',sans-serif", fontWeight:600, letterSpacing:"0.5px",
            textTransform:"uppercase", transition:"color 0.3s", cursor:"pointer",
          }} onMouseEnter={e=>e.target.style.color=RED} onMouseLeave={e=>{if(!(page==="faq"&&l.label==="FAQ"))e.target.style.color=GRAY;}}>{l.label}</a>
        ))}
        <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={btnP}>Join Community</a>
      </div>
      <button onClick={()=>setMenuOpen(!menuOpen)} className="mob-btn" style={{ display:"none", background:"none", border:"none", fontSize:"28px", color:RED, cursor:"pointer" }}>{menuOpen?"✕":"☰"}</button>
      {menuOpen&&(
        <div style={{ position:"fixed",top:"65px",left:0,right:0,bottom:0, background:"rgba(255,255,255,0.99)", display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center",gap:"28px",zIndex:999 }}>
          {homeLinks.map(l=>(
            <a key={l.label} onClick={()=>{l.action();setMenuOpen(false);}} style={{ color:DARK, textDecoration:"none", fontSize:"20px", fontFamily:"'DM Sans',sans-serif", fontWeight:600, cursor:"pointer" }}>{l.label}</a>
          ))}
          <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={btnP}>Join Community</a>
        </div>
      )}
      <style>{`@media(max-width:768px){.dt-nav{display:none!important}.mob-btn{display:block!important}}`}</style>
    </nav>
  );
}

function Hero() {
  const [l, setL] = useState(false);
  useEffect(()=>{setTimeout(()=>setL(true),100);},[]);
  const a=(d=0)=>({ opacity:l?1:0, transform:l?"translateY(0)":"translateY(30px)", transition:`all 0.8s cubic-bezier(0.22,1,0.36,1) ${d}s` });
  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", padding:"140px 24px 80px", position:"relative", background:`linear-gradient(180deg,${RED_BG} 0%,#fff 60%)` }}>
      <div style={{ position:"absolute",top:"8%",right:"8%",width:"300px",height:"300px",borderRadius:"50%",border:"1px solid rgba(185,28,28,0.06)",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:"12%",left:"5%",width:"200px",height:"200px",borderRadius:"50%",background:"rgba(185,28,28,0.03)",pointerEvents:"none" }}/>
      <div style={a(0)}>
        <div style={{ display:"inline-block",padding:"8px 20px",borderRadius:"50px",border:"1px solid rgba(185,28,28,0.2)",background:"rgba(185,28,28,0.05)",marginBottom:"28px" }}>
          <span style={{...labelS,marginBottom:0,fontSize:"11px"}}>ISB · INSEAD · LBS · Wharton · & More</span>
        </div>
      </div>
      <h1 style={{...heading("clamp(40px,7vw,80px)"),maxWidth:"850px",marginBottom:"20px",...a(0.15)}}>Get Accepted to Your <span style={{color:RED}}>Dream B-School</span></h1>
      <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(14px,2vw,18px)",fontWeight:700,color:RED,letterSpacing:"4px",textTransform:"uppercase",marginBottom:"28px",...a(0.25) }}>Affordable. Personalised. Proven.</p>
      <p style={{...bodyS,fontSize:"clamp(16px,2vw,19px)",maxWidth:"580px",margin:"0 auto 40px",...a(0.35)}}>Not your typical consultants. We're the friends who've been in your shoes, sat in those classrooms, and now sit in your corner.</p>
      <div style={{ display:"flex",gap:"16px",flexWrap:"wrap",justifyContent:"center",...a(0.45) }}>
        <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={btnP} onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>Get Free Profile Evaluation →</a>
        <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={btnO} onMouseEnter={e=>e.target.style.background=RED_BG} onMouseLeave={e=>e.target.style.background="transparent"}>Join 1000+ Community</a>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"20px",maxWidth:"780px",width:"100%",marginTop:"72px",padding:"36px 28px",background:"#fff",borderRadius:"20px",boxShadow:"0 8px 40px rgba(0,0,0,0.06)",border:"1px solid rgba(0,0,0,0.04)",...a(0.55) }}>
        {stats.map((s,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,5vw,46px)",fontWeight:800,color:RED}}><AnimatedCounter target={s.number} suffix={s.suffix}/></div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:GRAY,marginTop:"6px",fontWeight:600,letterSpacing:"0.3px",textTransform:"uppercase"}}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SchoolLogos(){
  const [ref,v]=useInView(0.2);
  return(
    <section ref={ref} style={{padding:"48px 24px",background:"#fff",borderBottom:"1px solid rgba(0,0,0,0.04)",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"all 0.6s"}}>
      <div style={maxW}>
        <p style={{textAlign:"center",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:600,color:GRAY,letterSpacing:"2px",textTransform:"uppercase",marginBottom:"28px"}}>Our Applicants Have Been Admitted To</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"12px"}}>
          {schools.map((s,i)=>(
            <div key={i} style={{padding:"10px 22px",borderRadius:"50px",background:s.color,color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:700,letterSpacing:"0.5px",transition:"all 0.3s",boxShadow:"0 2px 8px rgba(0,0,0,0.1)",opacity:v?1:0,transform:v?"scale(1)":"scale(0.9)",transitionDelay:`${i*0.05}s`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>{s.name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotTypical(){
  const [ref,v]=useInView();
  return(
    <section id="about" ref={ref} style={{...secP,background:LIGHT_GRAY,opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={{...maxW,maxWidth:"800px",textAlign:"center"}}>
        <p style={labelS}>Who We Are</p>
        <h2 style={{...heading(),marginBottom:"12px"}}>Not Your Typical Consultants</h2>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,2.5vw,22px)",color:RED,fontStyle:"italic",marginBottom:"40px"}}>And honestly? We hate that word.</p>
        <div style={{...bodyS,textAlign:"left",maxWidth:"650px",margin:"0 auto"}}>
          <p style={{marginBottom:"20px"}}>We're not "consultants." You're not "applicants." And what we do here isn't transactional.</p>
          <p style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"clamp(18px,2.5vw,21px)",color:RED,fontStyle:"italic",margin:"32px 0"}}>Zoom Rooms, Voice Notes & Way Too Many Google Docs</p>
          <p style={{marginBottom:"20px"}}>We've taken 1-on-1 calls, run group sessions, rewritten essays live, and stayed back after mock interviews to talk through imposter syndrome.</p>
          <p>The people we work with — <strong style={{color:DARK}}>we don't call them clients</strong>. We call them ours. Because they become a part of this thing we've built. And if you ever want to talk to someone who's been through this with us, just say the word.</p>
        </div>
      </div>
    </section>
  );
}

/* ── NEW: Community Proof Section ── */
function CommunityProof(){
  const [ref,v]=useInView(0.08);
  return(
    <section ref={ref} style={{...secP,background:"#fff",opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={maxW}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <p style={labelS}>See It In Action</p>
          <h2 style={heading()}>Real Conversations. Real Impact.</h2>
          <p style={{...bodyS,maxWidth:"550px",margin:"12px auto 0"}}>This is what our community actually looks like — no staged photos, no stock images.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px"}}>
          {communityProof.map((c,i)=>(
            <div key={i} style={{
              borderRadius:"16px",overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)",
              transition:"all 0.35s",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",
              transitionDelay:`${i*0.08}s`,
            }}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,0.08)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}
            >
              {/* Placeholder for screenshot */}
              <div style={{
                height:"220px",background:c.type==="chat"
                  ? "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)"
                  : "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
                display:"flex",alignItems:"center",justifyContent:"center",
                flexDirection:"column",gap:"8px",
              }}>
                <span style={{fontSize:"40px"}}>{c.type==="chat"?"💬":"🎥"}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:"rgba(0,0,0,0.4)",padding:"0 20px",textAlign:"center"}}>
                  {c.placeholder}
                </span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"rgba(0,0,0,0.3)"}}>Upload your screenshot here</span>
              </div>
              <div style={{padding:"16px 20px",background:"#fff"}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",color:DARK,fontWeight:600,margin:0}}>{c.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NEW: LinkedIn Features ── */
function LinkedInFeatures(){
  const [ref,v]=useInView();
  return(
    <section ref={ref} style={{padding:"64px 24px",background:LIGHT_GRAY,opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"all 0.7s"}}>
      <div style={maxW}>
        <div style={{textAlign:"center",marginBottom:"36px"}}>
          <p style={labelS}>As Featured On</p>
          <h2 style={{...heading("clamp(24px,4vw,36px)"),marginBottom:"8px"}}>LinkedIn</h2>
        </div>
        <div style={{display:"flex",gap:"20px",overflowX:"auto",padding:"4px 0 16px",scrollbarWidth:"none"}}>
          {linkedinPosts.map((p,i)=>(
            <div key={i} style={{
              minWidth:"320px",flex:"0 0 auto",background:"#fff",borderRadius:"16px",
              overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)",transition:"all 0.3s",
            }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 24px rgba(0,0,0,0.08)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}
            >
              <div style={{height:"180px",background:"linear-gradient(135deg, #E8EAF6 0%, #C5CAE9 100%)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"8px"}}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"rgba(0,0,0,0.35)"}}>Upload LinkedIn screenshot</span>
              </div>
              <div style={{padding:"16px 20px"}}>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:DARK,margin:0}}>{p.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks(){
  const [ref,v]=useInView(0.1);
  return(
    <section ref={ref} style={{...secP,background:"#fff",opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={maxW}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={labelS}>The Process</p>
          <h2 style={heading()}>How It Works</h2>
          <p style={{...bodyS,maxWidth:"500px",margin:"12px auto 0"}}>Three steps. Zero complexity. One goal — getting you in.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"28px"}}>
          {howItWorks.map((h,i)=>(
            <div key={i} style={{
              padding:"36px 28px",borderRadius:"20px",background:i===1?RED:"#fff",
              border:i===1?"none":"1px solid rgba(0,0,0,0.06)",
              boxShadow:i===1?"0 12px 40px rgba(185,28,28,0.15)":"0 2px 12px rgba(0,0,0,0.03)",
              textAlign:"center",position:"relative",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transitionDelay:`${i*0.12}s`,transition:"all 0.35s",
            }}>
              <div style={{fontSize:"36px",marginBottom:"12px"}}>{h.icon}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"48px",fontWeight:900,color:i===1?"rgba(255,255,255,0.15)":"rgba(185,28,28,0.08)",position:"absolute",top:"16px",right:"20px"}}>{h.step}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:800,color:i===1?"#fff":DARK,marginBottom:"12px"}}>{h.title}</h3>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"15px",color:i===1?"rgba(255,255,255,0.85)":GRAY,lineHeight:1.7}}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection(){
  const [ref,v]=useInView(0.08);
  return(
    <section id="services" ref={ref} style={{...secP,background:LIGHT_GRAY}}>
      <div style={maxW}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={labelS}>What We Help With</p>
          <h2 style={heading()}>Turning Aspiration Into Acceptance</h2>
          <p style={{...bodyS,maxWidth:"600px",margin:"12px auto 0"}}>From <strong>ISB's YL, PGP & other programs</strong> to <strong>top international programs</strong> like INSEAD, LBS, Wharton, and more.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"20px"}}>
          {services.map((s,i)=>(
            <div key={i} style={{padding:"32px 28px",borderRadius:"16px",background:"#fff",border:"1px solid rgba(0,0,0,0.06)",transition:"all 0.35s",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transitionDelay:`${i*0.08}s`,cursor:"default"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=RED;e.currentTarget.style.boxShadow="0 8px 30px rgba(185,28,28,0.08)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(0,0,0,0.06)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
              <div style={{fontSize:"28px",marginBottom:"14px"}}>{s.icon}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"18px",fontWeight:700,color:DARK,marginBottom:"10px"}}>{s.title}</h3>
              <p style={{...bodyS,fontSize:"15px"}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdmissionsSection(){
  const [tab,setTab]=useState("isb");
  const [ref,v]=useInView();
  const isISB=tab==="isb";
  return(
    <section ref={ref} style={{...secP,background:"#fff",opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={{...maxW,maxWidth:"850px"}}>
        <div style={{textAlign:"center",marginBottom:"40px"}}>
          <p style={labelS}>Our Programs</p>
          <h2 style={heading()}>Tailored For Your Target School</h2>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"40px",flexWrap:"wrap"}}>
          {[["isb","ISB Admissions"],["intl","International B-Schools"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{padding:"12px 28px",borderRadius:"50px",border:`2px solid ${RED}`,background:tab===k?RED:"transparent",color:tab===k?"#fff":RED,fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"14px",cursor:"pointer",transition:"all 0.3s"}}>{l}</button>
          ))}
        </div>
        <div style={{background:LIGHT_GRAY,borderRadius:"20px",padding:"40px 36px",boxShadow:"0 4px 20px rgba(0,0,0,0.04)"}}>
          <p style={{...bodyS,marginBottom:"28px"}}>{isISB?"We've been in your shoes, and now we're in your corner. After going through the grind ourselves and sitting inside those ISB classrooms, we've seen firsthand what actually gets someone in. It's not just big brand names or perfect GPAs — it's about the diversity you bring, even when you don't realize it.":"Every international B-school has its own lens — some value global exposure more, others prioritize social impact or leadership potential. Some want sharp career clarity, others look for a non-linear story done right. We've studied these nuances, decoded what each program truly values, and helped applicants crack them all."}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"12px"}}>
            {(isISB?isbServices:intlServices).map((s,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",padding:"12px 16px",borderRadius:"10px",background:"#fff"}}>
                <span style={{color:RED,fontWeight:800}}>→</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:600,color:DARK}}>{s}</span>
              </div>
            ))}
          </div>
          <p style={{...bodyS,marginTop:"28px",fontStyle:"italic",fontSize:"15px",color:RED}}>This may be the most personalized MBA admissions support you'll ever experience.</p>
        </div>
      </div>
    </section>
  );
}

function Community(){
  const [ref,v]=useInView();
  return(
    <section ref={ref} style={{...secP,background:LIGHT_GRAY,opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={{...maxW,display:"flex",flexWrap:"wrap",gap:"48px",alignItems:"center",justifyContent:"center"}}>
        <div style={{flex:"1 1 350px",minWidth:"280px"}}>
          <p style={labelS}>Our Community</p>
          <h2 style={{...heading("clamp(28px,4vw,40px)"),marginBottom:"16px"}}>Free Informational Webinars</h2>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",color:RED,fontWeight:700,marginBottom:"20px"}}>1000+ Applicants Community</h3>
          <p style={{...bodyS,marginBottom:"28px"}}>Join a community of ambitious MBA aspirants. We host regular information sharing sessions, Q&As, and discussions to help you navigate the admissions journey.</p>
          <a href={WHATSAPP_COMMUNITY} target="_blank" rel="noreferrer" style={btnP}>Join Community</a>
        </div>
        <div style={{flex:"0 0 auto"}}>
          <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,fit=crop/A0xw1L5325CZlXWJ/community-picture-YX4xw5VM0zT9xNPw.jpg" alt="Community" style={{borderRadius:"20px",width:"100%",maxWidth:"380px",boxShadow:"0 8px 30px rgba(0,0,0,0.08)"}} />
        </div>
      </div>
    </section>
  );
}

function TeamSection(){
  const [ref,v]=useInView();
  return(
    <section id="our-team" ref={ref} style={{...secP,background:"#fff",opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={maxW}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={labelS}>Meet The Team</p>
          <h2 style={heading()}>We Are Fun To Work With!</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))",gap:"36px",maxWidth:"800px",margin:"0 auto"}}>
          {team.map((t,i)=>(
            <div key={i} style={{background:LIGHT_GRAY,borderRadius:"20px",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.05)",transition:"all 0.35s"}}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 12px 40px rgba(185,28,28,0.1)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="0 4px 24px rgba(0,0,0,0.05)"}>
              <div style={{width:"100%",height:"300px",overflow:"hidden",background:RED_BG,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src={t.image} alt={t.name} style={{width:"180px",height:"180px",borderRadius:"50%",objectFit:"cover",border:`4px solid ${RED}`}} />
              </div>
              <div style={{padding:"28px 24px"}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:"24px",fontWeight:800,color:DARK,marginBottom:"12px"}}>{t.name}</h3>
                <p style={{...bodyS,fontSize:"15px"}}>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HorizontalScroll({children}){
  const r=useRef(null);
  const scroll=(d)=>{if(r.current)r.current.scrollBy({left:d*390,behavior:"smooth"});};
  return(
    <div style={{position:"relative"}}>
      <button onClick={()=>scroll(-1)} style={{position:"absolute",left:"-18px",top:"50%",transform:"translateY(-50%)",width:"40px",height:"40px",borderRadius:"50%",background:"#fff",border:`2px solid ${RED}`,color:RED,fontSize:"18px",fontWeight:800,cursor:"pointer",zIndex:2,boxShadow:"0 2px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>←</button>
      <div ref={r} className="hscroll" style={{display:"flex",gap:"20px",overflowX:"auto",scrollSnapType:"x mandatory",padding:"8px 4px 16px"}}>{children}</div>
      <button onClick={()=>scroll(1)} style={{position:"absolute",right:"-18px",top:"50%",transform:"translateY(-50%)",width:"40px",height:"40px",borderRadius:"50%",background:RED,border:"none",color:"#fff",fontSize:"18px",fontWeight:800,cursor:"pointer",zIndex:2,boxShadow:"0 2px 12px rgba(185,28,28,0.3)",display:"flex",alignItems:"center",justifyContent:"center"}}>→</button>
      <style>{`.hscroll::-webkit-scrollbar{display:none}.hscroll{scrollbar-width:none;-ms-overflow-style:none;}`}</style>
    </div>
  );
}

function TestimonialsSection(){
  const [ac,setAc]=useState(0);
  const [ref,v]=useInView(0.05);
  return(
    <section id="testimonials" ref={ref} style={{...secP,background:LIGHT_GRAY,opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"all 0.7s"}}>
      <div style={maxW}>
        <div style={{textAlign:"center",marginBottom:"48px"}}>
          <p style={labelS}>Testimonials</p>
          <h2 style={heading()}>The Impact We're Proud Of</h2>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:"10px",marginBottom:"36px",flexWrap:"wrap"}}>
          {testimonialCategories.map((c,i)=>(
            <button key={i} onClick={()=>setAc(i)} style={{
              padding:"10px 24px",borderRadius:"50px",border:ac===i?"none":"1px solid rgba(0,0,0,0.1)",
              background:ac===i?RED:"#fff",color:ac===i?"#fff":DARK,
              fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:"14px",cursor:"pointer",transition:"all 0.3s",
              boxShadow:ac===i?"0 4px 16px rgba(185,28,28,0.2)":"none",display:"flex",alignItems:"center",gap:"8px",
            }}><span>{c.icon}</span>{c.category}</button>
          ))}
        </div>
        <div style={{padding:"0 24px"}}>
          <HorizontalScroll>
            {testimonialCategories[ac].items.map((t,i)=>(
              <div key={`${ac}-${i}`} style={{minWidth:"340px",maxWidth:"380px",flex:"0 0 auto",scrollSnapAlign:"start",background:"#fff",borderRadius:"20px",padding:"28px 24px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 2px 12px rgba(0,0,0,0.04)",display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",alignItems:"center",gap:"14px",marginBottom:"18px"}}>
                  <img src={t.image} alt={t.name} style={{width:"52px",height:"52px",borderRadius:"50%",objectFit:"cover",border:`2px solid ${RED_BG}`,background:RED_BG}} />
                  <div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:700,fontSize:"15px",color:DARK}}>{t.name}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:RED,fontWeight:600}}>{t.school}</div>
                  </div>
                </div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:"28px",color:RED,lineHeight:1,marginBottom:"6px"}}>"</div>
                <p style={{...bodyS,fontSize:"14px",fontStyle:"italic",flex:1,lineHeight:1.7}}>{t.text}</p>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}

function CTA(){
  const [ref,v]=useInView();
  return(
    <section id="contact" ref={ref} style={{...secP,background:"#fff",opacity:v?1:0,transform:v?"translateY(0)":"translateY(30px)",transition:"all 0.7s"}}>
      <div style={{...maxW,maxWidth:"750px",textAlign:"center",padding:"64px 40px",borderRadius:"24px",background:RED,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-40%",right:"-20%",width:"400px",height:"400px",borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}} />
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,5vw,42px)",fontWeight:800,color:"#fff",marginBottom:"16px",position:"relative"}}>Ready to Start?</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"17px",color:"rgba(255,255,255,0.85)",marginBottom:"36px",lineHeight:1.7,position:"relative"}}>No sales pitch. No pressure. Just a conversation about where you are, where you want to be, and how we can help you get there.</p>
        <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={{display:"inline-block",background:"#fff",color:RED,padding:"18px 48px",borderRadius:"50px",fontWeight:800,fontSize:"15px",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.5px",textTransform:"uppercase",transition:"all 0.3s",boxShadow:"0 4px 20px rgba(0,0,0,0.15)",position:"relative"}}
          onMouseEnter={e=>{e.target.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.target.style.transform="translateY(0)";}}>Connect With Us →</a>
      </div>
    </section>
  );
}

function Footer(){
  return(
    <footer style={{padding:"40px 24px 28px",textAlign:"center",borderTop:"1px solid rgba(0,0,0,0.06)",background:LIGHT_GRAY}}>
      <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:"20px",color:DARK,marginBottom:"10px"}}><span style={{color:RED}}>Acceptance</span> Consulting</div>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"13px",color:GRAY,marginBottom:"6px"}}>Affordable. Personalised. Proven.</p>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"12px",color:"#aaa"}}>© {new Date().getFullYear()} Acceptance Consulting. All rights reserved.</p>
    </footer>
  );
}

function StickyWhatsApp(){
  const [pulse,setPulse]=useState(true);
  useEffect(()=>{const t=setTimeout(()=>setPulse(false),5000);return()=>clearTimeout(t);},[]);
  return(
    <>
      <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={{position:"fixed",bottom:"28px",right:"28px",zIndex:900,width:"60px",height:"60px",borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",transition:"all 0.3s",animation:pulse?"wa-pulse 2s ease-in-out infinite":"none"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <style>{`@keyframes wa-pulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.4)}50%{box-shadow:0 4px 30px rgba(37,211,102,0.7),0 0 0 12px rgba(37,211,102,0.1)}}`}</style>
    </>
  );
}

/* ── FAQ PAGE ── */
function FAQPage(){
  const [open,setOpen]=useState(null);
  return(
    <div style={{paddingTop:"100px",minHeight:"100vh",background:"#fff"}}>
      <div style={{...secP,...maxW,maxWidth:"800px"}}>
        <div style={{textAlign:"center",marginBottom:"56px"}}>
          <p style={labelS}>Got Questions?</p>
          <h1 style={heading()}>Frequently Asked Questions</h1>
          <p style={{...bodyS,maxWidth:"500px",margin:"16px auto 0"}}>Everything you're wondering but haven't asked yet. And if your question isn't here — just text us.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {faqs.map((f,i)=>(
            <div key={i} style={{
              borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",overflow:"hidden",
              background:open===i?RED_BG:"#fff",transition:"all 0.3s",
            }}>
              <button onClick={()=>setOpen(open===i?null:i)} style={{
                width:"100%",padding:"24px 28px",display:"flex",justifyContent:"space-between",
                alignItems:"center",background:"none",border:"none",cursor:"pointer",textAlign:"left",gap:"16px",
              }}>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"17px",fontWeight:700,color:DARK,flex:1}}>{f.q}</span>
                <span style={{
                  width:"32px",height:"32px",borderRadius:"50%",background:open===i?RED:"rgba(0,0,0,0.05)",
                  color:open===i?"#fff":GRAY,display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"18px",fontWeight:700,flexShrink:0,transition:"all 0.3s",
                }}>{open===i?"−":"+"}</span>
              </button>
              {open===i&&(
                <div style={{padding:"0 28px 24px",animation:"fadeIn 0.3s ease"}}>
                  <p style={{...bodyS,fontSize:"15px",margin:0}}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:"56px"}}>
          <p style={{...bodyS,marginBottom:"20px"}}>Still have questions? We're always happy to chat.</p>
          <a href={WHATSAPP_CONNECT} target="_blank" rel="noreferrer" style={btnP}>Ask Us Anything →</a>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/* ── HOME PAGE ── */
function HomePage(){
  return(
    <>
      <Hero/>
      <SchoolLogos/>
      <NotTypical/>
      <CommunityProof/>
      <LinkedInFeatures/>
      <HowItWorks/>
      <ServicesSection/>
      <AdmissionsSection/>
      <Community/>
      <TeamSection/>
      <TestimonialsSection/>
      <CTA/>
    </>
  );
}

/* ── APP ── */
export default function App(){
  const [page,setPage]=useState("home");
  return(
    <div style={{background:"#fff",minHeight:"100vh",color:DARK,overflowX:"hidden"}}>
      <Navbar page={page} setPage={setPage}/>
      {page==="home"&&<HomePage/>}
      {page==="faq"&&<FAQPage/>}
      <Footer/>
      <StickyWhatsApp/>
    </div>
  );
}
