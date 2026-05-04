'use client'

import { useState } from 'react'
import Icon from './Icon'

interface FormData {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export default function HomeContactForm() {
  const [step, setStep] = useState<'start' | 'success'>('start')
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = () => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Votre nom est requis'
    if (!formData.email.trim()) newErrors.email = 'Votre email est requis'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.message.trim()) newErrors.message = 'Votre message est requis'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = () => {
    if (!validate()) return
    setStep('success')
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10">
      {step === 'start' ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h3>
          <p className="text-slate-500">Remplissez ce formulaire, on vous repond sous 24h.</p>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Votre nom"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-4 bg-slate-50 border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            <input
              type="email"
              name="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-4 bg-slate-50 border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            <textarea
              name="message"
              placeholder="Votre message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-4 bg-slate-50 border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none resize-none transition-all ${errors.message ? 'border-red-500' : 'border-slate-200'}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-soft hover:shadow-glow"
            >
              Envoyer le message
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6 py-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <Icon name="check" size={36} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Message envoye</h3>
          <p className="text-slate-500">Nous vous repondrons sous 24h.</p>
          <button
            onClick={() => { setStep('start'); setFormData({ name: '', email: '', message: '' }); setErrors({}) }}
            className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-500 hover:text-brand-600 hover:border-brand-200 transition-all"
          >
            Envoyer un autre message
          </button>
        </div>
      )}
    </div>
  )
}
