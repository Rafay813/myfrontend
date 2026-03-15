import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const steps = [
  {
    step: '01',
    title: 'Paste Your Drive Link',
    description: 'Copy the Google Drive share link of any public file and paste it into the input field on the home page.',
    icon: '📋',
    color: 'from-violet-600 to-violet-400',
    tip: 'Make sure the file is set to "Anyone with the link" in Google Drive sharing settings.',
  },
  {
    step: '02',
    title: 'We Extract the File ID',
    description: 'Our backend automatically extracts the unique file ID from your Google Drive link — no matter the link format.',
    icon: '🔍',
    color: 'from-blue-600 to-blue-400',
    tip: 'We support /file/d/, open?id=, and uc?id= link formats.',
  },
  {
    step: '03',
    title: 'File Streams from Drive',
    description: 'The file is streamed directly from Google Drive to our server using memory-efficient streaming — never fully loaded into RAM.',
    icon: '⬇️',
    color: 'from-cyan-600 to-cyan-400',
    tip: 'Streaming means even large files transfer efficiently without crashing the server.',
  },
  {
    step: '04',
    title: 'Parallel Upload',
    description: 'The stream is split and uploaded to both Gofile and PixelDrain simultaneously using parallel processing.',
    icon: '📤',
    color: 'from-green-600 to-green-400',
    tip: 'Both uploads happen at the same time — this saves you significant time.',
  },
  {
    step: '05',
    title: 'Get Your Download Links',
    description: 'Once both uploads complete, you receive direct download links from both hosting services instantly.',
    icon: '✅',
    color: 'from-orange-600 to-orange-400',
    tip: 'You can copy the links or click download directly from the result page.',
  },
]

const techStack = [
  { name: 'React.js', role: 'Frontend UI', color: 'cyan' },
  { name: 'Vite', role: 'Build Tool', color: 'violet' },
  { name: 'Tailwind CSS', role: 'Styling', color: 'cyan' },
  { name: 'Node.js', role: 'Backend Runtime', color: 'violet' },
  { name: 'Express.js', role: 'API Framework', color: 'cyan' },
  { name: 'Axios', role: 'HTTP Client', color: 'violet' },
]

const HowItWorks = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto space-y-20">

        {/* ── Header ── */}
        <div className="text-center space-y-4">
          <Badge variant="violet">Behind The Scenes</Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            How It{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A step-by-step breakdown of what happens when you transfer a file
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.step} className="flex gap-6 group">

              {/* Step Number + Line */}
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-black text-sm flex-shrink-0 shadow-lg`}>
                  {step.step}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-gradient-to-b from-white/20 to-transparent mt-3" />
                )}
              </div>

              {/* Content */}
              <Card className="flex-1 mb-6 group-hover:border-violet-500/30 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{step.icon}</span>
                    <h3 className="text-white font-bold text-lg">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <span className="text-violet-400 text-xs font-bold flex-shrink-0 mt-0.5">💡 TIP</span>
                    <p className="text-violet-300/80 text-xs">{step.tip}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* ── Architecture Diagram ── */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">System Architecture</h2>
          <Card className="overflow-hidden">
            <div className="space-y-4">

              {/* Flow */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
                {[
                  { label: 'User', sub: 'Pastes Drive Link', color: 'bg-gray-700' },
                  { label: '→', sub: '', color: 'transparent', isArrow: true },
                  { label: 'Backend', sub: 'Node.js + Express', color: 'bg-violet-600/30 border border-violet-500/30' },
                  { label: '→', sub: '', color: 'transparent', isArrow: true },
                  { label: 'Google Drive', sub: 'Streams File', color: 'bg-blue-600/30 border border-blue-500/30' },
                  { label: '→', sub: '', color: 'transparent', isArrow: true },
                  { label: 'Split Stream', sub: 'PassThrough', color: 'bg-cyan-600/30 border border-cyan-500/30' },
                ].map((item, i) => (
                  item.isArrow ? (
                    <span key={i} className="text-gray-500 text-xl font-bold hidden sm:block">→</span>
                  ) : (
                    <div key={i} className={`${item.color} rounded-xl px-4 py-3 text-center min-w-24`}>
                      <p className="text-white text-sm font-semibold">{item.label}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  )
                ))}
              </div>

              {/* Split to two services */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5">
                <div className="text-center space-y-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-cyan-500/50 to-transparent mx-auto rounded-full" />
                  <div className="bg-blue-600/30 border border-blue-500/30 rounded-xl px-6 py-3 text-center">
                    <p className="text-white text-sm font-semibold">🌐 Gofile</p>
                    <p className="text-gray-400 text-xs">Direct Link</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-violet-500/50 to-transparent mx-auto rounded-full" />
                  <div className="bg-violet-600/30 border border-violet-500/30 rounded-xl px-6 py-3 text-center">
                    <p className="text-white text-sm font-semibold">⚡ PixelDrain</p>
                    <p className="text-gray-400 text-xs">Direct Link</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── Tech Stack ── */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Tech Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {techStack.map((tech) => (
              <Card key={tech.name} className="text-center hover:border-violet-500/30 transition-all">
                <Badge variant={tech.color} className="mb-2">{tech.role}</Badge>
                <p className="text-white font-bold">{tech.name}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center space-y-4">
          <p className="text-gray-400">Ready to try it out?</p>
        <Link
  to="/"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg"
>
  🚀 Download file
</Link>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks