import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  TrendingUp, Network, Search, FileText, Settings, GraduationCap, BarChart2, BookOpen,
  ArrowLeft, ArrowRight, CheckCircle, Phone, ChevronRight
} from 'lucide-react'
import { SERVICE_SLUGS } from './Services'

const ICONS = [TrendingUp, Network, Search, FileText, Settings, GraduationCap, BarChart2, BookOpen]
const COLORS = [
  'from-petroleum-600 to-petroleum-800',
  'from-gold-500 to-gold-600',
  'from-petroleum-500 to-petroleum-700',
  'from-emerald-600 to-emerald-800',
  'from-petroleum-600 to-petroleum-900',
  'from-gold-400 to-gold-600',
  'from-petroleum-400 to-petroleum-600',
  'from-slate-600 to-slate-800',
]

// Contenu détaillé de chaque service
const SERVICES_DETAIL = [
  {
    slug: 'conseil-strategique',
    title: 'Conseil Stratégique',
    subtitle: 'Analyse de marché, stratégie d\'entrée et évaluation des risques dans le secteur énergétique africain.',
    intro: 'Dans un secteur aussi complexe et compétitif que l\'énergie en Afrique, une stratégie solide est la clé du succès. PétroGaz Consulting vous accompagne avec une expertise pointue pour transformer vos ambitions en résultats concrets.',
    benefits: [
      'Analyse approfondie des marchés pétroliers et gaziers africains',
      'Identification des opportunités d\'investissement à fort potentiel',
      'Évaluation des risques géopolitiques, réglementaires et opérationnels',
      'Stratégies d\'entrée sur les marchés nationaux et sous-régionaux',
      'Benchmarking concurrentiel et positionnement stratégique',
      'Recommandations actionnables basées sur des données terrain',
    ],
    process: [
      { step: '01', title: 'Diagnostic', desc: 'Analyse de votre situation actuelle, de vos objectifs et du contexte marché.' },
      { step: '02', title: 'Recherche', desc: 'Collecte et analyse des données sectorielles, réglementaires et concurrentielles.' },
      { step: '03', title: 'Stratégie', desc: 'Élaboration d\'une feuille de route stratégique personnalisée et actionnable.' },
      { step: '04', title: 'Suivi', desc: 'Accompagnement dans la mise en œuvre et ajustements selon les résultats.' },
    ],
    targets: ['Compagnies pétrolières internationales', 'Investisseurs institutionnels', 'Gouvernements et agences nationales', 'PME du secteur énergétique'],
  },
  {
    slug: 'liaison-inter-entreprises',
    title: 'Liaison Inter-Entreprises',
    subtitle: 'Mise en relation stratégique des acteurs clés du secteur énergétique africain.',
    intro: 'Le succès dans le secteur pétrolier et gazier repose sur des partenariats solides. Notre réseau étendu en Afrique et à l\'international vous ouvre les portes des meilleures opportunités de collaboration.',
    benefits: [
      'Accès à un réseau de plus de 200 acteurs du secteur en Afrique',
      'Mise en relation avec des opérateurs, fournisseurs et investisseurs qualifiés',
      'Facilitation de partenariats public-privé avec les gouvernements',
      'Organisation de rencontres B2B et de forums sectoriels',
      'Accompagnement dans les négociations préliminaires',
      'Suivi et consolidation des partenariats établis',
    ],
    process: [
      { step: '01', title: 'Profiling', desc: 'Analyse de votre profil, besoins et critères de partenariat idéaux.' },
      { step: '02', title: 'Matching', desc: 'Identification et sélection des partenaires potentiels dans notre réseau.' },
      { step: '03', title: 'Introduction', desc: 'Mise en relation formelle et organisation des premières rencontres.' },
      { step: '04', title: 'Consolidation', desc: 'Accompagnement jusqu\'à la formalisation du partenariat.' },
    ],
    targets: ['Opérateurs pétroliers cherchant des partenaires locaux', 'Fournisseurs de services et équipements', 'Investisseurs cherchant des opportunités', 'Entreprises locales souhaitant s\'internationaliser'],
  },
  {
    slug: 'due-diligence-audit',
    title: 'Due Diligence & Audit',
    subtitle: 'Évaluation rigoureuse et indépendante de vos projets et actifs énergétiques.',
    intro: 'Avant tout investissement ou acquisition dans le secteur énergétique, une due diligence approfondie est indispensable. Notre équipe d\'experts réalise des audits complets pour sécuriser vos décisions.',
    benefits: [
      'Audit technique des actifs pétroliers et gaziers',
      'Évaluation financière et comptable des projets',
      'Analyse de conformité réglementaire et environnementale',
      'Vérification des titres miniers et permis d\'exploitation',
      'Évaluation des réserves et ressources prouvées',
      'Rapport détaillé avec recommandations et plan d\'action',
    ],
    process: [
      { step: '01', title: 'Cadrage', desc: 'Définition du périmètre d\'audit et collecte des documents nécessaires.' },
      { step: '02', title: 'Investigation', desc: 'Analyse technique, financière, juridique et environnementale approfondie.' },
      { step: '03', title: 'Rapport', desc: 'Rédaction d\'un rapport détaillé avec findings et recommandations.' },
      { step: '04', title: 'Présentation', desc: 'Présentation des résultats et accompagnement dans les décisions.' },
    ],
    targets: ['Investisseurs en phase d\'acquisition', 'Banques et institutions financières', 'Compagnies en fusion-acquisition', 'Gouvernements évaluant des concessions'],
  },
  {
    slug: 'negociation-contrats',
    title: 'Négociation de Contrats',
    subtitle: 'Assistance experte dans la négociation de contrats pétroliers, gaziers et miniers.',
    intro: 'La négociation de contrats dans le secteur énergétique requiert une expertise juridique, technique et commerciale pointue. Notre équipe vous représente et défend vos intérêts pour obtenir les meilleures conditions.',
    benefits: [
      'Négociation de contrats de partage de production (PSC)',
      'Assistance dans les accords de concession et licences',
      'Négociation de contrats de service et d\'opération',
      'Révision et optimisation des clauses contractuelles',
      'Médiation et résolution de litiges contractuels',
      'Veille sur les standards internationaux du secteur',
    ],
    process: [
      { step: '01', title: 'Analyse', desc: 'Étude des termes proposés et identification des points de négociation.' },
      { step: '02', title: 'Stratégie', desc: 'Élaboration d\'une stratégie de négociation et définition des objectifs.' },
      { step: '03', title: 'Négociation', desc: 'Conduite des négociations avec toutes les parties prenantes.' },
      { step: '04', title: 'Finalisation', desc: 'Revue finale du contrat et accompagnement à la signature.' },
    ],
    targets: ['Compagnies pétrolières internationales', 'États et gouvernements africains', 'Sociétés nationales d\'hydrocarbures', 'Consortiums d\'exploration'],
  },
  {
    slug: 'gestion-projets',
    title: 'Gestion de Projets',
    subtitle: 'Pilotage expert de vos projets d\'exploration, développement et production.',
    intro: 'La gestion de projets dans le secteur pétrolier et gazier exige rigueur, expertise et coordination. PétroGaz Consulting assure le pilotage de vos projets de A à Z pour garantir leur succès.',
    benefits: [
      'Planification et programmation des phases de projet',
      'Coordination des équipes techniques et des sous-traitants',
      'Gestion des budgets et contrôle des coûts',
      'Suivi des délais et gestion des risques opérationnels',
      'Reporting régulier aux parties prenantes',
      'Gestion de la conformité HSE (Hygiène, Sécurité, Environnement)',
    ],
    process: [
      { step: '01', title: 'Initialisation', desc: 'Définition du scope, des objectifs et de la gouvernance du projet.' },
      { step: '02', title: 'Planification', desc: 'Élaboration du plan de projet, budget et calendrier détaillés.' },
      { step: '03', title: 'Exécution', desc: 'Coordination et supervision de toutes les activités du projet.' },
      { step: '04', title: 'Clôture', desc: 'Livraison, documentation et retour d\'expérience.' },
    ],
    targets: ['Opérateurs en phase d\'exploration', 'Compagnies en développement de champs', 'Sociétés de services pétroliers', 'Investisseurs dans des projets énergétiques'],
  },
  {
    slug: 'formation-expertise',
    title: 'Formation & Expertise',
    subtitle: 'Programmes de formation spécialisés pour les professionnels du secteur énergétique.',
    intro: 'Le développement des compétences locales est au cœur de notre mission. Nos programmes de formation sont conçus par des experts du secteur pour répondre aux besoins réels des professionnels africains de l\'énergie.',
    benefits: [
      'Formations techniques en exploration et production pétrolière',
      'Modules sur le droit pétrolier et la réglementation africaine',
      'Formation en gestion financière de projets énergétiques',
      'Ateliers pratiques sur les négociations contractuelles',
      'Programmes de mentorat avec des experts internationaux',
      'Certifications reconnues dans le secteur',
    ],
    process: [
      { step: '01', title: 'Évaluation', desc: 'Analyse des besoins en formation et du niveau des participants.' },
      { step: '02', title: 'Conception', desc: 'Élaboration d\'un programme sur mesure adapté aux objectifs.' },
      { step: '03', title: 'Formation', desc: 'Délivrance de la formation par des experts du secteur.' },
      { step: '04', title: 'Évaluation', desc: 'Mesure des acquis et délivrance des certifications.' },
    ],
    targets: ['Ingénieurs et techniciens du secteur', 'Cadres de sociétés nationales d\'hydrocarbures', 'Juristes spécialisés en droit minier', 'Fonctionnaires des ministères de l\'énergie'],
  },
  {
    slug: 'etudes-recherches',
    title: 'Études & Recherches',
    subtitle: 'Études de faisabilité, rapports sectoriels et analyses géologiques approfondies.',
    intro: 'Des décisions éclairées reposent sur des données fiables et des analyses rigoureuses. Notre département études produit des rapports de haute qualité qui font référence dans le secteur énergétique africain.',
    benefits: [
      'Études de faisabilité technique et économique',
      'Rapports sectoriels sur les marchés pétroliers africains',
      'Analyses géologiques et évaluations de bassins sédimentaires',
      'Études d\'impact environnemental et social',
      'Veille réglementaire et analyse des politiques énergétiques',
      'Modélisation économique et projections financières',
    ],
    process: [
      { step: '01', title: 'Brief', desc: 'Définition précise des objectifs et du périmètre de l\'étude.' },
      { step: '02', title: 'Collecte', desc: 'Collecte et validation des données primaires et secondaires.' },
      { step: '03', title: 'Analyse', desc: 'Traitement et analyse des données par nos experts sectoriels.' },
      { step: '04', title: 'Livraison', desc: 'Remise du rapport final avec présentation des conclusions.' },
    ],
    targets: ['Compagnies en phase d\'exploration', 'Institutions financières et banques', 'Gouvernements et agences de développement', 'Organisations internationales'],
  },
  {
    slug: 'conformite-reglementation',
    title: 'Conformité & Réglementation',
    subtitle: 'Accompagnement dans la mise en conformité avec les réglementations du secteur.',
    intro: 'Le cadre réglementaire du secteur pétrolier et gazier africain est en constante évolution. Notre équipe vous aide à naviguer dans cet environnement complexe et à maintenir une conformité totale.',
    benefits: [
      'Veille réglementaire continue dans les pays d\'opération',
      'Audit de conformité aux normes locales et internationales',
      'Accompagnement dans l\'obtention de permis et licences',
      'Mise en conformité avec les normes HSE internationales',
      'Gestion des relations avec les autorités de régulation',
      'Formation des équipes aux exigences réglementaires',
    ],
    process: [
      { step: '01', title: 'Audit', desc: 'Évaluation de votre niveau de conformité actuel.' },
      { step: '02', title: 'Gap Analysis', desc: 'Identification des écarts et des risques de non-conformité.' },
      { step: '03', title: 'Plan d\'action', desc: 'Élaboration d\'un plan de mise en conformité priorisé.' },
      { step: '04', title: 'Implémentation', desc: 'Accompagnement dans la mise en œuvre et le suivi.' },
    ],
    targets: ['Opérateurs pétroliers et gaziers', 'Sociétés minières', 'Entreprises de services pétroliers', 'Investisseurs étrangers entrant sur le marché'],
  },
]

