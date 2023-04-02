import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import {  useMemo } from 'react';
import {getMDXComponent} from 'mdx-bundler/client'
import rehypePrismPlus from 'rehype-prism-plus'
import matter from 'gray-matter';


export async function  getStaticProps() {
  const fileName = fs.readFileSync('data/blog-fubruary-2023.mdx','utf-8');

  const { data: frontmatter } = matter(fileName);

  const { code } =  await bundleMDX({
    source: fileName,
  mdxOptions(options) {
    options.remarkPlugins = [...(options.remarkPlugins ?? []), ]
    options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrismPlus]
    return options
  },
    
  })

  return {
    props: {
      frontmatter ,
      code ,
    }
  };
}


export default function Home({code,frontmatter}) {
  const Component = useMemo (() => getMDXComponent(code),[code]);
  return (
    <div className='prose  mx-auto mt-12 md:mt-36 max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 '>
      <h1 className='text-sky-500  eng text-center text-2xl'>{frontmatter.title}</h1>
      <article>
       <Component/>
     </article>
    </div>
  )
}
