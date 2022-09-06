import { DefaultLayout } from '@layouts/default';
import { trpc } from "@lib/trpc";
import { allPosts, Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { GetStaticProps, NextPage } from 'next';
import Link from "next/link";
import readingTime from "reading-time";

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
  const postViews = trpc.useQuery([''])
  return (
    <DefaultLayout title="Posts - Lucas Norgaard">
      <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
        Posts
      </h1>
      {posts.map((post) => (
        <Link href={post.url} key={post._id}>
            <div className="p-4 mb-6 transition-all duration-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200">
              <h3 className="text-2xl text-t-pink">{post.title}</h3>
              <p className="pt-4 text-slate-200">{post.description}</p>

              <div className="flex items-center gap-2 pt-4 text-sm text-">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <span>•</span>
                <span>{readingTime(post.body.code).text}</span>
                <span>•</span>
                <span>{readingTime(post.body.code).text}</span>
              </div>
            </div>
        </Link>
      ))}
    </DefaultLayout>
  );
};

export default PostsPage;
