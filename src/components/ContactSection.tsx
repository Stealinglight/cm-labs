import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Obfuscate email to protect from spam bots
  const getEmailParts = () => {
    const user = 'stealinglight';
    const domain = 'gmail.com';
    return { user, domain, full: `${user}@${domain}` };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0f0f0f] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">06.</span> $ nano contact.txt
        </div>

        <h2 className="text-3xl md:text-4xl mb-8 tracking-wide uppercase">Get in Touch</h2>

        <p className="text-gray-400 leading-relaxed mb-12 max-w-2xl">
          Interested in working together on security AI projects, consulting engagements,
          or just want to talk about agentic systems? Let's connect.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="border border-white/10 bg-[#1a1a1a]/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-sm uppercase tracking-widest text-[#00d9ff]">Email</h3>
              </div>
              <a
                href={`mailto:${getEmailParts().full}`}
                className="text-gray-300 hover:text-[#00ff41] transition-colors font-mono"
                onClick={(e) => {
                  e.preventDefault();
                  const email = getEmailParts();
                  window.location.href = `mailto:${email.full}`;
                }}
              >
                {getEmailParts().user}@{getEmailParts().domain}
              </a>
            </div>

            <div className="border border-white/10 bg-[#1a1a1a]/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Github className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-sm uppercase tracking-widest text-[#00d9ff]">GitHub</h3>
              </div>
              <a
                href="https://github.com/Stealinglight"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#00ff41] transition-colors font-mono"
              >
                github.com/Stealinglight
              </a>
            </div>

            <div className="border border-white/10 bg-[#1a1a1a]/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Linkedin className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-sm uppercase tracking-widest text-[#00d9ff]">LinkedIn</h3>
              </div>
              <a
                href="https://www.linkedin.com/in/cmcmillon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#00ff41] transition-colors font-mono"
              >
                linkedin.com/in/cmcmillon
              </a>
            </div>

            <div className="border border-white/10 bg-[#1a1a1a]/30 p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-[#00d9ff]" />
                <h3 className="text-sm uppercase tracking-widest text-[#00d9ff]">Location</h3>
              </div>
              <p className="text-gray-300 font-mono">Seattle, Washington</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-white/10 bg-[#1a1a1a]/30 p-8">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-400 mb-2 font-mono">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2 font-mono">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2 font-mono">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#00d9ff] text-black hover:bg-[#00ff41] transition-all uppercase tracking-wider"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>

              <p className="text-xs text-gray-500 font-mono text-center">
                // Form submissions are currently in development
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
