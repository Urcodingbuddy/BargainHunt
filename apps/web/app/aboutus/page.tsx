import Link from "next/link";
import { Github, Mail, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 md:py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              About <span className="text-purple-600">BargainHunt</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-300 px-4">
              Your ultimate destination for finding the best deals across the
              web
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                At BargainHunt, we're on a mission to simplify the
                bargain-hunting process by aggregating deals from multiple
                sources, ensuring you have access to the most up-to-date
                discounts available.
              </p>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                We understand how time-consuming it can be to search across
                different retailers for the best prices. That's why we've built
                a platform that does the hard work for you, bringing together
                deals from major retailers like Amazon and Flipkart in one
                convenient place.
              </p>
              <p className="text-gray-300 text-sm sm:text-base">
                Our goal is to help you make smarter shopping decisions and save
                money on every purchase.
              </p>
            </div>
            <div className="relative flex justify-center items-center order-1 md:order-2">
              <img
                src="./bargainHunt Logo.png"
                alt="BargainHunt mission illustration"
                className="object-cover p-2 sm:p-4 h-64 sm:h-80 md:h-96 w-auto"
              />
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <Card className="py-10 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 mx-auto bg-transperent backdrop-blur-3xl rounded-xl my-8 sm:my-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Key Features</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <Card className="bg-transparent backdrop-blur-3xl p-6 sm:p-8 rounded-xl border border-gray-800">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600"
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Real-Time Deal Tracking
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Our platform continuously monitors prices across multiple
                retailers, ensuring you always see the most current deals
                available.
              </p>
            </Card>

            <Card className="bg-transparent backdrop-blur-3xl p-6 sm:p-8 rounded-xl border border-gray-800">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600"
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Get deal recommendations tailored to your preferences and
                shopping history, helping you discover offers you'll actually
                care about.
              </p>
            </Card>

            <Card className="bg-transparent backdrop-blur-3xl p-6 sm:p-8 rounded-xl border border-gray-800 sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-none">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600"
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
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Advanced Filtering</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Easily filter deals by category, price range, discount
                percentage, and more to quickly find exactly what you're looking
                for.
              </p>
            </Card>
          </div>
        </Card>

        {/* Developer Section */}
        <section className="py-10 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto rounded-xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">The Developer</h2>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                BargainHunt was created by Ansh Pethe, a passionate software
                engineer committed to creating efficient and user-centric web
                applications.
              </p>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base">
                With a background in full-stack development and a keen interest
                in e-commerce technologies, Ansh built BargainHunt to
                solve a common problem faced by online shoppers - finding the
                best deals without spending hours searching across multiple
                websites.
              </p>

              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">GitHub Repositories</h3>
              <div className="space-y-3 sm:space-y-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div>
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">BargainHunt</h4>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                      Compare prices, discover discounts, and make smarter
                      shopping decisions with our real-time price comparison
                      tool.
                    </p>
                  </div>
                  <div>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 ml-auto flex-shrink-0" />
                  </div>
                </Link>
                <Link
                  href="https://github.com/Urcodingbuddy/Cleven.Studio"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div>
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">Cleven.Studio</h4>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                      Cleven Studios makes maintaining, optimizing, and
                      enhancing your site effortless. Reliable. Scalable.
                    </p>
                  </div>
                  <div>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 ml-auto flex-shrink-0" />
                  </div>
                </Link>
                <Link
                  href="https://github.com/Urcodingbuddy/Medium_Social-App"
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-[#111111] rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <div>
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">Medium Social</h4>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                      A website that provides functionality to post your
                      thoughts news and anything you want
                    </p>
                  </div>
                  <div>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 ml-auto flex-shrink-0" />
                  </div>
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center items-center order-1 md:order-2 border rounded-xl overflow-hidden h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
              <img
                src="./eren yeager4-3.jpg"
                alt="Developer profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Card className="py-10 sm:py-12 md:py-16 px-4 md:px-6 lg:px-8 mx-auto bg-transparent backdrop-blur-3xl rounded-xl my-8 sm:my-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
            <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base px-4">
              Have questions, suggestions, or feedback? Interested in
              collaborating with us? We would be delighted to hear from you and
              assist in any way we can.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Button className="bg-purple-600 border-2 border-purple-600 hover:text-white hover:bg-transparent hover:border-2 inline-flex items-center justify-center px-4 py-2 text-white w-full sm:w-auto">
                <Mail className="mr-2 h-4 w-4" />
                <Link href={"mailto:anshpethe110@gmail.com?subject=Developer%20Requirements"}>
                  Email Us
                </Link>
              </Button>
              <Button className="border-purple-600 cursor-pointer text-purple-600 bg-transparent hover:bg-transparent border-2 hover:text-white w-full sm:w-auto">
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

        <div className="p-6 sm:p-10 w-full"></div>
      </main>
    </div>
  );
}
