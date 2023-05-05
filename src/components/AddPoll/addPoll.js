import React, { useState } from "react";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

function AddPoll(props) {
  const { show, setShow, setOptionsList } = props;
  const [pollOptionInput, setPollOptionInput] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  const handlePollOption = (event) => {
    setPollOptionInput(event.target.value);
    if (event.target.value.trim() === "" || pollOptions.length >= 3) {
      setAddButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
    }
  };

  const handleAddPollOption = () => {
    if (pollOptionInput.trim() !== "") {
      setPollOptions([...pollOptions, pollOptionInput]);
      setPollOptionInput("");
      setAddButtonDisabled(true);
      if (pollOptions.length >= 2) {
        setAddButtonDisabled(true)
      }
    }
  };

  const handleAddPoll = () => {
    if (pollOptions.length >= 3) {
      setOptionsList(pollOptions);
      setPollOptions([]);
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
          Custom Modal Styling
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <div className="container">
            <h1>Create a Poll</h1>
            <div className="input-container">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Enter a poll option"
                  value={pollOptionInput}
                  onChange={handlePollOption}
                />
                <Button
                  variant="outline-secondary"
                  disabled={addButtonDisabled}
                  onClick={handleAddPollOption}
                >
                  <PlusCircleFill />
                </Button>
              </InputGroup>
              {pollOptions.map((input, index) => (
                <div key={index} className="input-list">
                  {input}
                </div>
              ))}
            </div>
            <div className="add-poll-container">
              <Button
                className="cursor-pointer"
                variant="primary"
                disabled={pollOptions.length < 3}
                onClick={handleAddPoll}
              >
                Add New Poll
              </Button>
            </div>
          </div>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default AddPoll;
