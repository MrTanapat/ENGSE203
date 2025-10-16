import { useState, useEffect, useCallback } from "react";
import RestaurantCard from "./RestaurantCard";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import { getRestaurants } from "../services/api";

function RestaurantList({ onSelectRestaurant }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minRating: "",
    priceRange: "",
  });

  // ใช้ useCallback ป้องกัน fetch function ใหม่ทุก render
  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getRestaurants(filters);
      setRestaurants(result.data || []);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
      console.error(err);
      setRestaurants([]); // ป้องกัน undefined
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // fetch ครั้งแรก และทุกครั้งที่ filters เปลี่ยน
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="restaurant-list-container">
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

      {loading && <div className="loading">กำลังโหลด...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          {restaurants.length === 0 ? (
            <p className="no-results">
              ไม่พบร้านอาหารที่ค้นหา ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ
            </p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={onSelectRestaurant}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantList;
