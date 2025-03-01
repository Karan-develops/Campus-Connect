import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronRightCircle,
  ScanFace,
  Github,
  BadgeCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm leading-relaxed">
              Campus Connect is a premier institution dedicated to fostering
              academic excellence, innovation, and personal growth. Our mission
              is to empower students with knowledge, skills, and values to
              become future leaders and change-makers.
            </p>
            <h2 className="text-white text-lg font-semibold mt-3 mb-4">
              Policy
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/terms-of-service"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/academics"
                  className="hover:text-white transition-colors"
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions"
                  className="hover:text-white transition-colors"
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="hover:text-white transition-colors"
                >
                  Apply Now
                </Link>
              </li>
              <li>
                <Link
                  href="/placements"
                  className="hover:text-white transition-colors"
                >
                  Placements
                </Link>
              </li>
              <li>
                <Link
                  href="/peers"
                  className="hover:text-white transition-colors"
                >
                  Peers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-white transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Mohali, Chandigarh</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@campusConnect.edu</span>
              </li>
              <li className="flex items-center">
                <ChevronRightCircle className="w-5 h-5 mr-2" />
                <Link href={"/contact"}>
                  <span>Go to contacts Page</span>
                </Link>
              </li>
              <li className="flex items-center">
                <ScanFace className="w-5 h-5 mr-2" />
                <Link href={"/search"}>
                  <span>Search in Campus Connect</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4">
              Stay Connected
            </h2>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for updates
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8 bg-gray-700" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Campus Connect. All rights reserved.
          </div>
          <hr />
          <span className="flex gap-2 mr-28">
            Author - Karan Aggarwal <BadgeCheck className=" text-green-500" />
          </span>
          <hr />
          <div className="flex space-x-4">
            <Link
              href={"https://github.com/Karan-develops"}
              className="hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href={"https://x.com/mrkaran000"}
              className="hover:text-white transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href={"https://www.instagram.com/karan_aggarwal_00"}
              className="hover:text-white transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/karan-aggarwal-50a12b2b9/"}
              className="hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href={""} className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
