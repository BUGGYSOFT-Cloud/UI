import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./JobServices.css";

const JobServices = () => {
  const [searchType, setSearchType] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [defaultJobs, setDefaultJobs] = useState([]);
  const [error, setError] = useState(""); 

  const API_URL = process.env.REACT_APP_API_URL; // Get API URL from .env


  useEffect(() => {
    fetchDefaultJobs();
  }, []);

  const fetchDefaultJobs = async () => {
    const defaultJobIds = [1, 2, 3];
    const defaultJobData = [];

    for (const id of defaultJobIds) {
      const response = await fetch(`${API_URL}/job_info/${id}`);
      const data = await response.json();
      defaultJobData.push(data);
    }

    setJobs(defaultJobData);
    setDefaultJobs(defaultJobData);
  };

  const fetchJobs = async () => {
    let url = "";

    if (searchType === "id") {
      url = `${API_URL}/job_info/${searchQuery}`;
    } else {
      url = `${API_URL}/jobs_of_company/${searchQuery}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.detail) {
        setError(data.detail); 
        setJobs([]); 
      } else {
        setError(""); 
        setJobs(Array.isArray(data) ? data : [data]); // Ensure result is always an array
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Error fetching job information. Please try again.");
    }
  };

  const renderJobItem = (job) => (
    <div key={job.job_id} className="job-item">
      <div className="job-details">
        <h3>{job.job_name}</h3>
        <p>Company: {job.job_company}</p>
        <p>Created At: {new Date(job.job_created_at).toLocaleDateString()}</p>
      </div>
      <a href={job.job_url} target="_blank" rel="noopener noreferrer" className="job-button">
        Details
      </a>
    </div>
  );
  
  return (
    <div className="job-services">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Job Search</Link>
        </div>
        <div className="login-icon">
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <div className="search-container">
        <h2>Search for Jobs</h2>

        <div className="button-group">
          <button onClick={() => setSearchType("id")} className={searchType === "id" ? "active" : ""}>
            Search by Job ID
          </button>
          <button onClick={() => setSearchType("company")} className={searchType === "company" ? "active" : ""}>
            Search by Company
          </button>
        </div>

        <input
          type="text"
          placeholder={searchType === "id" ? "Enter Job ID" : "Enter Company Name"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button onClick={fetchJobs}>Search</button>

        {error && <p className="error-message">{error}</p>}

        <div className="job-list">
          {jobs.length > 0 ? (
            jobs.map(renderJobItem)
          ) : (
            !error && <p>No jobs found. Try a different query.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobServices;
