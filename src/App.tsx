/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Monitor, 
  Server, 
  Database, 
  ShieldCheck, 
  Infinity, 
  ArrowRight, 
  Cpu, 
  Globe, 
  Code2, 
  Box, 
  Zap,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

// --- Types ---

type LayerId = 'frontend' | 'backend' | 'data' | 'identity' | 'devops';

interface LayerInfo {
  id: LayerId;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  details: string[];
}

// --- Constants ---

const LAYERS: LayerInfo[] = [
  {
    id: 'frontend',
    title: 'Frontend (UI)',
    icon: <Monitor className="w-6 h-6" />,
    color: 'bg-blue-500',
    description: 'The user interface running in the browser.',
    details: ['Angular (TypeScript)', 'HTML / CSS / JS', 'Client-side Routing', 'State Management']
  },
  {
    id: 'backend',
    title: 'Backend (API)',
    icon: <Server className="w-6 h-6" />,
    color: 'bg-emerald-500',
    description: 'Business logic and data processing on the server.',
    details: ['.NET / ASP.NET Core', 'REST / GraphQL APIs', 'Business Rules', 'Middleware Pipeline']
  },
  {
    id: 'data',
    title: 'Data Layer',
    icon: <Database className="w-6 h-6" />,
    color: 'bg-amber-500',
    description: 'Where information is stored and retrieved.',
    details: ['SQL Server / PostgreSQL', 'EF Core (ORM)', 'Redis Caching', 'Migrations']
  },
  {
    id: 'identity',
    title: 'Identity & Security',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'bg-purple-500',
    description: 'Authentication and authorization controls.',
    details: ['JWT Tokens', 'OAuth2 / OpenID Connect', 'Azure AD / Auth0', 'Role-based Access']
  },
  {
    id: 'devops',
    title: 'DevOps',
    icon: <Infinity className="w-6 h-6" />,
    color: 'bg-rose-500',
    description: 'Build, deployment, and monitoring pipelines.',
    details: ['GitHub Actions', 'Docker / Kubernetes', 'Azure App Service', 'App Insights']
  }
];

