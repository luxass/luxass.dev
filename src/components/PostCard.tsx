import { trpc } from '~/lib/trpc';
import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import readingTime from 'reading-time';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const views = trpc.views.get.useQuery(post.url);
  return (
    <Link href={post.url} key={post._id} passHref>
      <div className="p-4 mb-6 transition-all duration-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200">
        <h3 className="text-2xl">{post.title}</h3>
        <p className="pt-4 text-gray-800 dark:text-gray-200">
          {post.description}
        </p>

        <div className="flex items-center gap-2 pt-4 text-sm text-">
          <time dateTime={post.date}>
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
          <span>•</span>
          <span>{readingTime(post.body.code).text}</span>
          <span>•</span>
          <span>
            {`${
              views.data?.count
                ? new Number(views.data.count).toLocaleString()
                : '–––'
            } views`}
          </span>
        </div>
      </div>
    </Link>
  );
}
