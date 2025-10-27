'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar, MessageSquare, Search, Tag, ArrowRight } from 'lucide-react';

// ****************************************************************************************************
// 0. DUMMY DATA (Simulating fetched data for a single blog post)
// ****************************************************************************************************

interface BlogPostDetail {
    title: string;
    author: string;
    date: string;
    category: string;
    comments: number;
    mainImage: string;
    content: { type: 'paragraph' | 'heading' | 'quote' | 'image', value: string }[];
}

interface SidebarItem {
    id: number;
    title: string;
    date: string;
}

const DUMMY_POST_DATA: BlogPostDetail = {
    title: 'Cras ornare tristique.',
    author: 'John Doe',
    date: 'Nov 22, 2018',
    category: 'Lifestyle, Shopping',
    comments: 2,
    mainImage: 'https://images.unsplash.com/photo-1530536476203-d77e573bc524?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170', // Main blog image
    content: [
        { type: 'paragraph', value: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.' },
        { type: 'paragraph', value: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.' },
        { type: 'heading', value: 'Quisque volutpat mattis eros.' },
        { type: 'paragraph', value: 'Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.' },
        { type: 'paragraph', value: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Sed ac erat et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor.' },
        { type: 'image', value: 'https://images.unsplash.com/photo-1569937301263-f2f643acf151?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170' }, // Image inside content
        { type: 'quote', value: 'Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.' },
        { type: 'paragraph', value: 'Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Sed ac erat et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Cras ornare tristique elit.' },
    ],
};

const DUMMY_RECENT_POSTS: SidebarItem[] = [
    { id: 1, title: 'Lorem ipsum dolor sit.', date: 'Dec 12, 2018' },
    { id: 2, title: 'Vestibulum ante ipsum.', date: 'Nov 20, 2018' },
    { id: 3, title: 'Aenean ac urna et leo.', date: 'Oct 15, 2018' },
];

const DUMMY_CATEGORIES: string[] = [
    'Fashion', 'Lifestyle', 'Shopping', 'Travel', 'Hobbies', 'Technology'
];

const DUMMY_TAGS: string[] = [
    'bag', 'dresses', 'shoes', 'fashion', 'men', 'style', 'women'
];


// ****************************************************************************************************
// 1. Single Blog Post Content Component
// ****************************************************************************************************

const BlogPostContent: React.FC<{ post: BlogPostDetail }> = ({ post }) => {

    const renderContent = (item: { type: string, value: string }, index: number) => {
        switch (item.type) {
            case 'heading':
                return <h3 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4">{item.value}</h3>;
            case 'paragraph':
                return <p key={index} className="text-gray-600 leading-relaxed mb-4">{item.value}</p>;
            case 'quote':
                return (
                    <blockquote key={index} className="border-l-4 border-orange-400 pl-6 py-3 my-6 italic bg-gray-50 text-gray-700">
                        {item.value}
                    </blockquote>
                );
            case 'image':
                return (
                    <div key={index} className="my-8 relative w-full h-80 -lg overflow-hidden">
                        <Image src={item.value} alt="Blog content illustration" fill style={{ objectFit: 'cover' }} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <article className="lg:pr-8">
            {/* Main Image */}
            <div className="relative w-full h-96 mb-8 -xl overflow-hidden shadow-md">
                <Image src={post.mainImage} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 65vw" style={{ objectFit: 'cover' }} priority />
            </div>

            {/* Post Meta */}
            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <span className="flex items-center"><User className="w-4 h-4 mr-1 text-orange-400" /> By {post.author}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1 text-orange-400" /> {post.date}</span>
                <span className="flex items-center"><MessageSquare className="w-4 h-4 mr-1 text-orange-400" /> {post.comments} Comments</span>
            </div>

            {/* Post Title */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{post.title}</h1>

            {/* Content Body */}
            <div>
                {post.content.map(renderContent)}
            </div>

            {/* Tags and Social Share */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-b border-gray-200 py-4 mt-8">
                <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-700 mb-3 sm:mb-0">
                    <Tag className="w-4 h-4 text-orange-400" />
                    <span className="font-semibold">Tags:</span>
                    {DUMMY_TAGS.map(tag => (
                        <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`} className="text-gray-500 hover:text-orange-400 transition duration-200">
                            {tag}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center space-x-3 text-sm">
                    <span className="font-semibold text-gray-700">Share:</span>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-200"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="text-gray-500 hover:text-purple-600 transition duration-200"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="text-gray-500 hover:text-red-500 transition duration-200"><i className="fab fa-pinterest-p"></i></a>
                </div>
            </div>

            {/* Author Box - Optionally add an author box here */}
            {/* <AuthorBox author={post.author} /> */}

            {/* Comment Section (Simplified) */}
            <CommentSection />
        </article>
    );
}

// ****************************************************************************************************
// 2. Sidebar Component
// ****************************************************************************************************

const Sidebar: React.FC = () => {
    return (
        <aside className="space-y-10 lg:pl-4">
            {/* Search Widget */}
            <div className="border border-gray-200 -lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Search</h4>
                <div className="relative">
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full py-2 pl-4 pr-10 border border-gray-300 -md focus:ring-orange-400 focus:border-orange-400"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Categories Widget */}
            <div className="border border-gray-200 -lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Categories</h4>
                <ul className="space-y-2">
                    {DUMMY_CATEGORIES.map(cat => (
                        <li key={cat} className="flex justify-between items-center text-gray-600 hover:text-orange-400 transition duration-200">
                            <Link href={`/blog/category/${cat.toLowerCase()}`} className="flex-1">{cat}</Link>
                            {/* <span className="text-xs text-gray-400">(12)</span> Optional count */}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="border border-gray-200 -lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Recent Posts</h4>
                <ul className="space-y-4">
                    {DUMMY_RECENT_POSTS.map(post => (
                        <li key={post.id}>
                            <Link href={`/blog/${post.id}`} className="block text-sm font-semibold text-gray-700 hover:text-orange-400 transition duration-200">
                                {post.title}
                            </Link>
                            <span className="text-xs text-gray-500 flex items-center mt-1">
                                <Calendar className="w-3 h-3 mr-1" />
                                {post.date}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tags Widget */}
            <div className="border border-gray-200 -lg p-5">
                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {DUMMY_TAGS.map(tag => (
                        <Link key={tag} href={`/blog/tag/${tag.toLowerCase()}`} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 -full hover:bg-orange-400 hover:text-white transition duration-200">
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
};

// ****************************************************************************************************
// 3. Comment Section (Simplified Client Component)
// ****************************************************************************************************

const CommentSection: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation and alert for demonstration
        if (name && email && comment) {
            alert(`Comment submitted by ${name}. Content: "${comment.substring(0, 30)}..."`);
            setName('');
            setEmail('');
            setComment('');
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Leave a Reply</h3>
            <p className="text-gray-600 mb-6">Your email address will not be published. Required fields are marked *</p>
            
            <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                    <textarea
                        id="comment"
                        rows={6}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="w-full border border-gray-300 -md p-3 focus:ring-orange-400 focus:border-orange-400"
                    ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-gray-300 -md p-3 focus:ring-orange-400 focus:border-orange-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 -md p-3 focus:ring-orange-400 focus:border-orange-400"
                        />
                    </div>
                </div>
                
                <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-orange-500 text-white font-semibold -lg shadow-md hover:bg-orange-600 transition duration-200"
                >
                    Post Comment
                    <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </form>
        </div>
    );
};


// ****************************************************************************************************
// 4. Main Page Component
// ****************************************************************************************************

export default function BlogDetailPage() {
    // This could simulate fetching data based on the slug from URL params
    const postData = DUMMY_POST_DATA; 
    
    // In a real app, you might add a loading or 404 state check here
    if (!postData) {
        return <div className="text-center py-20">Post not found.</div>;
    }

    return (
        <div className="min-h-screen bg-white mt-10">
            {/* Breadcrumb - Optional, can be added via a Layout or separate component */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
                <Link href="/">Home</Link> &gt; <Link href="/blog">Blog</Link> &gt; <span>{postData.title}</span>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content Area (2/3 width on large screens) */}
                    <div className="lg:col-span-2">
                        <BlogPostContent post={postData} />
                    </div>
                    
                    {/* Sidebar Area (1/3 width on large screens) */}
                    <div className="lg:col-span-1">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </div>
    );
}