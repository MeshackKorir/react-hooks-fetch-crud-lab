import React, { useState, useEffect } from 'react';

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [deleteId, setDeleteId] = useState([]);

  const handleDeleteClick = () => {
    setDeleteId(id);
  };

  useEffect(() => {
    if (deleteId) {
      fetch(`http://localhost:4000/questions/${deleteId}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            window.location.reload();
          } else {
            throw new Error('Failed to delete question');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [deleteId, id]);

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
