
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AidaLayout } from '@/components/layout/AidaLayout';
import { Button } from '@/components/ui/button';
import { 
  Mic, 
  BookOpen, 
  User, 
  Home,
  Search,
  MessageCircle,
  Plus,
  MoreVertical,
  Bell
} from 'lucide-react';

// Sample stories/chats data
const recentChats = [
  { id: 1, name: 'Grandma Patricia', lastMessage: 'I remember when we used to...', time: '3d', unread: 2, avatar: '/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png' },
  { id: 2, name: 'Uncle James', lastMessage: 'The fishing trip was amazing!', time: '1w', unread: 0, avatar: null },
  { id: 3, name: 'Family Group', lastMessage: 'Mom: Let\'s plan the reunion', time: '2h', unread: 5, avatar: null },
  { id: 4, name: 'Cousin Sarah', lastMessage: 'I found some old photos', time: '1d', unread: 0, avatar: null },
];

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState('chats');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Navigation */}
      <header className="px-4 py-2 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/a13e3eee-a6a0-40a3-8dea-0f28af1f142e.png" 
            alt="Vaya Logo" 
            className="w-8 h-8"
          />
          <h1 className="font-semibold text-lg">Vaya</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex space-x-6">
          <button 
            className={`pb-2 text-sm font-medium ${activeTab === 'chats' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('chats')}
          >
            Chats
          </button>
          <button 
            className={`pb-2 text-sm font-medium ${activeTab === 'stories' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </button>
          <button 
            className={`pb-2 text-sm font-medium ${activeTab === 'contacts' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-16">
        {activeTab === 'chats' && (
          <div className="p-4">
            {/* New Chat Button */}
            <Link to="/chat">
              <Button className="w-full mb-4 bg-blue-500 hover:bg-blue-600 gap-2">
                <MessageCircle size={16} />
                Start New Chat
              </Button>
            </Link>
            
            {/* Chat List */}
            <div className="space-y-1">
              {recentChats.map(chat => (
                <Link to="/chat" key={chat.id}>
                  <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="relative mr-3">
                      {chat.avatar ? (
                        <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-medium">
                          {chat.name.charAt(0)}
                        </div>
                      )}
                      {chat.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'stories' && (
          <div className="p-4">
            <h2 className="text-lg font-medium mb-3">Recent Stories</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="card p-3">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center text-gray-400">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-medium text-sm">Family Memory #{i}</h3>
                  <p className="text-xs text-gray-500">Added 2d ago</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'contacts' && (
          <div className="p-4">
            <h2 className="text-lg font-medium mb-3">Family Contacts</h2>
            <div className="space-y-2">
              {['Grandma Patricia', 'Uncle James', 'Aunt Mary', 'Cousin Sarah', 'Cousin Tom'].map((name, i) => (
                <div key={i} className="flex items-center p-3 border-b border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-medium mr-3">
                    {name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{name}</h3>
                    <p className="text-xs text-gray-500">Family member</p>
                  </div>
                  <button className="p-2 text-gray-400">
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="bottom-nav-item active">
            <Home size={20} className="bottom-nav-item-icon" />
            <span className="bottom-nav-item-label">Home</span>
          </Link>
          <Link to="/record" className="bottom-nav-item">
            <Mic size={20} className="bottom-nav-item-icon" />
            <span className="bottom-nav-item-label">Record</span>
          </Link>
          <Link to="/chat" className="bottom-nav-item">
            <div className="bg-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white -mt-6">
              <Plus size={24} />
            </div>
          </Link>
          <Link to="/stories" className="bottom-nav-item">
            <BookOpen size={20} className="bottom-nav-item-icon" />
            <span className="bottom-nav-item-label">Stories</span>
          </Link>
          <Link to="/profile" className="bottom-nav-item">
            <User size={20} className="bottom-nav-item-icon" />
            <span className="bottom-nav-item-label">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
