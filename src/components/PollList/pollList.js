import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { PencilSquare } from "react-bootstrap-icons";
import AddPoll from "../AddPoll/addPoll";
import pollList from "../../redux/pollList/actions/pollList";
import voteCount from "../../redux/voteCount/actions/votecount";
import deletePoll from "../../redux/delete/actions/delete";
import UpdatePollTitle from "../UpdatePollTitle/updatePollTitle";
import { removeUserData } from "../../redux/login/actions/login";

const PollList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pollIDs, setPollIDs] = useState([]);
  const pollQuestion = useSelector((state) => state.pollList.pollList);
  const pollCreated = useSelector((state) => state.addPoll.pollAdded);
  const [show, setShow] = useState(false);
  const [showUpdatePollModal, setShowUpdatePollMOdal] = useState(false);
  const userDetailsFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setPollIDs(JSON.parse(localStorage.getItem("pollIDs")) ?? []);
    dispatch(pollList());
  }, []);

  const handleOptionClick = (pollID) => {
    if (!pollIDs.includes(pollID)) {
      setPollIDs((prevPollIDs) => [...prevPollIDs, pollID]);
      localStorage.setItem("pollIDs", JSON.stringify([...pollIDs, pollID]));
    }
  };

  return (
    <div className="container">
      <div className="button-container">
        {userDetailsFromLocalStorage.user.roleId === 1 && (
          <Button
            variant="primary"
            className="add-poll-button mt-3 rounded-pill btn-lg"
            onClick={() => setShow(true)}
          >
            Add Poll
          </Button>
        )}
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/", { replace: true });
            dispatch(removeUserData());
          }}
          variant="primary"
          className="logout-button mt-3 rounded-pill btn-lg"
        >
          Logout
        </Button>
      </div>

      {pollQuestion.map(({ title, optionList, id }, index) => (
        <div key={id}>
          <div className="title">
            <div className="poll-title">{title}</div>
            {userDetailsFromLocalStorage.user.roleId === 1 && (
              <div className="edit-buttons">
                <Button
                  className="btn-sm btn-light"
                  onClick={() => dispatch(deletePoll(id))}
                >
                  <Trash />
                </Button>
                <Button
                  className="btn-sm btn-light edit-button-pencil-square"
                  onClick={() => setShowUpdatePollMOdal(true)}
                >
                  <PencilSquare />
                </Button>
              </div>
            )}
          </div>
          <UpdatePollTitle
            show={showUpdatePollModal}
            setShow={setShowUpdatePollMOdal}
            id={id}
          />
          {optionList.map((element) => {
            const isChecked = pollIDs.includes(element.pollId);
            const isDisabled =
              pollIDs.includes(element.pollId) && element.pollId !== isChecked;
            return (
              <div className="radio-container">
                <Form.Check
                  key={element.id}
                  label={element.optionTitle}
                  disabled={isDisabled}
                  defaultChecked={isChecked}
                  onClick={() => {
                    handleOptionClick(element.pollId);
                    dispatch(voteCount({ optionId: element.id }));
                  }}
                  name={`group-${index}`}
                  type="radio"
                  value={element.optionTitle}
                  className="radio"
                />
                {userDetailsFromLocalStorage.user.roleId === 1 && (
                  <PencilSquare className="edit-button-radio" />
                )}
              </div>
            );
          })}
        </div>
      ))}
      <AddPoll show={show} setShow={setShow} />
    </div>
  );
};

export default PollList;
