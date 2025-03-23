"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { allTours } from "@/data/toursData";
import Image from "next/image";


const categories = ["All", "International", "Domestic", "Religious", "Honeymoon", "Cruise"];

export default function ProjectPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [keyword, setKeyword] = useState("");
  const [daysRange, setDaysRange] = useState<[number, number]>([1, 15]);
  
  // Set dynamic max duration
  useEffect(() => {
    const maxDuration = Math.max(...allTours.map((tour) => tour.duration));
    setDaysRange([1, maxDuration]);
  }, []);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDaysRange((prev) => 
      name === "min" ? [parseInt(value), prev[1]] : [prev[0], parseInt(value)]
    );
  };

  const filteredTours = allTours.filter((tour) => {
    if (selectedCategory !== "All" && tour.category !== selectedCategory) return false;
    if (keyword && !tour.title.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (tour.duration < daysRange[0] || tour.duration > daysRange[1]) return false;
    return true;
  });

  return (
    <main style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Explore Our Tours</h1>

      {/* Category Filter Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "0.75rem 1.5rem",
              background: selectedCategory === category ? "#0070f3" : "#ddd",
              color: selectedCategory === category ? "#fff" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search and Duration Slider */}
      <section style={{ marginBottom: "2rem", background: "#fff", padding: "1rem", borderRadius: "8px" }}>
        <h2 style={{ marginBottom: "1rem" }}>Filters</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <label>Search:</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search tours..."
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ flex: "1 1 100%" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Duration: {daysRange[0]}N - {daysRange[1]}N
            </label>
            <div style={{ position: "relative", width: "100%", padding: "10px 0" }}>
              {/* Dual Slider */}
              <input
                type="range"
                name="min"
                min="1"
                max={daysRange[1]}
                value={daysRange[0]}
                onChange={handleRangeChange}
                style={{
                  width: "100%",
                  position: "absolute",
                  zIndex: 2,
                  background: "transparent",
                  WebkitAppearance: "none",
                }}
              />
              <input
                type="range"
                name="max"
                min="1"
                max={daysRange[1]}
                value={daysRange[1]}
                onChange={handleRangeChange}
                style={{
                  width: "100%",
                  position: "absolute",
                  zIndex: 1,
                  background: "transparent",
                  WebkitAppearance: "none",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tour Listings */}
      <section>
        {filteredTours.length === 0 ? (
          <p style={{ textAlign: "center" }}>No tours found matching the filters.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "1rem",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  src={tour.image}
                  alt={tour.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                />
                <h3 style={{ textAlign: "center" }}>{tour.title}</h3>
                <p>Duration: {tour.duration} nights</p>
                <p>Category: {tour.category}</p>
                <Link
                  href={`/tours/${tour.id}`}
                  style={{
                    marginTop: "1rem",
                    padding: "0.5rem 1rem",
                    background: "#0070f3",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontWeight: "600",
                  }}
                >
                  View More
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
