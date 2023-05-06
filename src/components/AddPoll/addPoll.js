import React, { useState } from "react";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

function AddPoll(props) {
  const { show, setShow, setPollsList } = props;
  const [pollTitle, setPollTitle] = useState("");
  const [pollOptionInput, setPollOptionInput] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [optionError, setOptionError] = useState("");

  const handlePollTitle = (event) => {
    setPollTitle(event.target.value);
    setTitleError("");
  };

  const handlePollOption = (event) => {
    setPollOptionInput(event.target.value);
    setOptionError("");
  };

  const handleAddPollOption = () => {
    if (pollOptionInput.trim() !== "") {
      if (pollOptions.length >= 3) {
        setOptionError("You can only enter 3 options maximum.");
      } else {
        setPollOptions([...pollOptions, pollOptionInput]);
        setPollOptionInput("");
      }
    } else {
      setOptionError("Enter poll option");
    }
  };

  const handleAddPoll = () => {
    let error = false;
    if (pollTitle.trim() === "") {
      setTitleError("Enter poll title");
      error = true;
    }
    if (pollOptions.length < 3) {
      setOptionError("Enter at least three options");
      error = true;
    }
    if (!error) {
      const newPoll = { title: pollTitle, options: pollOptions };
      setPollsList((prevPolls) => [...prevPolls, newPoll]);
      setPollTitle("");
      setPollOptions([]);
      setShow(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          Add Poll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter poll title"
              value={pollTitle}
              onChange={handlePollTitle}
            />
          </InputGroup>
          <div className="error-message">{titleError}</div>

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter poll option"
              value={pollOptionInput}
              onChange={handlePollOption}
            />
            <Button variant="outline-secondary" onClick={handleAddPollOption}>
              <PlusCircleFill />
            </Button>
          </InputGroup>
          <div className="error-message">{optionError}</div>
          {pollOptions.map((option, index) => (
            <div key={index} className="input-list">
              {option}
            </div>
          ))}
          <div className="add-poll-container">
            <Button
              className="cursor-pointer"
              variant="primary"
              onClick={handleAddPoll}
              disabled={titleError || optionError}
            >
              Add New Poll
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddPoll;
