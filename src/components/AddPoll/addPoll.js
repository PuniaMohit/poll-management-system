import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputGroup, FormControl, Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { addPoll } from "../../redux/addPoll/actions/addPoll";
import "./addPoll.css";
import { addPollOption } from "../../utils/addPollValidation";
import { addNewPoll } from "../../utils/addPollValidation";

const AddPoll = (props) => {
  const dispatch = useDispatch();
  const { show, setShow } = props;
  const [formValues, setFormValues] = useState({
    pollTitle: "",
    pollOptions: [],
  });
  const [pollOptionInput, setPollOptionInput] = useState("");
  const [formErrors, setFormErrors] = useState({
    titleError: "",
    optionError: "",
  });

  const handlePollTitle = (event) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      pollTitle: event.target.value,
    }));
    setFormErrors((prevErrors) => ({ ...prevErrors, titleError: "" }));
  };

  const handlePollOption = (event) => {
    setPollOptionInput(event.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, optionError: "" }));
  };

  const handleAddPollOption = () => {
    addPollOption(
      pollOptionInput,
      formValues,
      setFormErrors,
      setFormValues,
      setPollOptionInput
    );
  };

  const handleAddPoll = () => {
    addNewPoll(
      formValues,
      setFormErrors,
      setFormValues,
      addPoll,
      setPollOptionInput,
      setShow,
      pollOptionInput,
      dispatch
    );
  };

  const closeButton = () => {
    setFormValues({ pollTitle: "", pollOptions: [] });
    setFormErrors({ titleError: "", optionError: "" });
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
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Enter poll title"
              value={formValues.pollTitle}
              onChange={handlePollTitle}
              isInvalid={formErrors.titleError}
            />
          </InputGroup>
          <div className="error-message mb-2">{formErrors.titleError}</div>
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Enter poll option"
              value={pollOptionInput}
              onChange={handlePollOption}
              isInvalid={formErrors.optionError}
            />
            <Button variant="outline-secondary" onClick={handleAddPollOption}>
              <PlusCircleFill />
            </Button>
          </InputGroup>
          <div className="error-message mb-2">{formErrors.optionError}</div>
          {formValues.pollOptions.map((option, index) => (
            <div key={index} className="input-list bg-secondary">
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
