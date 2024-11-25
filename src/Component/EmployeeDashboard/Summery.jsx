
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../Context/authContext";
import styled from "styled-components";


const Summery = () => {
    const { user } = useAuth();
    return (
        <Wrapper>
            <div className="user-info d-flex mx-4 align-items-center">
                <div className="icon-container me-3">
                    <FaUser className="user-icon" />
                </div>
                <div className="text-container">
                    <p className="welcome-text mb-1">Welcome Back</p>
                    <p className="user-name fw-bold mb-0">{user.name}</p>
                </div>
            </div>

        </Wrapper>

    );
};

const Wrapper = styled.div`
/* Container Styling */
.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Icon Styling */
.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0; /* Light grey background for icon */
    border-radius: 50%; /* Circular shape */
    width: 40px;
    height: 40px;
}

.user-icon {
    font-size: 20px; /* Adjust icon size */
    color: #0056b3; /* Corporate blue */
}

/* Text Styling */
.text-container {
    display: flex;
    flex-direction: column;
}

.welcome-text {
    font-size: 14px;
    color: #6c757d; /* Subtle grey color */
    margin: 0;
}

.user-name {
    font-size: 16px;
    color: #333; /* Darker text color */
    font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
    .user-info {
        justify-content: center;
        text-align: center;
    }

    .icon-container {
        width: 50px;
        height: 50px;
    }

    .user-icon {
        font-size: 24px;
    }

    .welcome-text {
        font-size: 12px;
    }

    .user-name {
        font-size: 14px;
    }
}

`



export default Summery;

