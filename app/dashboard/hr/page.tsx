"use client";
import React, { useState, useRef, useCallback, useMemo } from 'react';
import Papa from 'papaparse';
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function Home() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', position: 'Senior Developer', salary: 85000, startDate: '2021-03-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', salary: 75000, startDate: '2020-01-10', status: 'Active' },
    { id: 3, name: 'Mike Johnson', department: 'HR', position: 'HR Specialist', salary: 60000, startDate: '2019-08-20', status: 'Active' },
    { id: 4, name: 'Sarah Williams', department: 'Finance', position: 'Accountant', salary: 55000, startDate: '2022-06-01', status: 'Active' },
    { id: 5, name: 'David Brown', department: 'Engineering', position: 'Junior Developer', salary: 65000, startDate: '2023-02-14', status: 'Active' }
  ]);

  const fileInputRef = useRef(null);

  const { employeeCount, turnoverRate, averageTenure } = useMemo(() => {
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const inactiveEmployees = employees.filter(emp => emp.status === 'Inactive').length;
    const totalEmployees = employees.length;

    const count = totalEmployees;
    const turnover = totalEmployees > 0 ? ((inactiveEmployees / totalEmployees) * 100).toFixed(1) : 0;

    const totalTenureYears = employees.reduce((sum, emp) => {
      const start = new Date(emp.startDate);
      const now = new Date();
      if (isNaN(start.getTime()) || isNaN(now.getTime())) {
        return sum;
      }
      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
      return sum + diffYears;
    }, 0);

    const avgTenure = totalEmployees > 0 ? (totalTenureYears / totalEmployees).toFixed(1) : '0';

    return {
      employeeCount: count,
      turnoverRate: parseFloat(turnover),
      averageTenure: parseFloat(avgTenure),
    };
  }, [employees]);

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
            .filter(row => row.name && String(row.name).trim())
            .map((row, index) => ({
              id: employees.length + index + 1,
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
  }, [employees.length]);

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
        fileInputRef.current.value = '';
      }

      alert(`Successfully imported ${newEmployees.length} employees!`);
    } catch (error) {
      alert('Error importing CSV: ' + error.message);
    }
  };

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
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout userType="hr" userName="John Smith">
      <div className="space-y-6 bg-muted/30 min-h-screen px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">HR Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's your team overview.</p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Upload CSV
          </Button>
          <Button onClick={exportToCSV}>Export to CSV</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Employee Count', value: employeeCount },
            { label: 'Turnover Rate', value: `${turnoverRate}%` },
            { label: 'Average Tenure', value: `${averageTenure} years` },
          ].map((stat, i) => (
            <Card key={stat.label} className={`animate-fade-in [animation-delay:${i * 100}ms]`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="animate-fade-in [animation-delay:300ms]">
          <CardHeader>
            <CardTitle>Employee Growth</CardTitle>
            <CardDescription>Last 7 Months</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700 mb-2">+15%</p>
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
