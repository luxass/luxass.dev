import { allPosts, Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { Components } from '~/components/MDX';
import readingTime from 'reading-time';
import { DefaultLayout } from '~/layouts/default';
import { trpc } from '~/lib/trpc';
import { BiTime } from 'react-icons/bi';
import { TbNotes, TbEye } from 'react-icons/tb';

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params!.slug
  );
  if (post?.published) {
    return {
      props: {
        post
      }
    };
  }
  return {
    props: {
      post
    }
  };
};

const PostLayout = ({ post }: { post: Post }) => {
  const MDXContent = useMDXComponent(post.body.code);
  const views = trpc.useQuery(['views.add', post.url], {
    refetchOnWindowFocus: false
  });
  return (
    <DefaultLayout title={post.title}>
      <article className="px-2 text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-bold bold-text">{post.title}</h1>
        <div className="pt-4">
          <div className="flex items-center gap-2">
            <TbNotes />
            <time dateTime={post.date} className="text-slate-200">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </div>

          <div className="flex items-center gap-2">
            <BiTime /> {readingTime(post.body.code).text}
          </div>

          <div className="flex items-center gap-2">
            <TbEye />  {`${
                views.data?.count
                  ? new Number(views.data.count).toLocaleString()
                  : '–––'
              } views`}
          </div>
        </div>

        <div className="pt-12" />
        <div className="prose prose-indigo prose-a:text-blue-400 prose-a:opacity-90 prose-a:transition-opacity hover:prose-a:opacity-100 prose-invert">
          <MDXContent components={Components} />
        </div>
      </article>
    </DefaultLayout>
  );
};

export default PostLayout;
