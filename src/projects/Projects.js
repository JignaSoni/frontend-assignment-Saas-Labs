import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  const webApiURL =
    "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

  // Calculate the rows for the current page
  const paginatedData = projects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // Handle page change
  const handleNextPage = () => {
    if (page < Math.ceil(projects.length / rowsPerPage) - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const onRowsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  // Fetch data from the URL
  useEffect(() => {
    const fetchProjectDetailss = async () => {
      try {
        const response = await axios.get(webApiURL);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProjectDetailss();
  }, []);

  return (
    <div className="container">
      <h1>Kickstarter Projects</h1>
      <div className="controls">
        <label htmlFor="rowsPerPage">Rows per page: </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((project, index) => (
            <tr key={index}>
              <td>{page * rowsPerPage + index + 1}</td>
              <td>{project["percentage.funded"]}</td>
              <td>${project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.ceil(projects.length / rowsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(projects.length / rowsPerPage) - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Projects;
