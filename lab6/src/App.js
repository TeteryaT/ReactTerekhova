import React, { useState, useEffect } from 'react';

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [savedColors, setSavedColors] = useState([]);

  // Predefined color palette
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'];

  useEffect(() => {
    // Load saved colors from local storage
    const storedColors = JSON.parse(localStorage.getItem('savedColors')) || [];
    setSavedColors(storedColors);
  }, []);

  useEffect(() => {
    // Save the colors to local storage whenever savedColors changes
    localStorage.setItem('savedColors', JSON.stringify(savedColors));
  }, [savedColors]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleReset = () => {
    setSelectedColor('#ffffff'); // Reset to white
  };

  const handleSaveColor = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors(prevColors => [...prevColors, selectedColor]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Color Picker</h1>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        {colors.map(color => (
          <div
            key={color}
            onClick={() => handleColorSelect(color)}
            style={{
              backgroundColor: color,
              width: '50px',
              height: '50px',
              margin: '5px',
              cursor: 'pointer',
              border: selectedColor === color ? '2px solid black' : 'none'
            }}
          />
        ))}
      </div>
      <div>
        <h2>Selected Color:</h2>
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: selectedColor,
          border: '1px solid black',
          marginBottom: '10px'
        }} />
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleSaveColor}>Save</button>
      </div>
      <h2>Saved Colors:</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {savedColors.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: '50px',
              height: '50px',
              margin: '5px',
              border: '1px solid black'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;