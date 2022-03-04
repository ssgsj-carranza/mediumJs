import Header from '../../components/Header';
import {sanityClient, urlFor} from '../../sanity';

function Post() {
    return (
        <main>
            <Header />
        </main>
)}

export default Post;

//pre-fetching all the routes
export const getStaticPaths = async () => {
    const query = `*[_type == 'post] {
        _id,
        slug {
            current
        }
    }`;
    const posts = await sanityClient.fetch(query);
}