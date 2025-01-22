"use client";
import React, { useState } from "react";
import { Download, Edit, Trash, Plus } from "lucide-react";
import { useRouter } from "next/router";
import FullScreenLoader from "../../components/ResumeLoader/Loader";

const MyCvLetter = () => {
  const [coverletters, setCoverLetters] = useState([
    {
      cvletter_id: 1,
      cvletter_title: "Frontend Developer",
      updated_at: "2023-01-01",
      created_at: "2022-12-01",
    },
    {
      cvletter_id: 2,
      cvletter_title: "Backend Developer",
      updated_at: "2023-01-15",
      created_at: "2022-12-15",
    },
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCoverLetter, setCurrentCoverLetter] = useState(null);
  const [newCoverLetterTitle, setNewCoverLetterTitle] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleDeleteCvLetter = (coverletterId) => {
    setCoverLetters(
      coverletters.filter(
        (coverletter) => coverletter.cvletter_id !== coverletterId
      )
    );
    setIsDeleteModalOpen(false);
  };

  const handleOpenEditModal = (coverletter) => {
    setCurrentCoverLetter(coverletter);
    setNewCoverLetterTitle(coverletter.cvletter_title);
    setIsEditModalOpen(true);
  };

  const handleUpdateCvLetterTitle = () => {
    setCoverLetters((prevCoverLetters) =>
      prevCoverLetters.map((coverletter) =>
        coverletter.cvletter_id === currentCoverLetter.cvletter_id
          ? { ...coverletter, cvletter_title: newCoverLetterTitle }
          : coverletter
      )
    );
    setIsEditModalOpen(false);
  };
  const router = useRouter()
  const handleCreate =()=>{
    setShowLoader(true); // Show the loader
    setTimeout(() => {
      router.push('/dashboard/cv-builder')
    }, 2000);
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {showLoader && <FullScreenLoader />}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">My Cover Letters</h1>
        <button 
         onClick={handleCreate}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sr. no.
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  My Cover Letters
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Modification
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coverletters.map((coverletter, index) => (
                <tr key={coverletter.cvletter_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-900">
                        {coverletter.cvletter_title}
                      </span>
                      <button
                        onClick={() => handleOpenEditModal(coverletter)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        🖍
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coverletter.updated_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {coverletter.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleOpenEditModal(coverletter)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                      <button
                        // onClick={() => handleDownload(coverletter.coverletter_id)}
                        className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure you want to delete this cover letter?
            </h2>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleDeleteCvLetter(currentCoverLetter.cvletter_id)
                }
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Edit Cover Letter Title
            </h2>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newCoverLetterTitle}
              onChange={(e) => setNewCoverLetterTitle(e.target.value)}
              placeholder="Enter new cover letter title"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCvLetterTitle}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCvLetter;
