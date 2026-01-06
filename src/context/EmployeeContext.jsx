import { createContext, useContext, useState, useEffect } from 'react';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('employees');
        if (stored) {
            setEmployees(JSON.parse(stored));
        } else {
            // Seed with some mock data if empty
            const mockData = [
                {
                    id: '1001',
                    fullName: 'Sujeeth',
                    gender: 'Male',
                    dob: '1990-05-15',
                    state: 'Andhra Pradesh',
                    active: true,
                    image: null // Placeholder or data URL
                },
                {
                    id: '1004',
                    fullName: 'Rekha',
                    gender: 'Female',
                    dob: '1992-08-20',
                    state: 'Telangana',
                    active: true,
                    image: null
                },
                {
                    id: '1002',
                    fullName: 'Leela',
                    gender: 'Female',
                    dob: '2002-08-20',
                    state: 'Kerala',
                    active: false,
                    image: null
                },
                {
                    id: '1005',
                    fullName: 'Akshith',
                    gender: 'Male',
                    dob: '1999-08-20',
                    state: 'Karnataka',
                    active: true,
                    image: null
                },
                {
                    id: '1008',
                    fullName: 'Ravi',
                    gender: 'Male',
                    dob: '20001-08-20',
                    state: 'Tamil Nadu',
                    active: false,
                    image: null
                },
            ];
            setEmployees(mockData);
            localStorage.setItem('employees', JSON.stringify(mockData));
        }
        setLoading(false);
    }, []);

    // Save to localStorage whenever employees change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }, [employees, loading]);

    const addEmployee = (employee) => {
        // Generate a 5-digit random ID
        const newId = Math.floor(1003 + Math.random() * 9000).toString();
        const newEmployee = { ...employee, id: newId };
        setEmployees([...employees, newEmployee]);
    };

    const editEmployee = (id, updatedData) => {
        setEmployees(employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee, loading }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => useContext(EmployeeContext);
