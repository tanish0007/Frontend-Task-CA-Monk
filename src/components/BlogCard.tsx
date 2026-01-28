import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import type { Blog } from '../types/blog';
import { formatDistanceToNow } from '../utils/dateUtils';
import { DollarSign, Briefcase, BookOpen, Code, Scale, TrendingUp, Heart } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  isSelected: boolean;
  onClick: () => void;
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

const BlogCard: React.FC<BlogCardProps> = ({ blog, isSelected, onClick }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'border-l-4 border-l-primary bg-primary/5 dark:bg-primary/10' 
          : 'dark:bg-gray-900 dark:border-gray-800'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className={`text-xs flex items-center gap-1 ${isSelected ? 'bg-white dark:bg-gray-800' : ''}`}>
            {getCategoryIcon(blog.category[0])}
            {blog.category[0]}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(blog.date)}
          </span>
        </div>
        
        <h3 className="font-semibold text-base mb-2 line-clamp-1 dark:text-white">
          {blog.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {blog.description}
        </p>

        {isSelected && (
          <Badge variant="outline" className={`text-xs ${isSelected ? 'bg-white dark:bg-gray-800' : ''}`}>
            Featured
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCard;