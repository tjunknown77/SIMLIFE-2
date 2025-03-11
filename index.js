import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Game() {
  const [sims, setSims] = useState([]);
  const [selectedSim, setSelectedSim] = useState(null);
  const [map, setMap] = useState('City');
  const [scenario, setScenario] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (sims.length === 0) {
      generateNewSim();
    }
  }, []);

  const generateNewSim = () => {
    const newSim = {
      id: sims.length + 1,
      name: `Sim ${sims.length + 1}`,
      health: Math.floor(Math.random() * 100),
      energy: Math.floor(Math.random() * 100),
      gold: 50,
      image: image || 'https://via.placeholder.com/100'
    };
    setSims([...sims, newSim]);
  };

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerRandomScenario = () => {
    const scenarios = [
      'You found a hidden treasure! +20 gold',
      'You got lost in the forest and lost energy.',
      'A stranger gave you a health potion! +15 health',
      'You tripped and lost some gold! -10 gold'
    ];
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setScenario(randomScenario);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>SimLife Game</h1>
      <label>Select a Map:</label>
      <select onChange={(e) => setMap(e.target.value)} style={{ marginLeft: '10px' }}>
        <option value="City">City</option>
        <option value="Wilderness">Wilderness</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        <button onClick={generateNewSim}>Add New Sim</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {sims.map((sim) => (
          <motion.div key={sim.id} style={{ padding: '10px', border: '1px solid black', margin: '10px' }} whileHover={{ scale: 1.05 }}>
            <img src={sim.image} alt="Sim" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            <h2>{sim.name}</h2>
            <p>Health: {sim.health}</p>
            <p>Energy: {sim.energy}</p>
            <p>Gold: {sim.gold}</p>
            <button onClick={() => setSelectedSim(sim)}>Select</button>
          </motion.div>
        ))}
      </div>

      {selectedSim && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid black' }}>
          <h2>{selectedSim.name}'s Profile</h2>
          <input type="file" accept="image/*" onChange={uploadImage} />
          <button onClick={triggerRandomScenario} style={{ marginTop: '10px' }}>Trigger Random Event</button>
          <p style={{ marginTop: '10px' }}>{scenario}</p>
        </div>
      )}
    </div>
  );
}