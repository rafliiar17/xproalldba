import React, { useState, useEffect } from "react";
import './styles/main.css';

function Menu() {
    const currentDomain = window.location.hostname; // Get the current domain dynamically
    const batteryStates = [
        "fa-battery-empty",
        "fa-battery-quarter",
        "fa-battery-half",
        "fa-battery-three-quarters",
        "fa-battery-full",
    ];
    const [batteryIndex, setBatteryIndex] = useState(0);

    // Cycle through battery states every second
    useEffect(() => {
        const batteryInterval = setInterval(() => {
            setBatteryIndex((prevIndex) => (prevIndex + 1) % batteryStates.length);
        }, 1000);

        return () => clearInterval(batteryInterval); // Clean up interval on unmount
    }, [batteryStates.length]);


    // Determine color based on battery state
    const getBatteryColor = () => {
        switch (batteryIndex) {
            case 0:
                return "#d9534f"; // Red for empty
            case 1:
                return "#f0ad4e"; // Orange for quarter
            case 2:
                return "#ffd700"; // Yellow for half
            case 3:
                return "#5bc0de"; // Light blue for three-quarters
            case 4:
                return "#5cb85c"; // Green for full
            default:
                return "#0061a2"; // Default color
        }
    };

    return (
        <div className="menu">
            {/* Buttons Section */}
            <div className="buttons-flex">
                <div className="button bg-red" title="Close"></div>
                <div className="button bg-yellow" title="Minimize"></div>
                <div className="button bg-green" title="Maximize"></div>
            </div>

            {/* Title Section */}
            <div className="title">
                <h1>
                    <span className="site-name">
                        <i
                            className={`fa-solid fa-xl ${batteryStates[batteryIndex]}`}
                            aria-hidden="true"
                            title="Battery Status"
                            style={{ color: getBatteryColor() }}
                        ></i>
                        &nbsp;root@{currentDomain}
                    </span>
                </h1>
            </div>

            {/* Additional Buttons */}
            <div className="buttons-flex2">
                <i
                    className="fa-solid fa-compact-disc"
                    aria-hidden="true"
                    title="Settings"
                ></i>
            </div>
        </div>
    );
}

export default Menu;
