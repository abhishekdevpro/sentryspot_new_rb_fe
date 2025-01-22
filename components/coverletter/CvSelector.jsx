function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
    return (
      <div className="mb-4">
        <label htmlFor="template-select" className="block mb-2">
          Select Template:
        </label>
        <select
          id="template-select"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
          <option value="template4">Template 4</option>
        </select>
      </div>
    )
  }

  export default TemplateSelector;