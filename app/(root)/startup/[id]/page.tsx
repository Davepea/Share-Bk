import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUPS_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React, { Suspense } from 'react'
import Link from 'next/link';
import markdownit from "markdown-it"
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';

const md = markdownit()

export const experimental_ppr = true

const page = async ({ params }: { params: Promise<{id: string}>}) => {
    const id = (await params).id;

    console.log({id});
    

    const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id});

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || "");
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'></p>

    </section>
    <section className='section_container'>
        <div className='h-[70vh] overflow-hidden'>
        <Image
        src={post.image}
        alt='thumbnail'
        className='!w-full h-full object-cover rounded-xl'
        width={1000}
        height={1000}
        />
        </div>
        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
            <div className=' flex-between gap-5'>
                <Link href={`/user/${post.author?._id}`} className=' flex gap-2 items-center mb-3'>
                    <div className=' h-[64px] w-[64px]'>
                    <Image src={post.author.image} alt='avatar' width={64} height={64} className=' rounded-full drop-shadow-lg w-full h-full object-cover'/>
                    </div>
                  <div>
                  <p className='text-20-medium'>{post.author.name}</p>
                  <p className='text-16-medium !text-black-300'>@{post.author.username}</p>
                  </div>
                </Link>
                <p className='category-tag'>{post.category}</p>
            </div>
            <h3 className='text-30-bold'>Pitch Details</h3>
            {parsedContent ? (
              <article
              className='prose max-w-4xl font-work-sans break-all'
               dangerouslySetInnerHTML={{__html: parsedContent}}
              />
            ): (
              <p className='no-result'>
                No pitch details available
              </p>
            )}
        </div>
        <hr className='divider' />
        {/* 1000: EDITOR SELECTED STARTUPS  */}

        <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          <View id={id}/>
        </Suspense>
    </section>
    <section></section>
    </>
  )
}

export default page