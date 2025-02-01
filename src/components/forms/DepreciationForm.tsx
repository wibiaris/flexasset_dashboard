import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Asset } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Asset>) => void;
}

const DepreciationForm = ({ isOpen, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Partial<Asset>>({
    status: 'active',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Update Asset Depreciation</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
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

          <div className="mt-4">
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
              onClick={onClose}
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
  );
};

export default DepreciationForm;