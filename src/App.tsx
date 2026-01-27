import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlogCard from './components/BlogCard';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import { BlogCardSkeleton, BlogDetailSkeleton } from './components/BlogSkeleton';
import { blogService } from './services/blogService';

const queryClient = new QueryClient();

const BlogApp: React.FC = () => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
  });

  const { data: selectedBlog, isLoading: blogLoading } = useQuery({
    queryKey: ['blog', selectedBlogId],
    queryFn: () => blogService.getBlogById(selectedBlogId!),
    enabled: !!selectedBlogId,
  });

  React.useEffect(() => {
    if (blogs && blogs.length > 0 && !selectedBlogId) {
      setSelectedBlogId(blogs[0].id);
    }
  }, [blogs, selectedBlogId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <header className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-3">CA Monk Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends in finance, accounting, and career growth
          </p>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-4">Latest Articles</h2>
            <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
              {blogsLoading ? (
                <>
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                  <BlogCardSkeleton />
                </>
              ) : (
                blogs?.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={blog.id === selectedBlogId}
                    onClick={() => setSelectedBlogId(blog.id)}
                  />
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {blogLoading ? (
              <BlogDetailSkeleton />
            ) : selectedBlog ? (
              <BlogDetail blog={selectedBlog} />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400">
                Select a blog to read
              </div>
            )}
          </div>
        </div>

        <BlogForm />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogApp />
    </QueryClientProvider>
  );
}

export default App;