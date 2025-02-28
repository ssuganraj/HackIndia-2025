import { useNavigate } from 'react-router-dom';

function PaymentGatewayPage() {
    const navigate = useNavigate();

    const techStack = [
        "React.js - Frontend Framework",
        "Node.js - Backend Runtime",
        "Express.js - Backend Framework",
        "MongoDB / PostgreSQL - Database",
        "Stripe / Razorpay / PayPal - Payment API",
        "JWT / OAuth - Authentication",
        "Axios / Fetch API - HTTP Requests",
        "Webhooks - Event Handling",
        "Tailwind CSS - Styling",
        "Redux / Context API - State Management"
    ];

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-50 items-center justify-center p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack for Payment Gateway</h1>
            <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                {techStack.map((tech, index) => (
                    <li key={index} className="text-gray-700 text-lg py-2 border-b last:border-none">
                        {tech}
                    </li>
                ))}
            </ul>
            <button 
                onClick={() => navigate('/')} 
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg transition duration-300 ease-in-out shadow-md"
            >
                Home
            </button>
        </div>
    );
}

export default PaymentGatewayPage;
