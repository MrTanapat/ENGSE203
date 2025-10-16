import { useState, useEffect, useCallback } from "react";
import RestaurantCard from "./RestaurantCard";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import { getRestaurants } from "../services/api";

// ฟังก์ชัน debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

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

  const debouncedFilters = useDebounce(filters, 300);

  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getRestaurants(debouncedFilters);
      if (result.success) {
        setRestaurants(result.data);
      } else {
        setError(result.message || "ไม่สามารถโหลดข้อมูลได้");
      }
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }, [debouncedFilters]);

  // fetch เมื่อ debouncedFilters เปลี่ยน
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
              ไม่พบร้านอาหาร ลองเปลี่ยนคำค้นหาหรือตัวกรองดูนะครับ
            </p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => onSelectRestaurant(restaurant.id)}
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
