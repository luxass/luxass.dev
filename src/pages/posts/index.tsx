import { DefaultLayout } from '@layouts/default';
import { GetStaticProps, NextPage } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  // const posts = await getPosts().filter((post) => post.published);

  return {
    props: {},
    revalidate: 3600
  };
};

const Posts: NextPage<{}> = ({}) => {
  return <DefaultLayout title="Lucas Norgaard - Posts"></DefaultLayout>;
};

export default Posts;
