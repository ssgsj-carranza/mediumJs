import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import {sanityClient, urlFor} from '../../sanity';
import { Post } from '../../typings';
import PortableText from 'react-portable-text';
import {useForm, SubmitHandler} from 'react-hook-form';
import { useState } from 'react';

interface Props {
    post: Post;
}

interface IFormInput {
    _id: string;
    name: string;
    email: string;
    comment: string;
}

function Post({post}: Props) {
    const [submitted, setSubmitted] = useState(false);
    //connects our form
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();

    //push data from form to api backend, post api request, update data on backend
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        fetch('/api/createComment', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then(() => {
            console.log(data);
            setSubmitted(true);
        }).catch((err) => {
            console.log(err);
            setSubmitted(false);
        }); 
    };

    return (
        <main>
            <Header />
            <img className="w-full h-40 px-2 object-cover rounded-bl-3xl rounded-tr-3xl"
                 src={urlFor(post.mainImage).url()!} 
                 alt="" 
            />
            <article className="max-w-3xl mx-auto p-5">
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>
                <div className='flex items-center space-x-2'>
                    <img className="h-10 w-10 rounded-full"
                         src={urlFor(post.author.image).url()!} 
                         alt="" 
                    />
                    <p className="font-extralight text-sm">Blog post by <span className='text-emerald-800'>{post.author.name}</span> - Published at {new Date(post._createdAt).toLocaleString()}</p>
                </div>
                
                <div className='mt-10'>
                    <PortableText
                        className="" 
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={
                            {
                                h1: (props: any) => (
                                    <h1 className='text-2xl font-bold my-5' {...props}/>
                                ),
                                h2: (props: any) => (
                                    <h1 className='text-2xl font-bold my-5' {...props}/>
                                ),
                                li: ({children}: any) => (
                                    <li className='ml-4 list-disc'>{children}</li>
                                ),
                                link: ({href, children}: any) => (
                                    <a href={href} className='text-blue-500 hover:underline'>{children}</a>
                                ),
                            }
                        }
                    />
                </div>

            </article>
            <hr className='max-w-lg my-5 mx-auto border border-emerald-400'/>

            {submitted ? (
                <div className='flex flex-col p-10 my-10 bg-emerald-200 max-w-2xl mx-auto rounded-bl-3xl rounded-tr-3xl'>
                    <h3 className='text-3xl font-bold'>Thank you for submitting a comment!</h3>
                    <p className='text-sm text-gray-500'>Once it has been approved it will appear below</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-5 mx-auto mb-10 max-w-2xl'>
                <h3 className='text-sm text-emerald-500'>Enjoyed this article?</h3>
                <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
                <hr className='py-3 mt-2'/>
                
                <input 
                    {...register("_id")}
                    type='hidden'
                    name="_id"
                    value={post._id}
                />

                <label className='block mb-5'>
                    <span className='text-gray-700 font-semibold'>Name</span>
                    <input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-emerald-200 outline-none focus:ring' 
                           type='text' 
                           placeholder='Name here' 
                           {...register("name", {required: true})} 
                    />
                </label>
                <label className='block mb-5'>
                    <span className='text-gray-700 font-semibold'>Email</span>
                    <input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-emerald-200 outline-none focus:ring' 
                           type='email' 
                           placeholder='Email here'
                           {...register("email", {required: true})} 
                    />
                </label>
                <label className='block mb-5'>
                    <span className='text-gray-700 font-semibold'>Comment</span>
                    <textarea className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-emerald-200 outline-none focus:ring' 
                              placeholder='Add comment' 
                              rows={8}
                              {...register("comment", {required: true})}
                    />
                </label>
                {/* error will return if any of the required fields is left empty */}
                <div className='flex flex-col p-5'>
                    {errors.name && (
                        <span className='text-red-500'>*Name is required</span>
                    )}
                    {errors.email && (
                        <span className='text-red-500'>*Email is required</span>
                    )}
                    {errors.comment && (
                        <span className='text-red-500'>*Comment is required</span>
                    )}
                </div>
                <input className='border px-4 py-1 rounded-full border-emerald-200 hover:border-none hover:text-white hover:bg-emerald-200 transition duration-200 ease-out hover:shadow-lg' type='submit'/>
            </form>
            )}
            {/* comments */}
            <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-emerald-300 shadow space-y-2'>
                <h3 className='text-4xl'>Comments</h3>
                <hr />
                {post.comments.map((comment) => (
                    <div key={comment._id}>
                        <p>
                            <span className='font-bold'>{comment.name}: </span>
                            {comment.comment}
                        </p>
                    </div>
                ))}
            </div>
            
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