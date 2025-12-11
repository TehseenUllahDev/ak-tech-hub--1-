import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Grid, List, Laptop, X, Calendar, Briefcase, Trash2, Edit2, ChevronDown, ChevronUp, Upload, Image as ImageIcon, CheckCircle, FolderPlus, Folder, AlertTriangle, BadgeCheck, Shield, Lock, Unlock, Mail, Star, Clock, CheckSquare, Wrench } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../data';
import { Employee, Project } from '../types';

// --- Reusable Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children?: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-primary-light border border-ui-border w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl relative z-10 shadow-2xl custom-scrollbar"
      >
        <div className="flex justify-between items-center p-6 border-b border-ui-border sticky top-0 bg-primary-light/95 backdrop-blur z-20">
          <h2 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-text-main to-accent-glow">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-ui-panel rounded-full transition-colors text-text-muted hover:text-text-main"><X size={24} /></button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: { isOpen: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel}></div>
       <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-primary border border-ui-border p-6 rounded-2xl relative z-10 shadow-2xl max-w-sm w-full"
       >
          <div className="flex items-center gap-3 mb-4 text-red-500">
             <AlertTriangle size={28} />
             <h3 className="text-xl font-bold font-display text-text-main">{title}</h3>
          </div>
          <p className="text-text-muted mb-6">{message}</p>
          <div className="flex justify-end gap-3">
             <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-ui-panel hover:bg-ui-panel/80 text-text-muted transition-colors">Cancel</button>
             <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-500/20 transition-all">Confirm Delete</button>
          </div>
       </motion.div>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (status: boolean) => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin(true);
      onClose();
      setPassword('');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-primary-light border border-ui-border p-8 rounded-2xl relative z-10 shadow-2xl max-w-md w-full"
      >
         <div className="text-center mb-6">
           <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
             <Shield size={32} />
           </div>
           <h2 className="text-2xl font-display font-bold text-text-main">Admin Access</h2>
           <p className="text-text-muted">Enter credentials to manage the database.</p>
         </div>

         <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Password</label>
             <div className="relative">
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => { setPassword(e.target.value); setError(false); }}
                 className={`w-full bg-ui-input border ${error ? 'border-red-500' : 'border-ui-border'} rounded-lg pl-10 pr-4 py-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all`}
                 placeholder="••••••••"
                 autoFocus
               />
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
             </div>
             {error && <p className="text-red-400 text-xs mt-2">Incorrect password. Please try again.</p>}
           </div>
           
           <div className="flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 py-3 rounded-lg bg-ui-panel hover:bg-ui-panel/80 text-text-muted font-medium transition-colors">Cancel</button>
             <button type="submit" className="flex-1 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-bold shadow-lg shadow-accent/20 transition-all">Authenticate</button>
           </div>
         </form>
      </motion.div>
    </div>
  );
};

// --- Helper for Status Colors ---
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', dot: 'bg-emerald-500', icon: <CheckSquare size={12}/> };
    case 'Maintenance':
      return { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20', dot: 'bg-amber-500', icon: <Wrench size={12}/> };
    default: // In Progress
      return { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', dot: 'bg-blue-500', icon: <Clock size={12}/> };
  }
};

