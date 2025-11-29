"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// **********************************************
// 1. TypeScript Interface: ব্লগ পোস্টের ডেটা টাইপ
// **********************************************
interface BlogPost {
  id: number;
  title: string;
  date: string;
  comments: number;
  imageUrl: string;
  altText: string;
}

// **********************************************
// 2. ডামি ডেটা Array (যা ডেটাবেস থেকে ফেচ হওয়ার কথা)
// **********************************************
const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Sed adipiscing ornare.',
    date: 'Nov 22, 2025',
    comments: 0,
    imageUrl: 'https://images.unsplash.com/photo-1543269664-76bc3997d9ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', // পাবলিক ফোল্ডারে এই ইমেজগুলো রাখুন
    altText: 'A book next to a plant.',
  },
  {
    id: 2,
    title: 'Fusce lacinia arcuet nulla.',
    date: 'Dec 12, 2025',
    comments: 0,
    imageUrl: 'https://images.unsplash.com/photo-1699205016830-02f55e7b44d8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
    altText: 'Man sitting on a chair.',
  },
  {
    id: 3,
    title: 'Quisque volutpat mattis eros.',
    date: 'Dec 19, 2025',
    comments: 2,
    imageUrl: 'https://images.unsplash.com/photo-1624267972402-ee8f154a3283?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=661',
    altText: 'Woman covering her face with hands.',
  },
];

// **********************************************
// 3. BlogCard কম্পোনেন্ট
// **********************************************
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="flex flex-col group transition-shadow duration-300  border border-orange-400 p-5 ">
      {/* ইমেজ সেকশন */}
      <div className="relative w-full h-64 overflow-hidden mb-4">
        <Image
          src={post.imageUrl}
          alt={post.altText}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          priority
        />
      </div>
      
      {/* মেটা ডেটা: তারিখ ও কমেন্ট */}
      <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">
        {post.date}, {post.comments} Comments
      </div>

      {/* টাইটেল */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-gray-900 transition duration-200 cursor-pointer">
        {post.title}
      </h3>

      {/* কন্টিনিউ রিডিং লিংক */}
      <a 
        href={`/blog/${post.id}`} // ডাইনামিক রুট
        className="flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition duration-200"
      >
        Continue Reading
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
};

// **********************************************
// 4. মূল BlogPage কম্পোনেন্ট
// **********************************************
const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* হেডিং */}
        <h2 className="text-3xl sm:text-4xl font-light text-center text-gray-900 mb-10 tracking-wider">
          From Our Blog
        </h2>

        {/* ব্লগ কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10  ">
          {DUMMY_BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View More Articles বাটন */}
        <div className="flex justify-center mt-12">
         <Link  href="/blog">
         
         
          <button
            onClick={() => console.log('Load more articles clicked')}
            className="flex items-center cursor-pointer px-6 py-3 border border-gray-400 text-gray-700 font-semibold text-sm uppercase tracking-wider rounded hover:bg-gray-50 transition duration-200"
          >
            View More Articles
            <ArrowRight className="w-4 h-4 ml-3" />
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;