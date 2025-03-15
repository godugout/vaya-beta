
import React from 'react';
import { CheckCircle, AlertCircle, User, Eye, MousePointer, Keyboard, Volume2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export const AccessibilityGuidelines = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Accessibility Guidelines</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">
          Creating accessible interfaces ensures our products can be used by everyone. Follow these guidelines to make your interfaces more inclusive.
        </p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="color">Color & Contrast</TabsTrigger>
          <TabsTrigger value="keyboard">Keyboard Use</TabsTrigger>
          <TabsTrigger value="semantics">Semantic HTML</TabsTrigger>
          <TabsTrigger value="focus">Focus Management</TabsTrigger>
          <TabsTrigger value="aria">ARIA Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-400">Accessibility is for everyone</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-500">
              Making your interfaces accessible improves usability for all users, not just those with disabilities.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <User className="h-5 w-5 mb-2 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg">Inclusive Design</CardTitle>
                <CardDescription>Design for a diverse range of users</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Consider the full spectrum of human abilities, disabilities, and preferences when designing interfaces.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Eye className="h-5 w-5 mb-2 text-purple-600 dark:text-purple-400" />
                <CardTitle className="text-lg">Visual Clarity</CardTitle>
                <CardDescription>Ensure content is readable</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Use sufficient color contrast, clear typography, and support zoom functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <MousePointer className="h-5 w-5 mb-2 text-orange-600 dark:text-orange-400" />
                <CardTitle className="text-lg">Multiple Inputs</CardTitle>
                <CardDescription>Support various input methods</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Ensure interfaces work with mouse, keyboard, touch, and assistive technologies.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-semibold mt-4">Web Content Accessibility Guidelines (WCAG)</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our design system follows WCAG 2.1 AA standards as a minimum requirement.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Perceivable</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Information and user interface components must be presentable to users in ways they can perceive.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Operable</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">User interface components and navigation must be operable by all users.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Understandable</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Information and operation of the user interface must be understandable.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Robust</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.</p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="color" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Color & Contrast Guidelines</h2>
          
          <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-400">Don't rely on color alone</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-500">
              Always use additional indicators (text, icons, patterns) alongside color to convey information.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Contrast Ratios</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Text should have a contrast ratio of at least 4.5:1 against its background.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Large text (18pt or 14pt bold) should have a contrast ratio of at least 3:1.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>UI components and graphical objects should have a contrast ratio of at least 3:1 against adjacent colors.</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Color Blindness Considerations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Test interfaces in grayscale to ensure they work without color.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Avoid problematic color combinations (red/green, blue/purple, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Use textures, patterns, or icons to differentiate between elements.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-3">Example Contrast Pairs</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="bg-black text-white p-3 rounded-md text-center">
              <div className="font-medium">Black/White</div>
              <div className="text-xs mt-1">Ratio: 21:1</div>
            </div>
            <div className="bg-blue-700 text-white p-3 rounded-md text-center">
              <div className="font-medium">Blue/White</div>
              <div className="text-xs mt-1">Ratio: ~7:1</div>
            </div>
            <div className="bg-green-700 text-white p-3 rounded-md text-center">
              <div className="font-medium">Green/White</div>
              <div className="text-xs mt-1">Ratio: ~5:1</div>
            </div>
            <div className="bg-gray-700 text-white p-3 rounded-md text-center">
              <div className="font-medium">Gray/White</div>
              <div className="text-xs mt-1">Ratio: ~5:1</div>
            </div>
            <div className="bg-white text-gray-900 border p-3 rounded-md text-center">
              <div className="font-medium">White/Gray</div>
              <div className="text-xs mt-1">Ratio: ~15:1</div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keyboard" className="space-y-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Keyboard className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold">Keyboard Accessibility</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            All interactive elements should be usable with a keyboard alone. This benefits users with motor disabilities, power users, and those using screen readers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">Keyboard Navigation</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium">Tab Order</span>
                    <p className="text-gray-600 dark:text-gray-400">Tab order should follow a logical sequence, typically from top to bottom, left to right.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium">Focus Indicators</span>
                    <p className="text-gray-600 dark:text-gray-400">Focus states should be clearly visible with high contrast outlines or highlights.</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <span className="font-medium">No Keyboard Traps</span>
                    <p className="text-gray-600 dark:text-gray-400">Users should be able to navigate to and from all interactive elements using the keyboard.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Common Keyboard Shortcuts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Move focus</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Tab / Shift+Tab</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Activate buttons</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Enter / Space</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Navigate checkboxes</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Space</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Navigate radio buttons</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Arrow keys</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Navigate dropdowns</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">Enter, Arrow keys, Esc</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mt-6">
            <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400 mb-2">Testing Keyboard Accessibility</h3>
            <ol className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>1. Disconnect your mouse and navigate the interface using only the keyboard.</li>
              <li>2. Check that focus is always visible as you tab through interactive elements.</li>
              <li>3. Ensure all functionality can be accessed and used with keyboard controls.</li>
              <li>4. Verify that modal dialogs trap focus until dismissed.</li>
              <li>5. Check that custom components (dropdowns, sliders, etc.) have appropriate keyboard interactions.</li>
            </ol>
          </div>
        </TabsContent>

        <TabsContent value="semantics" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Semantic HTML</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Using semantic HTML elements communicates the meaning and structure of content to browsers and assistive technologies.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Semantic Structure Elements</h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;header&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Introductory content, typically a banner with logo, title, and navigation.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;nav&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Navigation links for the current page or entire site.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;main&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    The main content area of the document. Should be unique to the document.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;section&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    A standalone section of content that could be distributed independently.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;article&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    A self-contained composition that could be distributed independently.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;aside&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Content tangentially related to the content around it.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <code className="font-bold">&lt;footer&gt;</code>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Footer for the nearest sectioning content or sectioning root element.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Semantic vs. Non-Semantic Example</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-green-600 dark:text-green-400 font-medium mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" /> Good Practice
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs font-mono overflow-auto max-h-[300px]">
{`<header>
  <h1>Page Title</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <section>
    <h2>Featured Content</h2>
    <article>
      <h3>Article Title</h3>
      <p>Article content...</p>
    </article>
  </section>
  
  <aside>
    <h2>Related Information</h2>
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>Copyright © 2023</p>
</footer>`}
                  </div>
                </div>
                
                <div>
                  <div className="text-red-600 dark:text-red-400 font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> Poor Practice
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs font-mono overflow-auto max-h-[300px]">
{`<div class="header">
  <div class="title">Page Title</div>
  <div class="nav">
    <div class="nav-list">
      <div><a href="/">Home</a></div>
      <div><a href="/about">About</a></div>
    </div>
  </div>
</div>

<div class="content">
  <div class="section">
    <div class="section-title">Featured Content</div>
    <div class="article">
      <div class="article-title">Article Title</div>
      <div>Article content...</div>
    </div>
  </div>
  
  <div class="sidebar">
    <div class="sidebar-title">Related Information</div>
    <div class="sidebar-links">
      <div><a href="#">Link 1</a></div>
      <div><a href="#">Link 2</a></div>
    </div>
  </div>
</div>

<div class="footer">
  <div>Copyright © 2023</div>
</div>`}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Benefits of Semantic HTML</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Improves accessibility for screen reader users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Enhances SEO by providing clearer structure for search engines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Makes code more maintainable and easier to read</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Provides better default styles even without CSS</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="focus" className="space-y-6 mt-6">
          <h2 className="text-xl font-semibold">Focus Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Proper focus management ensures keyboard users can navigate through interactive elements in a logical sequence.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Focus Visibility</CardTitle>
                <CardDescription>Focus states must be clearly visible</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  Never use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">outline: none</code> without providing an alternative focus indicator.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs">
                  <div className="font-medium mb-1">Recommended focus styles:</div>
                  <code>outline: 2px solid currentColor;<br />
                  outline-offset: 2px;</code>
                </div>
                <p className="text-sm">
                  Our components have focus styles that meet WCAG 2.1 AA standards.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Focus Order</CardTitle>
                <CardDescription>Tab order should be logical and predictable</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm">
                  The focus order should follow the visual layout, typically from top to bottom, left to right.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-xs">
                  <div className="font-medium mb-1">Avoid:</div>
                  <code>tabIndex="-1"</code> (removes from tab order)<br />
                  <code>tabIndex="1"</code> or higher (changes default tab order)
                </div>
                <p className="text-sm">
                  Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">tabIndex="0"</code> to include non-interactive elements in the tab order when necessary.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-3">Focus Management in Interactive Components</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h4 className="font-medium">Modal Dialogs</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>When a modal opens, focus should automatically move to the modal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Focus should be trapped within the modal until it is closed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>When the modal closes, focus should return to the element that opened it.</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h4 className="font-medium">Dropdowns & Menus</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>When a dropdown opens, focus should move to the first menu item.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Arrow keys should navigate between menu items.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Escape key should close the dropdown and return focus to the trigger element.</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h4 className="font-medium">Tabs & Accordions</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Arrow keys should navigate between tab or accordion headers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>When a tab or accordion panel opens, focus should move to the panel content if it contains focusable elements.</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="aria" className="space-y-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold">ARIA Patterns & Roles</h2>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ARIA (Accessible Rich Internet Applications) helps make complex UI components more accessible to assistive technologies.
          </p>
          
          <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 mb-6">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-400">Use ARIA sparingly</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-500">
              The first rule of ARIA: Don't use ARIA if native HTML elements can achieve the same result.
            </AlertDescription>
          </Alert>
          
          <h3 className="text-lg font-medium mt-6 mb-3">Common ARIA Attributes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium mb-2">Landmarks</h4>
                <div className="text-sm space-y-2">
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">role="banner"</code> - Primary content at the top of the page</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">role="navigation"</code> - Navigation elements</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">role="main"</code> - Main content area</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">role="contentinfo"</code> - Footer information</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium mb-2">States</h4>
                <div className="text-sm space-y-2">
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-expanded="true|false"</code> - Indicates expanded/collapsed state</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-selected="true|false"</code> - Indicates selected state</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-checked="true|false|mixed"</code> - Indicates checked state</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-disabled="true|false"</code> - Indicates disabled state</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium mb-2">Relationships</h4>
                <div className="text-sm space-y-2">
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-labelledby="id"</code> - Associates with an element that labels current element</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-describedby="id"</code> - Associates with an element that describes current element</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-controls="id"</code> - Indicates which element is controlled by current element</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-owns="id"</code> - Indicates elements that are children of current element</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium mb-2">Live Regions</h4>
                <div className="text-sm space-y-2">
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-live="polite|assertive|off"</code> - Announces updates to element</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-atomic="true|false"</code> - Whether to announce entire region or just changes</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-relevant="additions|removals|text|all"</code> - What changes to announce</p>
                  <p><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">aria-busy="true|false"</code> - Indicates region is being updated</p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-6 mb-3">Common Component Patterns</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Accordions</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>
                  <span className="font-medium">Header:</span><br />
                  <code>role="button"<br />
                  aria-expanded="true|false"<br />
                  aria-controls="panel-id"</code>
                </p>
                <p>
                  <span className="font-medium">Panel:</span><br />
                  <code>id="panel-id"<br />
                  aria-labelledby="header-id"<br />
                  hidden (when collapsed)</code>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tabs</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>
                  <span className="font-medium">Tablist:</span><br />
                  <code>role="tablist"</code>
                </p>
                <p>
                  <span className="font-medium">Tab:</span><br />
                  <code>role="tab"<br />
                  aria-selected="true|false"<br />
                  aria-controls="panel-id"</code>
                </p>
                <p>
                  <span className="font-medium">Panel:</span><br />
                  <code>role="tabpanel"<br />
                  aria-labelledby="tab-id"<br />
                  hidden (when not active)</code>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Modals</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>
                  <span className="font-medium">Dialog:</span><br />
                  <code>role="dialog"<br />
                  aria-modal="true"<br />
                  aria-labelledby="title-id"<br />
                  aria-describedby="desc-id"</code>
                </p>
                <p>
                  <span className="font-medium">Title:</span><br />
                  <code>id="title-id"</code>
                </p>
                <p>
                  <span className="font-medium">Description:</span><br />
                  <code>id="desc-id"</code>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
