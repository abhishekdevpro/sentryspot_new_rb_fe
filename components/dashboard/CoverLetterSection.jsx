const CoverLetterSection = ({ letterCount }) => {
    return (
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Your Cover Letters</h3>
              {/* <p className="text-gray-600">Cover Letter: Letter_1</p> */}
            </div>
          </div>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            View Cover Letters
          </button>
        </div>
      </div>
    )
  }
  
  export default CoverLetterSection
  
  