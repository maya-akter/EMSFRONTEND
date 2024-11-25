import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
export const column=[
    {
        name:'S NO',
        selector:(row)=>row.sno,
       
    },
    {
        name:'Emp Id',
        selector:(row)=>row.employeeId,
        
    },
    {
        name:'Name',
        selector:(row)=>row.name,
        
    },
    {
        name:'Leave Type',
        selector:(row)=>row.leaveType,
       
    },
    {
        name:'Department',
        selector:(row)=>row.department,
       
    },
    {
        name:'Days',
        selector:(row)=>row.days,
       
    },
    {
        name:'Status',
        selector:(row)=>row.status,
        
    },
    {
        name:'Action',
        selector:(row)=>row.action,
        center:true,
    },
]





export const LeaveButtons=({Id})=>{
   
    
 const navigate = useNavigate();
 const handleview=(id)=>{
    navigate(`/admin-dashboard/leaves/${id}`);
 }

return(
    <button className="btn btn-success" onClick={()=>handleview(Id)}>View</button>
)



}



LeaveButtons.propTypes = {
    Id: PropTypes.node,
    
};