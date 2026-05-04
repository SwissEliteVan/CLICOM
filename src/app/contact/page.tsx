'use client'

import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

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
                      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2