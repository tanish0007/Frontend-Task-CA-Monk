import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import type { Blog } from '../types/blog';
import { formatDistanceToNow } from '../utils/dateUtils';

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-l-4 border-l-primary bg-primary/5' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {blog.category[0]}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(blog.date)}
          </span>
        </div>
        
        <h3 className="font-semibold text-base mb-2 line-clamp-1">
          {blog.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {blog.description}
        </p>

        {blog.category.includes('FINANCE') && (
          <Badge variant="outline" className="text-xs">Featured</Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCard;