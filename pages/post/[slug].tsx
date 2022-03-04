import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import {sanityClient, urlFor} from '../../sanity';
import { Post } from '../../typings';

interface Props {
    post: Post;
}

function Post({post}: Props) {
    return (
        <main>
            <Header />
            <img className="w-fit mx-auto h-40 object-cover rounded-bl-3xl rounded-tr-3xl"
                 src={urlFor(post.mainImage).url()!} 
                 alt="" 
            />
            <article className="max-w-3xl mx-auto p-5">
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
            </article>
        </main>
)}

export default Post;

//pre-fetching all the routes, prepares page, gives back array of paths(slugs)
export const getStaticPaths = async () => {
    const query = `*[_type == 'post'] {
        _id,
        slug {
            current
        }
    }`;
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current,
        },
    }));
    return {
        paths,
        fallback: 'blocking',
    };
};

//uses slugs to fetch information for each page
export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `*[_type == 'post' && slug.current == $slug] [0]{
        _id,
        _createdAt,
        title,
        author -> {
        name,
        image,
      },
      'comments': *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true
      ],
        description,
        mainImage,
        slug,
        body
      }`

      const post = await sanityClient.fetch(query, {
          slug: params?.slug,
      });

      if(!post) {
          return {
              notFound: true,
          };
      }
      return {
          props: {
              post,
          },
          revalidate: 60, //after 60sec old cache version will be updated, server sides render page after 60sex and then caches it
      };
};