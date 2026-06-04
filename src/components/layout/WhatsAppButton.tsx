'use client'

import { MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '923238284762'
const WHATSAPP_MESSAGE = 'Hello%20GlaseerMart!%20I%20need%20help%20with...'

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-ambient-lg hover:shadow-ambient-xl transition-all duration-300 hover:-translate-y-1 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} className="fill-white text-white" />
      <span className="font-sans text-label-caps hidden md:block">
        Need Help? Chat with Our Team
      </span>
    </a>
  )
}
