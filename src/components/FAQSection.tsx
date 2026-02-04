import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is security automation?',
    answer:
      'Security automation uses AI and software systems to handle repetitive security tasks at scale - from threat detection and incident response to compliance monitoring. Instead of manual processes, automated pipelines can analyze threats, enrich data, and trigger responses in seconds rather than hours.',
  },
  {
    question: 'How do agentic AI systems improve compliance?',
    answer:
      'Agentic AI systems use autonomous agents that can reason, plan, and execute multi-step workflows. For compliance, this means agents that can continuously monitor controls, gather evidence, identify gaps, and even remediate issues - operating 24/7 without human intervention while maintaining audit trails.',
  },
  {
    question: 'What are multi-agent security architectures?',
    answer:
      'Multi-agent architectures coordinate multiple specialized AI agents to solve complex security problems. Each agent handles a specific domain (threat intel, log analysis, remediation) while orchestration layers manage their collaboration. This mirrors how security teams work, but at machine speed.',
  },
  {
    question: 'Do you offer consulting?',
    answer:
      "Yes. I provide consulting on security automation architecture, agentic AI system design, and multi-agent implementations. Whether you're building compliance automation, threat analysis pipelines, or LLM-powered security tools, I can help design and implement solutions that scale.",
  },
];

/**
 * Generate a stable ID from question text for ARIA attributes
 */
function generateQuestionId(question: string): string {
  return question.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]/g, '');
}

function FAQItemComponent({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  // Generate stable IDs from question text
  const questionId = generateQuestionId(item.question);
  const panelId = `faq-panel-${questionId}`;
  const buttonId = `faq-button-${questionId}`;

  return (
    <div className="border border-white/10 bg-[#1a1a1a]/50">
      <button
        id={buttonId}
        onClick={onToggle}
        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-gray-200">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#00d9ff] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4"
        >
          {item.answer}
        </div>
      )}
    </div>
  );
}

/**
 * Injects FAQ schema into document head for SEO.
 * Uses DOM manipulation to avoid dangerouslySetInnerHTML.
 */
function useFAQSchema() {
  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    // Create and inject schema script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.textContent = JSON.stringify(faqSchema);

    // Remove existing if present, then add
    const existing = document.getElementById('faq-schema');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('faq-schema');
      if (el) {
        el.remove();
      }
    };
  }, []);
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Inject FAQ schema into head
  useFAQSchema();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">06.</span> $ man faq
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column - intro */}
          <div>
            <h2 className="text-3xl md:text-4xl mb-8 tracking-wide uppercase flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-[#00d9ff]" />
              FAQ
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                Common questions about security automation, agentic AI systems, and how I can help
                organizations build intelligent security solutions.
              </p>
              <p>
                These answers reflect my experience building multi-agent systems at AWS and designing
                automation architectures for compliance and threat analysis.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  Have a different question?{' '}
                  <a
                    href="#contact"
                    className="text-[#00d9ff] hover:text-[#00ff41] transition-colors"
                  >
                    Get in touch
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right column - FAQ items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItemComponent
                key={faq.question}
                item={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
