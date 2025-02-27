import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | Campus Connect",
  description:
    "Terms of Service for Campus Connect - Understand your rights and responsibilities when using our platform.",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>Last updated: 27-02-2025</p>

          <h2 className="text-lg">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Campus Connect, you agree to be bound by these
            Terms of Service and all applicable laws and regulations.
          </p>

          <h2 className="text-lg">2. Description of Service</h2>
          <p>
            Campus Connect is a platform that allows college students to
            connect, join clubs, participate in events, and exchange skills.
          </p>

          <h2 className="text-lg">3. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>

          <h2 className="text-lg">4. User Conduct</h2>
          <p>
            You agree not to use Campus Connect for any unlawful purpose or in
            any way that could damage, disable, overburden, or impair our
            service.
          </p>

          <h2 className="text-lg">5. Content</h2>
          <p>
            You retain all rights to the content you post on Campus Connect. By
            posting content, you grant us a non-exclusive, worldwide,
            royalty-free license to use, modify, publicly perform, publicly
            display, reproduce, and distribute such content on our platform.
          </p>

          <h2 className="text-lg">6. Intellectual Property</h2>
          <p>
            The Campus Connect name, logo, and all related names, logos, product
            and service names, designs, and slogans are trademarks of Campus
            Connect or its affiliates or licensors.
          </p>

          <h2 className="text-lg">7. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the
            service immediately, without prior notice or liability, under our
            sole discretion, for any reason whatsoever.
          </p>

          <h2 className="text-lg">8. Limitation of Liability</h2>
          <p>
            In no event shall Campus Connect, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages.
          </p>

          <h2 className="text-lg">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time.
            It is your responsibility to check these Terms periodically for
            changes.
          </p>

          <h2 className="text-lg">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            terms@campusConnect.com.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
