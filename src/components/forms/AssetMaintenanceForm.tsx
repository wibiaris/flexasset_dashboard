import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { MaintenanceRecord } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<MaintenanceRecord>) => void;
}

const AssetMaintenanceForm = ({ isOpen, onClose, onSubmit }: Props) => {
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({
    type: 'routine',
    status: 'scheduled',
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
          <h2 className="text-xl font-semibold">Schedule Maintenance</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maintenance Type
              </label>
              <select
                className="w-full border rounded-lg p-2"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as MaintenanceRecord['type']})}
                required
              >
                <option value="routine">Routine</option>
                <option value="repair">Repair</option>
                <option value="inspection">Inspection</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technician
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2"
                value={formData.technician}
                onChange={(e) => setFormData({...formData, technician: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost
              </label>
              <input
                type="number"
                className="w-full border rounded-lg p-2"
                value={formData.cost}
                onChange={(e) => setFormData({...formData, cost: Number(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
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
              Schedule Maintenance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetMaintenanceForm;