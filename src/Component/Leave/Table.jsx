import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/authContext";
import { column, LeaveButtons } from "../../utils/LeaveHelpers";
import DataTable from "react-data-table-component";
import styled from "styled-components";



const Table = () => {
    const { base_url } = useAuth();
    const [leaves, setLeaves] = useState(null);
    const [filteredLeaves, setfilteredLeaves] = useState(null);
    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${base_url}/api/leave`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response.data);

            if (response.data.success) {
                let sno = 1;
                const data = await response.data.leaves.map((leave) => (
                    {

                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeId,

                        name: leave.employeeId.userId.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days:
                            new Date(leave.endDate).getDate() -
                            new Date(leave.startDate).getDate(),
                        status: leave.status,
                        action: <LeaveButtons Id={leave._id} />


                    }
                ));
                setLeaves(data);
                setfilteredLeaves(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }
    useEffect(() => {
        fetchLeaves();

    }, [])

    const filterByInput = (e) => {
        const data = leaves.filter(leave =>
            leave.employeeId
                .toLowerCase()
                .includes(e.target.value.toLowerCase()));
        setfilteredLeaves(data);
    }

    const filterdByButton = (status) => {
        const data = leaves.filter(leave =>
            leave.status
                .toLowerCase()
                .includes(status.toLowerCase()));
        setfilteredLeaves(data);
    }


    return (
        <>
            <Wrapper className="container mt-5">
                {
                    filteredLeaves ? (<div className="mt-5">

                        <div className="d-flex justify-content-between">
                            <div>
                                <input type="text" className="" placeholder="Search by emp id" onChange={filterByInput} />
                            </div>
                            <div className="d-flex">
                                <button className="submit_btn mx-1" onClick={() => filterdByButton("Pending")}>Pending</button>
                                <button className="submit_btn mx-1" onClick={() => filterdByButton("Approved")}>Approved</button>
                                <button className="submit_btn mx-1" onClick={() => filterdByButton("Rejected")}>Rejected</button>
                            </div>
                        </div>
                        <div className="mt-5">
                            <DataTable columns={column} data={filteredLeaves} pagination />
                        </div>
                    </div>
                    ) : <div>Loading...</div>
                }
            </Wrapper>

        </>

    );
};
const Wrapper = styled.div`


.submit_btn{
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
input{
    padding:8px 5px;
}
`
export default Table;