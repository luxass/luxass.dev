import PostCard from '~/components/PostCard';
import { DefaultLayout } from '~/layouts/default';
import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import readingTime from 'reading-time';

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return {
    props: {
      posts: posts
    },
    revalidate: 3600
  };
};

const PostsPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <DefaultLayout title="Posts - Lucas Norgaard">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
        Posts
      </h1>
      {posts.map((post, idx) => (
        <PostCard post={post} key={post._id} />
      ))}
    </DefaultLayout>
  );
};

export default PostsPage;
