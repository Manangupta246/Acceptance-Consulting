import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://lbrcrknnivxkqvryzamr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxicmNya25uaXZ4a3F2cnl6YW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNTQ2OTUsImV4cCI6MjA1ODczMDY5NX0.PqGMAsEfMFCmajjm1ERCaGKpV4sdE_Bfat3JjnuR7YA"
);

export default async function sitemap() {
  var staticPages = [
    { url: "https://www.acceptanceconsulting.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.acceptanceconsulting.com/schools", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://www.acceptanceconsulting.com/leaderboard", lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: "https://www.acceptanceconsulting.com/study-partner", lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: "https://www.acceptanceconsulting.com/forum", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: "https://www.acceptanceconsulting.com/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://www.acceptanceconsulting.com/faq", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  // Fetch blog posts
  var blogPages = [];
  try {
    var { data: posts } = await supabase.from("posts").select("slug, updated_at").eq("published", true);
    if (posts) {
      blogPages = posts.map(function(p) {
        return { url: "https://www.acceptanceconsulting.com/blog/" + p.slug, lastModified: new Date(p.updated_at), changeFrequency: "monthly", priority: 0.7 };
      });
    }
  } catch(e) {}

  // Fetch forum posts
  var forumPages = [];
  try {
    var { data: threads } = await supabase.from("forum_posts").select("id, title, updated_at").order("created_at", { ascending: false }).limit(100);
    if (threads) {
      forumPages = threads.map(function(t) {
        return { url: "https://www.acceptanceconsulting.com/forum/" + t.id, lastModified: new Date(t.updated_at), changeFrequency: "weekly", priority: 0.6 };
      });
    }
  } catch(e) {}

  return [...staticPages, ...blogPages, ...forumPages];
}
