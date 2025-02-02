import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MaintenanceRecord } from '../types';

const CreateMaintenanceRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<MaintenanceRecord>>({
    type: 'routine',
    status: 'scheduled',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Maintenance scheduled:', formData);
    navigate('/asset-maintenance');
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Schedule Maintenance</h1>
          <p className="text-gray-600">Create a new maintenance request for an asset</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="mt-6">
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
                onClick={() => navigate('/asset-maintenance')}
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
    </div>
  );
};

export default CreateMaintenanceRequest;