'use client'

import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

interface ContactFormData {
  nom: string
  email: string
  telephone: string
  sujet: string
  message: string
}

export default function ContactPage() {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [formData, setFormData] = useState<ContactFormData>({ nom: '', email: '', telephone: '', sujet: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormData]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {}
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.message.trim()) newErrors.message = 'Message requis'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStep('success')
  }

  return (
    <>
      <Head>
        <title>Contact | CLICOM Agence Web</title>
        <meta name="description" content="Contactez CLICOM pour votre projet digital. Telephone, email ou formulaire de contact. Reponse sous 24h." />
      </Head>
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-soft sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">C</div>
              <span className="font-bold text-xl text-slate-900">CLICOM</span>
            </Link>
            <Link href="/devis" className="px-6 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all">Demander un devis</Link>
          </div>
        </nav>

        <main className="py-24 md:py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-200">Contact</span>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Parlons de votre projet</h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-10">Une question, un projet, une idee ? Contactez-nous directement ou via le formulaire. Nos experts vous repondent sous 24h.</p>
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                      <a href="mailto:hello@clicom.ch" className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors">hello@clicom.ch</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Telephone</p>
                      <a href="tel:+41788238950" className="text-lg font-bold text-slate-900 hover:text-brand-600 transition-colors">078 823 89 50</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Adresse</p>
                      <p className="text-lg font-bold text-slate-900">Vevey, Suisse romande</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-slate-100">
                {step === 'form' ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-900">Envoyez-nous un message</h2>
                    <p className="text-slate-500 text-sm">Remplissez le formulaire, nous vous repondons sous 24h.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all" />
                        {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
                      </div>
                      <div>
                        <input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <input type="tel" name="telephone" placeholder="Votre telephone (optionnel)" value={formData.telephone} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all" />
                    </div>
                    <div>
                      <select name="sujet" value={formData.sujet} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-slate-600">
                        <option value="">Choisissez un sujet</option>
                        <option value="site-web">Creation de site web</option>
                        <option value="seo">Referencement SEO</option>
                        <option value="design">Design & identite visuelle</option>
                        <option value="devis">Demande de devis</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <textarea name="message" placeholder="Votre message" rows={5} value={formData.message} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all resize-none" />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" className="w-full py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-soft">Envoyer le message</button>
                  </form>
                ) : (
                  <div className="text-center space-y-6 py-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Message envoye !</h2>
                    <p className="text-slate-500">Nous vous repondrons dans les plus brefs delais.</p>
                    <button onClick={() => { setStep('form'); setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' }); setErrors({}) }} className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-500 hover:text-brand-600 transition-all">Envoyer un autre message</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

