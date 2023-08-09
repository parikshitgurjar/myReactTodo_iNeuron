import React, { useState, useEffect } from "react";
import './FormStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";

function FormC() {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [backlogItems, setBacklogItems] = useState([]);
  const [showInputCard, setShowInputCard] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleAddCard = (e) => {
    e.preventDefault();

    if (title.trim() === '' || label.trim() === '' || description.trim() === '') {
      alert('Please fill all Fields before adding a Card');
      return;
    }

    const newBacklogItem = { title, label, description };
    const updatedBacklogItems = [...backlogItems, newBacklogItem];
    setBacklogItems(updatedBacklogItems);
    localStorage.setItem('backlogItems', JSON.stringify(updatedBacklogItems));

    setTitle('');
    setLabel('');
    setDescription('');
  }

  const handleRemoveCard = (index) => {
    const updatedBacklogItems = [...backlogItems];
    updatedBacklogItems.splice(index, 1);
    setBacklogItems(updatedBacklogItems);
    localStorage.setItem('backlogItems', JSON.stringify(updatedBacklogItems));
  };

  const handleUpdateCard = (index, updatedItem) => {
    const updatedBacklogItems = [...backlogItems];
    updatedBacklogItems[index] = updatedItem;
    setBacklogItems(updatedBacklogItems);
    localStorage.setItem('backlogItems', JSON.stringify(updatedBacklogItems));
  };

  useEffect(() => {
    const storedBacklogItems = JSON.parse(localStorage.getItem('backlogItems')) || [];
    setBacklogItems(storedBacklogItems);
  }, []);

  const handleToggleInputCard = () => {
    setShowInputCard(!showInputCard);
  }

  return (
    <div className="parent_container">
      <h3>Backlog</h3>

      {showInputCard ? (
        <form>
          <div className="child_container">
            <div className="sectionA">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' />
              <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder='Label' type='text' />
            </div>

            <div className="sectionB">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="description_class"
                placeholder='Description'
                type='text'
              />
            </div>
          </div>

          <div className="button_section">
            <button onClick={handleAddCard} className="addCard_button">Add Card</button>
            <button onClick={handleToggleInputCard} className="cancel_button">Cancel</button>
          </div>
        </form>
      ) : (
        <button className="clickToAddCard" onClick={handleToggleInputCard}>Click to add Card</button>
      )}

      {backlogItems.map((item, index) => (
        <div
          key={index}
          className="child_container"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === index && (
            <FontAwesomeIcon
              onClick={() => handleRemoveCard(index)}
              icon={faClose}
              className="close_icon"
            />
          )}
          <div className="sectionA">
            <input
              value={item.title}
              placeholder="Title"
              type="text"
              onChange={(e) => {
                const updatedItem = { ...item, title: e.target.value };
                handleUpdateCard(index, updatedItem);
              }}
            />
            <input
              value={item.label}
              placeholder="Label"
              type="text"
              onChange={(e) => {
                const updatedItem = { ...item, label: e.target.value };
                handleUpdateCard(index, updatedItem);
              }}
            />
          </div>
          <div className="sectionB">
            <input
              value={item.description}
              className="description_class"
              placeholder="Description"
              type="text"
              onChange={(e) => {
                const updatedItem = { ...item, description: e.target.value };
                handleUpdateCard(index, updatedItem);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormC;