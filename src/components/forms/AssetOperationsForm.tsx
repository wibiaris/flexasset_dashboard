import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Asset } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Asset>) => void;
}

const AssetOperationsForm = ({ isOpen, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Partial<Asset>>({
    type: 'hardware',
    status: 'active',
    condition: 'good',
    maintenanceInterval: 'quarterly',
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
          <h2 className="text-xl font-semibold">Add New Asset</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

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
                Type
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as Asset['type']})}
                required
              >
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="furniture">Furniture</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price
              </label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({...formData, purchasePrice: Number(e.target.value)})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch Office
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.branchOffice}
                onChange={(e) => setFormData({...formData, branchOffice: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned To
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
              />
            </div>
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
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetOperationsForm;