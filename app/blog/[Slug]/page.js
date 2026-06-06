import { createClient } from '@supabase/supabase-js';
import BlogPostClientPage from './BlogPostClientPage';

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data: post } = await supabaseServer
    .from('posts')
    .select('title, excerpt, cover_image, author_name, created_at, category')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) {
    return { title: 'Post Not Found | Acceptance Consulting' };
  }

  return {
    title: `${post.title} | Acceptance Consulting Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author_name || 'Acceptance Consulting'],
      ...(post.cover_image && { images: [{ url: post.cover_image }] }),
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const { data: post } = await supabaseServer
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  return <BlogPostClientPage post={post} slug={slug} />;
}
