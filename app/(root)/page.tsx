import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {
  searchParams: Promise<{ query?: string}>
}) {

    const query = (await searchParams).query;
   
    const params = { search: query || null};
    // const posts = await client.fetch(STARTUPS_QUERY)

    const session = await auth();

    console.log(`this is the id ${session?.id}`);
    

    const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params})
    
    // console.log(JSON.stringify(posts, null, 2));
    

  //   const posts = [{
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: 'John Carter'},
  //     _id: 1,
  //     description: 'This is the description',
  //     image: 'https://images.pexels.com/photos/29783679/pexels-photo-29783679/free-photo-of-elegant-woman-in-traditional-vietnamese-dress.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     category: 'Community',
  //     title: 'woMenMoney'
  //   },
  // ]
  return (
    <>
      <section className=" pink_container ">
      <h1 className="heading">Present Your Ideas, and Stories  Connect With People</h1>
      <p className="sub-heading !max-w-3xl">
        Your ideas and stories hold the power to inspire change—share them with the world and see how far they can go.
      </p>

      <SearchForm query={query}/>
      </section>
      <section className=" section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : `All Startups` }
        </p>
        <ul className="mt-7 card_grid">
            {
              posts?.length > 0 ? (
                posts.map((post: StartupTypeCard, index: number)=>(
                  <StartupCard key={post?._id} post={post}/>
                ))
              ) : (
                <p className="no-results">No Idea or Story found</p>
              )
            }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
