import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Trophy, Globe } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HighlightsSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      <div className="relative container mx-auto px-4 z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Welcome to Campus Diary
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Empowering Minds, Shaping Futures
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/academics">Explore Programs</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/admissions">Apply Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "World-class Education",
      description: "Cutting-edge curriculum designed to meet industry demands",
    },
    {
      icon: Users,
      title: "Diverse Community",
      description: "A vibrant mix of cultures and perspectives",
    },
    {
      icon: Trophy,
      title: "Career Success",
      description: "Outstanding placement records and alumni network",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "International partnerships and exchange programs",
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-700">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  const highlights = [
    { number: "50+", description: "Academic Programs" },
    { number: "95%", description: "Placement Rate" },
    { number: "100+", description: "Research Projects" },
    { number: "20,000+", description: "Alumni Worldwide" },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          College Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {highlight.number}
              </p>
              <p className="text-lg text-gray-300">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join our community of learners and innovators today.
        </p>
        <Button asChild size="lg">
          <Link href="/apply">Apply Now</Link>
        </Button>
      </div>
    </section>
  );
}
