import React, { useState, useEffect, useCallback } from "react";
import Contactraw from "./customization/Contact.json";
import { db } from "./firebase"; // Import Firebase db
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export function Path(props) {
    return (
        <p className="path">
            <span>
            &nbsp;  <i className="fa-solid fa-computer" style={{ 
                color: "#000"

            }}>&nbsp;</i>
            </span>
            
            <span>
                <i className="fa fa-folder-open" style={{ color: "#FFD43B" }}>&nbsp;</i>
                {props.path}
            </span>
        </p>
    );
}

export function ASCII() {
    const [dateTime, setDateTime] = useState('');
    const [weather, setWeather] = useState('');
    const [visitorName, setVisitorName] = useState("");
    const [greeting, setGreeting] = useState('Hello');

    const fetchVisitorName = useCallback(async (id) => {
        try {
            const q = query(collection(db, "users"), where("id", "==", parseInt(id)));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setVisitorName(userData.name);
            } else {
                setVisitorName("");
            }
        } catch (error) {
            console.error("Error fetching visitor name: ", error);
            setVisitorName("");
        }
    }, []);

    const initializeAndFetchVisitor = useCallback(async () => {
        let visitorId = localStorage.getItem("visitorId");
        if (!visitorId) {
            try {
                const usersCollection = collection(db, "users");
                const usersSnapshot = await getDocs(usersCollection);

                visitorId = (usersSnapshot.size + 1).toString();
                localStorage.setItem("visitorId", visitorId);

                await addDoc(usersCollection, { id: parseInt(visitorId), name: "Guest" });
            } catch (error) {
                console.error("Error initializing visitor ID:", error);
            }
        }
        await fetchVisitorName(visitorId);
    }, [fetchVisitorName]);

    const showDateTime = useCallback(() => {
        const now = new Date();
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
        const date = now.getDate().toString().padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(now);
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        const formattedDateTime = `${day}, ${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        setDateTime(formattedDateTime);
    }, []);

    const determineGreeting = useCallback(() => {
        const now = new Date();
        const hour = now.getHours();

        if (hour >= 5 && hour < 12) {
            setGreeting("Good Morning");
        } else if (hour >= 12 && hour < 17) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    }, []);

    const fetchWeather = useCallback(async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const apiKey = '7027c5f26a5a134057ef5e54c96686ca';
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    const iconCode = data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

                    const weatherData = `| Weather: ${data.weather[0].description}`;
                    const tempData = `| Temp: ${data.main.temp}°C `;
                    const locationData = ` | Location: ${data.name}, ${data.sys.country}`;

                    setWeather(
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span>{locationData}</span>
                            <span>{weatherData} </span>
                            <img 
                                src={iconUrl} 
                                alt={data.weather[0].description} 
                                style={{ width: '30px', height: '30px', marginRight: '5px' }} 
                            />
                            <span>{tempData}</span>
                        </div>
                    );

                } catch (error) {
                    setWeather('Unable to fetch weather data');
                }
            }, () => {
                // setWeather('Unable to get location');
            });
        } else {
            setWeather('Geolocation is not supported by this browser');
        }
    }, []);

    // First useEffect for visitor initialization
    useEffect(() => {
        initializeAndFetchVisitor();
    }, [initializeAndFetchVisitor]);

    // Second useEffect for intervals
    useEffect(() => {
        showDateTime();
        determineGreeting();
        fetchWeather();

        const timeIntervalId = setInterval(showDateTime, 1000);
        const weatherIntervalId = setInterval(fetchWeather, 60000);

        return () => {
            clearInterval(timeIntervalId);
            clearInterval(weatherIntervalId);
        };
    }, [showDateTime, determineGreeting, fetchWeather]);

    return (
        <div className="ascii-container">
            <div className="ascii-content">
                <div className="visitor-name">
                    <p>{greeting}, {visitorName}!</p>
                </div>
                <div className="time-weather-container">
                    <p className="time-weather">
                        {dateTime}{weather}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Code(props) {
    return (
        <p id="code">
            &nbsp;&gt; {props.command} <br />
        </p>
    );
}

export function Contact() {
    return (
        <div className="contact-footer">
            <div className="contact-content">
                <div className="contact-info">
                    <p>
                        <a href={`mailto:${Contactraw.email}`} target="_blank" rel="noreferrer" className="contact-link">
                            <i className="fa-solid fa-envelope"></i> Email: <span>{Contactraw.email}</span>
                        </a>
                    </p>
                    <p>
                        <a href={`https://wa.me/${Contactraw.phone}`} target="_blank" rel="noreferrer" className="contact-link">
                            <i className="fa-brands fa-whatsapp"></i> WhatsApp: <span>{Contactraw.phone}</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
