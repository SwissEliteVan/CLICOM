'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

// --- Types ---
interface DevisFormData {
  prenom: string
  nom: string
  entreprise: string
  url: string
  besoin: string
  description: string
  email: string
  telephone: string
}

type FormErrors = Partial<Record<keyof DevisFormData, string>>

const BESOINS = [
  { value: '', label: 'Sélectionnez votre besoin...' },
  { value: 'creation-site', label: 'Création / Refonte de site internet' },
  { value: 'seo', label: 'Référencement naturel / SEO' },
  { value: 'sea', label: 'Référencement payant / SEA' },
  { value: 'strategie', label: 'Stratégie digitale' },
  { value: 'ux', label: 'UX/UI Design' },
]

// --- Composant champ de formulaire réutilisable ---
interface FormFieldProps {
  id: keyof DevisFormData
  label: string
  type?: 'text' | 'email' | 'tel' | 'url'
  placeholder?: string
  required?: boolean
  value: string
  onChange: (name: keyof DevisFormData, value: string) => void
  error?: string
  className?: string
}

const FormField = ({
  id,
  label,
  type = 'text',
  placeholder,
  required = false,
  value,
  onChange,
  error,
  className = '',
}: FormFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id, e.target.value)
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1.5">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full p-4 bg-white border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

interface SelectFieldProps {
  id: keyof DevisFormData
  label: string
  options: { value: string; label: string }[]
  required?: boolean
  value: string
  onChange: (name: keyof DevisFormData, value: string) => void
  error?: string
}

