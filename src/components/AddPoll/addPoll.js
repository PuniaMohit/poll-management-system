import React, { useState } from "react";
import { InputGroup, FormControl, Button, ListGroup, Modal } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import { PlusCircleFill } from "react-bootstrap-icons";

function AddPoll(props) {
  const{show,setShow,setOptionsList}=props
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [plusSignDisabled, setPlusSignDisabled] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value.trim() === "" || inputList.length >= 3) {
      setAddButtonDisabled(true);
      setPlusSignDisabled(true);
    } else {
      setAddButtonDisabled(false);
      setPlusSignDisabled(false);
    }
  };

  const handleAddInput = () => {
    if (inputValue.trim() !== "") {
      setInputList([...inputList, inputValue]);
      setInputValue("");
      setAddButtonDisabled(true);
      if (inputList.length >= 2) {
        setPlusSignDisabled(true);
      }
    }
  };

  const handleAddPoll = () => {
    if (inputList.length >= 3) {
      setOptionsList(inputList)
      setInputList([]);
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
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            variant="outline-secondary"
            disabled={addButtonDisabled}
            onClick={handleAddInput}
          >
            <PlusCircleFill />
          </Button>
        </InputGroup>
        {inputList.map((input, index) => (
          <div key={index} className="input-list">
            {input}
          </div>
        ))}
      </div>
      <div className="add-poll-container">
        <Button
          variant="primary"
          disabled={inputList.length < 3}
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