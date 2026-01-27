import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Share2, ThumbsUp, MessageSquare } from 'lucide-react';
import type { Blog } from '../types/blog';

interface BlogDetailProps {
  blog: Blog;
}

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
    <Card className="h-full overflow-auto">
      <CardContent className="p-6">
        <div className="mb-4">
          <Badge variant="secondary" className="mb-3">
            {blog.category.join(' & ')}
          </Badge>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Article
          </Button>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 pb-6 border-b">
          <div>
            <span className="font-medium text-foreground">Category</span>
            <p>{blog.category.join(' & ')}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Read Time</span>
            <p>{calculateReadTime(blog.content)}</p>
          </div>
          <div>
            <span className="font-medium text-foreground">Date</span>
            <p>{formatDate(blog.date)}</p>
          </div>
        </div>

        <img 
          src={blog.coverImage} 
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="prose max-w-none">
          {blog.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {blog.author && (
          <div className="mt-8 pt-6 border-t flex items-center gap-4">
            <img 
              src={blog.author.image} 
              alt={blog.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{blog.author.name}</p>
              <p className="text-sm text-muted-foreground">{blog.author.role}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogDetail;