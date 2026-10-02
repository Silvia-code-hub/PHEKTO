import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPenNib,
  FaCalendarAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSearch,
} from 'react-icons/fa';
import Layout from '../Components/layout';

// ============================================
// BLOG POSTS DATA
// ============================================
const blogPosts = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010194/products/image_062.jpg',
    author: 'Surf Auxion',
    date: 'Aug 09 2020',
    title: 'Mauris at orci non vulputate diam tincidunt nec.',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim.',
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010225/products/image_063.jpg',
    author: 'Surf Auxion',
    date: 'Aug 09 2020',
    title: 'Aenean vitae in aliquam ultrices lectus. Etiam.',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus.',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010231/products/image_069.jpg',
    author: 'Surf Auxion',
    date: 'Aug 09 2020',
    title: 'Sit nam congue feugiat nisl, mauris amet nisi.',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus.',
  },
];


const categories = [
  { name: 'Hobbies', count: 14 },
  { name: 'Women', count: 21 },
  { name: 'Women', count: 21 },
  { name: 'Women', count: 21 },
  { name: 'Women', count: 21 },
  { name: 'Women', count: 21 },
];

const recentPosts = [
  { id: 1, title: 'It is a long established fact', date: 'Aug 09 2020', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010233/products/image_071.jpg' },
  { id: 2, title: 'It is a long established fact', date: 'Aug 09 2020', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010239/products/image_078.jpg' },
  { id: 3, title: 'It is a long established fact', date: 'Aug 09 2020', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010237/products/image_076.jpg' },
  { id: 4, title: 'It is a long established fact', date: 'Aug 09 2020', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010238/products/image_077.jpg' },
];

const saleProducts = [
  { id: 1, title: 'Elit ornare in enim mauris.', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010237/products/image_075.jpg' },
  { id: 2, title: 'Viverra pulvinar et enim.', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010235/products/image_073.jpg' },
  { id: 3, title: 'Mattis varius donec fdsfd', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010233/products/image_070.jpg' },
];

const offerProducts = [
  { id: 1, title: 'Duis lectus est.', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010236/products/image_074.jpg' },
  { id: 2, title: 'Netus proin.', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010201/products/image_044.jpg' },
  { id: 3, title: 'Sed placerat.', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010234/products/image_072.jpg' },
  { id: 4, title: 'Platea in.', price: '$12.00 - $15.00', image: 'https://res.cloudinary.com/dua4go47y/image/upload/v1777010213/products/image_055.jpg' },
];

const tags = ['General', 'Atsanil', 'Insas.', 'Bibsaas', 'Nulla.'];



const BlogPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Layout>

        <div className="bg-[#F6F5FF] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#101750] mb-3">
              Blog Page
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-pink-500 transition">Home</Link>
              <span>.</span>
              <span>Pages</span>
              <span>.</span>
              <span className="text-pink-500">Blog</span>
            </div>
          </div>
        </div>

       
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            
            <div className="lg:col-span-2">
              {blogPosts.map((post) => (
                <article key={post.id} className="mb-10 pb-10 border-b border-gray-100 last:border-b-0">

                  
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  </div>

                 
                  <div className="flex items-center gap-4 sm:gap-6 mb-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-500 text-white p-2 rounded text-xs">
                        <FaPenNib />
                      </span>
                      <span className="text-sm font-medium text-blue-shade">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-400 text-white p-2 rounded text-xs">
                        <FaCalendarAlt />
                      </span>
                      <span className="text-sm font-medium text-blue-shade">{post.date}</span>
                    </div>
                  </div>

                  
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-shade mb-3 hover:text-pink-500 transition cursor-pointer">
                    {post.title}
                  </h2>

                 
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                 
                  <Link
                    to="/single-blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-shade hover:text-pink-500 transition-colors group"
                  >
                    Read More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                </article>
              ))}

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-10">
                <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition text-sm">
                  1
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition text-sm">
                  2
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition text-sm">
                  3
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition text-sm">
                  →
                </button>
              </div>
            </div>

            
            <aside className="lg:col-span-1 space-y-8">

              
              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search For Posts"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500 pr-10"
                  />
                  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-3">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      className="text-left text-sm px-3 py-2 bg-pink-50 text-gray-700 hover:bg-pink-500 hover:text-white rounded transition"
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

             
              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex gap-3 items-start">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-blue-shade leading-tight hover:text-pink-500 cursor-pointer">
                          {post.title}
                        </h4>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-4">Sale Products</h3>
                <div className="space-y-4">
                  {saleProducts.map((product) => (
                    <div key={product.id} className="flex gap-3 items-start">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-blue-shade leading-tight hover:text-pink-500 cursor-pointer">
                          {product.title}
                        </h4>
                        <span className="text-xs text-pink-500 font-semibold">
                          {product.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-4">Offer Products</h3>
                <div className="grid grid-cols-2 gap-4">
                  {offerProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="w-full h-20 bg-gray-100 rounded overflow-hidden mb-2">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.jpg';
                          }}
                        />
                      </div>
                      <h4 className="text-xs font-medium text-blue-shade leading-tight">
                        {product.title}
                      </h4>
                      <span className="text-xs text-pink-500 font-semibold block mt-1">
                        {product.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

             
              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-3">Follow</h3>
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition"
                  >
                    <FaFacebookF size={12} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center hover:opacity-80 transition"
                  >
                    <FaInstagram size={12} />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center hover:opacity-80 transition"
                  >
                    <FaTwitter size={12} />
                  </a>
                </div>
              </div>

              
              <div className="bg-white">
                <h3 className="font-bold text-lg text-blue-shade mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      className="text-xs px-3 py-1 bg-pink-50 text-gray-600 hover:bg-pink-500 hover:text-white rounded transition"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        </div>

      </Layout>
    </div>
  );
};

export default BlogPage;