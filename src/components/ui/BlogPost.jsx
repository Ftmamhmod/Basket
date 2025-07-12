import React from "react";
import { Calendar, User } from "lucide-react";

const BlogPost = ({ title, date, author, excerpt, image }) => {
  return (
    <article
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden 
      `}
    >
      <div className={` "aspect-[16/9]" overflow-hidden`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className={`p-4 md:p-8`}>
        <h2
          className={`font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors cursor-pointer
            text-2xl md:text-3xl 
          `}
        >
          {title}
        </h2>
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span>{author}</span>
          </div>
        </div>
        <p
          className={`text-gray-600 leading-relaxed 
            "text-base"
          `}
        >
          {excerpt}
        </p>
      </div>
    </article>
  );
};

export default BlogPost;
