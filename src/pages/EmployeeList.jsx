import { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Printer, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const EmployeeList = () => {
  const { employees, deleteEmployee } = useEmployee();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPrinting, setIsPrinting] = useState(false);
  const itemsPerPage = 10;

  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'All' || emp.gender === filterGender;
    const matchesStatus = filterStatus === 'All' ||
      (filterStatus === 'Active' ? emp.active : !emp.active);
    return matchesSearch && matchesGender && matchesStatus;
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterGender, filterStatus]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = isPrinting ? filteredEmployees : filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const confirmDelete = (employee) => {
    setDeleteTarget(employee);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteEmployee(deleteTarget.id);
      setDeleteTarget(null);
      // Adjust page if deleting the last item on a page
      if (currentEmployees.length === 1 && currentPage > 1 && !isPrinting) {
        setCurrentPage(prev => prev - 1);
      }
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="page-container">
      <div className="actions-bar">
        <div className="search-group">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-group">
          <select
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button onClick={handlePrint} className="btn-icon" title="Print List">
            <Printer size={20} />
          </button>

          <button onClick={() => navigate('/employees/add')} className="btn-primary">
            <Plus size={20} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Full Name</th>
              <th>ID</th>
              <th>Gender</th>
              <th>State</th>
              <th>Status</th>
              <th className="no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div className="table-avatar">
                      <img
                        src={emp.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
                        alt={emp.fullName}
                      />
                    </div>
                  </td>
                  <td className="font-medium">{emp.fullName}</td>
                  <td className="text-secondary">{emp.id}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.state}</td>
                  <td>
                    <span className={`status-badge ${emp.active ? 'active' : 'inactive'}`}>
                      {emp.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="no-print">
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate(`/employees/edit/${emp.id}`)}
                        className="btn-action edit"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(emp)}
                        className="btn-action delete"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  No employees found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredEmployees.length > 0 && (
        <div className="pagination-container no-print">
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredEmployees.length)} of {filteredEmployees.length} employees
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn-pagination"
              title="Previous Page"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="page-number">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn-pagination"
              title="Next Page"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Employee</h3>
            <p>Are you sure you want to delete employee  <strong>{deleteTarget.fullName}</strong>?</p>
            <div className="modal-actions">
              <button
                onClick={() => setDeleteTarget(null)}
                className="btn-modal cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn-modal confirm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default EmployeeList;
