import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Privacy <span className="text-purple-600">Policy</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 px-4">
              How we collect, use, and protect your information
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <Card className="py-10 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 mx-auto bg-transparent backdrop-blur-3xl rounded-xl my-8 sm:my-10 max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Introduction</h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                At BargainHunt, we respect your privacy and are committed to protecting your personal data. This Privacy
                Policy explains how we collect, use, and safeguard your information when you use our website.
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Please read this Privacy Policy carefully to understand our practices regarding your personal data and
                how we will treat it.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Information We Collect</h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                We may collect several different types of information for various purposes to provide and improve our
                service to you:
              </p>
              <ul className="list-disc pl-5 text-gray-300 text-sm sm:text-base space-y-2">
                <li>Personal identification information (Name, email address, etc.)</li>
                <li>Usage data (How you interact with our website)</li>
                <li>Cookies and tracking data</li>
                <li>Device information</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">How We Use Your Information</h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">We use the collected data for various purposes:</p>
              <ul className="list-disc pl-5 text-gray-300 text-sm sm:text-base space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our service</li>
                <li>To monitor the usage of our service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Data Security</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                The security of your data is important to us, but remember that no method of transmission over the
                Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your personal data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Contact Us</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <Link href="mailto:anshpethe110@gmail.com" className="text-purple-600 hover:underline">
                  anshpethe110@gmail.com
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-transparent border-2 border-purple-600 hover:bg-purple-600 text-purple-600 hover:text-white transition-colors">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </Card>

        <div className="p-6 sm:p-10 w-full"></div>
      </main>
    </div>
  )
}
