import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [city, setCity] = useState("Delhi");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHospitals = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(
                    `https://hospital-backend-yeai.onrender.com/api/v1/hospitals?city=${encodeURIComponent(city)}`
                );
                const result = await response.json();
                if (result.success) {
                    setHospitals(result.hospitals);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                setError("Failed to fetch hospitals.");
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
    }, [city]);

    return (
        <div className="container">
            <h2>Hospitals in {city}</h2>

            <select className="dropdown" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Patna">Chennai</option>
            </select>

            {loading && <p>Loading hospitals...</p>}
            {error && <p className="error-text">{error}</p>}

            <ul className="hospital-list">
                {hospitals.length > 0 ? (
                    hospitals.map((hospital) => (
                        <li key={hospital._id} className="hospital-item">
                            <strong>{hospital.name}</strong> - {hospital.city} - ⭐ {hospital.rating}
                            <br />
                            <strong>Specialities:</strong> {hospital.specialities.join(", ")}
                            <br />
                            <br />
                            <Link to={`/hospitalDetails/${hospital._id}`} className="view-btn">View Details</Link>
                        </li>
                    ))
                ) : (
                    !loading && <p>No hospitals found for {city}.</p>
                )}
            </ul>
        </div>
    );
};

export default HospitalList;
