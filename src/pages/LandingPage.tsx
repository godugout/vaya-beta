
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800 py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              How Vaya Preserves Your Family Legacy
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              Our platform connects voice storytelling, AI assistance, and thoughtful organization 
              to keep your family stories alive for generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-autumn-orange hover:bg-autumn-orange/90 text-white px-8 py-3 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-50 dark:to-gray-900 z-10"></div>
            <img 
              src="/lovable-uploads/79a7f098-5d08-4543-8610-cab0055c5960.png" 
              alt="Vaya App Interface" 
              className="rounded-lg shadow-xl mx-auto max-w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">
            Voice-First Story Capture
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-forest-green text-white rounded-lg flex items-center justify-center mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Record</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Simply tell your stories as you would to a friend. No writing required, just speak naturally.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-stream-blue text-white rounded-lg flex items-center justify-center mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Organize</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your stories are automatically transcribed, tagged, and organized by family, date, and themes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-white to-sky-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-md">
              <CardContent className="p-8">
                <div className="h-12 w-12 bg-autumn-orange text-white rounded-lg flex items-center justify-center mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Share</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Invite family members to listen, contribute their own stories, and preserve shared history.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 px-4 bg-sky-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Stories From Our Community
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-16 max-w-2xl mx-auto">
            See how families are using Vaya to capture and preserve their most meaningful memories.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-bold">
                G
              </div>
              <div>
                <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                  "Vaya has helped me record my grandmother's stories about immigrating to America. These recordings are now preserved for our family."
                </p>
                <div>
                  <p className="font-bold">Maya Rodriguez</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Chicago, IL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg p-2 border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-medium px-4">
                  How does Vaya's voice recording work?
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-700 dark:text-gray-300">
                  Vaya uses advanced audio technology to capture high-quality voice recordings. Simply press the recording button, share your story naturally, and our system handles the rest, including transcription and organization.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="border rounded-lg p-2 border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-medium px-4">
                  Is Vaya accessible for elderly family members?
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-700 dark:text-gray-300">
                  Yes! Vaya is designed with simplicity in mind. Our interface uses large, clear text and simple navigation that makes it easy for users of all ages and technical abilities to record and share stories.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3" className="border rounded-lg p-2 border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-left font-medium px-4">
                  How are my stories protected and preserved?
                </AccordionTrigger>
                <AccordionContent className="px-4 text-gray-700 dark:text-gray-300">
                  Your stories are securely stored with enterprise-grade encryption. We create multiple backups and offer options to export your content. Your family's memories are treated with the utmost care and privacy.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-forest text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">
            Connecting generations through shared memories and stories.
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Your family's legacy, preserved digitally.
          </p>
          <Button className="bg-white text-forest-green hover:bg-gray-100 px-8 py-3 text-lg">
            Start Preserving Your Legacy
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
