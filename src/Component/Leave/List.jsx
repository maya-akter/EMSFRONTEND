import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { Table } from "react-bootstrap";
import styled from "styled-components";


const List = () => {

    const { user, base_url } = useAuth();
    const [leaves, setLeaves] = useState([]);
    let sno = 1;
    const { id } = useParams();


    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${base_url}/api/leave/${id}/${user.role}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setLeaves(response.data.leaves);

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.message);
            }
        }
    }


    useEffect(() => {
        fetchLeaves();
    }, []);

if(!leaves){
    return <div>Loading...</div>
}


    return (
        <Wrapper className="container mt-5">
            <div>
                {/* <h3 className="text-center">Manage Leave</h3> */}
            </div>
            <div className="d-flex justify-content-between mt-5 mb-5">
                <input type="text" className="px-3" placeholder="Search by dep name" />
                {
                    user.role === "employee" && (
                        <NavLink to='/employee-dashboard/add-leave' className='d-flex justify-content-center submit_btn fs-5'>Add New Leave</NavLink>
                    )
                }

            </div>
            <div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>SNo</th>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Description</th>

                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.map((leave) => (
                            <tr key={leave._id}>
                                <td>{sno++}</td>
                                <td>{leave?.leaveType}</td>

                                <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                                <td>{new Date(leave.endDate).toLocaleDateString()}</td>



                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
input{
    border:0.2px solid gray;
    padding:
}
.submit_btn{
        width: 20%;
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
`


export default List;
