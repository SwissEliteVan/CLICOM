'use client'

import { useEffect, useState } from 'react'
import Icon from './Icon'

interface PopupCaptureProps {
  delayMs?: number
}

export default function PopupCapture({ delayMs = 15000 }: PopupCaptureProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true)
    }, delayMs)
    return () => clearTimeout(timer)
  }, [dismissed, delayMs])

  const handleSubmit = () => {
    if (!email.includes('@')) return
    setSubmitted(true)
    setTimeout(() => {
      setVisible(false)
      setDismissed(true)
    }, 2000)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-lg mx-4 relative animate-slide-up">
        <button
          onClick={() => { setVisible(false); setDismissed(true) }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all"
          aria-label="Fermer"
        >
          <Icon name="x" size={20} />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto">
              <Icon name="mail" size={32} className="text-brand-600" />
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900">
              Recevez nos conseils <span className="text-brand-600">gratuits</span>
            </h3>
            <p className="text-slate-500 text-center text-sm">
              Inscrivez-vous pour recevoir nos astuces marketing et les tendances digitales pour booster votre PME.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all whitespace-nowrap"
              >
                Je m&apos;inscris
              </button>
            </div>
            <p className="text-xs text-slate-400 text-center">Zero spam, desinscription a tout moment.</p>
          </div>
        ) : (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <Icon name="check" size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Merci !</h3>
            <p className="text-slate-500">Vous recevrez bientot nos meilleurs conseils.</p>
          </div>
        )}
      </div>
    </div>
  )
}
