import { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const Add = () => {
    const { user, base_url } = useAuth();
    const navigate = useNavigate();
    const [leave, setLeave] = useState({
        userId: user._id,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${base_url}/api/leave/add`, leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("employee data ");

            if (response.data.success) {
                navigate(`/employee-dashboard/leaves/${user._id}`)
            }
        } catch (error) {
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <Wrapper>
            
            <div className="leave_manage">
                <form action="" onSubmit={handleSubmit}>
                    <div className="">
                        <div className="">
                            <label>Leave Type</label>
                            <select name="leaveType" onChange={handleChange} required >
                                <option value='Sick leave' >Sick leave</option>
                                <option value='Casual leave' >Casual leave</option>
                                <option value='Annual leave' >Annual leave</option>
                            </select>
                        </div>
                        <div className="leave-dates d-flex ">
                            <div>

                                <label>From Date</label>
                                <input type="date" name="startDate" onChange={handleChange} required />

                            </div>
                            <div>
                                <label>To Date</label>
                                <input type="date" name="endDate" onChange={handleChange} required />
                            </div>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea name="reason" placeholder="Reason" onChange={handleChange} required />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
margin:auto;
display:flex;
justify-content:center;

.leave_manage {
  /* Overall form styling */
  padding: 40px;
  
  border-radius: 5px;
  background-color: #f8f8f8;
}

.leave_manage h2 {
  text-align: center;
  margin-bottom: 20px;
}

.leave_manage label {
  display: block;
  font-size:18px;
  margin-bottom: 5px;
  font-weight: bold;
}

.leave_manage input, .leave_manage select, .leave_manage textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.leave-dates {
  display: flex;
  justify-content: space-between;
}

.leave-dates div {
  flex: 1;
  margin-right: 10px;
}

.leave_manage button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50; /* Green */
  color: white;
  cursor: pointer;
}


.leave_manage button{
    width:100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.login_btn_background};
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover{
               background-color:${({ theme }) => theme.colors.login_btnHover_background};
        }
}
`

export default Add;