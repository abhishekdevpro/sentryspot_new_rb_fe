export default function ExperienceStep({ onNext, onChange, value }) {
    const experiences = [
      { id: 'none', label: 'No Experience' },
      { id: 'less-3', label: 'Less Than 3 Years' },
      { id: '3-5', label: '3-5 Years' },
      { id: '5-10', label: '5-10 Years' },
      { id: '10-plus', label: '10+ Years' },
    ]
  
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">How long have you been working?</h2>
          <p className="mt-2 text-gray-600">We will find the best templates for your experience level.</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => {
                onChange(exp.id)
                onNext()
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                value === exp.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  