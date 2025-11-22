import BlogGrid from "../Sections/LeatestBlogGrid";
import Layout from "../Components/layout";

const BlogPage =() => {
    return(
        <div className="blog-container">
            <Layout>
                <div className="blog-sections">
                    <BlogGrid/>
                </div>
            </Layout>
        </div>
    
    )
}
export default BlogPage;