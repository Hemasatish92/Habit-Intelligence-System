import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    {children}

                </div>

            </div>

        </div>

    );

}