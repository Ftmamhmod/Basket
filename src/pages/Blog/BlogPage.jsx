import BlogPost from "../../components/ui/BlogPost";
import { Mail } from "lucide-react";
import blog1 from "./../../assets/img/blog1.png";
import blog2 from "./../../assets/img/blog2.png";
import recentPosts1 from "./../../assets/img/recent1.png";
import recentPosts2 from "./../../assets/img/recent2.png";
import recentPosts3 from "./../../assets/img/recent3.png";
import happyHour from "./../../assets/img/happyHour.png";

const BlogPage = () => {
  const mainPost = {
    title: "But I must explain to you how all this mistaken idea",
    date: "Jan 17, 2018",
    author: "Dima Perk",
    excerpt:
      "Dorem interdum face diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros tempor lorem, vitae suscipit lorem enim sit amet lectus. Quisque egestas lorem ut nulla aliquam...",
    image: blog1,
  };

  const secondaryPost = {
    title: "The Problem With Typefaces on the Web",
    date: "Jan 17, 2018",
    author: "Dima Perk",
    excerpt:
      "Dorem interdum face diam sit amet faucibus. Vivamus pellentesque, sem sed convallis ultricies, ante eros tempor lorem, vitae suscipit lorem enim sit amet lectus. Quisque egestas lorem ut nulla aliquam...",
    image: blog2,
  };

  const socialLinks = [
    { name: "Facebook", color: "bg-blue-600", href: "#" },
    { name: "Instagram", color: "bg-pink-500", href: "#" },
    { name: "LinkedIn", color: "bg-blue-700", href: "#" },
    { name: "Twitter", color: "bg-blue-400", href: "#" },
    { name: "YouTube", color: "bg-red-600", href: "#" },
    { name: "Pinterest", color: "bg-red-500", href: "#" },
  ];
  const tags = [
    "advertising",
    "best",
    "grocery",
    "summary",
    "organic",
    "sharp",
    "website",
    "visual",
  ];
  const recentPosts = [
    {
      title: "Get Premium Style in Business Apps, Business Style",
      image: recentPosts1,
    },
    {
      title: "Top Problems With Typefaces on the Web",
      image: recentPosts2,
    },
    {
      title: "English Breakfast Tea with Tasty Brand Concerns",
      image: recentPosts3,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BlogPost {...mainPost} />
            <BlogPost {...secondaryPost} />

            {/* Pagination dots */}
            <div className="flex justify-center space-x-2 mt-8">
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                RECENT POSTS
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex space-x-3 group cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        loading="lazy"
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*Social Media Links*/}

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                SOCIAL MEDIA
              </h3>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block ${link.color} text-white text-center py-3 px-4 rounded hover:opacity-90 transition-opacity duration-200 font-medium text-sm uppercase tracking-wide`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="  rounded-lg  m-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Widget Banner
                </h3>
                <img loading="lazy" width={"100%"} src={happyHour} alt="" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">TAGS</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
