import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WelcomeModal from "../components/WelcomeModal";
import OnboardingChecklist from "../components/OnboardingChecklist";

export default function MainLayout({ children }) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("show_welcome") === "1") {
            setShowWelcome(true);
        }
    }, []);

    function dismissWelcome() {
        localStorage.removeItem("show_welcome");
        setShowWelcome(false);
    }

    return (
        <div className="flex bg-ink-50 min-h-screen">

            {showWelcome && <WelcomeModal onClose={dismissWelcome} />}
            <OnboardingChecklist />

            <div className="hidden md:block">
                <Sidebar />
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="relative z-50 w-64 h-full">
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-4 right-[-44px] p-2 rounded-lg bg-ink-900 text-white"
                        >
                            <X size={18} />
                        </button>
                        <Sidebar />
                    </div>
                </div>
            )}

            <div className="flex-1 min-w-0">
                <Navbar onMenuClick={() => setMobileOpen(true)} />
                <div className="p-5 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </div>

        </div>
    );
}
