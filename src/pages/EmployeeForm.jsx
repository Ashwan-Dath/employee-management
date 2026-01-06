import { useState, useEffect } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
// import userIcon from '../assets/user.svg';
import userIcon from '../assets/user.svg';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, addEmployee, editEmployee } = useEmployee();

  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    state: '',
    active: true,
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const employee = employees.find(e => e.id === id);
      if (employee) {
        setFormData(employee);
        setPreviewImage(employee.image);
      } else {
        navigate('/employees');
      }
    }
  }, [id, employees, navigate, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Use a default image if none is uploaded
    const finalData = {
      ...formData,
      image: formData.image || userIcon
    };

    if (isEditMode) {
      editEmployee(id, finalData);
    } else {
      addEmployee(finalData);
    }
    navigate('/employees');
  };

  return (
    <div className="form-page">
      <div className="form-header">
        <button onClick={() => navigate('/employees')} className="btn-back">
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="employee-form">

          <div className="form-section image-section">
            <label className="image-upload-label">
              <div className="image-preview">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" />
                ) : (
                  <div className="placeholder">
                    <Upload size={32} />
                    <span>Upload Photo</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden-input"
              />
            </label>
          </div>

          <div className="form-section inputs-section">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Sumith"
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="row">
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={errors.dob ? 'error' : ''}
                />
                {errors.dob && <span className="error-text">{errors.dob}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select State</option>
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Kerala">Kerala</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Other">Other</option>
              </select>
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                />
                <span className="slider"></span>
                <span className="label-text">Active Employee</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate('/employees')} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save">
                <Save size={18} />
                Save Employee
              </button>
            </div>
          </div>
        </form>
      </div>


    </div>
  );
};

export default EmployeeForm;
