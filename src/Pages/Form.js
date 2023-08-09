import React, { useState, useEffect } from "react";
import './FormStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from "@fortawesome/free-solid-svg-icons";

function Form() {
  // Step 1: Define state variables for input fields and Todo items.
  const [title, setTitle] = useState('');
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [todoItems, setTodoItems] = useState([]);
  const [showInputCard, setShowInputCard] = useState(false); // New state variable for visibility of the input card.
  const [hoveredIndex, setHoveredIndex] = useState(null); // to show "faClose" icon only on hover

  // Step 2: Handle submission of the form
  const handleAddCard = (e) => {
    e.preventDefault();

    // Step 3: Check if all input fields are filled before adding a card
    if (title.trim() === '' || label.trim() === '' || description.trim() === '') {
      alert('Please fill all fields before adding a card');
      return;
    }

    // Step 4: Create a new Todo Item and add it to the existing todoItems Array
    const newTodoItem = { title, label, description };
    const updatedTodoItems = [...todoItems, newTodoItem];
    setTodoItems(updatedTodoItems);
    // Store the updated todoItems array in local storage
    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));

    // Step 5: Clear the input fields
    setTitle('');
    setLabel('');
    setDescription('');
  }

  // Handle removal of a card
  const handleRemoveCard = (index) => {
    const updatedTodoItems = [...todoItems];
    updatedTodoItems.splice(index, 1);
    setTodoItems(updatedTodoItems);
    // Update local storage after removing the card
    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));
  };

  // Toggle visibility of input card
  const handleToggleInputCard = () => {
    setShowInputCard(!showInputCard);
  }

  // Handle updating a card
  const handleUpdateCard = (index, updatedItem) => {
    const updatedTodoItems = [...todoItems];
    updatedTodoItems[index] = updatedItem;
    setTodoItems(updatedTodoItems);
    // Update local storage after editing a card
    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems));
  };

  // Load todoItems from local storage when component mounts
  useEffect(() => {
    const storedTodoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    setTodoItems(storedTodoItems);
  }, []);

  return (
    <div className="parent_container">
      <h3>Todo</h3>

      {/* Show input form when showInputCard is true */}
      {showInputCard ? (
        <form>
          {/* Input Fields */}
          <div className="child_container">
            <div className="sectionA">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                type='text'
              />
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder='Label'
                type='text'
              />
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

          {/* Buttons */}
          <div className="button_section">
            <button onClick={handleAddCard} className="addCard_button">Add Card</button>
            <button onClick={handleToggleInputCard} className="cancel_button">Cancel</button>
          </div>
        </form>
      ) : (
        // Show "Click to add Card" button when showInputCard is false
        <button className="clickToAddCard" onClick={handleToggleInputCard}>Click to add Card</button>
      )}

      {/* Display existing cards */}
      {todoItems.map((item, index) => (
        <div
          key={index}
          className="child_container"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Show close icon only when hovered over the card */}
          {hoveredIndex === index && (
            <FontAwesomeIcon
              onClick={() => handleRemoveCard(index)}
              icon={faClose}
              className="close_icon"
            />
          )}
          <div className="sectionA">
            {/* Edit input fields for title and label */}
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
            {/* Edit input field for description */}
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
  )
}

export default Form;