import { defineDocumentType, makeSource } from 'contentlayer/source-files';
/* import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { meta } from './src/lib/mdx';
 */
const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true
    },
    public: {
      type: 'boolean',
      description: 'Is the post public?',
      required: true
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`
    }
  }
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    
  }
});
