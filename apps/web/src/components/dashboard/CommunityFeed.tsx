'use client';
import React from 'react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  isLiked?: boolean;
}

const fakePosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/40?img=1',
      role: 'Senior Developer'
    },
    content: 'Just deployed our new algorithm optimization feature! 🚀 The performance improvements are incredible - we&apos;re seeing 40% faster processing times. Anyone else working on similar optimizations?',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ['algorithm', 'optimization', 'performance'],
    isLiked: true
  },
  {
    id: '2',
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      role: 'Data Scientist'
    },
    content: 'Excited to share our latest ML model results! We\'ve achieved 94% accuracy on the classification task. The key was implementing ensemble methods with proper cross-validation. What\'s your experience with ensemble learning?',
    timestamp: '4 hours ago',
    likes: 18,
    comments: 12,
    shares: 5,
    tags: ['machine-learning', 'ensemble', 'classification'],
    isLiked: false
  },
  {
    id: '3',
    author: {
      name: 'Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      role: 'Product Manager'
    },
    content: 'Big milestone today! Our team shipped the new recommendation engine to production. Users are already seeing 25% better suggestions. Thanks to everyone who contributed to this project! 🙏',
    timestamp: '6 hours ago',
    likes: 31,
    comments: 15,
    shares: 7,
    tags: ['recommendations', 'production', 'milestone'],
    isLiked: true
  },
  {
    id: '4',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      role: 'Backend Engineer'
    },
    content: 'Just finished implementing real-time data streaming with Apache Kafka. The latency is down to under 50ms! Anyone have tips for optimizing Kafka configurations for high-throughput scenarios?',
    timestamp: '8 hours ago',
    likes: 22,
    comments: 9,
    shares: 4,
    tags: ['kafka', 'streaming', 'real-time'],
    isLiked: false
  },
  {
    id: '5',
    author: {
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      role: 'Frontend Developer'
    },
    content: 'Finally got our React component library published! 🎉 Includes 50+ reusable components with full TypeScript support and comprehensive documentation. Check it out and let me know what you think!',
    timestamp: '1 day ago',
    likes: 45,
    comments: 23,
    shares: 12,
    tags: ['react', 'typescript', 'components'],
    isLiked: true
  }
];

export default function CommunityFeed() {
  const [posts, setPosts] = React.useState<CommunityPost[]>(fakePosts);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  return (
    <div className="h-full bg-white border-2 border-black rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 border-black">
        <h2 className="text-xl font-semibold text-black">Community Feed</h2>
        <p className="text-sm text-black mt-1">Stay updated with your team&apos;s latest achievements</p>
      </div>

      {/* Feed Content */}
      <div className="h-full overflow-y-auto">
        <div className="p-4 space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border-2 border-black rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Post Header */}
              <div className="flex items-center space-x-3 mb-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-black"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-black">{post.author.name}</h3>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                      {post.author.role}
                    </span>
                  </div>
                  <p className="text-xs text-black">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-black mb-3 leading-relaxed">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white text-black border border-black px-1.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-black">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      post.isLiked 
                        ? 'text-black' 
                        : 'text-black hover:text-gray-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-black hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-sm text-black hover:text-gray-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
