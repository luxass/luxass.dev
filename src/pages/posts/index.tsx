import { DefaultLayout } from '@layouts/default';
import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { GetStaticProps, NextPage } from 'next';

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

const Posts: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <DefaultLayout title="Lucas Norgaard - Posts">
      <h1>Posts</h1>
      {JSON.stringify(posts)}
    </DefaultLayout>
  );
};

export default Posts;