// --- Components ---

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <div className="flex items-center gap-3 mb-8">
    {Icon && <Icon className="w-8 h-8 text-zinc-400" />}
    <h2 className="text-3xl font-bold tracking-tight text-zinc-100">{children}</h2>
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const [showFlow, setShowFlow] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <main className="relative max-w-6xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">
              THE <span className="text-emerald-500">STACK</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              A deep dive into the enterprise-grade architecture of <span className="text-zinc-100 font-semibold">Angular</span> and <span className="text-zinc-100 font-semibold">.NET</span>.
            </p>
          </motion.div>
        </header>

        {/* Big Picture: The Stack */}
        <section className="mb-32">
          <SectionTitle icon={Layers}>The Big Picture</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {LAYERS.map((layer, idx) => (
              <motion.button
                key={layer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                className={`relative group flex flex-col items-center p-8 rounded-2xl border transition-all duration-300 ${
                  activeLayer === layer.id 
                    ? 'bg-zinc-800 border-zinc-600 ring-2 ring-emerald-500/50' 
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
                }`}
              >
                <div className={`p-4 rounded-xl mb-4 text-white ${layer.color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                  {layer.icon}
                </div>
                <span className="font-bold text-zinc-100 mb-2">{layer.title}</span>
                <p className="text-xs text-zinc-500 text-center leading-relaxed">
                  {layer.description}
                </p>
                
                {activeLayer === layer.id && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rotate-45"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeLayer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8"
              >
                <Card className="border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex flex-wrap gap-4">
                    {LAYERS.find(l => l.id === activeLayer)?.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Angular vs .NET Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {/* Angular Section */}
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Globe className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Angular (Frontend)</h3>
            </div>
            <Card className="space-y-6">
              <p className="text-zinc-400">
                A TypeScript-based framework for building Single Page Applications (SPAs). It lives in the browser.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Components', desc: 'Reusable UI blocks (Template + Logic)' },
                  { label: 'Services', desc: 'Shared logic & API communication' },
                  { label: 'RxJS', desc: 'Reactive streams for async events' },
                  { label: 'Router', desc: 'Client-side navigation (no reloads)' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                    <div>
                      <h4 className="font-bold text-zinc-200 text-sm">{item.label}</h4>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* .NET Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Cpu className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">.NET (Backend)</h3>
            </div>
            <Card className="space-y-6">
              <p className="text-zinc-400">
                Modern, cross-platform platform for server-side APIs and business logic.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'ASP.NET Core', desc: 'High-performance web framework' },
                  { label: 'EF Core', desc: 'Object-Relational Mapper for databases' },
                  { label: 'DI Container', desc: 'Built-in Dependency Injection' },
                  { label: 'Middleware', desc: 'Request/Response processing pipeline' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                    <div>
                      <h4 className="font-bold text-zinc-200 text-sm">{item.label}</h4>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.section>
        </div>

        {/* Communication Flow */}
        <section className="mb-32">
          <SectionTitle icon={Zap}>The Flow</SectionTitle>
          <Card className="relative overflow-hidden py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-12">
              
              {/* Browser */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-xl">
                  <Monitor className="w-10 h-10 text-blue-400" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-zinc-100">Angular App</p>
                  <p className="text-xs text-zinc-500">Browser</p>
                </div>
              </div>

              {/* Animated Arrow */}
              <div className="flex-1 flex flex-col items-center justify-center min-w-[100px]">
                <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-1/2"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest mb-1">HTTP / JSON</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </div>
                <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-4">
                  <motion.div 
                    animate={{ x: ['100%', '-100%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent w-1/2"
                  />
                </div>
              </div>

              {/* Server */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-xl">
                  <Server className="w-10 h-10 text-indigo-400" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-zinc-100">.NET API</p>
                  <p className="text-xs text-zinc-500">Kestrel / IIS</p>
                </div>
              </div>

              {/* Animated Arrow */}
              <div className="flex-1 flex flex-col items-center justify-center min-w-[100px]">
                <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent w-1/2"
                  />
                </div>
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-1">SQL / EF CORE</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </div>
              </div>

              {/* Database */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-xl">
                  <Database className="w-10 h-10 text-amber-400" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-zinc-100">Database</p>
                  <p className="text-xs text-zinc-500">SQL Server</p>
                </div>
              </div>

            </div>
          </Card>
        </section>

        {/* .NET Framework vs Modern .NET */}
        <section className="mb-32">
          <SectionTitle icon={Clock}>Legacy vs Modern</SectionTitle>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-amber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h4 className="text-xl font-bold text-white">.NET Framework</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-zinc-400">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                  <span>Windows-only (IIS dependent)</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-400">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                  <span>Legacy technologies: Web Forms, WCF, ASP.NET MVC (Classic)</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-400">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />
                  <span>Versioned as 4.x (e.g., 4.7.2, 4.8)</span>
                </li>
              </ul>
            </Card>

            <Card className="border-emerald-500/20">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h4 className="text-xl font-bold text-white">Modern .NET</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-zinc-400">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span>Cross-platform (Linux, macOS, Windows)</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-400">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span>High performance (Kestrel, Minimal APIs)</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-400">
                  <ChevronRight className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span>Versioned as .NET 6, 7, 8, 9...</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Strengths & Gotchas */}
        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Why this stack?</h3>
              <div className="space-y-4">
                {[
                  'End-to-end Type Safety (C# + TypeScript)',
                  'Enterprise-grade tooling & IDE support',
                  'Proven patterns for large-scale apps',
                  'Vibrant ecosystem & long-term support'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Common Gotchas</h3>
              <div className="space-y-4">
                {[
                  'Angular learning curve (RxJS, DI)',
                  'CORS configuration hurdles',
                  'DTO drift between Frontend & Backend',
                  'Complex Auth flows (JWT, Refresh Tokens)'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 pt-12 text-center">
          <p className="text-zinc-500 text-sm mb-4">
            Built for developers exploring the enterprise web ecosystem.
          </p>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <Box className="w-4 h-4" />
              <span>v1.0.0</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <Code2 className="w-4 h-4" />
              <span>TypeScript + C#</span>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
