import {createImageUrlBuilder, createCurrentUserHook, createClient} from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'production',
};

//set up the client for fetching data in the getProps page functions, make queries
export const sanityClient = createClient(config);
//set up helper function for generating Image Urls with only the asset reference data in your documents

// export const urlFor = (source) => createImageUrlBuilder(config).image(source);

//helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

const builder = imageUrlBuilder(config)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export const urlFor = (source) => {
  return builder.image(source)
}