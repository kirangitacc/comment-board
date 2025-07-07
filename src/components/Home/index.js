import { useEffect, useState } from "react";
import Header from "../Header";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

const PAGE_SIZES = [10, 50, 100];

function getInitialFilters() {
  const saved = localStorage.getItem("filters");
  return saved
    ? JSON.parse(saved)
    : { search: "", sortBy: "name", sortOrder: "asc", page: 1, pageSize: 10 };
}

function Home() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [filters, setFilters] = useState(getInitialFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then((r) => r.json()),
      fetch("https://jsonplaceholder.typicode.com/comments").then((r) => r.json()),
    ]).then(([usersData, commentsData]) => {
      setUsers(usersData);
      setComments(commentsData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const filtered = comments.filter((c) =>
    [c.name, c.email, c.body].some((field) =>
      field.toLowerCase().includes(filters.search.toLowerCase())
    )
  );

  let sorted = [...filtered];
  if (filters.sortBy && filters.sortOrder) {
    sorted.sort((a, b) => {
      let valA = a[filters.sortBy];
      let valB = b[filters.sortBy];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return filters.sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const start = (filters.page - 1) * filters.pageSize;
  const paginated = sorted.slice(start, start + filters.pageSize);
  const totalPages = Math.ceil(sorted.length / filters.pageSize);

  function handleSort(col) {
    setFilters((prev) => {
      if (prev.sortBy !== col) return { ...prev, sortBy: col, sortOrder: "asc" };
      if (prev.sortOrder === "asc") return { ...prev, sortOrder: "desc" };
      if (prev.sortOrder === "desc") return { ...prev, sortBy: null, sortOrder: null };
      return { ...prev, sortOrder: "asc" };
    });
  }

  function getSortLabel(col) {
    if (filters.sortBy !== col) return "";
    if (filters.sortOrder === "asc") return "▲";
    if (filters.sortOrder === "desc") return "▼";
    return "";
  }

  return (
    <div>
      <Header user={users[0]} />
      <div className="home-container">
        {loading ? (
          <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ThreeDots
              height="60"
              width="60"
              radius="9"
              color="#4caf50"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : (
          <>
            <div className="filters-row">
              <div className="sort-buttons">
                <button
                  className={`sort-btn${filters.sortBy === "postId" ? " active" : ""}`}
                  onClick={() => handleSort("postId")}
                >
                  Sort Post ID {getSortLabel("postId")}
                </button>
                <button
                  className={`sort-btn${filters.sortBy === "name" ? " active" : ""}`}
                  onClick={() => handleSort("name")}
                >
                  Sort Name {getSortLabel("name")}
                </button>
                <button
                  className={`sort-btn${filters.sortBy === "email" ? " active" : ""}`}
                  onClick={() => handleSort("email")}
                >
                  Sort Email {getSortLabel("email")}
                </button>
              </div>
              <input
                className="search-input"
                placeholder="Search name, email, comment"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value, page: 1 })
                }
              />
            </div>
            
            <div className="comments-table">
              <table>
                <thead>
                  <tr>
                    <th>Post ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((c) => (
                    <tr key={c.id}>
                      <td>{c.postId}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>
                        {c.body.length > 40 ? c.body.slice(0, 40) + "..." : c.body}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {/* Pagination bar moved outside home-container */}
      {!loading && (
        <div className="pagination-bar">
          <div className="items-info">
            {start + 1}-{Math.min(start + filters.pageSize, sorted.length)} of{" "}
            {sorted.length} items
          </div>
          <div className="pagination-controls">
            <button
              className="page-arrow"
              disabled={filters.page === 1}
              onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
            >
              &lt;
            </button>
            {[...Array(totalPages).keys()].slice(
              Math.max(0, filters.page - 2),
              Math.min(totalPages, filters.page + 1)
            ).map((i) => (
              <button
                key={i + 1}
                className={`page-number${filters.page === i + 1 ? " active" : ""}`}
                onClick={() => setFilters((f) => ({ ...f, page: i + 1 }))}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-arrow"
              disabled={filters.page === totalPages}
              onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            >
              &gt;
            </button>
            <select
              className="page-size-select"
              value={filters.pageSize}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  pageSize: Number(e.target.value),
                  page: 1,
                })
              }
            >
              {PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} / Page
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;