"use client";
import React, { useState, useRef, useCallback, useMemo } from 'react';
import Papa from 'papaparse';
import { DashboardLayout } from "@/components/dashboard-layout"; // Adjust the path if needed


export default function Home() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', position: 'Senior Developer', salary: 85000, startDate: '2021-03-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', salary: 75000, startDate: '2020-01-10', status: 'Active' },
    { id: 3, name: 'Mike Johnson', department: 'HR', position: 'HR Specialist', salary: 60000, startDate: '2019-08-20', status: 'Active' },
    { id: 4, name: 'Sarah Williams', department: 'Finance', position: 'Accountant', salary: 55000, startDate: '2022-06-01', status: 'Active' },
    { id: 5, name: 'David Brown', department: 'Engineering', position: 'Junior Developer', salary: 65000, startDate: '2023-02-14', status: 'Active' }
  ]);

  const fileInputRef = useRef(null);

  // Calculate real-time statistics using useMemo for performance
  const { employeeCount, turnoverRate, averageTenure } = useMemo(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const inactiveEmployees = employees.filter(emp => emp.status === 'Inactive').length;
    const totalEmployees = employees.length;

    const count = totalEmployees;
    const turnover = totalEmployees > 0 ? ((inactiveEmployees / totalEmployees) * 100).toFixed(1) : 0;

    const totalTenureYears = employees.reduce((sum, emp) => {
      const start = new Date(emp.startDate);
      const now = new Date();
      // Ensure valid dates before calculation
      if (isNaN(start.getTime()) || isNaN(now.getTime())) {
        return sum;
      }
      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
      return sum + diffYears;
    }, 0);

    const avgTenure = totalEmployees > 0 ? (totalTenureYears / totalEmployees).toFixed(1) : '0';

    return {
      employeeCount: count,
      turnoverRate: parseFloat(turnover),
      averageTenure: parseFloat(avgTenure),
    };
  }, [employees]);

  // Smart CSV parsing function
  const parseCSV = useCallback(async (csvData) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transformHeader: (header) => {
          const cleanHeader = header.trim().toLowerCase();
          const headerMap = {
            'name': 'name', 'employee name': 'name', 'full name': 'name', 'employee': 'name',
            'dept': 'department', 'department': 'department', 'division': 'department',
            'job title': 'position', 'position': 'position', 'title': 'position', 'role': 'position',
            'salary': 'salary', 'wage': 'salary', 'compensation': 'salary', 'pay': 'salary',
            'start date': 'startDate', 'hire date': 'startDate', 'join date': 'startDate', 'employment date': 'startDate',
            'status': 'status', 'employment status': 'status', 'active': 'status'
          };
          return headerMap[cleanHeader] || cleanHeader;
        },
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            reject(new Error('CSV parsing errors: ' + results.errors.map(e => e.message).join(', ')));
            return;
          }

          const processedData = results.data
            .filter(row => row.name && String(row.name).trim()) // Ensure name exists and is not just whitespace
            .map((row, index) => ({
              id: employees.length + index + 1, // Generate unique ID
              name: String(row.name || '').trim(),
              department: String(row.department || 'Unassigned').trim(),
              position: String(row.position || 'Not Specified').trim(),
              salary: typeof row.salary === 'number' ? row.salary : (parseInt(String(row.salary)) || 0),
              startDate: row.startDate && !isNaN(new Date(row.startDate).getTime()) ? new Date(row.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
              status: String(row.status || 'Active').trim()
            }));

          resolve(processedData);
        },
        error: (error) => {
          console.error('PapaParse error:', error);
          reject(error);
        }
      });
    });
  }, [employees.length]); // Depend on employees.length to ensure unique IDs

  // Handle CSV file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      alert('Please upload a valid CSV file.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    try {
      const csvText = await file.text();
      const newEmployees = await parseCSV(csvText);
      setEmployees(prev => [...prev, ...newEmployees]);

      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input
      }

      alert(`Successfully imported ${newEmployees.length} employees!`);
    } catch (error) {
      alert('Error importing CSV: ' + error.message);
    }
  };

  // Export all employees to CSV
  const exportToCSV = () => {
    const csvData = employees.map(emp => ({
      'Employee ID': emp.id,
      'Employee Name': emp.name,
      'Department': emp.department,
      'Position': emp.position,
      'Salary': emp.salary,
      'Start Date': emp.startDate,
      'Status': emp.status
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL
  };

return (
  <DashboardLayout userType="hr" userName="John Smith">
    <div className="relative flex size-full min-h-screen flex-col bg-muted/30 group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-10 py-3 bg-white">
          <div className="flex items-center gap-4 text-brand-navy-dark">
            <div className="size-6">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_319)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_319">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-bold">HR Dashboard</h2>
          </div>

          <div className="flex flex-1 justify-end gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              aria-label="Upload CSV file"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="h-10 px-4 rounded-full text-sm font-semibold bg-brand-navy-lightest text-brand-navy-dark hover:bg-gray-200"
            >
              Upload CSV
            </button>

            <button
              onClick={exportToCSV}
              className="h-10 px-4 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
            >
              Export to CSV
            </button>

            <div
              className="rounded-full size-10 bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAs_V4xjaIHeoj5GeU06HeZuDmVW2C3VGGYfby699C-VX6UXMaNHmeDnGvB4ueimKPZ8PKe4R2whovBJQ4_IeK-Mou8Pb0eIUdvAkCcdQ8wPnRR21hTdXhhKRes7eJxH2fbP4AtkOEmi3lJLZ096mhl06alnat2gyJk8kY0A3FUCtELy1hFdKxHTPRpCCJo09yGgdHy_I0NZB8kpLN6o8tivU_V4ZoRyuqbkWGAhgVQpYZjq0gD3_xwThwdeIPKWnm8XtT9cD9BfRY")' }}
              role="img"
              aria-label="User profile picture"
            />
          </div>
        </header>

        <div className="flex flex-1 justify-center py-5 px-6 sm:px-10 md:px-20 lg:px-40">
          <div className="layout-content-container flex flex-col max-w-6xl w-full">
            <div className="flex flex-wrap justify-between gap-4 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <h1 className="text-4xl font-bold text-brand-navy-dark">Welcome to Your HR Dashboard</h1>
                <p className="text-base font-normal text-muted-foreground">
                  Manage your employee data, view analytics, and upload/export CSV files with ease.
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {[ 
                { label: 'Employee Count', value: employeeCount },
                { label: 'Turnover Rate', value: `${turnoverRate}%` },
                { label: 'Average Tenure', value: `${averageTenure} years` }
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-2 rounded-xl bg-white p-6 border border-gray-300 shadow-sm">
                  <p className="text-base font-medium text-brand-navy-dark">{label}</p>
                  <p className="text-3xl font-bold text-brand-navy-dark">{value}</p>
                </div>
              ))}
            </div>

            {/* Growth Chart */}
            <div className="flex flex-wrap gap-4 px-4 py-6">
              <div className="flex-1 flex-col gap-2 rounded-xl bg-white border border-gray-300 p-6 shadow-sm">
                <p className="text-base font-medium text-brand-navy-dark">Employee Growth</p>
                <p className="text-3xl font-bold truncate text-brand-navy-dark">+15%</p>
                <div className="flex gap-1">
                  <p className="text-base font-normal text-muted-foreground">Last Year</p>
                  <p className="text-base font-medium text-green-700">+15%</p>
                </div>
                <div className="grid min-h-[180px] grid-flow-col gap-4 grid-rows-[1fr_auto] items-end justify-items-center px-3">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                    <React.Fragment key={month}>
                      <div
                        className="w-full rounded-t-sm bg-brand-navy-lightest border-t-2 border-brand-navy-dark"
                        style={{ height: `${(i + 3) * 10}%` }}
                      />
                      <p className="text-xs font-bold text-muted-foreground">{month}</p>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Employee Table */}
           

          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
)

}