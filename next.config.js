/** @type {import('next').NextConfig} */
const nextConfig = { 
  images: { 
    remotePatterns: [
      { protocol: "https", hostname: "d2lk14jtvqry1q.cloudfront.net" }, 
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "lbrcrknnivxkqvryzamr.supabase.co" }
    ] 
  } 
};
module.exports = nextConfig;
