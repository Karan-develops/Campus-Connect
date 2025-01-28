"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form data backend pe bhejna h
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-12">
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              We're here to help and answer any question you might have.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </section>

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
            <AccordionTrigger>
              How can I schedule a campus tour?
            </AccordionTrigger>
            <AccordionContent>
              Campus tours can be scheduled through our Admissions office. You
              can book a tour online or call us to arrange a visit.
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

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Main Campus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Mohali, Chandigarh</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+1 (123) 456-7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>info@campusdiary.edu</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Mon-Fri: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Downtown Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>456 Downtown St, City, State 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+1 (123) 456-7891</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>downtown@campusdiary.edu</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Research Park</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>789 Innovation Rd, City, State 12345</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>+1 (123) 456-7892</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>research@campusdiary.edu</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>Mon-Fri: 8:30 AM - 5:30 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Department Contacts</h2>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="administrative">Administrative</TabsTrigger>
            <TabsTrigger value="student-services">Student Services</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="academic">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "School of Engineering",
                  email: "engineering@campusdiary.edu",
                  phone: "+1 (123) 456-7893",
                },
                {
                  name: "School of Business",
                  email: "business@campusdiary.edu",
                  phone: "+1 (123) 456-7894",
                },
                {
                  name: "School of Arts and Sciences",
                  email: "arts-sciences@campusdiary.edu",
                  phone: "+1 (123) 456-7895",
                },
                {
                  name: "School of Medicine",
                  email: "medicine@campusdiary.edu",
                  phone: "+1 (123) 456-7896",
                },
                {
                  name: "School of Law",
                  email: "law@campusdiary.edu",
                  phone: "+1 (123) 456-7897",
                },
                {
                  name: "Graduate School",
                  email: "gradschool@campusdiary.edu",
                  phone: "+1 (123) 456-7898",
                },
              ].map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="administrative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Office of the President",
                  email: "president@campusdiary.edu",
                  phone: "+1 (123) 456-7899",
                },
                {
                  name: "Human Resources",
                  email: "hr@campusdiary.edu",
                  phone: "+1 (123) 456-7900",
                },
                {
                  name: "Finance Department",
                  email: "finance@campusdiary.edu",
                  phone: "+1 (123) 456-7901",
                },
                {
                  name: "Facilities Management",
                  email: "facilities@campusdiary.edu",
                  phone: "+1 (123) 456-7902",
                },
                {
                  name: "IT Services",
                  email: "it@campusdiary.edu",
                  phone: "+1 (123) 456-7903",
                },
                {
                  name: "Public Relations",
                  email: "pr@campusdiary.edu",
                  phone: "+1 (123) 456-7904",
                },
              ].map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="student-services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Admissions Office",
                  email: "admissions@campusdiary.edu",
                  phone: "+1 (123) 456-7905",
                },
                {
                  name: "Financial Aid Office",
                  email: "finaid@campusdiary.edu",
                  phone: "+1 (123) 456-7906",
                },
                {
                  name: "Registrar's Office",
                  email: "registrar@campusdiary.edu",
                  phone: "+1 (123) 456-7907",
                },
                {
                  name: "Student Housing",
                  email: "housing@campusdiary.edu",
                  phone: "+1 (123) 456-7908",
                },
                {
                  name: "Career Services",
                  email: "careers@campusdiary.edu",
                  phone: "+1 (123) 456-7909",
                },
                {
                  name: "Student Health Services",
                  email: "health@campusdiary.edu",
                  phone: "+1 (123) 456-7910",
                },
              ].map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="other">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Alumni Relations",
                  email: "alumni@campusdiary.edu",
                  phone: "+1 (123) 456-7911",
                },
                {
                  name: "Athletics Department",
                  email: "athletics@campusdiary.edu",
                  phone: "+1 (123) 456-7912",
                },
                {
                  name: "Campus Security",
                  email: "security@campusdiary.edu",
                  phone: "+1 (123) 456-7913",
                },
                {
                  name: "Library Services",
                  email: "library@campusdiary.edu",
                  phone: "+1 (123) 456-7914",
                },
                {
                  name: "International Student Office",
                  email: "international@campusdiary.edu",
                  phone: "+1 (123) 456-7915",
                },
                {
                  name: "Disability Services",
                  email: "disability@campusdiary.edu",
                  phone: "+1 (123) 456-7916",
                },
              ].map((dept, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span className="text-sm">{dept.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Connect with Us</h2>
        <Card>
          <CardHeader>
            <CardTitle>Stay in Touch</CardTitle>
            <CardDescription>
              Follow us on social media and subscribe to our newsletter for the
              latest updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Visit Us</h2>
        <Card>
          <CardHeader>
            <CardTitle>Campus Map</CardTitle>
            <CardDescription>
              Plan your visit to our beautiful campus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459419!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80da61087cc12a!2sNew%20York%20University!5e0!3m2!1sen!2sus!4v1658849951489!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4 flex justify-center">
              <Button>Download Campus Map</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
