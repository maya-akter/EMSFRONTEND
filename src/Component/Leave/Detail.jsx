import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../Context/authContext";


const Detail = () => {
    const { base_url } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [leave, setleave] = useState(null);
    useEffect(() => {
        const fetchLeave = async () => {

            try {
                const response = await axios.get(`${base_url}/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });



                if (response.data.success) {
                    setleave(response.data.leave);
                }
            } catch (error) {
                if (error.response && !error.response.data.error) {
                    alert(error.response.data.error);
                }
            }
        }
        fetchLeave();
    }, []);


    const changeStatus = async (id, status) => {
        try {
            const response = await axios.put(`${base_url}/api/leave/${id}`, { status }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });



            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }
        } catch (error) {
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }
    return (
        <>
            {
                leave ? (<Wrapper className="container mt-5">
                    <h2 className="text-center m-4">Leave Details</h2>

                    <div className="d-flex align-items-center  emp_view">
                        <div className="m-5">
                            <img className="emp_image" src={`${base_url}/${leave.employeeId.userId.profileImage}`} alt="" />
                        </div>
                        <div className=" d-flex">

                            <div>

                                <p >Name : <span>{leave.employeeId.userId.name}</span></p>
                            </div>
                            <div>

                                <p>Employee Id : <span>{leave?.employeeId.employeeId}</span></p>
                            </div>
                            <div>

                                <p>Department : <span>{leave.employeeId.department.dep_name}</span></p>
                            </div>



                            <div>

                                <p>Leave Type : <span>{leave.leaveType}</span></p>
                            </div>
                            <div>

                                <p>Reason : <span>{leave.reason}</span></p>
                            </div>
                            <div>

                                <p>Start Date : <span>{new Date(leave.startDate).toLocaleDateString()}</span></p>
                            </div>
                            <div>

                                <p>End Date : <span>{new Date(leave.endDate).toLocaleDateString()}</span></p>
                            </div>
                            <div>

                                <p className=" d-inline-block">{leave.status === "Pending" ? "Action : " : "Status :   "} </p>
                                {leave.status === "Pending" ? (
                                    <div>
                                        <button onClick={() => changeStatus(leave._id, "Approved")}>Approve</button>
                                        <button onClick={() => changeStatus(leave._id, "Rejected")}>Reject</button>
                                    </div>
                                ) :
                                    <p className="leave_status d-inline-block"> {leave.status}</p>
                                }

                            </div>

                        </div>
                    </div>
                </Wrapper>
                ) : <div>Loading...</div>
            }
        </>

    );
};


const Wrapper = styled.div`
${'' /* 
.emp_image{
    height:300px;
    width:300px;
    border-radius:50%;
    
}
.emp_view{
    background:white;
    height:30rem;
    width:50rem;
} */}
/* General container styling */
/* Main container styling */
/* Main container styling */
.emp_view {
    display: flex;
    align-items: flex-start;
    background-color: #ffffff;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    padding: 20px;
    max-width: 900px;
    margin: 20px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    gap: 20px;
    font-family: "Arial", sans-serif;
}

/* Profile image styling */
.emp_image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #007bff; /* Blue border */
}

/* Detail container */
.emp_view .d-flex {
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    gap: 20px;
}

/* Individual detail block */
.emp_view p {
    font-size: 15px;
    margin: 0;
    line-height: 1.6;
    color: #4a4a4a;
}

.emp_view p span {
    font-weight: 600;
    color: #333333;
}

/* Headings for better structure */
.emp_view p:first-child {
    font-size: 18px;
    font-weight: bold;
    color: #0056b3; /* Dark blue */
}

/* Section containers for better grouping */
.detail-section {
    width: calc(50% - 10px); /* Two-column layout */
}

.detail-section p {
    margin-bottom: 8px;
}

/* Action buttons */
button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 10px;
    transition: all 0.3s ease-in-out;
}

button:hover {
    background-color: #0056b3;
}

/* Status display */
.leave_status {
    
    color: green; /* Green for approved */
}

.leave_status.rejected {
    color: #dc3545; /* Red for rejected */
}

.leave_status.pending {
    color: #ffc107; /* Yellow for pending */
}

/* Responsive styling */
@media (max-width: 768px) {
    .emp_view {
        flex-direction: column;
        align-items: center;
        padding: 15px;
    }

    .detail-section {
        width: 100%; /* Full width on small screens */
    }

    button {
        margin-bottom: 10px;
    }
}



`


export default Detail;



