const steps = [
  { id: 1, label: 'Validating link', icon: '🔍' },
  { id: 2, label: 'Fetching metadata', icon: '📋' },
  { id: 3, label: 'Streaming from Drive', icon: '⬇️' },
  { id: 4, label: 'Uploading to services', icon: '📤' },
  { id: 5, label: 'Generating links', icon: '✅' },
]

const StatusIndicator = ({ progress, status }) => {
  const currentStep = steps.findIndex((s) =>
    progress.toLowerCase().includes(s.label.toLowerCase().split(' ')[0])
  )

  const activeStep = currentStep === -1 ? 0 : currentStep

  return (
    <div className="w-full space-y-6">

      {/* Animated Icon */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-violet-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-violet-400 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
        </div>
      </div>

      {/* Current Status Text */}
      <div className="text-center space-y-1">
        <p className="text-white font-semibold">{progress || 'Processing...'}</p>
        <p className="text-gray-500 text-sm">Please wait, do not close this tab</p>
      </div>

      {/* Step Progress */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isDone = index < activeStep
          const isActive = index === activeStep
          const isPending = index > activeStep

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-violet-600/10 border border-violet-500/30' :
                isDone ? 'opacity-60' : 'opacity-30'
              }`}
            >
              {/* Step Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                isDone ? 'bg-green-500/20 text-green-400' :
                isActive ? 'bg-violet-500/20 text-violet-400' :
                'bg-gray-800 text-gray-600'
              }`}>
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>

              {/* Step Label */}
              <span className={`text-sm font-medium ${
                isActive ? 'text-white' : isDone ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {step.label}
              </span>

              {/* Active Spinner */}
              {isActive && (
                <div className="ml-auto">
                  <svg className="animate-spin w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatusIndicator