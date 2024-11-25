import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authContext";


const View = () => {
    const {base_url} = useAuth();
    const { id } = useParams();
    const [employee, setEmployee] = useState([]);
    useEffect(() => {
        const fetchEmployee = async () => {

            try {
                const response = await axios.get(`${base_url}/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                

                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            }
        }
        fetchEmployee();
    }, []);


    return (
        <Wrapper className="container mt-5">
            {/* <h2 className="text-center m-4">My Details</h2> */}

            <div className="d-flex align-items-center p-5 mt-5 emp_view">
                <div className="m-5">
                    <img className="emp_image" src={`${base_url}/${employee.userId?.profileImage}`} alt="" />
                </div>
                <div className="mx-4">
                    <div>

                        <p>Name : <span>{employee?.userId?.name}</span></p>
                    </div>
                    <div>

                        <p>Employee Id : <span>{employee?.employeeId}</span></p>
                    </div>
                    <div>

                        <p>Department : <span>{employee?.department?.dep_name}</span></p>
                    </div>
                    <div>

                        <p>Gender : <span>{employee?.gender}</span></p>
                    </div>
                    <div>

                        <p>Date of Birth : <span>{new Date(employee.dob).toLocaleDateString()}</span></p>
                    </div>
                    
                    <div>

                        <p>Marital Status : <span>{employee?.maritalStatus}</span></p>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};


const Wrapper = styled.div`

${'' /* .emp_image{
    height:300px;
    width:300px;
    border-radius:50%;
}
.emp_view{
    background:white;
    height:30rem;
} */}
/* Wrapper container styling */
.container {
    max-width: 900px;
    margin: 0 auto;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px 20px;
    font-family: "Arial", sans-serif;
}

/* Section Title */
.container h2 {
    font-size: 24px;
    color: #0056b3; /* Corporate blue */
    font-weight: bold;
    margin-bottom: 30px;
}

/* Employee Details Card */
.emp_view {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 20px;
}

/* Employee Image */
.emp_image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #007bff;
}

/* Employee Details Section */
.mx-4 {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Detail Text */
.mx-4 p {
    font-size: 16px;
    margin: 0;
    color: #333;
}

.mx-4 p span {
    font-weight: 600;
    color: #000;
}

/* Section Spacing */
.m-5 {
    margin: 20px !important;
}

.mt-5 {
    margin-top: 40px !important;
}

/* Responsive Design */
@media (max-width: 768px) {
    .emp_view {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .mx-4 {
        align-items: center;
    }

    .emp_image {
        margin-bottom: 20px;
    }
}

`


export default View;