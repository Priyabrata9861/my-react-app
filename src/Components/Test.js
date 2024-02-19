import React, { useState, useEffect } from 'react';

function Test() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const extractDataFromLocalStorage = () => {
            const storedData = localStorage.getItem('userDetails',userId);
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
            }
        };

        extractDataFromLocalStorage();
    }, []); // empty dependency array ensures the effect runs only once on mount

    return (
        <div>
            <h1>User Data</h1>
            {userData ? (
                <div>
                    <p>UserName: {userData.userName}</p>
                    <p>UserId: {userData.userId}</p>
                </div>
            ) : (
                <p>No user data found</p>
            )}
        </div>
    );
}

export default Test;
