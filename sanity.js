import {createImageUrlBuilder, createCurrentUserHook, createClient} from 'next-sanity';

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'production',
};

//set up the client for fetching data in the getProps page functions, make queries
export const sanityClient = createClient(config);
//set up helper function for generating Image Urls with only rhe asset reference data in your documents
export const urlFor = (source) => createImageUrlBuilder(config).image(source);