import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Asset } from '../types';

const UpdateDepreciation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Asset>>({
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Depreciation updated:', formData);
    navigate('/depreciation');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Update Asset Depreciation</h1>
          <p className="text-gray-600">Update depreciation information for an asset</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Tag
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2"
                  value={formData.tag}
                  onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Value
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={formData.currentValue}
                  onChange={(e) => setFormData({...formData, currentValue: Number(e.target.value)})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depreciation Rate (% per year)
                </label>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2"
                  value={formData.depreciationRate}
                  onChange={(e) => setFormData({...formData, depreciationRate: Number(e.target.value)})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  className="w-full border rounded-lg p-2"
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value as Asset['condition']})}
                  required
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                className="w-full border rounded-lg p-2"
                rows={3}
              />
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/depreciation')}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update Depreciation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDepreciation;