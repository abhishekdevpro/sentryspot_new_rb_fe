'use client'

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CVSelector = ({ onNext, onBack, onChange, value }) => {
  const [selectedHexCode, setSelectedHexCode] = useState('#2563EB');
  const [loading, setLoading] = useState(false);

  const colors = [
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400', hexCode: '#6D7278' },
    { name: 'Blue', class: 'bg-blue-600', selectedClass: 'ring-blue-400', hexCode: '#2563EB' },
    { name: 'Purple', class: 'bg-purple-600', selectedClass: 'ring-purple-400', hexCode: '#9333EA' },
    { name: 'Green', class: 'bg-green-600', selectedClass: 'ring-green-400', hexCode: '#16A34A' },
    { name: 'Red', class: 'bg-red-600', selectedClass: 'ring-red-400', hexCode: '#DC2626' },
    { name: 'Yellow', class: 'bg-yellow-500', selectedClass: 'ring-yellow-400', hexCode: '#EAB308' },
    { name: 'Pink', class: 'bg-pink-500', selectedClass: 'ring-pink-400', hexCode: '#EC4899' },
    { name: 'Teal', class: 'bg-teal-500', selectedClass: 'ring-teal-400', hexCode: '#14B8A6' },
    { name: 'Orange', class: 'bg-orange-500', selectedClass: 'ring-orange-400', hexCode: '#F97316' },
    { name: 'Indigo', class: 'bg-indigo-600', selectedClass: 'ring-indigo-400', hexCode: '#4F46E5' }
  ];

  const cvTemplates = [
    { key: 'template1', imageUrl: '/api/placeholder/300/400', name: 'Professional CV', hasPhoto: true },
    { key: 'template2', imageUrl: '/api/placeholder/300/400', name: 'Creative CV', hasPhoto: false },
    { key: 'template3', imageUrl: '/api/placeholder/300/400', name: 'Academic CV', hasPhoto: false },
    { key: 'template4', imageUrl: '/api/placeholder/300/400', name: 'Executive CV', hasPhoto: false },
    { key: 'template5', imageUrl: '/api/placeholder/300/400', name: 'Technical CV', hasPhoto: true },
    { key: 'template6', imageUrl: '/api/placeholder/300/400', name: 'Graduate CV', hasPhoto: true }
];

  useEffect(() => {
    if (!value.hexCode) {
      const defaultColor = colors.find(c => c.name === 'Blue');
      handleColorChange(defaultColor.hexCode, defaultColor.name);
    }
  }, []);

  const handleColorChange = (hexCode, colorName) => {
    setSelectedHexCode(hexCode);
    onChange({ 
      ...value, 
      color: colorName,
      hexCode: hexCode
    });
  };

  const handleTemplateSelect = (template) => {
    onChange({ 
      ...value, 
      template: template.key,
      category: template.category,
      style: template.style
    });
  };

  const handleSaveSelection = async () => {
    if (!value.template) {
      toast.error('Please select a CV template before proceeding');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('CV template saved successfully');
      onNext();
    } catch (error) {
      toast.error('Error saving CV template');
    } finally {
      setLoading(false);
    }
  };

  const getHoverStyle = (templateKey) => {
    if (value.template === templateKey) {
      return {
        borderWidth: '4px',
        borderColor: selectedHexCode,
        boxShadow: `0 0 0 4px ${selectedHexCode}33`
      };
    }
    return {};
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your CV Template
          </h2>
          <p className="text-xl text-gray-600">
            Select a professional template that matches your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Color Theme</h3>
              <div className="grid grid-cols-5 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="flex items-center justify-center">
                    <button
                      className={`
                        w-8 h-8 rounded-full ${color.class}
                        transform hover:scale-110 transition-all duration-200
                        ${selectedHexCode === color.hexCode ? 
                          `ring-2 ring-offset-2 ${color.selectedClass}` : 
                          'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                        }
                      `}
                      onClick={() => handleColorChange(color.hexCode, color.name)}
                      title={color.name}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {Array.from(new Set(cvTemplates.map(t => t.category))).map((category) => (
                  <button
                    key={category}
                    className={`
                      w-full text-left px-4 py-2 rounded-lg
                      ${value.category === category ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                    onClick={() => onChange({ ...value, category })}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cvTemplates
                .filter(t => !value.category || t.category === value.category)
                .map((template) => (
                  <button
                    key={template.key}
                    onClick={() => handleTemplateSelect(template)}
                    className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    style={getHoverStyle(template.key)}
                  >
                    <div className="w-full">
                      <div className="relative aspect-[3/4]">
                        <img
                          src={template.imageUrl}
                          alt={template.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-medium text-lg">{template.name}</p>
                        <p className="text-white/80 text-sm">{template.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-12">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSaveSelection}
            disabled={loading}
            style={{ backgroundColor: selectedHexCode }}
            className="px-8 py-3 text-white rounded-xl font-medium
              hover:opacity-90 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVSelector;