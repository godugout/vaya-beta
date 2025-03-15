
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home, Mic, Archive, User, Menu, ChevronRight, ChevronDown, 
  Settings, ArrowLeft, ArrowRight, Volume2, TreeDeciduous, BookOpen
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FamilyViewSwitcher } from "@/components/family/FamilyViewSwitcher";

export const NavigationShowcase = () => {
  const [activeNavOption, setActiveNavOption] = useState('home');
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [activeScreen, setActiveScreen] = useState('home');
  const [isSimplifiedView, setIsSimplifiedView] = useState(false);
  const [activeView, setActiveView] = useState<'grid' | 'tree' | 'timeline'>('grid');

  const handleTransition = (screen: string) => {
    setActiveScreen(screen);
  };

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Main Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      onClick={() => setIsSimplifiedView(!isSimplifiedView)}
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
                
                <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1E293B] border-t border-gray-200 dark:border-gray-800 p-2 mt-4 flex justify-around">
                  {['home', 'stories', 'capsules', 'families'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveNavOption(item)}
                      className={`flex flex-col items-center p-2 rounded-md min-w-[60px] ${
                        activeNavOption === item
                          ? "text-ui-orange"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {item === 'home' && <Home className="h-5 w-5 mb-1" />}
                      {item === 'stories' && <Mic className="h-5 w-5 mb-1" />}
                      {item === 'capsules' && <Archive className="h-5 w-5 mb-1" />}
                      {item === 'families' && <User className="h-5 w-5 mb-1" />}
                      
                      <span className="text-xs">{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Hierarchy Indicators</h2>
        <Card>
          <CardHeader>
            <CardTitle>Breadcrumbs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Families</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Patel Family</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Family Tree</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              <Breadcrumb className="py-2 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <Home className="h-4 w-4" />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-ui-orange">Stories</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Record New Story</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">View Switchers</h2>
        <Card>
          <CardHeader>
            <CardTitle>Content View Switchers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FamilyViewSwitcher activeView={activeView} setActiveView={setActiveView} />
            
            <div className="flex justify-center">
              <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <Button 
                  variant={isSimplifiedView ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setIsSimplifiedView(true)}
                  className="rounded-md"
                >
                  Simplified View
                </Button>
                <Button 
                  variant={!isSimplifiedView ? 'default' : 'ghost'} 
                  size="sm"
                  onClick={() => setIsSimplifiedView(false)}
                  className="rounded-md"
                >
                  Standard View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Voice Command Indicators</h2>
        <Card>
          <CardHeader>
            <CardTitle>Voice Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-ui-orange rounded-full flex items-center justify-center text-white animate-pulse">
                    <Volume2 className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Listening...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Say a command</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Cancel</Button>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="font-medium mb-2">Try saying:</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <Mic className="h-4 w-4 mr-2 text-ui-orange" />
                    "Record a story"
                  </li>
                  <li className="flex items-center">
                    <Archive className="h-4 w-4 mr-2 text-ui-orange" />
                    "Open family capsules"
                  </li>
                  <li className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-ui-orange" />
                    "Show family tree"
                  </li>
                  <li className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-ui-orange" />
                    "Go to home screen"
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Screen Transitions</h2>
        <Tabs defaultValue="home-to-recording">
          <TabsList className="mb-4">
            <TabsTrigger value="home-to-recording">Home → Recording</TabsTrigger>
            <TabsTrigger value="recording-to-family">Recording → Family</TabsTrigger>
            <TabsTrigger value="family-to-member">Family → Member</TabsTrigger>
            <TabsTrigger value="menu-expand">Menu Expand/Collapse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="home-to-recording">
            <Card>
              <CardHeader>
                <CardTitle>Home to Recording Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" size="sm" onClick={() => handleTransition('home')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Home
                    </Button>
                    <div className="font-medium">Screen 2 of 2</div>
                  </div>
                  
                  <div className="h-40 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-ui-orange rounded-full flex items-center justify-center text-white mx-auto mb-2">
                        <Mic className="h-8 w-8" />
                      </div>
                      <p className="font-medium">Record Your Story</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button onClick={() => handleTransition('family')}>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recording-to-family">
            <Card>
              <CardHeader>
                <CardTitle>Recording to Family Tree</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" size="sm" onClick={() => handleTransition('recording')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Recording
                    </Button>
                    <div className="font-medium">Family Tree</div>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
                      <button className="px-4 py-2 rounded-md bg-white dark:bg-gray-700 shadow-sm">Tree</button>
                      <button className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-300">Timeline</button>
                      <button className="px-4 py-2 rounded-md text-gray-600 dark:text-gray-300">Grid</button>
                    </div>
                  </div>
                  
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6 flex items-center justify-center">
                    <div className="flex space-x-6">
                      <div className="w-16 h-16 rounded-full bg-ui-orange/20 border-2 border-ui-orange flex items-center justify-center">
                        <User className="h-8 w-8 text-ui-orange" />
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-8 w-8" />
                      </div>
                      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleTransition('member')} className="w-full">
                    View Selected Member
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="family-to-member">
            <Card>
              <CardHeader>
                <CardTitle>Family Tree to Individual Member</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" size="sm" onClick={() => handleTransition('family')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Family Tree
                    </Button>
                    <div className="font-medium">Member Profile</div>
                  </div>
                  
                  <div className="mb-6 text-center">
                    <div className="w-24 h-24 rounded-full bg-ui-orange/20 border-2 border-ui-orange mx-auto mb-4 flex items-center justify-center">
                      <User className="h-12 w-12 text-ui-orange" />
                    </div>
                    <h3 className="text-lg font-medium">Priya Patel</h3>
                    <p className="text-gray-600 dark:text-gray-400">Grandmother</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="font-medium">Birth Date</span>
                      <span>May 15, 1945</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-800">
                      <span className="font-medium">Place of Birth</span>
                      <span>Mumbai, India</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Stories</span>
                      <span>12 stories</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1">
                      <Mic className="h-4 w-4 mr-2" />
                      Stories
                    </Button>
                    <Button className="flex-1">
                      <Archive className="h-4 w-4 mr-2" />
                      Capsules
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="menu-expand">
            <Card>
              <CardHeader>
                <CardTitle>Menu Expansion/Collapse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <button 
                    onClick={() => setIsMenuExpanded(!isMenuExpanded)} 
                    className="w-full flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"
                  >
                    <div className="flex items-center">
                      <Menu className="h-5 w-5 mr-2" />
                      <span className="font-medium">Menu</span>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isMenuExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isMenuExpanded && (
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 space-y-1 mb-4 shadow-sm">
                      {['home', 'stories', 'capsules', 'families', 'settings'].map((item) => (
                        <button
                          key={item}
                          className="flex items-center w-full px-3 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {item === 'home' && <Home className="h-4 w-4 mr-3" />}
                          {item === 'stories' && <Mic className="h-4 w-4 mr-3" />}
                          {item === 'capsules' && <Archive className="h-4 w-4 mr-3" />}
                          {item === 'families' && <User className="h-4 w-4 mr-3" />}
                          {item === 'settings' && <Settings className="h-4 w-4 mr-3" />}
                          
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-center">
                    <Button variant="outline" onClick={() => setIsMenuExpanded(!isMenuExpanded)}>
                      {isMenuExpanded ? 'Collapse Menu' : 'Expand Menu'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-6">Information Architecture</h2>
        <Card>
          <CardHeader>
            <CardTitle>App Sitemap & User Flows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">App Sitemap</h3>
                <div className="flex flex-col items-center">
                  <div className="bg-ui-orange/10 border border-ui-orange text-ui-orange px-4 py-2 rounded-md mb-4">
                    Home
                  </div>
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                  <div className="grid grid-cols-3 gap-6 mt-4 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md mb-2 min-w-[120px] text-center">
                        Stories
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md mt-2 text-sm min-w-[120px] text-center">
                        Record
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md mt-2 text-sm min-w-[120px] text-center">
                        Browse
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md mb-2 min-w-[120px] text-center">
                        Capsules
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md mt-2 text-sm min-w-[120px] text-center">
                        Create
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md mt-2 text-sm min-w-[120px] text-center">
                        View
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md mb-2 min-w-[120px] text-center">
                        Families
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md mt-2 text-sm min-w-[120px] text-center">
                        Family Tree
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-md mt-2 text-sm min-w-[120px] text-center">
                        Members
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-md">
                    User Profile & Settings
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">User Journey: Recording a Family Story</h3>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0 z-10">
                        <div className="h-12 w-12 rounded-full bg-ui-orange flex items-center justify-center text-white">
                          1
                        </div>
                      </div>
                      <div className="ml-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-grow">
                        <h4 className="font-medium">Home Screen</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User navigates to Stories section</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 z-10">
                        <div className="h-12 w-12 rounded-full bg-ui-orange flex items-center justify-center text-white">
                          2
                        </div>
                      </div>
                      <div className="ml-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-grow">
                        <h4 className="font-medium">Record Story Screen</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User selects "Record Audio" option</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 z-10">
                        <div className="h-12 w-12 rounded-full bg-ui-orange flex items-center justify-center text-white">
                          3
                        </div>
                      </div>
                      <div className="ml-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-grow">
                        <h4 className="font-medium">Recording Interface</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User records story and reviews recording</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 z-10">
                        <div className="h-12 w-12 rounded-full bg-ui-orange flex items-center justify-center text-white">
                          4
                        </div>
                      </div>
                      <div className="ml-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-grow">
                        <h4 className="font-medium">Add Metadata</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User adds title, description, and selects family members</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 z-10">
                        <div className="h-12 w-12 rounded-full bg-ui-orange flex items-center justify-center text-white">
                          5
                        </div>
                      </div>
                      <div className="ml-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex-grow">
                        <h4 className="font-medium">Save & Share</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">User saves story and optionally shares with family</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
