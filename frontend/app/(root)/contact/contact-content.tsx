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
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ConnectWUs from "@/components/ConnectWUs";
import CampusMap from "@/components/CampusMap";
import FAQS from "@/components/FAQS";
import {
  departmentContacts,
  locations,
} from "@/app/constants/contact.constants";

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
                    autoComplete="off"
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
                    autoComplete="off"
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
                  autoComplete="off"
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

      {/* FAQS */}
      <FAQS />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map(({ title, address, phone, email, hours }) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    <span>{phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    <span>{email}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Department Contacts</h2>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            {Object.keys(departmentContacts).map((key) => (
              <TabsTrigger key={key} value={key}>
                {key.replace(/([A-Z])/g, " $1").trim()}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(departmentContacts).map(([key, departments]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map(({ name, email, phone }) => (
                  <Card key={name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <span className="text-sm">{email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="text-sm">{phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Connect with Us */}
      <ConnectWUs />
      {/* Campus Map */}
      <CampusMap />
    </div>
  );
}
