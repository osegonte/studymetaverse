"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    question: "Do I really not need to pay tuition?",
    answer: "Yes, public universities in most federal states (except Baden-Württemberg) do not charge tuition fees for Bachelor's and most Master's degrees, even for non-EU students.",
  },
  {
    question: "Can I work while studying in Germany?",
    answer: "Yes, international students can work up to 120 full days or 240 half days per year. This is usually enough to cover living expenses.",
  },
  {
    question: "How accurate is the Match Report?",
    answer: "Our Match Report is based on official admission data and uses your profile to calculate a personalised probability. It is highly accurate but should be used as a guide alongside official university requirements.",
  },
  {
    question: "Do I need to speak German to apply?",
    answer: "Not necessarily. Over 2,000 programmes are fully taught in English. However, some programmes and most preparatory courses require German language proficiency.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a3c5e] tracking-tight text-center mb-10 sm:mb-12">
            Frequently Asked Questions
          </h2>
        </AnimatedSection>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-[#1a3c5e] text-[14px] sm:text-[15px] pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 text-gray-500 text-[13.5px] sm:text-[14px] font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}