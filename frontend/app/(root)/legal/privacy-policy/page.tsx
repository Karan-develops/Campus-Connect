import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | Campus Connect",
  description:
    "Privacy Policy for Campus Connect - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: 27-02-2025</p>

          <h2 className="text-lg">1. Introduction</h2>
          <p>
            Welcome to Campus Connect. We are committed to protecting your
            personal information and your right to privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our website and services.
          </p>

          <h2 className="text-lg">2. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us, such as your
            name, email address, and profile information. We also collect
            information automatically when you use our services, including usage
            data and cookies.
          </p>

          <h2 className="text-lg">3. How We Use Your Information</h2>
          <p>
            We use your information to provide, improve, and personalize our
            services, communicate with you, and ensure the security of our
            platform.
          </p>

          <h2 className="text-lg">4. Sharing Your Information</h2>
          <p>
            We may share your information with other users as part of the normal
            operation of Campus Connect, such as when you join clubs or
            participate in events. We do not sell your personal information to
            third parties.
          </p>

          <h2 className="text-lg">5. Your Rights and Choices</h2>
          <p>
            You have the right to access, update, or delete your personal
            information. You can also choose to opt-out of certain data
            collection or use.
          </p>

          <h2 className="text-lg">6. Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information.
          </p>

          <h2 className="text-lg">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-lg">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@campusConnect.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
