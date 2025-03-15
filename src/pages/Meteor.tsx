
import React from 'react';

const Meteor = () => {
  return (
    <div className="meteor-page">
      <header>
        <nav className="flex justify-center space-x-6 p-4 bg-gray-100 dark:bg-gray-800">
          <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
          <a href="#news" className="hover:text-blue-500 transition-colors">News</a>
          <a href="https://meteor-template.webflow.io/template-info/style-guide" className="hover:text-blue-500 transition-colors">Style Guide</a>
          <a href="https://meteor-template.webflow.io/#" className="hover:text-blue-500 transition-colors">Instruction</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        <section id="home" className="py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Develop rapid websites in minutes.</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Use Meteor's interactive design tools. It's a ton of customization options to customize anything.</p>
          <div className="logo-strip-main py-8">
            {/* Logos here */}
            <div className="flex justify-center space-x-8 flex-wrap">
              <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-24 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
          <p className="text-lg font-medium">Join over 7,000 satisfied customers.</p>
        </section>

        <section id="about" className="py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">What We Do</h2>
          <p className="text-xl max-w-3xl mx-auto text-center">We help startups build their websites with powerful designs, fully responsive layouts, and friendly support.</p>
        </section>

        <section id="features" className="py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-2xl font-bold mb-3">Powerful Design</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-3">Fully Responsive</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold mb-3">Friendly Support</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>

        <section id="news" className="py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Latest News</h2>
          <p className="text-xl max-w-3xl mx-auto text-center">Stay updated with the latest news and insights from our team.</p>
        </section>

        <section id="contact" className="py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
          <form className="max-w-md mx-auto space-y-4">
            <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md" />
            <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md" />
            <textarea placeholder="Your Message" className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md h-32"></textarea>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-3 rounded-md transition-colors">Send Message</button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 p-6 text-center">
        <p>© 2025 Meteor Template. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Meteor;
