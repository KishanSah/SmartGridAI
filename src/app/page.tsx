"use client";

import { useEffect } from "react";
import { ArrowRight, BarChart2, Brain, Cpu, Database, LineChart, Zap } from "lucide-react";
import Link from "next/link";
import AOS from "aos";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center ">
         <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover">
          <source src="https://cdn.dribbble.com/userupload/18851822/file/original-064bf23edf508c5be11fd8c12ca2beb6.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to make text more readable */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>
        {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e')] bg-cover bg-center opacity-60"></div> */}
        <div className="container mx-auto px-4 text-center z-10" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">SmartGridAI</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
            Revolutionizing power distribution through intelligent microgrid simulation and management
          </p>
          <div className="flex justify-center gap-4 bg-none">
            <Link 
              href="/simulator"
              className="inline-flex items-center px-8 py-3 text-lg bg-blue-500 hover:bg-blue-600 rounded-full transition-all transform hover:scale-105"
            >
              Try Simulator <ArrowRight className="ml-2" />
            </Link>
            <Link 
              href="/dashboard"
              className="inline-flex items-center px-8 py-3 text-lg bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
              View Dashboard <BarChart2 className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart2 className="w-12 h-12 text-blue-500" />,
                title: "Interactive Dashboard",
                description: "Real-time monitoring and visualization of power distribution across your microgrid network",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              },
              {
                icon: <Zap className="w-12 h-12 text-yellow-500" />,
                title: "Simulation Engine",
                description: "Test different scenarios and optimize your power distribution strategy with our advanced simulator",
                image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110"
              },
              {
                icon: <Brain className="w-12 h-12 text-purple-500" />,
                title: "Analysis Point (LIDA)",
                description: "AI-powered analysis tool for deep insights into your power grid performance",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="absolute inset-0">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                </div>
                <div className="relative p-8 text-white h-full flex flex-col justify-end min-h-[400px]">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6">Powered by Advanced Technology</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Cpu className="w-6 h-6 text-blue-500" />,
                    title: "Smart Controllers",
                    description: "Advanced microcontrollers optimize power distribution in real-time"
                  },
                  {
                    icon: <Database className="w-6 h-6 text-green-500" />,
                    title: "Data Analytics",
                    description: "Process millions of data points to predict and optimize power usage"
                  },
                  {
                    icon: <LineChart className="w-6 h-6 text-purple-500" />,
                    title: "Predictive Modeling",
                    description: "AI-driven forecasting for better resource management"
                  }
                ].map((tech, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-white rounded-lg shadow-md">
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{tech.title}</h3>
                      <p className="text-gray-600">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837"
                alt="Technology Overview"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white p-6 rounded-2xl shadow-xl max-w-xs">
                <p className="text-lg font-semibold">
                  Our AI processes over 1 million data points daily to optimize your power grid
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Power Grid?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the future of power distribution with our comprehensive suite of tools
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/simulator"
              className="inline-flex items-center px-8 py-3 text-lg bg-white text-blue-900 hover:bg-blue-50 rounded-full transition-all transform hover:scale-105"
            >
              Start Simulation <Zap className="ml-2" />
            </Link>
            <Link 
              href="/lida"
              className="inline-flex items-center px-8 py-3 text-lg bg-blue-800 hover:bg-blue-700 rounded-full transition-all"
            >
              Try LIDA Analysis <Brain className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ChevronRight, BarChart3, Zap, Shield } from "lucide-react"

// export default function Home() {
//   return (
//     <div className="relative min-h-screen flex flex-col">
//       {/* Video Background */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
//         <video autoPlay loop muted playsInline className="absolute min-w-full min-h-full object-cover">
//           <source src="https://cdn.dribbble.com/userupload/18851822/file/original-064bf23edf508c5be11fd8c12ca2beb6.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         {/* Overlay to make text more readable */}
//         <div className="absolute inset-0 bg-black/50 z-10"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-20 w-full py-6 px-4 md:px-8">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="text-yellow-400 font-bold text-2xl">SmartGrid</span>
//             <span className="text-blue-400 font-bold text-2xl">AI</span>
//           </div>
//           <nav className="hidden md:flex space-x-8">
//             <Link href="/dashboard" className="text-white hover:text-yellow-400 transition-colors">
//               Dashboard
//             </Link>
//             <Link href="/lida" className="text-white hover:text-yellow-400 transition-colors">
//               Analysis Point
//             </Link>
//             <Link href="/simulator" className="text-white hover:text-yellow-400 transition-colors">
//               Simulator
//             </Link>
            
//           </nav>
//           <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">Get Started</Button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="relative z-20 flex-grow flex flex-col justify-center px-4 md:px-8">
//         <div className="container mx-auto max-w-5xl">
//           <div className="flex flex-col items-start space-y-6 md:w-2/3">
//             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
//               Powering the Future with <span className="text-yellow-400">Intelligent</span> Energy Solutions
//             </h1>
//             <p className="text-lg md:text-xl text-gray-200">
//               SmartGridAI combines artificial intelligence with advanced energy management to optimize power
//               distribution, reduce costs, and accelerate the transition to renewable energy.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 text-lg">
//                 Explore Solutions
//                 <ChevronRight className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 variant="outline"
//                 className="border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-6 text-lg"
//               >
//                 Watch Demo
//               </Button>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Features Section */}
//       <section className="relative z-20 py-16 px-4 md:px-8 bg-black/70 backdrop-blur-sm">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center text-white mb-12">
//             Transforming Energy Management with <span className="text-yellow-400">AI</span>
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="bg-gray-900/80 p-6 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors">
//               <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-4">
//                 <BarChart3 className="h-8 w-8 text-blue-400" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">Predictive Analytics</h3>
//               <p className="text-gray-300">
//                 Forecast energy demands and optimize distribution with our advanced AI algorithms.
//               </p>
//             </div>
//             <div className="bg-gray-900/80 p-6 rounded-lg border border-yellow-500/30 hover:border-yellow-400 transition-colors">
//               <div className="bg-yellow-500/20 p-3 rounded-full w-fit mb-4">
//                 <Zap className="h-8 w-8 text-yellow-400" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">Smart Distribution</h3>
//               <p className="text-gray-300">
//                 Dynamically balance loads and prevent outages with real-time monitoring and control.
//               </p>
//             </div>
//             <div className="bg-gray-900/80 p-6 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors">
//               <div className="bg-blue-500/20 p-3 rounded-full w-fit mb-4">
//                 <Shield className="h-8 w-8 text-blue-400" />
//               </div>
//               <h3 className="text-xl font-bold text-white mb-2">Grid Security</h3>
//               <p className="text-gray-300">
//                 Protect critical infrastructure with AI-powered threat detection and response systems.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative z-20 py-16 px-4 md:px-8">
//         <div className="container mx-auto max-w-4xl bg-gradient-to-r from-blue-900/70 to-black/70 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-blue-500/30">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
//                 Ready to modernize your energy infrastructure?
//               </h2>
//               <p className="text-gray-300">Schedule a consultation with our experts today.</p>
//             </div>
//             <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 whitespace-nowrap">
//               Contact Us
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="relative z-20 bg-black/80 backdrop-blur-sm py-8 px-4 md:px-8 mt-auto">
//         <div className="container mx-auto">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center mb-4 md:mb-0">
//               <span className="text-yellow-400 font-bold text-xl">SmartGrid</span>
//               <span className="text-blue-400 font-bold text-xl">AI</span>
//               <span className="text-gray-400 ml-2 text-sm">© {new Date().getFullYear()} All Rights Reserved</span>
//             </div>
//             <div className="flex space-x-6">
//               <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
//                 Privacy Policy
//               </Link>
//               <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
//                 Terms of Service
//               </Link>
//               <Link href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
//                 Contact
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
