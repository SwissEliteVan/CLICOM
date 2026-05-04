import Badge from './Badge'

interface SectionTitleProps {
  subtitle: string
  title: string
}

export default function SectionTitle({ subtitle, title }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <Badge>{subtitle}</Badge>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mt-4">{title}</h2>
      <div className="w-20 h-1 bg-brand-600 rounded-full mx-auto mt-6" />
    </div>
  )
}
