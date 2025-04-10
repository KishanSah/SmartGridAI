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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e')] bg-cover bg-center opacity-60"></div>
        <div className="container mx-auto px-4 text-center z-10" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">SmartGridAI</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Revolutionizing power distribution through intelligent microgrid simulation and management
          </p>
          <div className="flex justify-center gap-4">
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