import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Vaya and how does it work?",
      answer: "Vaya is a digital platform designed to preserve and share family memories across generations. It allows you to record stories, upload photos, and create time capsules that can be shared with family members. Think of it as a private, digital family archive that helps keep your family's legacy alive."
    },
    {
      question: "How secure are my family memories on Vaya?",
      answer: "Your family's memories are completely private and secure. We use enterprise-grade encryption and security measures. Only family members you explicitly invite can access your family's content, and you have full control over sharing permissions."
    },
    {
      question: "Can I record stories in different languages?",
      answer: "Yes! Vaya supports multilingual storytelling. You can record stories in any language, and our AI companion Narra can help guide conversations in both English and Spanish, making it perfect for multicultural families."
    },
    {
      question: "What are Family Capsules and how do they work?",
      answer: "Family Capsules are like digital time capsules where you can collect stories, photos, and memories around specific themes or occasions. You can set future dates for capsules to be 'opened,' creating exciting moments of discovery for your family."
    },
    {
      question: "How do I invite family members to join my Vaya family group?",
      answer: "Once you create a family group, you can easily invite members through email. They'll receive an invitation link to join your family group, where they can start contributing their own stories and accessing shared memories."
    },
    {
      question: "Can I download or backup my family's memories?",
      answer: "Yes, you can download your family's stories, photos, and other content for offline storage or backup. This ensures you always have access to your precious memories, even offline."
    },
    {
      question: "What types of content can I store on Vaya?",
      answer: "Vaya supports various content types including audio stories, photos, written memories, and voice recordings. You can also add descriptions, dates, and tags to help organize and find content easily."
    },
    {
      question: "Is there a limit to how much content I can store?",
      answer: "Vaya provides generous storage space for your family memories. You can store hundreds of stories and photos, and we'll notify you if you're approaching any storage limits."
    },
    {
      question: "How does Narra, the AI companion, help with storytelling?",
      answer: "Narra is your personal storytelling guide who can suggest prompts, ask relevant follow-up questions, and help structure conversations. She's particularly helpful in capturing detailed family stories and traditions."
    },
    {
      question: "Can multiple family members contribute to the same story or capsule?",
      answer: "Absolutely! Vaya is designed for collaborative storytelling. Multiple family members can add their perspectives, photos, and memories to stories and capsules, creating a rich, multi-layered family narrative."
    }
  ];

  return (
    <section className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-vaya-gray-900 sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-vaya-gray-600 sm:text-2xl">
            Everything you need to know about preserving your family's legacy with Vaya
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-xl font-medium sm:text-2xl">
                <span className="flex gap-4">
                  <span className="text-vaya-gray-500">{index + 1}.</span>
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-lg text-vaya-gray-600 text-left pl-8 sm:text-xl">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;