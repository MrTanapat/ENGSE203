import React, { useState, useCallback } from "react";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import "./App.css";

function App() {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const handleSelectRestaurant = useCallback((id) => {
    setSelectedRestaurantId(id);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedRestaurantId(null);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍜 Restaurant Review</h1>
        <p>ค้นหาและรีวิวร้านอาหารโปรดของคุณ</p>
      </header>

      <main className="app-main">
        {selectedRestaurantId ? (
          <RestaurantDetail
            restaurantId={selectedRestaurantId}
            onBack={handleBack}
          />
        ) : (
          <RestaurantList onSelectRestaurant={handleSelectRestaurant} />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Restaurant Review App | React + Express</p>
      </footer>
    </div>
  );
}

export default App;
