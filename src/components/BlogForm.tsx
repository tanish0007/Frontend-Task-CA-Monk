import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '../services/blogService';
import type { CreateBlogInput } from '../types/blog';

const BlogForm: React.FC = () => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    coverImage: '',
    content: '',
    authorName: '',
    authorRole: '',
    authorImage: '',
  });

  const createBlogMutation = useMutation({
    mutationFn: (newBlog: CreateBlogInput) => blogService.createBlog(newBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setFormData({
        title: '',
        category: '',
        description: '',
        coverImage: '',
        content: '',
        authorName: '',
        authorRole: '',
        authorImage: '',
      });
      alert('Blog created successfully!');
    },
    onError: (error) => {
      alert('Failed to create blog: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categories = formData.category.split(',').map(cat => cat.trim().toUpperCase());
    
    const newBlog: CreateBlogInput = {
      title: formData.title,
      category: categories,
      description: formData.description,
      coverImage: formData.coverImage,
      content: formData.content,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
        image: formData.authorImage,
      },
    };

    createBlogMutation.mutate(newBlog);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="max-w-4xl mx-auto my-12">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categories * (comma separated)</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., FINANCE, TECH"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary of your blog"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL *</Label>
            <Input
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              type="url"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Blog Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your full blog content here..."
              rows={10}
              required
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Author Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="authorName">Full Name *</Label>
                <Input
                  id="authorName"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorRole">Role *</Label>
                <Input
                  id="authorRole"
                  name="authorRole"
                  value={formData.authorRole}
                  onChange={handleChange}
                  placeholder="Senior Financial Analyst"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorImage">Profile Image URL *</Label>
                <Input
                  id="authorImage"
                  name="authorImage"
                  value={formData.authorImage}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  type="url"
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={createBlogMutation.isPending}
          >
            {createBlogMutation.isPending ? 'Creating...' : 'Create Blog Post'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;