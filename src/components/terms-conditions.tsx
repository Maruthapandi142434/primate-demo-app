// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
import { Separator } from "@radix-ui/react-select"
import { ArrowLeft, Dumbbell } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            <Link href="/">
              <Button variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-gray-400 text-lg">Last updated: January 1, 2024</p>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">1. Introduction</h2>
                <p className="text-gray-300 leading-relaxed">
                  Welcome to IronGym. These Terms and Conditions ("Terms") govern your use of our fitness facilities,
                  services, and website. By becoming a member or using our services, you agree to be bound by these
                  Terms. Please read them carefully before using our facilities.
                </p>
              </section>

              <Separator className="bg-gray-800" />

              {/* Membership Terms */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">2. Membership Terms</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">2.1 Membership Agreement</h3>
                    <p className="leading-relaxed">
                      Your membership begins on the date specified in your membership agreement and continues for the
                      duration specified, unless terminated earlier in accordance with these Terms.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">2.2 Membership Fees</h3>
                    <p className="leading-relaxed">
                      Membership fees are due in advance and must be paid by the due date specified in your agreement.
                      Late payments may result in suspension of membership privileges and additional fees.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">2.3 Membership Transfer</h3>
                    <p className="leading-relaxed">
                      Memberships are non-transferable and may not be shared with others. Each member must have their
                      own individual membership.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-gray-800" />

              {/* Facility Rules */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">3. Facility Rules & Conduct</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">3.1 General Conduct</h3>
                    <ul className="list-disc list-inside space-y-2 leading-relaxed">
                      <li>Members must treat all staff, other members, and facilities with respect</li>
                      <li>Proper athletic attire and closed-toe shoes are required at all times</li>
                      <li>Members must wipe down equipment after use</li>
                      <li>No food or beverages (except water) are allowed in workout areas</li>
                      <li>Cell phone use should be limited and respectful of others</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">3.2 Equipment Usage</h3>
                    <ul className="list-disc list-inside space-y-2 leading-relaxed">
                      <li>Equipment must be used properly and safely</li>
                      <li>Time limits may apply during peak hours</li>
                      <li>Report any damaged or malfunctioning equipment immediately</li>
                      <li>Return all equipment to designated areas after use</li>
                    </ul>
                  </div>
                </div>
              </section>

              <Separator className="bg-gray-800" />

              {/* Health & Safety */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">4. Health & Safety</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">4.1 Health Requirements</h3>
                    <p className="leading-relaxed">
                      Members should consult with a physician before beginning any exercise program. IronGym recommends
                      regular health check-ups and encourages members to exercise within their physical limitations.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">4.2 Assumption of Risk</h3>
                    <p className="leading-relaxed">
                      Exercise involves inherent risks. Members participate in all activities at their own risk and
                      acknowledge that IronGym cannot eliminate all risks associated with physical activity.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-gray-800" />

              {/* Liability Waiver */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">5. Liability & Waiver</h2>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong className="text-white">IMPORTANT:</strong> By using our facilities, you acknowledge and
                    agree that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                    <li>You participate in all activities at your own risk</li>
                    <li>IronGym is not liable for any injuries, accidents, or losses</li>
                    <li>You waive all claims against IronGym, its employees, and agents</li>
                    <li>You are responsible for your personal belongings</li>
                    <li>IronGym is not responsible for theft or damage to personal property</li>
                  </ul>
                </div>
              </section>

              <Separator className="bg-gray-800" />

              {/* Cancellation Policy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">6. Cancellation & Refund Policy</h2>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">6.1 Cancellation Notice</h3>
                    <p className="leading-relaxed">
                      Members may cancel their membership with 30 days written notice. Cancellations must be submitted
                      in writing to the front desk or via email to membership@irongym.com.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">6.2 Refund Policy</h3>
                    <p className="leading-relaxed">
                      Membership fees are generally non-refundable. Exceptions may be made for medical reasons with
                      proper documentation or relocation beyond 25 miles from any IronGym location.
                    </p>
                  </div>
                </div>
              </section>

              <Separator className="bg-gray-800" />

              {/* Privacy Policy */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">7. Privacy & Data Protection</h2>
                <p className="text-gray-300 leading-relaxed">
                  We respect your privacy and are committed to protecting your personal information. Our Privacy Policy,
                  which is incorporated into these Terms, explains how we collect, use, and protect your information. By
                  using our services, you consent to our data practices as described in our Privacy Policy.
                </p>
              </section>

              <Separator className="bg-gray-800" />

              {/* Modifications */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">8. Modifications to Terms</h2>
                <p className="text-gray-300 leading-relaxed">
                  IronGym reserves the right to modify these Terms at any time. Changes will be posted on our website
                  and at our facilities. Continued use of our services after changes are posted constitutes acceptance
                  of the modified Terms.
                </p>
              </section>

              <Separator className="bg-gray-800" />

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-red-500">9. Contact Information</h2>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions about these Terms & Conditions, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-300">
                    <p>
                      <strong className="text-white">Email:</strong> legal@irongym.com
                    </p>
                    <p>
                      <strong className="text-white">Phone:</strong> (555) 123-4567
                    </p>
                    <p>
                      <strong className="text-white">Address:</strong> 123 Fitness Street, Muscle City, MC 12345
                    </p>
                    <p>
                      <strong className="text-white">Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="mt-12 text-center space-y-4">
            <p className="text-gray-400">
              By continuing to use IronGym facilities, you acknowledge that you have read, understood, and agree to be
              bound by these Terms & Conditions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/membership">
                <Button className="bg-red-600 hover:bg-red-700 text-white">Join Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-gray-700 bg-transparent text-white hover:bg-gray-800">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 IronGym. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
