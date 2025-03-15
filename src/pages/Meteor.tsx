
import React from 'react';
import { Button } from "@/components/ui/button";

const Meteor = () => {
  return (
    <div className="meteor-page bg-sky-100 text-gray-800 min-h-screen">
      <header className="sticky top-0 z-10">
        <nav className="flex justify-center space-x-6 p-4 bg-white shadow-sm">
          <a href="#home" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Home</a>
          <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">About</a>
          <a href="#news" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">News</a>
          <a href="https://meteor-template.webflow.io/template-info/style-guide" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Style Guide</a>
          <a href="https://meteor-template.webflow.io/#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium">Instruction</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <section id="home" className="py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">Develop rapid websites in minutes.</h1>
            <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-700">Use Meteor's interactive design tools. It's a ton of customization options to customize anything.</p>
            
            <div className="py-10 flex justify-center space-x-4">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">Learn More</Button>
            </div>
            
            <div className="logo-strip-main py-8 bg-white rounded-xl shadow-sm">
              <div className="flex justify-center space-x-8 flex-wrap p-4">
                <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 1</div>
                <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 2</div>
                <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 3</div>
                <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo 4</div>
              </div>
            </div>
            <p className="text-lg font-medium mt-6 text-gray-700">Join over 7,000 satisfied customers.</p>
          </div>
        </section>

        <section id="about" className="py-20 bg-white rounded-xl shadow-sm my-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">What We Do</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">We help startups build their websites with powerful designs, fully responsive layouts, and friendly support.</p>
          </div>
        </section>

        <section id="features" className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Powerful Design</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Fully Responsive</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Friendly Support</h3>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>

        <section id="news" className="py-20 bg-gradient-to-br from-blue-50 to-sky-100 rounded-xl shadow-sm my-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Latest News</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">Stay updated with the latest news and insights from our team.</p>
            <div className="mt-8">
              <Button className="bg-green-600 hover:bg-green-700 text-white">View All News</Button>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 mb-20">
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Contact Us</h2>
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Your Message" 
                  className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                ></textarea>
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">Send Message</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-8 text-center">
        <div className="max-w-6xl mx-auto">
          <p>© 2025 Meteor Template. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Meteor;
