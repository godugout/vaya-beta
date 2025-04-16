
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Mic, Archive, User, Menu, Settings } from "lucide-react";

export const MainNavDemo = () => {
  const [activeNavOption, setActiveNavOption] = useState('home');
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Main Navigation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desktop Navigation Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Desktop Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 text-ui-orange mr-2">
                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 15 Q 25 5, 40 15 T 70 15" stroke="currentColor" strokeWidth="3" fill="none" />
                      <path d="M10 25 Q 25 15, 40 25 T 70 25" stroke="currentColor" strokeWidth="3" fill="none" />
                      <path d="M10 35 Q 25 25, 40 35 T 70 35" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-xl text-ui-orange">Vaya</span>
                </div>
                
                <nav className="hidden md:flex space-x-1">
                  {['home', 'stories', 'capsules', 'families'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveNavOption(item)}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                        activeNavOption === item
                          ? "text-ui-orange"
                          : "text-gray-600 dark:text-gray-300 hover:text-ui-orange"
                      }`}
                    >
                      {item === 'home' && <Home className="h-4 w-4 mr-2" />}
                      {item === 'stories' && <Mic className="h-4 w-4 mr-2" />}
                      {item === 'capsules' && <Archive className="h-4 w-4 mr-2" />}
                      {item === 'families' && <User className="h-4 w-4 mr-2" />}
                      
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                      
                      {activeNavOption === item && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ui-orange rounded-full" />
                      )}
                    </button>
                  ))}
                </nav>
                
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  <div className="h-8 w-8 rounded-full bg-ui-orange flex items-center justify-center text-white">
                    JP
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Mobile Navigation Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Mobile Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 text-ui-orange mr-2">
                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 15 Q 25 5, 40 15 T 70 15" stroke="currentColor" strokeWidth="3" fill="none" />
                      <path d="M10 25 Q 25 15, 40 25 T 70 25" stroke="currentColor" strokeWidth="3" fill="none" />
                      <path d="M10 35 Q 25 25, 40 35 T 70 35" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-xl text-ui-orange">Vaya</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                  <div className="h-8 w-8 rounded-full bg-ui-orange flex items-center justify-center text-white">
                    JP
                  </div>
                </div>
              </div>
              
              {isMenuExpanded && (
                <div className="mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {['home', 'stories', 'capsules', 'families'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveNavOption(item);
                        setIsMenuExpanded(false);
                      }}
                      className={`flex items-center w-full px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        activeNavOption === item
                          ? "bg-ui-orange/10 text-ui-orange"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item === 'home' && <Home className="h-5 w-5 mr-3" />}
                      {item === 'stories' && <Mic className="h-5 w-5 mr-3" />}
                      {item === 'capsules' && <Archive className="h-5 w-5 mr-3" />}
                      {item === 'families' && <User className="h-5 w-5 mr-3" />}
                      
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