export default function ServicesPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const currentIndex = slug ? SERVICE_SLUGS.indexOf(slug) : -1
  const service = currentIndex >= 0 ? SERVICES_DETAIL[currentIndex] : null
  const Icon = currentIndex >= 0 ? ICONS[currentIndex] : null
  const color = currentIndex >= 0 ? COLORS[currentIndex] : null

  const prevService = currentIndex > 0 ? SERVICES_DETAIL[currentIndex - 1] : null
  const nextService = currentIndex < SERVICES_DETAIL.length - 1 ? SERVICES_DETAIL[currentIndex + 1] : null

  // Page liste de tous les services
  if (!slug || !service) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
            </Link>
            <span className="block px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium mb-4 w-fit mx-auto">
              {t('services.badge')}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">{t('services.title')}</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">{t('services.subtitle')}</p>
          </motion.div>

          {/* Grille services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {SERVICES_DETAIL.map((s, i) => {
              const SIcon = ICONS[i]
              return (
                <motion.div key={s.slug}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}>
                  <Link to={`/services/${s.slug}`}
                    className="glass-card rounded-2xl p-6 flex gap-5 group hover:border-petroleum-500/40 transition-all duration-300 hover:-translate-y-0.5 block">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${COLORS[i]} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
                      <SIcon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-white text-lg mb-1">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">{s.subtitle}</p>
                      <span className="flex items-center gap-1.5 text-petroleum-400 text-xs font-semibold group-hover:text-gold-400 transition-colors">
                        {t('services.learn_more')} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Page détail d'un service
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero service */}
      <div className="relative overflow-hidden bg-gradient-to-b from-petroleum-950/50 to-transparent py-16 mb-12">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-petroleum-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb scrollable sur mobile */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-1">
            <Link to="/" className="hover:text-white transition-colors shrink-0">Accueil</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to="/services" className="hover:text-white transition-colors shrink-0">Services</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-slate-300 shrink-0">{service.title}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0 shadow-xl`}>
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">{service.title}</h1>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">{service.subtitle}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">

        {/* Introduction */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 border-l-4 border-petroleum-500">
          <p className="text-slate-300 text-base leading-relaxed">{service.intro}</p>
        </motion.div>

        {/* Ce que nous offrons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <CheckCircle className="w-4 h-4 text-white" />
            </span>
            Ce que nous offrons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-3 glass-card rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-petroleum-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm leading-relaxed">{b}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notre processus */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Settings className="w-4 h-4 text-white" />
            </span>
            Notre processus
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {service.process.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="glass-card rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3 font-display text-4xl font-black text-white/5">{p.step}</div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
                  <span className="text-white font-bold text-sm">{p.step}</span>
                </div>
                <h4 className="font-display font-bold text-white text-sm mb-2">{p.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clients cibles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display text-2xl font-black text-white mb-6 flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
              <Network className="w-4 h-4 text-white" />
            </span>
            À qui s'adresse ce service ?
          </h2>
          <div className="flex flex-wrap gap-2">
            {service.targets.map((target, i) => (
              <span key={i} className="px-3 py-1.5 glass-card rounded-full text-xs sm:text-sm text-slate-300 border border-white/10">
                {target}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-petroleum-800/60 to-petroleum-900/60 border border-petroleum-500/20 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-xl font-black text-white mb-2">Intéressé par ce service ?</h3>
            <p className="text-slate-400 text-sm">Contactez-nous pour une consultation gratuite et sans engagement.</p>
          </div>
          <div className="flex flex-col xs:flex-row flex-wrap gap-3 shrink-0 w-full sm:w-auto">
            <Link to="/#contact"
              onClick={() => { setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-dark font-bold rounded-xl transition-all">
              <Phone className="w-4 h-4" /> Nous contacter
            </Link>
            <Link to="/services"
              className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all">
              Tous les services
            </Link>
          </div>
        </motion.div>

        {/* Navigation prev/next */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
          {prevService ? (
            <Link to={`/services/${prevService.slug}`}
              className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:border-petroleum-500/40 transition-all group flex-1">
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Précédent</p>
                <p className="text-sm font-semibold text-white truncate">{prevService.title}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextService ? (
            <Link to={`/services/${nextService.slug}`}
              className="flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:border-petroleum-500/40 transition-all group flex-1 text-right justify-end">
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Suivant</p>
                <p className="text-sm font-semibold text-white truncate">{nextService.title}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0" />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  )
}
