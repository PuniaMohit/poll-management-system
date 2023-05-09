import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { addPoll } from "../../redux/addPoll/actions/addPoll";
import pollList from "../../redux/pollList/actions/pollList";

const AddPoll = (props) => {
  const dispatch = useDispatch();
  const { show, setShow } = props;
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
        setPollOptions([...pollOptions, { optionTitle: pollOptionInput }]);
        setPollOptionInput("");
      }
    } else {
      setOptionError("Enter poll option");
    }
  };

  const handleAddPoll = () => {
    const titleRegex = /^.{8,}$/;
    if (pollTitle.trim() === "") {
      setTitleError("Enter poll title");
    } else if (!titleRegex.test(pollTitle.trim())) {
      setTitleError("Title should be of minimum 8 characters");
    }
    if (pollOptionInput === "") {
      setOptionError("Enter option");
    } else if (pollOptions.length < 3) {
      setOptionError("Enter at least three options");
    }
    if (pollOptions.length === 3) {
      const newPoll = { title: pollTitle, options: pollOptions };
      dispatch(addPoll(newPoll));
      setPollTitle("");
      setPollOptions([]);
      setTitleError("");
      setOptionError("");
      setPollOptionInput("");
      setShow(false);
    }
  };

  const closeButton = () => {
    setPollTitle("");
    setPollOptions([]);
    setTitleError("");
    setOptionError("");
    setPollOptionInput("");
  };

  

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton onClick={closeButton}>
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
          <div className="error-message mb-2">{titleError}</div>
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
          <div className="error-message mb-2">{optionError}</div>
          {pollOptions.map((option, index) => (
            <div key={index} className="input-list">
              {option.optionTitle}
            </div>
          ))}
          <div className="add-poll-container">
            <Button
              className="cursor-pointer"
              variant="primary"
              onClick={handleAddPoll}
            >
              Add New Poll
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddPoll;
