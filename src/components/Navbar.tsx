import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CM</span>
            </div>
            <span className="font-bold text-xl">CA MONK</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Tools</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Practice</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Events</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Job Board</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Points</a>
          </div>

          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;