import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare,
  Filter
} from 'lucide-react';
import type { AssetRequest } from '../types';

const ApprovalRequests = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  // Mock data - replace with actual API call
  const requests: AssetRequest[] = [
    {
      id: '1',
      type: 'borrow',
      assetId: 'LAP001',
      requesterId: 'user1',
      requesterName: 'John Doe',
      requesterDepartment: 'IT',
      status: 'pending',
      requestDate: '2024-03-15',
      purpose: 'Remote work equipment',
      duration: {
        startDate: '2024-04-01',
        endDate: '2024-04-30'
      },
      approvers: [
        {
          id: 'apr1',
          name: 'Jane Smith',
          role: 'IT Manager',
          status: 'approved',
          comment: 'Equipment is available',
          date: '2024-03-16'
        },
        {
          id: 'apr2',
          name: 'Mike Johnson',
          role: 'Department Head',
          status: 'pending'
        }
      ]
    },
    {
      id: '2',
      type: 'move',
      assetId: 'PRN002',
      requesterId: 'user2',
      requesterName: 'Alice Brown',
      requesterDepartment: 'Finance',
      status: 'approved',
      requestDate: '2024-03-14',
      purpose: 'Department reorganization',
      destination: 'Finance Department - 2nd Floor',
      approvers: [
        {
          id: 'apr3',
          name: 'Jane Smith',
          role: 'IT Manager',
          status: 'approved',
          comment: 'Approved for relocation',
          date: '2024-03-15'
        }
      ]
    }
  ];

  const filteredRequests = requests.filter(request => 
    filter === 'all' || request.status === filter
  );

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Approval Requests</h1>
          <p className="text-gray-500">Manage asset borrowing and moving requests</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-semibold">
                    {request.type === 'borrow' ? 'Borrow Request' : 'Move Request'}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <p className="text-gray-500 mt-1">Asset ID: {request.assetId}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-sm text-gray-500">Requested on</p>
                <p className="font-medium">{request.requestDate}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-2">Requester Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">{request.requesterName}</p>
                  <p className="text-gray-500">{request.requesterDepartment}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Request Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">{request.purpose}</p>
                  {request.type === 'borrow' && request.duration && (
                    <p className="text-gray-500">
                      Duration: {request.duration.startDate} to {request.duration.endDate}
                    </p>
                  )}
                  {request.type === 'move' && request.destination && (
                    <p className="text-gray-500">
                      Destination: {request.destination}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Approval Flow</h3>
              <div className="space-y-4">
                {request.approvers.map((approver) => (
                  <div key={approver.id} className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{approver.name}</p>
                      <p className="text-sm text-gray-500">{approver.role}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {approver.status === 'pending' ? (
                        <div className="flex items-center space-x-2">
                          <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                            <CheckCircle size={20} />
                          </button>
                          <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                            <XCircle size={20} />
                          </button>
                          <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
                            <MessageSquare size={20} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            approver.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {approver.status}
                          </span>
                          {approver.comment && (
                            <div className="text-gray-500 text-sm">
                              <MessageSquare size={16} />
                            </div>
                          )}
                        </div>
                      )}
                      {approver.date && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock size={16} className="mr-1" />
                          {approver.date}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalRequests;