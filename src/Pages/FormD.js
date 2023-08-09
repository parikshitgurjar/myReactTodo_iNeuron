import React, { useState, useEffect } from "react";
import './FormStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";

function FormD() {
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [completedItems, setCompletedItems] = useState([]);
  const [showInputCard, setShowInputCard] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleAddCard = (e) => {
    e.preventDefault();

    if (title.trim() === '' || label.trim() === '' || description.trim() === '') {
      alert('Please fill all Fields before adding a Card');
      return;
    }

    const newCompletedItem = { title, label, description };
    const updatedCompletedItems = [...completedItems, newCompletedItem];
    setCompletedItems(updatedCompletedItems);
    localStorage.setItem('completedItems', JSON.stringify(updatedCompletedItems));

    setTitle('');
    setLabel('');
    setDescription('');
  }

  const handleRemoveCard = (index) => {
    const updatedCompletedItems = [...completedItems];
    updatedCompletedItems.splice(index, 1);
    setCompletedItems(updatedCompletedItems);
    localStorage.setItem('completedItems', JSON.stringify(updatedCompletedItems));
  };

  const handleUpdateCard = (index, updatedItem) => {
    const updatedCompletedItems = [...completedItems];
    updatedCompletedItems[index] = updatedItem;
    setCompletedItems(updatedCompletedItems);
    localStorage.setItem('completedItems', JSON.stringify(updatedCompletedItems));
  };

  useEffect(() => {
    const storedCompletedItems = JSON.parse(localStorage.getItem('completedItems')) || [];
    setCompletedItems(storedCompletedItems);
  }, []);

  const handleToggleInputCard = () => {
    setShowInputCard(!showInputCard);
  }

  return (
    <div className="parent_container">
      <h3>Completed</h3>

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

      {completedItems.map((item, index) => (
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

export default FormD;