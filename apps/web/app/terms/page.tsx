import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Terms of <span className="text-purple-600">Service</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 px-4">
              Please read these terms carefully before using our platform
            </p>
          </div>
        </section>

        {/* Terms of Service Content */}
        <Card className="py-10 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 mx-auto bg-transparent backdrop-blur-3xl rounded-xl my-8 sm:my-10 max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Agreement to Terms</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                By accessing or using BargainHunt, you agree to be bound by these Terms of Service and all applicable
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
                accessing this site.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Use License</h2>
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                Permission is granted to temporarily access the materials on BargainHunt for personal, non-commercial
                use only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-5 text-gray-300 text-sm sm:text-base space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on BargainHunt</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Disclaimer</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                The materials on BargainHunt are provided on an 'as is' basis. BargainHunt makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Limitations</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                In no event shall BargainHunt or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on BargainHunt, even if BargainHunt or a BargainHunt authorized representative has
                been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-purple-600">Governing Law</h2>
              <p className="text-gray-300 text-sm sm:text-base">
                These terms and conditions are governed by and construed in accordance with the laws and any dispute
                relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts.
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
