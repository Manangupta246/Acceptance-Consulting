import { createClient } from '@supabase/supabase-js';
import ForumPostClientPage from './ForumPostClientPage';

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: post } = await supabaseServer
    .from('forum_posts')
    .select('title, content, created_at, profiles:forum_posts_author_id_fkey(full_name)')
    .eq('id', id)
    .single();

  if (!post) {
    return { title: 'Post Not Found | Acceptance Consulting Forum' };
  }

  const description = post.content?.slice(0, 160) || post.title;

  return {
    title: `${post.title} | Acceptance Consulting Forum`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.created_at,
    },
  };
}

export default async function ForumPostPage({ params }) {
  const { id } = await params;

  const [{ data: post }, { data: comments }] = await Promise.all([
    supabaseServer
      .from('forum_posts')
      .select('*, profiles:forum_posts_author_id_fkey(full_name, avatar_url), forum_categories(name, slug, icon)')
      .eq('id', id)
      .single(),
    supabaseServer
      .from('forum_comments')
      .select('*, profiles:forum_comments_author_id_fkey(full_name, avatar_url)')
      .eq('post_id', id)
      .order('created_at', { ascending: true }),
  ]);

  return <ForumPostClientPage post={post} comments={comments || []} postId={id} />;
}
