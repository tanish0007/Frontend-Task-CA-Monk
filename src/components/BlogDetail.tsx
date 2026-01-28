import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Share2, ThumbsUp, MessageSquare, DollarSign, Code, Briefcase, BookOpen, Scale, Heart, TrendingUp } from 'lucide-react';
import type { Blog } from '../types/blog';

interface BlogDetailProps {
  blog: Blog;
}

const getCategoryIcon = (category: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'FINANCE': <DollarSign className="w-3 h-3" />,
    'TECH': <Code className="w-3 h-3" />,
    'CAREER': <Briefcase className="w-3 h-3" />,
    'EDUCATION': <BookOpen className="w-3 h-3" />,
    'REGULATIONS': <Scale className="w-3 h-3" />,
    'LIFESTYLE': <Heart className="w-3 h-3" />,
    'SKILLS': <TrendingUp className="w-3 h-3" />,
    'TECHNOLOGY': <Code className="w-3 h-3" />,
  };
  return iconMap[category] || <BookOpen className="w-3 h-3" />;
};

const capitalizeCategory = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <Card className="h-full overflow-auto dark:bg-gray-900 dark:border-gray-800">
      <CardContent className="p-0">
        {/* Cover Image at the top - full width */}
        <img 
          src={blog.coverImage} 
          alt={blog.title}
          className="w-full h-80 object-cover"
        />
        
        <div className="p-6">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-3 flex items-center gap-1 w-fit">
              {getCategoryIcon(blog.category[0])}
              {blog.category.map(capitalizeCategory).join(' & ')}
            </Badge>
            <h1 className="text-3xl font-bold mb-4 dark:text-white">{blog.title}</h1>
            
            <Button variant="default" size="sm" className="gap-2 bg-primary hover:bg-primary/90">
              <Share2 className="w-4 h-4" />
              Share Article
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
              <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Category</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {blog.category.map(capitalizeCategory).join(' & ')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
              <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Read Time</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {calculateReadTime(blog.content)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
              <span className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date</span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatDate(blog.date)}
              </p>
            </div>
          </div>

          <div className="border-t dark:border-gray-800 pt-6 mb-6"></div>

          <div className="prose max-w-none dark:prose-invert">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {blog.author && (
            <div className="mt-8 pt-6 border-t dark:border-gray-800 flex items-center gap-4">
              <img 
                src={blog.author.image} 
                alt={blog.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold dark:text-white">{blog.author.name}</p>
                <p className="text-sm text-muted-foreground">{blog.author.role}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="ghost" size="sm" className="dark:hover:bg-gray-800">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="dark:hover:bg-gray-800">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogDetail;