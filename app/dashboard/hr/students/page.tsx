"use client"; // This directive is necessary for Next.js 13+ App Router to use client-side features

import React, { useState, useMemo, useCallback } from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Added XMarkIcon for close button
import { DashboardLayout } from "@/components/dashboard-layout"; // Adjust the path if needed

const InternDashboard = () => {
  // Initial static data for employees and tasks
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Liam Harper', dept: 'Engineering', role: 'Software Engineer', status: 'Active', workflow: 'Onboarding', studyAbroad: false },
    { id: 2, name: 'Olivia Bennett', dept: 'Product', role: 'Product Manager', status: 'Active', workflow: 'Active', studyAbroad: true },
    { id: 3, name: 'Noah Foster', dept: 'Design', role: 'UX Designer', status: 'Active', workflow: 'Review', studyAbroad: false },
    { id: 4, name: 'Ava Carter', dept: 'Marketing', role: 'Marketing Specialist', status: 'Active', workflow: 'Completion', studyAbroad: true },
    { id: 5, name: 'Ethan Reed', dept: 'Sales', role: 'Sales Representative', status: 'Active', workflow: 'Active', studyAbroad: false },
    { id: 6, name: 'Sophia Martinez', dept: 'HR', role: 'HR Intern', status: 'Inactive', workflow: 'Offboarding', studyAbroad: false },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, intern: 'Liam Harper', task: 'Complete onboarding modules', deadline: '2024-08-15', priority: 'High', status: 'In Progress' },
    { id: 2, intern: 'Olivia Bennett', task: 'Assist with product roadmap planning', deadline: '2024-08-22', priority: 'Medium', status: 'Completed' },
    { id: 3, intern: 'Noah Foster', task: 'Design user interface mockups', deadline: '2024-08-29', priority: 'High', status: 'Review' },
  ]);

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'Active', 'Inactive'
  const [filters, setFilters] = useState({
    department: '',
    status: '', // This will be managed by activeTab primarily, but kept for consistency if more granular filtering is needed
    role: '',
  });

  // State for new task assignment form
  const [newTaskForm, setNewTaskForm] = useState({
    intern: '',
    task: '',
    deadline: '',
    priority: '',
  });

  // State for reporting form
  const [reportForm, setReportForm] = useState({
    reportType: '',
    dateRange: '',
    department: '',
    intern: '',
  });

  // State for intern details modal
  const [showInternDetailsModal, setShowInternDetailsModal] = useState(false);
  const [selectedInternDetails, setSelectedInternDetails] = useState(null);
  const [progressReportFile, setProgressReportFile] = useState<File | null>(null); // State for the selected file

  // State for Add New Intern modal
  const [showAddInternModal, setShowAddInternModal] = useState(false);
  const [newInternForm, setNewInternForm] = useState({
    name: '',
    dept: '',
    role: '',
    status: 'Active', // Default status for new interns
    workflow: 'Onboarding', // Default workflow for new interns
    studyAbroad: false,
  });

  // --- Helper Functions for Dynamic Options ---
  const getUniqueDepartments = useMemo(() => {
    const depts = new Set(employees.map(emp => emp.dept));
    return ['', ...Array.from(depts)].sort(); // Add empty option and sort
  }, [employees]);

  const getUniqueRoles = useMemo(() => {
    const roles = new Set(employees.map(emp => emp.role));
    return ['', ...Array.from(roles)].sort(); // Add empty option and sort
  }, [employees]);

  const getUniqueInternNames = useMemo(() => {
    const names = new Set(employees.map(emp => emp.name));
    return ['', ...Array.from(names)].sort(); // Add empty option and sort
  }, [employees]);

  const getTaskPriorities = useMemo(() => {
    return ['', 'High', 'Medium', 'Low'];
  }, []);

  const getReportTypes = useMemo(() => {
    return ['', 'Intern Performance', 'Task Completion', 'Study Abroad Interest'];
  }, []);

  const getDateRanges = useMemo(() => {
    return ['', 'Last 7 Days', 'Last 30 Days', 'This Quarter', 'This Year'];
  }, []);

  const getInternStatuses = useMemo(() => {
    return ['Active', 'Inactive'];
  }, []);

  const getInternWorkflows = useMemo(() => {
    return ['Onboarding', 'Active', 'Review', 'Completion', 'Offboarding'];
  }, []);

  // --- Filtering Logic for Employees ---
  const filteredEmployees = useMemo(() => {
    let currentEmployees = employees;

    // Filter by search term
    if (searchTerm) {
      currentEmployees = currentEmployees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by active tab (All, Active, Inactive)
    if (activeTab !== 'All') {
      currentEmployees = currentEmployees.filter(emp => emp.status === activeTab);
    }

    // Filter by department
    if (filters.department) {
      currentEmployees = currentEmployees.filter(emp => emp.dept === filters.department);
    }

    // Filter by role
    if (filters.role) {
      currentEmployees = currentEmployees.filter(emp => emp.role === filters.role);
    }

    return currentEmployees;
  }, [employees, searchTerm, activeTab, filters]);

  // --- Event Handlers ---

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // Handler for opening the Add New Intern modal
  const handleOpenAddInternModal = () => {
    setNewInternForm({
      name: '',
      dept: '',
      role: '',
      status: 'Active',
      workflow: 'Onboarding',
      studyAbroad: false,
    }); // Reset form when opening
    setShowAddInternModal(true);
  };

  // Handler for new intern form changes
  const handleNewInternFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setNewInternForm(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler for adding a new intern
  const handleAddNewIntern = () => {
    if (!newInternForm.name || !newInternForm.dept || !newInternForm.role) {
      alert('Please fill in all required fields for the new intern (Name, Department, Role).');
      return;
    }

    const newId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
    const internToAdd = { ...newInternForm, id: newId };

    setEmployees(prev => [...prev, internToAdd]);
    alert(`New intern "${internToAdd.name}" added successfully!`);
    setShowAddInternModal(false); // Close modal
    // Form is already reset by handleOpenAddInternModal when opened next time
  };


  const handleNewTaskFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewTaskForm(prev => ({ ...prev, [id]: value }));
  };

  const handleAssignTask = () => {
    if (!newTaskForm.intern || !newTaskForm.task || !newTaskForm.deadline || !newTaskForm.priority) {
      alert('Please fill all fields for task assignment.');
      return;
    }
    const newTask = {
      id: tasks.length + 1, // Simple ID generation
      ...newTaskForm,
      status: 'Assigned', // Default status for new tasks
    };
    setTasks(prev => [...prev, newTask]);
    alert(`Task "${newTask.task}" assigned to ${newTask.intern}!`);
    // Reset form
    setNewTaskForm({ intern: '', task: '', deadline: '', priority: '' });
  };

  const handleUpdateTaskStatus = (taskId: number, currentStatus: string) => {
    if (currentStatus === 'Completed') {
      alert('This task is already completed.');
      return;
    }
    // Using window.confirm as per previous instruction, but a custom modal is preferred for consistent UI
    if (window.confirm('Are you sure you want to mark this task as Completed?')) {
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId ? { ...task, status: 'Completed' } : task
        )
      );
      alert('Task status updated to Completed!');
    }
  };

  const handleViewTaskDetails = (task: any) => {
    alert(`Task Details:\nIntern: ${task.intern}\nTask: ${task.task}\nDeadline: ${task.deadline}\nPriority: ${task.priority}\nStatus: ${task.status}`);
  };

  const handleReportFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setReportForm(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerateReport = () => {
    if (!reportForm.reportType) {
      alert('Please select a report type.');
      return;
    }
    alert(`Generating report of type: ${reportForm.reportType}\nDate Range: ${reportForm.dateRange || 'All'}\nDepartment: ${reportForm.department || 'All'}\nIntern: ${reportForm.intern || 'All'}`);
    // In a real app, this would trigger API calls or data processing
  };

  // Function to handle viewing intern details in a modal
  const handleViewInternDetails = (intern: any) => {
    setSelectedInternDetails(intern);
    setShowInternDetailsModal(true);
  };

  const closeInternDetailsModal = () => {
    setShowInternDetailsModal(false);
    setSelectedInternDetails(null);
    setProgressReportFile(null); // Reset file input when closing modal
  };

  // Handler for progress report file selection
  const handleProgressReportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProgressReportFile(e.target.files[0]);
    } else {
      setProgressReportFile(null);
    }
  };

  // Handler for uploading progress report
  const handleUploadProgressReport = () => {
    if (!progressReportFile) {
      alert('Please select a file to upload.');
      return;
    }
    // Simulate file upload
    alert(`Uploading progress report for ${selectedInternDetails?.name}: ${progressReportFile.name}`);
    console.log('Simulating upload of file:', progressReportFile);
    // In a real application, you would send this file to a server
    setProgressReportFile(null); // Clear selected file after "upload"
    // Optionally close modal or show success message
  };


  // --- Reusable Components (modified to be controlled and themed) ---
  const FilterButton = ({ children, filterType, options, selectedValue, onSelectChange }: {
    children: React.ReactNode,
    filterType: string,
    options: string[],
    selectedValue: string,
    onSelectChange: (type: string, value: string) => void
  }) => (
    <div className="relative">
      <select
        value={selectedValue}
        onChange={(e) => onSelectChange(filterType, e.target.value)}
        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-700 text-white pl-4 pr-2 appearance-none cursor-pointer border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ paddingRight: '2.5rem' }} // Make space for the custom arrow
      >
        <option value="">{children}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDownIcon className="w-4 h-4 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );

  const StatusButton = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'primary' | 'success' | 'warning' | 'info' }) => {
    let bgColor = 'bg-gray-700';
    let textColor = 'text-gray-100';

    switch (variant) {
      case 'primary':
        bgColor = 'bg-blue-600';
        textColor = 'text-white';
        break;
      case 'success':
        bgColor = 'bg-green-600';
        textColor = 'text-white';
        break;
      case 'warning':
        bgColor = 'bg-yellow-600';
        textColor = 'text-white';
        break;
      case 'info':
        bgColor = 'bg-purple-600';
        textColor = 'text-white';
        break;
      default:
        bgColor = 'bg-gray-700';
        textColor = 'text-gray-100';
    }

    return (
      <button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 text-sm font-medium w-full ${bgColor} ${textColor}`}>
        <span className="truncate">{children}</span>
      </button>
    );
  };

  const FormInput = ({ placeholder, type = 'text', id, value, onChange, options = [] }: {
    placeholder: string,
    type?: 'text' | 'select' | 'date' | 'checkbox',
    id: string,
    value?: string | boolean, // Value can be string or boolean for checkbox
    onChange: (e: React.ChangeEvent<HTMLInputElement | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>>) => void,
    options?: string[]
  }) => (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 w-full"> {/* Added w-full */}
      <label htmlFor={id} className="flex flex-col min-w-40 flex-1">
        {type === 'select' ? (
          <select
            id={id}
            value={value as string}
            onChange={onChange}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-100 focus:outline-0 focus:ring-0 border border-gray-600 bg-gray-800 focus:border-blue-500 h-14 p-[15px] text-base font-normal appearance-none"
          >
            <option value="" disabled>{placeholder}</option> {/* Disabled placeholder */}
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <div className="flex items-center space-x-2 h-14">
            <input
              id={id}
              type="checkbox"
              checked={value as boolean}
              onChange={onChange}
              className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300">{placeholder}</span>
          </div>
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value as string}
            onChange={onChange}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-gray-100 focus:outline-0 focus:ring-0 border border-gray-600 bg-gray-800 focus:border-blue-500 h-14 placeholder:text-gray-400 p-[15px] text-base font-normal"
          />
        )}
      </label>
    </div>
  );

  const DataTable = ({ headers, data, renderRow }: {
    headers: string[],
    data: any[],
    renderRow: (item: any, index: number) => React.ReactNode
  }) => (
    <div className="px-4 py-3 w-full">
      <div className="flex overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-xl">
        <table className="flex-1 w-full">
          <thead>
            <tr className="bg-gray-700">
              {headers.map((header, i) => (
                <th key={i} className="px-4 py-3 text-left text-gray-300 text-sm font-medium uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-4 py-4 text-center text-gray-400">
                  No data available.
                </td>
              </tr>
            ) : (
              data.map(renderRow)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <DashboardLayout userType="hr" userName="Durva Kadam"> {/* Set userType and userName */}
      <div className="relative flex size-full min-h-screen flex-col bg-gray-900 text-gray-100 font-sans">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-6 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-6xl flex-1">

              {/* Header */}
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <p className="text-white text-4xl font-bold min-w-72">Interns Management</p>
                <button
                  onClick={handleOpenAddInternModal} // Changed to open new intern modal
                  className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <span className="truncate">Add New Intern</span>
                </button>
              </div>

              {/* Search */}
              <div className="px-4 py-3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                  <div className="flex w-full flex-1 items-stretch rounded-xl h-full bg-gray-800 border border-gray-700">
                    <div className="flex items-center justify-center pl-4 text-gray-400">
                      <MagnifyingGlassIcon className="w-5 h-5" />
                    </div>
                    <input
                      placeholder="Search interns by name"
                      className="form-input w-full flex-1 rounded-xl border-none bg-transparent text-white placeholder:text-gray-400 px-4 focus:outline-none focus:ring-0"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </label>
              </div>

              {/* Filters */}
              <div className="flex gap-3 p-3 flex-wrap pr-4">
                <FilterButton
                  filterType="department"
                  options={getUniqueDepartments}
                  selectedValue={filters.department}
                  onSelectChange={handleFilterChange}
                >
                  Department
                </FilterButton>
                <FilterButton
                  filterType="role"
                  options={getUniqueRoles}
                  selectedValue={filters.role}
                  onSelectChange={handleFilterChange}
                >
                  Role
                </FilterButton>
                {/* Status filter is handled by tabs, but could be added here for more granularity */}
              </div>

              {/* Tabs */}
              <div className="pb-3">
                <div className="flex border-b border-gray-700 px-4 gap-8">
                  {['All', 'Active', 'Inactive'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                        activeTab === tab ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <p className="text-sm font-bold">{tab}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Intern Management Workflow Table */}
              <h2 className="text-white text-2xl font-bold px-4 pb-3 pt-5">Intern Management Workflow</h2>
              <DataTable
                headers={['Name', 'Department', 'Role', 'Status', 'Workflow Stage', 'Planning to Study Abroad', 'Actions']}
                data={filteredEmployees}
                renderRow={(emp, i) => (
                  <tr key={emp.id} className="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="h-[72px] px-4 py-2 text-white text-sm">{emp.name}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{emp.dept}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{emp.role}</td>
                    <td className="h-[72px] px-4 py-2 text-sm">
                      <StatusButton variant={emp.status === 'Active' ? 'success' : 'warning'}>{emp.status}</StatusButton>
                    </td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{emp.workflow}</td>
                    <td className="h-[72px] px-4 py-2 text-sm text-center">
                      <input type="checkbox" checked={emp.studyAbroad} readOnly className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                    </td>
                    <td className="h-[72px] px-4 py-2">
                      <button
                        onClick={() => handleViewInternDetails(emp)} // Call the new handler
                        className="text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )}
              />

              {/* Task Assignment Section */}
              <h2 className="text-white text-2xl font-bold px-4 pb-3 pt-5">Task Assignment and Tracking</h2>
              <FormInput
                id="intern"
                placeholder="Select Intern"
                type="select"
                value={newTaskForm.intern}
                onChange={handleNewTaskFormChange}
                options={getUniqueInternNames}
              />
              <FormInput
                id="task"
                placeholder="Task Description"
                type="text"
                value={newTaskForm.task}
                onChange={handleNewTaskFormChange}
              />
              <FormInput
                id="deadline"
                placeholder="Deadline (YYYY-MM-DD)"
                type="date"
                value={newTaskForm.deadline}
                onChange={handleNewTaskFormChange}
              />
              <FormInput
                id="priority"
                placeholder="Priority (High, Medium, Low)"
                type="select"
                value={newTaskForm.priority}
                onChange={handleNewTaskFormChange}
                options={getTaskPriorities}
              />
              <div className="flex px-4 py-3 justify-start">
                <button
                  onClick={handleAssignTask}
                  className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <span className="truncate">Assign Task</span>
                </button>
              </div>

              {/* Task Progress Table */}
              <h2 className="text-white text-2xl font-bold px-4 pb-3 pt-5">Task Progress Overview</h2>
              <DataTable
                headers={['Intern', 'Task', 'Deadline', 'Priority', 'Status', 'Actions']}
                data={tasks}
                renderRow={(task, i) => (
                  <tr key={task.id} className="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                    <td className="h-[72px] px-4 py-2 text-white text-sm">{task.intern}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{task.task}</td>
                    <td className="h-[72px] px-4 py-2 text-gray-300 text-sm">{task.deadline}</td>
                    <td className="h-[72px] px-4 py-2 text-sm">
                      <StatusButton variant={
                        task.priority === 'High' ? 'warning' :
                        task.priority === 'Medium' ? 'info' :
                        'default'
                      }>
                        {task.priority}
                      </StatusButton>
                    </td>
                    <td className="h-[72px] px-4 py-2 text-sm">
                      <StatusButton variant={task.status === 'Completed' ? 'success' : 'primary'}>
                        {task.status}
                      </StatusButton>
                    </td>
                    <td className="h-[72px] px-4 py-2">
                      {task.status === 'Completed' ? (
                        <button
                          onClick={() => handleViewTaskDetails(task)}
                          className="text-blue-500 hover:text-blue-400 text-sm font-bold transition-colors"
                        >
                          View Details
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateTaskStatus(task.id, task.status)}
                          className="text-green-500 hover:text-green-400 text-sm font-bold transition-colors"
                        >
                          Update Status
                        </button>
                      )}
                    </td>
                  </tr>
                )}
              />

              {/* Reporting Section */}
              <h2 className="text-white text-2xl font-bold px-4 pb-3 pt-5">Reporting</h2>
              <FormInput
                id="reportType"
                placeholder="Select Report Type"
                type="select"
                value={reportForm.reportType}
                onChange={handleReportFormChange}
                options={getReportTypes}
              />
              <FormInput
                id="dateRange"
                placeholder="Select Date Range"
                type="select"
                value={reportForm.dateRange}
                onChange={handleReportFormChange}
                options={getDateRanges}
              />
              <FormInput
                id="department"
                placeholder="Select Department"
                type="select"
                value={reportForm.department}
                onChange={handleReportFormChange}
                options={getUniqueDepartments}
              />
              <FormInput
                id="intern"
                placeholder="Select Intern"
                type="select"
                value={reportForm.intern}
                onChange={handleReportFormChange}
                options={getUniqueInternNames}
              />
              <div className="flex px-4 py-3 justify-start">
                <button
                  onClick={handleGenerateReport}
                  className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
                >
                  <span className="truncate">Generate Report</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Intern Details Modal */}
      {showInternDetailsModal && selectedInternDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700 relative">
            <button
              onClick={closeInternDetailsModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              Intern Details: {selectedInternDetails.name}
            </h3>
            <div className="space-y-3 text-gray-300">
              <p><strong>ID:</strong> {selectedInternDetails.id}</p>
              <p><strong>Department:</strong> {selectedInternDetails.dept}</p>
              <p><strong>Role:</strong> {selectedInternDetails.role}</p>
              <p><strong>Status:</strong> <StatusButton variant={selectedInternDetails.status === 'Active' ? 'success' : 'warning'}>{selectedInternDetails.status}</StatusButton></p>
              <p><strong>Workflow Stage:</strong> {selectedInternDetails.workflow}</p>
              <p><strong>Planning to Study Abroad:</strong> {selectedInternDetails.studyAbroad ? 'Yes' : 'No'}</p>
            </div>

            {/* Progress Report Upload Section */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="text-xl font-bold text-white mb-3">Upload Progress Report</h4>
              <div className="flex flex-col gap-3">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx" // Accept common document types
                  onChange={handleProgressReportFileChange}
                  className="block w-full text-sm text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-600 cursor-pointer
                    border border-gray-700 rounded-md p-2"
                />
                {progressReportFile && (
                  <p className="text-sm text-gray-400">Selected file: {progressReportFile.name}</p>
                )}
                <button
                  onClick={handleUploadProgressReport}
                  disabled={!progressReportFile} // Disable if no file is selected
                  className={`px-6 py-2 rounded-md font-semibold transition-colors
                    ${progressReportFile ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                >
                  Upload Report
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeInternDetailsModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Intern Modal */}
      {showAddInternModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700 relative">
            <button
              onClick={() => setShowAddInternModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
              Add New Intern
            </h3>
            <div className="space-y-4">
              <FormInput
                id="name"
                placeholder="Intern Name"
                type="text"
                value={newInternForm.name}
                onChange={handleNewInternFormChange}
              />
              <FormInput
                id="dept"
                placeholder="Department"
                type="select"
                value={newInternForm.dept}
                onChange={handleNewInternFormChange}
                options={getUniqueDepartments.filter(d => d !== '')} // Exclude empty option for new intern
              />
              <FormInput
                id="role"
                placeholder="Role"
                type="select"
                value={newInternForm.role}
                onChange={handleNewInternFormChange}
                options={getUniqueRoles.filter(r => r !== '')} // Exclude empty option for new intern
              />
              <FormInput
                id="status"
                placeholder="Status"
                type="select"
                value={newInternForm.status}
                onChange={handleNewInternFormChange}
                options={getInternStatuses}
              />
              <FormInput
                id="workflow"
                placeholder="Workflow Stage"
                type="select"
                value={newInternForm.workflow}
                onChange={handleNewInternFormChange}
                options={getInternWorkflows}
              />
              <FormInput
                id="studyAbroad"
                placeholder="Planning to Study Abroad"
                type="checkbox"
                value={newInternForm.studyAbroad}
                onChange={handleNewInternFormChange}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddInternModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewIntern}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
              >
                Add Intern
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default InternDashboard;
