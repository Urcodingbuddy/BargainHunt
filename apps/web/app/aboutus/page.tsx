import Link from "next/link";
import { Github, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-purple-600">BargainHunt</span>
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
              Your ultimate destination for finding the best deals across the
              web
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-6">
                At BargainHunt, we're on a mission to simplify the
                bargain-hunting process by aggregating deals from multiple
                sources, ensuring you have access to the most up-to-date
                discounts available.
              </p>
              <p className="text-gray-300 mb-6">
                We understand how time-consuming it can be to search across
                different retailers for the best prices. That's why we've built
                a platform that does the hard work for you, bringing together
                deals from major retailers like Amazon and Flipkart in one
                convenient place.
              </p>
              <p className="text-gray-300">
                Our goal is to help you make smarter shopping decisions and save
                money on every purchase.
              </p>
            </div>
            <div className="relative flex justify-center items-center">
              <img
                src="./bargainHunt Logo.png"
                alt="BargainHunt mission illustration"
                className="object-cover p-4 h-96"
              />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <Card className="py-16 px-4 md:px-6 lg:px-8  mx-auto bg-transperent backdrop-blur-3xl rounded-xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="bg-transparent backdrop-blur-3xl p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Real-Time Deal Tracking
              </h3>
              <p className="text-gray-400">
                Our platform continuously monitors prices across multiple
                retailers, ensuring you always see the most current deals
                available.
              </p>
            </Card>

            <Card className="bg-transparent backdrop-blur-3xl p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-400">
                Get deal recommendations tailored to your preferences and
                shopping history, helping you discover offers you'll actually
                care about.
              </p>
            </Card>

            <Card className="bg-transparent backdrop-blur-3xl p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Advanced Filtering</h3>
              <p className="text-gray-400">
                Easily filter deals by category, price range, discount
                percentage, and more to quickly find exactly what you're looking
                for.
              </p>
            </Card>
          </div>
        </Card>

        {/* Developer Section */}
        <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto rounded-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">The Developer</h2>
              <p className="text-gray-300 mb-6">
                BargainHunt was created by Ansh Pethe, a passionate software
                engineer committed to creating efficient and user-centric web
                applications.
              </p>
              <p className="text-gray-300 mb-8">
                With a background in full-stack development and a keen interest
                in e-commerce technologies, Ansh built BargainHunt to
                solve a common problem faced by online shoppers - finding the
                best deals without spending hours searching across multiple
                websites.
              </p>

              <h3 className="text-xl font-bold mb-4">GitHub Repositories</h3>
              <div className="space-y-4">
                <Link
                  href="#"
                  className="flex items-center gap-3 p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div>
                    <Github className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">BargainHunt</h4>
                    <p className="text-sm text-gray-400">
                      Compare prices, discover discounts, and make smarter
                      shopping decisions with our real-time price comparison
                      tool.
                    </p>
                  </div>
                  <div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Link>
                <Link
                  href="https://github.com/Urcodingbuddy/Cleven.Studio"
                  className="flex items-center gap-3 p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div>
                    <Github className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Cleven.Studio</h4>
                    <p className="text-sm text-gray-400">
                      Cleven Studios makes maintaining, optimizing, and
                      enhancing your site effortless. Reliable. Scalable.
                    </p>
                  </div>
                  <div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Link>
                <Link
                  href="https://github.com/Urcodingbuddy/Medium_Social-App"
                  className="flex items-center gap-3 p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div>
                    <Github className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Medium Social</h4>
                    <p className="text-sm text-gray-400">
                      A website that provides functionality to post your
                      thoughts news and anything you want
                    </p>
                  </div>
                  <div>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center items-center border h-[80vh] rounded-xl overflow-hidden">
              <img
                src="./eren yeager4-3.jpg"
                alt="Developer profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Card className="py-16 px-4 md:px-6 lg:px-8  mx-auto bg-transparent backdrop-blur-3xl rounded-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-gray-300 mb-8">
              Have questions, suggestions, or feedback? Interested in
              collaborating with us? We would be delighted to hear from you and
              assist in any way we can.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="bg-purple-600 border-2 border-purple-600 hover:text-white hover:bg-transparent hover:border-2 inline-flex items-center justify-center px-4 py-2 text-white">
                  <Mail className="mr-2 h-4 w-4" />
                <Link href={"mailto:anshpethe110@gmail.com?subject=Developer%20Requirements"}>
                  Email Us
                </Link>
              </Button>
                <Button className="border-purple-600 cursor-pointer text-purple-600 bg-transparent hover:bg-transparent border-2 hover:text-white">
                <Github className="mr-2 h-4 w-4" />
                <Link 
                  href={"https://github.com/Urcodingbuddy"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Follow on GitHub
                </Link>
                </Button>
            </div>
          </div>
        </Card>

        <div className="p-10 w-full"></div>
      </main>
    </div>
  );
}
