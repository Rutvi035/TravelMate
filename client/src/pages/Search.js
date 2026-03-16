import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allDestinations, setAllDestinations] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load ALL destinations when page first opens
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/search?query=");
        setAllDestinations(res.data);
        setResults(res.data);
        setSearched(true);
      } catch (error) {
        console.error("Failed to load destinations");
      }
    };
    fetchAll();
  }, []);

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?query=${query}`,
      );
      setResults(res.data);
      setSearched(true);
    } catch (error) {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle clicking a popular tag
  const handleQuickSearch = async (name) => {
    setQuery(name);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/search?query=${name}`,
      );
      setResults(res.data);
      setSearched(true);
    } catch (error) {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const emojis = {
    Paris: "🗼",
    Tokyo: "⛩️",
    Bali: "🌴",
    "New York": "🗽",
    Dubai: "🏙️",
    Rome: "🏛️",
    Santorini: "🌅",
    Maldives: "🏝️",
    Barcelona: "🎨",
    Sydney: "🦘",
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>🔍 Search Destinations</h2>
        <p>
          Explore {allDestinations.length} destinations from our curated list
        </p>
      </div>

      {/* Search Bar */}
      <div className="card fade-in">
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search destinations... try Paris, Japan, or Bali"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ whiteSpace: "nowrap" }}
            >
              {loading ? "⏳ Searching..." : "🔍 Search"}
            </button>
          </div>

          {/* Popular tags — all destination names from DB */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "13px", color: "#8a8a8a" }}>Popular:</span>
            {allDestinations.map((dest) => (
              <span
                key={dest._id}
                onClick={() => handleQuickSearch(dest.name)}
                style={{
                  fontSize: "13px",
                  background: query === dest.name ? "#e8b84b" : "#f0ece4",
                  color: query === dest.name ? "#0a1628" : "#333",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontWeight: query === dest.name ? "600" : "400",
                }}
                onMouseOver={(e) => {
                  if (query !== dest.name)
                    e.target.style.background = "#e8b84b";
                }}
                onMouseOut={(e) => {
                  if (query !== dest.name)
                    e.target.style.background = "#f0ece4";
                }}
              >
                {emojis[dest.name] || "🌍"} {dest.name}
              </span>
            ))}
          </div>
        </form>
      </div>

      {/* Results */}
      {searched && (
        <div className="fade-in">
          <div className="page-header" style={{ marginTop: "10px" }}>
            <h2>
              {results.length > 0
                ? `${results.length} Destination${results.length > 1 ? "s" : ""} Found`
                : "No Results"}
            </h2>
          </div>

          {results.length === 0 ? (
            <div
              className="card"
              style={{ textAlign: "center", padding: "60px" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗺️</div>
              <h3 style={{ marginBottom: "8px" }}>No destinations found</h3>
              <p style={{ color: "#8a8a8a" }}>
                Try clicking one of the popular destinations above
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  setQuery("");
                  setResults(allDestinations);
                }}
              >
                Show All Destinations
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {results.map((dest, i) => (
                <div
                  className="dest-card fade-in"
                  key={dest._id}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="dest-card-header">
                    <div style={{ fontSize: "44px", marginBottom: "12px" }}>
                      {emojis[dest.name] || "🌍"}
                    </div>
                    <h3>{dest.name}</h3>
                    <p>{dest.country}</p>
                  </div>
                  <div style={{ padding: "20px 24px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#8a8a8a",
                        marginBottom: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      {dest.description}
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%", justifyContent: "center" }}
                      onClick={() => navigate(`/packages/${dest._id}`)}
                    >
                      View Packages →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
