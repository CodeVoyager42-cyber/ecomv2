import React from "react";
import { CheckCircleIcon, StarIcon, TruckIcon, HeartIcon } from "@heroicons/react/24/solid";

export default function WhyChooseUs() {
  const features = [
    {
      title: "High-Quality Products",
      desc: "Every item is crafted with premium materials and strict quality control.",
      icon: <StarIcon className="w-8 h-8 text-yellow-500" />,
    },
    {
      title: "Affordable Prices",
      desc: "We offer the best deals without compromising on style or comfort.",
      icon: <CheckCircleIcon className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Excellent Customer Service",
      desc: "Our support team is here 24/7 to assist you with anything you need.",
      icon: <HeartIcon className="w-8 h-8 text-red-500" />,
    },
    {
      title: "Fast & Free Shipping",
      desc: "Enjoy free and quick delivery right to your doorstep.",
      icon: <TruckIcon className="w-8 h-8 text-blue-500" />,
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-yellow-50 py-20 px-6 sm:px-10 rounded-lg shadow-inner">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Why Choose <span className="text-yellow-600">Us?</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          We go above and beyond to make sure you get the best experience — from the moment you browse to the moment your order arrives.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 