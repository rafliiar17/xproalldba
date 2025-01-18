import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaCloudSun } from 'react-icons/fa'; // Import icons
import "./styles/main-first.css"; // External CSS for component
import "./styles/main.css"; // Additional CSS
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure Firebase is configured correctly

const LoadingPage = ({ onSubmit }) => {
    const [name, setName] = useState(''); // State for storing user input
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error message state
    const [visitorId, setVisitorId] = useState(null); // Visitor ID
    const [visitorName, setVisitorName] = useState(null); // Visitor name

    // Get the domain dynamically
    const domain = window.location.hostname;

    // Get greeting based on the time of day
    const currentHour = new Date().getHours();
    let greetingText = '';
    let greetingIcon = null;

    if (currentHour >= 5 && currentHour < 12) {
        greetingText = 'Good Morning';
        greetingIcon = <FaSun />;
    } else if (currentHour >= 12 && currentHour < 17) {
        greetingText = 'Good Afternoon';
        greetingIcon = <FaCloudSun />;
    } else {
        greetingText = 'Good Evening';
        greetingIcon = <FaMoon />;
    }

    useEffect(() => {
        // Fetch visitor ID from localStorage
        const storedVisitorId = localStorage.getItem("visitorId");
        if (storedVisitorId) {
            setVisitorId(storedVisitorId);
            fetchVisitorName(storedVisitorId); // Fetch visitor name
        }
    }, []);

    const fetchVisitorName = async (id) => {
        try {
            const q = query(collection(db, "users"), where("id", "==", parseInt(id))); // Query by ID
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setVisitorName(userData.name); // Set visitor name
            } else {
                setVisitorName("Guest"); // Default if no match
            }
        } catch (error) {
            console.error("Error fetching visitor name: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate input
        if (name.trim() === "") {
            setError("Please enter your name.");
            return;
        }
        setError(""); // Clear previous errors
        setLoading(true); // Set loading state
    
        try {
            const os = window.navigator.platform;
            const browser = window.navigator.userAgent;
    
            const ip = await fetch('https://api.ipify.org?format=json')
                .then((response) => response.json())
                .then((data) => data.ip)
                .catch(() => "Unknown IP");
    
            // Get current date in Jakarta timezone
            const jakartaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
            const formattedTime = new Date(jakartaTime).toLocaleString("en-US", {
                weekday: "long", // Day of the week
                year: "numeric", // Full year
                month: "short",  // Abbreviated month
                day: "2-digit",  // Two-digit day
                hour: "2-digit", // Two-digit hour
                minute: "2-digit", // Two-digit minute
                second: "2-digit", // Two-digit second
                hour12: false,   // 24-hour time format
            });
    
            let currentVisitorId = localStorage.getItem("visitorId");
            if (!currentVisitorId) {
                const snapshot = await getDocs(collection(db, "users"));
                currentVisitorId = snapshot.size + 1;
                localStorage.setItem("visitorId", currentVisitorId);
            }
    
            setVisitorId(currentVisitorId);
    
            const domain = window.location.hostname;
            const isLocalhost = domain === 'localhost' || domain === '127.0.0.1';
    
            const userData = {
                id: parseInt(currentVisitorId),
                name,
                os,
                browser,
                ip,
                domain,
                isLocalhost,
                FirstAccess: formattedTime, // Use the formatted time
                LastAccess: formattedTime, // Use the formatted time
            };
    
            await addDoc(collection(db, "users"), userData);
    
            setVisitorName(name);
            onSubmit(name);
        } catch (error) {
            console.error("Error adding document: ", error);
            setError("An error occurred while saving your data. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleBackToProfiles = async () => {
        try {
            // Get current date in Jakarta timezone
            const jakartaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
            const formattedLastAccessTime = new Date(jakartaTime).toLocaleString("en-US", {
                weekday: "long", // Day of the week
                year: "numeric", // Full year
                month: "short",  // Abbreviated month
                day: "2-digit",  // Two-digit day
                hour: "2-digit", // Two-digit hour
                minute: "2-digit", // Two-digit minute
                second: "2-digit", // Two-digit second
                hour12: false,   // 24-hour time format
            });
    
            const visitorDoc = query(
                collection(db, "users"),
                where("id", "==", parseInt(visitorId))
            );
            const snapshot = await getDocs(visitorDoc);
    
            if (!snapshot.empty) {
                const docId = snapshot.docs[0].id; // Get the document ID
                const userRef = doc(db, "users", docId);
    
                // Update the LastAccess field with formatted time
                await updateDoc(userRef, { LastAccess: formattedLastAccessTime });
            }
        } catch (error) {
            console.error("Error updating LastAccess: ", error);
        }
    
        // Notify parent
        onSubmit(visitorName);
    };
    

    return (
        <div className="wrapper-first">
            <div className="container-first">
                {loading ? (
                    <div className="loader-first">
                        <div className="spinner"></div> {/* Basic spinner */}
                        <p>Loading...</p>
                    </div>
                ) : (
                    <>
                        <h1 className="greeting-text">
                            {greetingIcon} {greetingText}!
                        </h1>
                        <h2 className="welcome-text">Nice to meet you in {domain}</h2>
                        {visitorName ? (
                            <>
                                <h3 className="visitor-text">
                                    Welcome back, {visitorName}!
                                </h3>
                                <br />
                                <button
                                    className="button-first"
                                    onClick={handleBackToProfiles}
                                >
                                    Back to Profiles
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="prompt-text">Please enter your name:</h3>
                                <form onSubmit={handleSubmit} className="form">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="input-first"
                                    />
                                    <button type="submit" className="button-first">
                                        Submit
                                    </button>
                                </form>
                            </>
                        )}
                        {error && <p className="error-text">{error}</p>} {/* Display error message */}
                    </>
                )}
            </div>
        </div>
    );
};

export default LoadingPage;
