import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQS = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How can I apply for admission?</AccordionTrigger>
          <AccordionContent>
            You can apply for admission through our online application portal.
            Visit our Admissions page for detailed instructions and
            requirements.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            What financial aid options are available?
          </AccordionTrigger>
          <AccordionContent>
            We offer various financial aid options including scholarships,
            grants, and work-study programs. Please visit our Financial Aid
            office or website for more information.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How can I schedule a campus tour?</AccordionTrigger>
          <AccordionContent>
            Campus tours can be scheduled through our Admissions office. You can
            book a tour online or call us to arrange a visit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What housing options are available for students?
          </AccordionTrigger>
          <AccordionContent>
            We offer on-campus dormitories and off-campus housing assistance.
            Visit our Housing office for more details on available options and
            application processes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            How can I get involved in student organizations?
          </AccordionTrigger>
          <AccordionContent>
            We have numerous student organizations covering a wide range of
            interests. Check out our Student Life page or visit the Student
            Activities office to learn about joining or starting a club.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default FAQS;