const SelectField = ({ id, label, options, required, value, onChange, error }: SelectFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(id, e.target.value)
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1.5">
        {label} {required && '*'}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        className={`w-full p-4 bg-white border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all text-slate-600 ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

interface TextareaFieldProps {
  id: keyof DevisFormData
  label: string
  placeholder?: string
  required?: boolean
  rows?: number
  value: string
  onChange: (name: keyof DevisFormData, value: string) => void
  error?: string
}

const TextareaField = ({
  id,
  label,
  placeholder,
  required,
  rows = 4,
  value,
  onChange,
  error,
}: TextareaFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(id, e.target.value)
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1.5">
        {label} {required && '*'}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        className={`w-full p-4 bg-white border rounded-xl focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none resize-none transition-all ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// --- Page principale ---
export default function DevisPage() {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<DevisFormData>({
    prenom: '',
    nom: '',
    entreprise: '',
    url: '',
    besoin: '',
    description: '',
    email: '',
    telephone: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  // Charger brouillon depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('devis_audit_draft')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<DevisFormData>
        setFormData((prev) => ({ ...prev, ...parsed }))
      } catch {
        // Ignorer les erreurs de parsing
      }
    }
  }, [])

  // Sauvegarder brouillon
  const saveDraft = useCallback((data: DevisFormData) => {
    localStorage.setItem('devis_audit_draft', JSON.stringify(data))
  }, [])

  const handleFieldChange = useCallback((name: keyof DevisFormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      saveDraft(newData)
      return newData
    })
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }, [errors, saveDraft])

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis'
    if (!formData.nom.trim()) newErrors.nom = 'Nom requis'
    if (!formData.entreprise.trim()) newErrors.entreprise = "Nom de l'entreprise requis"
    if (!formData.besoin) newErrors.besoin = 'Sélectionnez un besoin'
    if (!formData.description.trim()) newErrors.description = 'Description du projet requise'
    if (!formData.email.trim()) newErrors.email = 'Email professionnel requis'
    else if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(formData.email))
      newErrors.email = 'Email invalide (ex: nom@entreprise.ch)'
    if (!formData.telephone.trim()) newErrors.telephone = 'Téléphone professionnel requis'
    else if (!/^[\d\s\+\(\)]{8,}$/.test(formData.telephone))
      newErrors.telephone = 'Format téléphone invalide'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      // Scroller au premier champ en erreur
      const firstErrorField = Object.keys(errors)[0] as keyof DevisFormData
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        element?.focus()
      }
      return
    }

    setIsSubmitting(true)
    // Simulation d'envoi API
    try {
      // En production: await fetch('/api/audit', { method: 'POST', body: JSON.stringify(formData) })
      await new Promise((resolve) => setTimeout(resolve, 800))
      setStep('success')
      localStorage.removeItem('devis_audit_draft')
    } catch (error) {
      console.error('Erreur lors de l\'envoi', error)
      alert('Une erreur technique est survenue. Veuillez réessayer ou nous appeler directement.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Demander un audit digital gratuit | CLICOM Agence Web</title>
        <meta
          name="description"
          content="Audit digital gratuit et devis personnalisé sous 24h pour votre projet web. Création de site, SEO, SEA, stratégie digitale par CLICOM."
        />
      </Head>
      <div className="min-h-screen bg-white">
        <nav className="bg-white shadow-soft sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center font-bold text-white">
                C
              </div>
              <span className="font-bold text-xl text-slate-900">CLICOM</span>
            </Link>
            <Link href="/" className="text-sm text-slate-500 hover:text-brand-600 transition-colors">
              ← Retour à l'accueil
            </Link>
          </div>
        </nav>

        <main className="py-12 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            {step === 'form' && (
              <>
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-200">
                    Audit digital gratuit
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                    Faites décoller votre <span className="text-brand-600">croissance en ligne</span>
                  </h1>
                  <p className="text-lg text-slate-500 max-w-xl mx-auto">
                    Remplissez ce formulaire. Nos experts vous recontactent sous 24h avec un audit digital personnalisé et
                    un devis sur mesure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                  <div className="bg-brand-50 rounded-2xl p-5 text-center border border-brand-100">
                    <p className="text-2xl font-bold text-brand-700">Audit</p>
                    <p className="text-xs font-medium text-brand-600">Digital gratuit</p>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                    <p className="text-2xl font-bold text-green-700">Moins de 24h</p>
                    <p className="text-xs font-medium text-green-600">Recontact</p>
                  </div>
                  <div className="bg-accent-50 rounded-2xl p-5 text-center border border-accent-100">
                    <p className="text-2xl font-bold text-accent-700">0</p>
                    <p className="text-xs font-medium text-accent-600">Engagement</p>
                  </div>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="bg-slate-50 rounded-3xl p-8 md:p-12 shadow-soft border border-slate-100"
                  noValidate
                >
                  <div className="space-y-8">
                    {/* Section identité */}
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-4">Qui êtes-vous ?</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          id="prenom"
                          label="Prénom"
                          placeholder="Jean"
                          required
                          value={formData.prenom}
                          onChange={handleFieldChange}
                          error={errors.prenom}
                        />
                        <FormField
                          id="nom"
                          label="Nom"
                          placeholder="Dupont"
                          required
                          value={formData.nom}
                          onChange={handleFieldChange}
                          error={errors.nom}
                        />
                      </div>
                      <div className="mt-4">
                        <FormField
                          id="entreprise"
                          label="Nom de votre entreprise"
                          placeholder="Ma Société SA"
                          required
                          value={formData.entreprise}
                          onChange={handleFieldChange}
                          error={errors.entreprise}
                        />
                      </div>
                      <div className="mt-4">
                        <FormField
                          id="url"
                          label="URL de votre site actuel"
                          type="url"
                          placeholder="https://www.monsite.ch"
                          value={formData.url}
                          onChange={handleFieldChange}
                        />
                      </div>
                    </div>

                    {/* Section besoin */}
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-4">Quel est votre besoin ?</h2>
                      <SelectField
                        id="besoin"
                        label="Type de projet"
                        options={BESOINS}
                        required
                        value={formData.besoin}
                        onChange={handleFieldChange}
                        error={errors.besoin}
                      />
                      <div className="mt-4">
                        <TextareaField
                          id="description"
                          label="Description de votre projet ou objectifs"
                          placeholder="Décrivez votre projet, vos objectifs, votre budget indicatif..."
                          required
                          rows={4}
                          value={formData.description}
                          onChange={handleFieldChange}
                          error={errors.description}
                        />
                      </div>
                    </div>

                    {/* Section coordonnées */}
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-4">Vos coordonnées professionnelles</h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          id="email"
                          label="Email professionnel"
                          type="email"
                          placeholder="prenom@entreprise.ch"
                          required
                          value={formData.email}
                          onChange={handleFieldChange}
                          error={errors.email}
                        />
                        <FormField
                          id="telephone"
                          label="Téléphone professionnel"
                          type="tel"
                          placeholder="+41 78 XXX XX XX"
                          required
                          value={formData.telephone}
                          onChange={handleFieldChange}
                          error={errors.telephone}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-5 bg-accent-500 text-white font-bold text-lg rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] transform duration-300 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-600'
                      }`}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Demander mon audit digital gratuit'}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                      Vos données sont confidentielles. Jamais partagées à des tiers. En soumettant ce formulaire, vous
                      acceptez d'être contacté par nos experts.
                    </p>
                  </div>
                </form>

                <div className="mt-8 text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm text-slate-500 mb-2">Vous préférez échanger directement ?</p>
                  <a
                    href="tel:+41787875572"
                    className="text-2xl font-bold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    +41 78 755 72 87
                  </a>
                  <p className="text-xs text-slate-400 mt-1">Un expert vous conseille gratuitement</p>
                </div>
              </>
            )}

            {step === 'success' && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={48}
                    height={48}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Audit digital reçu</h1>
                <p className="text-lg text-slate-500 max-w-lg mx-auto mb-8">
                  Merci pour votre confiance. Un de nos experts analyse votre projet et vous recontacte{' '}
                  <strong className="text-slate-900">sous 24h</strong> avec une proposition personnalisée et sans
                  engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/" className="px-8 py-4 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all">
                    Retour à l'accueil
                  </Link>
                  <a
                    href="tel:+41787875572"
                    className="px-8 py-4 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-brand-200 hover:text-brand-600 transition-all"
                  >
                    Nous appeler
                  </a>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}