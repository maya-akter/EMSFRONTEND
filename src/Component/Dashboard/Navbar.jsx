import styled from "styled-components";
import { useAuth } from "../../Context/authContext";


const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        // <Wrapper className="d-flex justify-content-between">
        //     <div className="d-flex ">
        //         <p className="">EMS</p>
        //         <p className="px-5">{user.name}</p>
        //     </div>
        //     <button className="btn text-danger" onClick={()=>logout()}>Logout </button>
        // </Wrapper>
        <Wrapper className="navbar-container ">
            <div className="navbar mx-5 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <p className="navbar-brand">Employee Managment System</p>
                    <p className="user-name px-4">{user.name}</p>
                </div>
                <button className="btn logout-btn " onClick={() => logout()}>
                    Logout
                </button>
            </div>
        </Wrapper>


    );
};



const Wrapper = styled.div`
background:${({ theme }) => theme.colors.white};
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
 /* Navbar Container */



/* Navbar Container */
.navbar-container {
    background-color: #ffffff; /* White background */
    border-bottom: 1px solid #e0e0e0; /* Light border for separation */
   
    font-family: "Arial", sans-serif;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

/* Navbar Layout */
.navbar {
  
   
    display: flex;
    flex-wrap: wrap; /* Allows for responsiveness */
    justify-content: space-between;
    align-items: center;
}

/* EMS Brand Styling */
.navbar-brand {
    font-size: 20px;
    font-weight: bold;
    color: #0056b3; /* Corporate blue for brand */
    margin: 0;
}

/* User Name Styling */
.user-name {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin: 0;
}

/* Logout Button */
.logout-btn {
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



/* Responsive Design */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .user-name {
        margin: 10px 0;
    }

    .logout-btn {
        width: 100%; /* Full-width logout button on mobile */
        margin-top: 10px;
    }
}


`




export default Navbar;