// --- Main Component ---
const EmployeeDB = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Sorting & Filtering
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee | 'projects'; direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  const [filterDept, setFilterDept] = useState('All');

  // Modal States
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  
  // Delete Confirmation State
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; type: 'employee' | 'project'; id: string | null }>({ isOpen: false, type: 'employee', id: null });
  
  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const initialFormState: Partial<Employee> = {
    name: '', email: '', role: '', department: '', skills: [], joinDate: '', leaveDate: '', hasLaptop: false, gender: 'Male', projects: [], avatarUrl: '', isTopTalent: false
  };
  const [formData, setFormData] = useState<Partial<Employee>>(initialFormState);
  
  // Project Sub-Form State
  const [newProject, setNewProject] = useState<Partial<Project>>({ name: '', role: '', description: '', status: 'In Progress' });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Derived Data
  const uniqueDepartments = useMemo(() => ['All', ...Array.from(new Set(employees.map(e => e.department)))], [employees]);

  // Restrict View for Non-Admins
  const visibleEmployees = useMemo(() => {
    return isAdmin ? employees : employees.filter(e => e.isTopTalent);
  }, [employees, isAdmin]);

  const filteredEmployees = useMemo(() => {
    let result = visibleEmployees;
    
    // Filter by Dept
    if (filterDept !== 'All') {
      result = result.filter(e => e.department === filterDept);
    }

    // Search
    const lowerQ = searchQuery.toLowerCase();
    result = result.filter(emp => 
      emp.name.toLowerCase().includes(lowerQ) ||
      emp.role.toLowerCase().includes(lowerQ) ||
      emp.department.toLowerCase().includes(lowerQ)
    );

    // Sort
    result = [...result].sort((a, b) => {
      let valA: any = a[sortConfig.key as keyof Employee];
      let valB: any = b[sortConfig.key as keyof Employee];
      
      if (sortConfig.key === 'projects') {
         valA = a.projects.length;
         valB = b.projects.length;
      }

      if (valA === undefined || valB === undefined) return 0;

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [visibleEmployees, searchQuery, filterDept, sortConfig]);

  // --- Handlers ---

  const handleSort = (key: keyof Employee | 'projects') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const confirmDeleteEmployee = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirm({ isOpen: true, type: 'employee', id });
  };
  
  const confirmDeleteProject = (id: string) => {
    setDeleteConfirm({ isOpen: true, type: 'project', id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.type === 'employee' && deleteConfirm.id) {
        setEmployees(prev => prev.filter(emp => emp.id !== deleteConfirm.id));
        if (selectedEmployee?.id === deleteConfirm.id) setSelectedEmployee(null);
    } else if (deleteConfirm.type === 'project' && deleteConfirm.id) {
        setFormData(prev => ({ ...prev, projects: prev.projects?.filter(p => p.id !== deleteConfirm.id) }));
    }
    setDeleteConfirm({ isOpen: false, type: 'employee', id: null });
  };

  const handleOpenAdd = () => {
    setFormData(initialFormState);
    setIsEdit(false);
    setIsAddModalOpen(true);
    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  const handleOpenEdit = (emp: Employee, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(emp);
    setIsEdit(true);
    setIsAddModalOpen(true);
    setIsAddingProject(false);
    setEditingProjectId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = { 
        ...formData, 
        avatarUrl: formData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=random` 
    };
    
    // Ensure leaveDate is undefined if the checkbox isn't actively showing it/empty
    if (!formData.leaveDate) delete finalData.leaveDate;

    if (isEdit && formData.id) {
       setEmployees(prev => prev.map(emp => emp.id === formData.id ? { ...emp, ...finalData } as Employee : emp));
    } else {
       const newEmp = { ...finalData, id: `emp-${Date.now()}` } as Employee;
       setEmployees(prev => [...prev, newEmp]);
    }
    setIsAddModalOpen(false);
  };

  // Avatar Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Project Handlers
  const handleSaveProject = () => {
      if(!newProject.name) return;
      
      const projData: Project = { 
          id: editingProjectId || `proj-${Date.now()}`, 
          name: newProject.name!, 
          role: newProject.role || 'Contributor', 
          description: newProject.description || '', 
          status: newProject.status as any || 'In Progress' 
      };

      if (editingProjectId) {
         setFormData(prev => ({ ...prev, projects: prev.projects?.map(p => p.id === editingProjectId ? projData : p) }));
      } else {
         setFormData(prev => ({ ...prev, projects: [...(prev.projects || []), projData] }));
      }
      
      setNewProject({ name: '', role: '', description: '', status: 'In Progress' });
      setIsAddingProject(false);
      setEditingProjectId(null);
  };

  const startEditProject = (proj: Project) => {
     setNewProject(proj);
     setEditingProjectId(proj.id);
     setIsAddingProject(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Controls Header */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8 bg-primary-light/50 p-6 rounded-2xl border border-ui-border backdrop-blur-md shadow-2xl">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-main mb-2 tracking-wide">
            {isAdmin ? "Employee Database" : "Our Top Talent"}
          </h1>
          <p className="text-text-muted text-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div> 
            {visibleEmployees.length} {isAdmin ? 'Total Records' : 'Featured Profiles'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Admin Toggle */}
          <button 
            onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)} 
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-2 ${isAdmin ? 'bg-accent/20 border-accent text-accent shadow-[0_0_15px_var(--color-accent)]' : 'bg-ui-panel border-ui-border text-text-muted hover:text-text-main'}`}
          >
            {isAdmin ? <Unlock size={14} /> : <Lock size={14} />}
            {isAdmin ? 'Admin Mode (Logout)' : 'Admin Login'}
          </button>

          {/* Filter Dept */}
          <div className="relative w-full md:w-auto min-w-[180px]">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
             <select 
                value={filterDept} 
                onChange={(e) => setFilterDept(e.target.value)}
                className="bg-ui-input border border-ui-border rounded-lg pl-10 pr-8 py-2.5 text-sm text-text-main focus:border-accent focus:ring-1 focus:ring-accent outline-none appearance-none w-full cursor-pointer hover:bg-ui-panel transition-colors"
             >
                {uniqueDepartments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={14} />
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-ui-input border border-ui-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-main w-full focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder-text-muted hover:bg-ui-panel"
            />
          </div>

          {/* View Mode */}
          <div className="flex bg-ui-input rounded-lg p-1 border border-ui-border">
            <button onClick={() => setViewMode('card')} className={`p-2 rounded-md transition-all ${viewMode === 'card' ? 'bg-accent text-white shadow-lg' : 'text-text-muted hover:text-text-main'}`}><Grid size={18}/></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-accent text-white shadow-lg' : 'text-text-muted hover:text-text-main'}`}><List size={18}/></button>
          </div>

          {isAdmin && (
            <button onClick={handleOpenAdd} className="w-full md:w-auto bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-0.5">
              <Plus size={18} /> New Entry
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredEmployees.map((emp) => (
              <motion.div
                layout
                key={emp.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedEmployee(emp)}
                className="group bg-primary-light/40 backdrop-blur-sm hover:bg-primary-light border border-ui-border hover:border-accent/50 rounded-2xl p-6 cursor-pointer transition-all relative overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-accent/10 flex flex-col items-center text-center"
              >
                {/* Status Indicator (Admin only) */}
                {isAdmin && (
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${emp.hasLaptop ? 'from-emerald-500/20' : 'from-rose-500/20'} to-transparent rounded-bl-[4rem] transition-colors pointer-events-none`}>
                     <div className={`absolute top-4 right-4 ${emp.hasLaptop ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {emp.hasLaptop ? <Laptop size={18} /> : <X size={18} />}
                     </div>
                  </div>
                )}
                
                {emp.isTopTalent && (
                  <div className="absolute top-4 left-4 text-yellow-500">
                    <Star size={18} fill="currentColor" />
                  </div>
                )}
                
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-accent to-purple-500 mb-4 shadow-[0_0_25px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform">
                  <img src={emp.avatarUrl} alt={emp.name} className="w-full h-full rounded-full object-cover bg-gray-900" />
                </div>
                <h3 className="font-bold text-xl text-text-main leading-tight mb-1 font-display tracking-wide">{emp.name}</h3>
                <div className="text-accent text-sm font-medium tracking-wide uppercase mb-4">{emp.role}</div>
                
                <div className="w-full space-y-3 text-sm text-text-muted mb-4 bg-ui-panel p-3 rounded-xl border border-ui-border">
                  <div className="flex items-center justify-center gap-2"><Briefcase size={14} className="text-accent"/> {emp.department}</div>
                  {isAdmin && (
                    <>
                      <div className="flex items-center justify-center gap-2"><Mail size={14} className="text-accent"/> {emp.email}</div>
                      <div className="flex items-center justify-center gap-2"><Calendar size={14} className="text-accent"/> Joined: {new Date(emp.joinDate).toLocaleDateString()}</div>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 justify-center mt-auto">
                  {emp.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-ui-panel text-text-muted px-2 py-1 rounded border border-ui-border hover:border-accent hover:text-accent hover:shadow-[0_0_10px_var(--color-accent-glow)] hover:scale-105 transition-all duration-200">{skill}</span>
                  ))}
                  {emp.skills.length > 3 && <span className="text-[10px] font-bold text-accent px-2 py-1">+{emp.skills.length - 3}</span>}
                </div>

                {isAdmin && (
                  <div className="absolute top-4 left-14 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">
                    <button onClick={(e) => handleOpenEdit(emp, e)} className="p-2 bg-blue-600/90 backdrop-blur rounded-lg hover:bg-blue-500 text-white shadow-lg"><Edit2 size={16}/></button>
                    <button onClick={(e) => confirmDeleteEmployee(emp.id, e)} className="p-2 bg-red-600/90 backdrop-blur rounded-lg hover:bg-red-500 text-white shadow-lg"><Trash2 size={16}/></button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-hidden bg-primary-light/40 rounded-2xl border border-ui-border backdrop-blur-sm shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-text-muted">
              <thead className="bg-ui-panel text-text-main uppercase font-bold text-xs tracking-wider font-display">
                <tr>
                  {[
                    { label: 'Name', key: 'name' },
                    { label: 'Role', key: 'role' },
                    { label: 'Department', key: 'department' },
                    ...(isAdmin ? [
                      { label: 'Asset', key: 'hasLaptop' },
                      { label: 'Join Date', key: 'joinDate' }
                    ] : []),
                    { label: 'Skills', key: '' },
                  ].map((header, idx) => (
                    <th 
                      key={idx} 
                      className="px-6 py-5 cursor-pointer hover:bg-ui-panel transition-colors group select-none" 
                      onClick={() => header.key && handleSort(header.key as any)}
                      title={header.key ? `Sort by ${header.label} (${sortConfig.key === header.key && sortConfig.direction === 'desc' ? 'Ascending' : 'Descending'})` : ''}
                    >
                      <div className="flex items-center gap-2">
                        {header.label}
                        {header.key && sortConfig.key === header.key && (
                          sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-accent" /> : <ChevronDown size={14} className="text-accent" />
                        )}
                        {header.key && sortConfig.key !== header.key && (
                          <ChevronUp size={14} className="text-text-muted group-hover:text-text-main opacity-0 group-hover:opacity-100 transition-all" />
                        )}
                      </div>
                    </th>
                  ))}
                  {isAdmin && <th className="px-6 py-5 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-ui-border">
                {filteredEmployees.map((emp) => (
                  <tr 
                    key={emp.id} 
                    onClick={() => setSelectedEmployee(emp)}
                    className="hover:bg-ui-panel cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={emp.avatarUrl} className="w-10 h-10 rounded-full object-cover border border-ui-border shadow-lg" alt="" />
                        <div>
                           <div className="font-bold text-text-main text-base flex items-center gap-2">
                              {emp.name}
                              {emp.isTopTalent && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                           </div>
                           {isAdmin && emp.leaveDate && <div className="text-[10px] text-red-400 bg-red-400/10 px-1.5 rounded inline-block">Ex-Employee</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{emp.role}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-ui-panel border border-ui-border text-xs font-medium">{emp.department}</span>
                    </td>
                    {isAdmin && (
                      <>
                        <td className="px-6 py-4">
                          {emp.hasLaptop ? 
                            <Laptop size={16} className="text-emerald-400" /> : 
                            <span className="w-2 h-2 rounded-full bg-gray-400/50"></span>
                          }
                        </td>
                        <td className="px-6 py-4">{new Date(emp.joinDate).toLocaleDateString()}</td>
                      </>
                    )}
                    <td className="px-6 py-4 relative group">
                        {/* Summary */}
                        <div className="flex items-center gap-1.5 text-text-muted">
                          <BadgeCheck size={16} className="text-accent" />
                          <span className="text-xs group-hover:text-text-main transition-colors">View Skills</span>
                        </div>
                        {/* Custom Tooltip */}
                        <div className="absolute bottom-full left-10 mb-2 w-56 bg-primary-light border border-accent/30 p-4 rounded-xl shadow-[0_10px_40px_var(--shadow-color)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
                            <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider border-b border-ui-border pb-1">Mastery</div>
                            <div className="flex flex-wrap gap-1.5">
                                {emp.skills.map(s => <span key={s} className="text-[10px] bg-accent/10 px-2 py-1 rounded text-text-main border border-accent/20">{s}</span>)}
                            </div>
                        </div>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-right">
                         <div className="flex justify-end gap-2">
                           <button onClick={(e) => handleOpenEdit(emp, e)} className="p-2 text-blue-400 hover:text-white hover:bg-blue-500 rounded-lg transition-colors"><Edit2 size={16}/></button>
                           <button onClick={(e) => confirmDeleteEmployee(emp.id, e)} className="p-2 text-red-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors"><Trash2 size={16}/></button>
                         </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 1. Detail Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <Modal 
            isOpen={!!selectedEmployee} 
            onClose={() => setSelectedEmployee(null)} 
            title={isAdmin ? "Full Employee Profile" : "Talent Profile"}
          >
             <div className="grid md:grid-cols-3 gap-8">
               {/* Left Column: Bio */}
               <div className="md:col-span-1">
                  <div className="bg-ui-panel rounded-2xl p-8 text-center border border-ui-border relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent opacity-50"></div>
                    <img src={selectedEmployee.avatarUrl} alt="" className="w-32 h-32 rounded-full mx-auto object-cover mb-6 border-4 border-accent shadow-[0_0_30px_rgba(59,130,246,0.4)] relative z-10" />
                    <h2 className="text-2xl font-bold text-text-main relative z-10 font-display">{selectedEmployee.name}</h2>
                    <p className="text-accent font-medium mb-1 relative z-10">{selectedEmployee.role}</p>
                    {isAdmin && <p className="text-text-muted text-sm mb-6 relative z-10">{selectedEmployee.email}</p>}
                    
                    <div className="grid grid-cols-2 gap-3 text-left relative z-10 mt-6">
                       <div className="bg-ui-input p-3 rounded-lg border border-ui-border">
                          <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-1">Dept</span>
                          <span className="font-bold text-sm text-text-main">{selectedEmployee.department}</span>
                       </div>
                       {isAdmin && (
                         <div className="bg-ui-input p-3 rounded-lg border border-ui-border">
                            <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-1">Status</span>
                            <span className={`font-bold text-sm ${selectedEmployee.leaveDate ? 'text-red-400' : 'text-emerald-400'}`}>
                               {selectedEmployee.leaveDate ? 'Inactive' : 'Active'}
                            </span>
                         </div>
                       )}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-3">Skill Set</h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedEmployee.skills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 bg-accent/5 text-accent border border-accent/20 rounded-md text-xs font-bold hover:bg-accent hover:text-white transition-colors cursor-default shadow-[0_0_10px_rgba(0,0,0,0)] hover:shadow-[0_0_15px_var(--color-accent)]">{skill}</span>
                        ))}
                    </div>
                  </div>
               </div>
               
               {/* Right Column: Projects & Timeline */}
               <div className="md:col-span-2 space-y-8">
                 {/* Public Short Bio or Greeting */}
                 {!isAdmin && (
                   <div className="bg-ui-panel p-6 rounded-2xl border border-ui-border">
                      <h3 className="text-xl font-bold font-display mb-4 text-text-main">About</h3>
                      <p className="text-text-muted leading-relaxed">
                        {selectedEmployee.name} is a key member of our {selectedEmployee.department} team. With extensive expertise in {selectedEmployee.skills.slice(0,3).join(', ')}, they contribute significantly to our innovative solutions.
                      </p>
                   </div>
                 )}

                 {/* Admin Project View */}
                 {isAdmin && (
                   <div className="bg-ui-panel p-6 rounded-2xl border border-ui-border min-h-[400px]">
                     <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2 text-text-main">
                       <Folder size={20} className="text-accent"/> Project History
                     </h3>
                     
                     {selectedEmployee.projects.length === 0 ? (
                       <div className="flex flex-col items-center justify-center h-48 text-text-muted border-2 border-dashed border-ui-border rounded-xl">
                          <Briefcase size={40} className="mb-2 opacity-30"/>
                          <p>No projects assigned yet.</p>
                       </div>
                     ) : (
                       <div className="relative border-l-2 border-ui-border ml-3 space-y-8">
                         {selectedEmployee.projects.map((proj) => {
                           const statusColor = getStatusColor(proj.status);
                           return (
                           <div key={proj.id} className="relative pl-8 group">
                             {/* Timeline Dot */}
                             <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors ${statusColor.dot} border-primary group-hover:scale-125 shadow-[0_0_10px_currentColor]`}></div>
                             
                             <div className="bg-ui-input p-5 rounded-xl hover:bg-ui-panel transition-colors border border-ui-border hover:border-accent/30 group-hover:translate-x-1 duration-300">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-bold text-text-main text-lg">{proj.name}</h4>
                                  <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider border flex items-center gap-1.5 ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                                    {statusColor.icon}
                                    {proj.status}
                                  </span>
                                </div>
                                <div className="text-sm text-accent mb-3 font-medium flex items-center gap-1"><Briefcase size={12}/> {proj.role}</div>
                                <p className="text-text-muted text-sm leading-relaxed">{proj.description}</p>
                             </div>
                           </div>
                         )})}
                       </div>
                     )}
                   </div>
                 )}
               </div>
             </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* 2. Add/Edit Modal (Admin Only) */}
      <AnimatePresence>
        {isAddModalOpen && isAdmin && (
          <Modal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
            title={isEdit ? "Edit Employee Details" : "Onboard New Talent"}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
               
               {/* Avatar Upload Section */}
               <div className="flex flex-col items-center justify-center mb-8">
                 <div 
                    className={`relative w-32 h-32 rounded-full border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group ${dragActive ? 'border-accent bg-accent/10 scale-105' : 'border-text-muted bg-ui-input hover:border-accent hover:bg-ui-panel'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                 >
                    <input ref={fileInputRef} type="file" className="hidden" onChange={handleChangeFile} accept="image/*" />
                    
                    {formData.avatarUrl ? (
                      <img src={formData.avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2">
                        <Upload size={24} className="text-text-muted mb-2 mx-auto group-hover:text-accent transition-colors" />
                        <span className="text-[10px] text-text-muted uppercase tracking-wide font-bold">Upload Photo</span>
                      </div>
                    )}
                    
                    {/* Overlay for change */}
                    {formData.avatarUrl && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <ImageIcon className="text-white" />
                      </div>
                    )}
                 </div>
                 <p className="text-xs text-text-muted mt-3">Drag & drop or click to upload</p>
               </div>

               {/* Top Talent Checkbox */}
               <div className="flex justify-center mb-6">
                 <label className="flex items-center gap-2 cursor-pointer p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg hover:bg-yellow-500/20 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={formData.isTopTalent} 
                      onChange={e => setFormData({...formData, isTopTalent: e.target.checked})} 
                      className="accent-yellow-500"
                    />
                    <span className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                      <Star size={14} fill="currentColor" /> Mark as Top Talent (Visible to Public)
                    </span>
                 </label>
               </div>

               {/* Personal Details */}
               <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Full Name</label>
                   <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="e.g. John Doe" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                   <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="john@aktech.com" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Role / Title</label>
                   <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="e.g. Senior Developer" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Department</label>
                   <div className="relative">
                      <input list="depts" required type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" placeholder="Select or type..." />
                      <datalist id="depts">
                        {uniqueDepartments.filter(d => d !== 'All').map(d => <option key={d} value={d} />)}
                      </datalist>
                   </div>
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Join Date</label>
                   <input required type="date" value={formData.joinDate} onChange={e => setFormData({...formData, joinDate: e.target.value})} className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Gender</label>
                   <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as any})} className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer">
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>
               </div>
               
               {/* Skills & Laptop */}
               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Skills (Comma separated)</label>
                    <input 
                      type="text" 
                      value={formData.skills?.join(', ')} 
                      onChange={e => setFormData({...formData, skills: e.target.value.split(',').map(s => s.trim())})} 
                      className="w-full bg-ui-input border border-ui-border rounded-lg p-3 text-text-main outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" 
                      placeholder="React, Node.js, UI/UX..."
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <label className="flex items-center gap-3 cursor-pointer group p-3 bg-ui-input rounded-lg border border-ui-border hover:border-accent/30 transition-all">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.hasLaptop ? 'bg-accent border-accent' : 'border-text-muted group-hover:border-accent'}`}>
                          {formData.hasLaptop && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <input type="checkbox" checked={formData.hasLaptop} onChange={e => setFormData({...formData, hasLaptop: e.target.checked})} className="hidden" />
                      <span className="text-text-main text-sm font-medium">Assign Company Laptop</span>
                    </label>
                  </div>
               </div>

               {/* Leave Date Logic */}
               <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                 <label className="flex items-center gap-2 cursor-pointer mb-2">
                   <input 
                      type="checkbox" 
                      checked={!!formData.leaveDate} 
                      onChange={(e) => setFormData({ ...formData, leaveDate: e.target.checked ? new Date().toISOString().split('T')[0] : '' })}
                      className="accent-red-500"
                   />
                   <span className="text-sm font-bold text-red-400">Employee has left the company</span>
                 </label>
                 
                 {formData.leaveDate && (
                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                     <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Leave Date</label>
                     <input type="date" value={formData.leaveDate} onChange={e => setFormData({...formData, leaveDate: e.target.value})} className="w-full mt-1 bg-ui-input border border-red-500/30 rounded-lg p-3 text-text-main outline-none focus:border-red-500 transition-all text-sm" />
                   </motion.div>
                 )}
               </div>

               {/* Project Management Section */}
               <div className="border-t border-ui-border pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-text-main flex items-center gap-2"><FolderPlus size={18} className="text-accent"/> Managed Projects</h3>
                    {!isAddingProject && (
                      <button type="button" onClick={() => { setNewProject({ name: '', role: '', description: '', status: 'In Progress' }); setIsAddingProject(true); }} className="text-xs bg-ui-input hover:bg-ui-panel px-3 py-1.5 rounded text-accent transition-colors border border-ui-border">
                        + Add Project
                      </button>
                    )}
                  </div>

                  {isAddingProject && (
                    <div className="bg-ui-panel p-5 rounded-xl border border-accent/30 mb-6 shadow-lg relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                       <h4 className="text-sm font-bold text-text-main mb-4 flex justify-between">
                         {editingProjectId ? 'Edit Project' : 'New Project Details'}
                       </h4>
                       <div className="grid grid-cols-2 gap-4 mb-4">
                          <input type="text" placeholder="Project Name" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} className="bg-ui-input border border-ui-border rounded-lg p-2.5 text-sm text-text-main focus:border-accent outline-none" />
                          <input type="text" placeholder="Role in Project" value={newProject.role} onChange={e => setNewProject({...newProject, role: e.target.value})} className="bg-ui-input border border-ui-border rounded-lg p-2.5 text-sm text-text-main focus:border-accent outline-none" />
                       </div>
                       <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-ui-input border border-ui-border rounded-lg p-2.5 text-sm text-text-main mb-4 focus:border-accent outline-none" rows={2}></textarea>
                       <div className="flex justify-between items-center">
                          <select value={newProject.status} onChange={e => setNewProject({...newProject, status: e.target.value as any})} className="bg-ui-input border border-ui-border rounded-lg p-2 text-sm text-text-main focus:border-accent outline-none">
                             <option value="In Progress">In Progress</option>
                             <option value="Completed">Completed</option>
                             <option value="Maintenance">Maintenance</option>
                          </select>
                          <div className="flex gap-2">
                            <button type="button" onClick={() => { setIsAddingProject(false); setEditingProjectId(null); }} className="text-xs text-text-muted hover:text-text-main px-3 py-1">Cancel</button>
                            <button type="button" onClick={handleSaveProject} className="text-xs bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-accent/20">
                              {editingProjectId ? 'Update Project' : 'Add to List'}
                            </button>
                          </div>
                       </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {formData.projects?.map((proj, idx) => {
                      const statusColor = getStatusColor(proj.status);
                      return (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={proj.id} className="flex justify-between items-center bg-ui-input p-4 rounded-xl border border-ui-border hover:border-ui-border transition-all group">
                        <div>
                          <div className="font-bold text-sm text-text-main mb-0.5">{proj.name}</div>
                          <div className="text-xs text-text-muted flex items-center gap-2">
                             {proj.role} • 
                             <span className={`flex items-center gap-1 ${statusColor.text}`}>
                               {statusColor.icon} {proj.status}
                             </span>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={() => startEditProject(proj)} className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded transition-colors"><Edit2 size={14}/></button>
                          <button type="button" onClick={() => confirmDeleteProject(proj.id)} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded transition-colors"><Trash2 size={14}/></button>
                        </div>
                      </motion.div>
                    )})}
                    {(!formData.projects || formData.projects.length === 0) && !isAddingProject && (
                      <p className="text-center text-sm text-text-muted italic py-4 border border-dashed border-ui-border rounded-xl">No projects added yet.</p>
                    )}
                  </div>
               </div>

               <div className="pt-6 border-t border-ui-border flex justify-end gap-4 sticky bottom-0 bg-primary-light/95 p-4 -mx-6 -mb-6 backdrop-blur z-10">
                 <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 rounded-lg text-text-muted hover:text-text-main hover:bg-ui-panel transition-colors font-medium">Cancel</button>
                 <button type="submit" className="px-8 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg font-bold transition-all shadow-[0_0_20px_var(--color-accent-glow)] hover:shadow-[0_0_30px_var(--color-accent)] hover:-translate-y-0.5">{isEdit ? 'Save Changes' : 'Create Profile'}</button>
               </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
            <ConfirmModal 
                isOpen={deleteConfirm.isOpen}
                title={deleteConfirm.type === 'employee' ? "Delete Employee?" : "Remove Project?"}
                message={deleteConfirm.type === 'employee' 
                    ? "This action cannot be undone. The employee record and all associated data will be permanently removed." 
                    : "Are you sure you want to remove this project from the employee's history?"}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteConfirm({ isOpen: false, type: 'employee', id: null })}
            />
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
         {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={setIsAdmin} />}
      </AnimatePresence>

    </div>
  );
};

export default EmployeeDB;