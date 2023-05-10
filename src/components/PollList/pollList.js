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

const PollList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pollIDs, setPollIDs] = useState([]);
  const [answeredPollIDs, setAnsweredPollIDs] = useState([]);
  const pollQuestion = useSelector((state) => state.pollList.pollList);
  const pollCreated = useSelector((state) => state.addPoll.pollAdded);
  const [show, setShow] = useState(false);
  const [showUpdatePollModal, setShowUpdatePollMOdal] = useState(false);
  const userDetailsFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(pollList());
  }, [dispatch]);

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("answeredPollIDs"));
    if (storedAnswers) {
      setAnsweredPollIDs(storedAnswers);
    }
  }, []);

  useEffect(() => {
    const storedPollIDs = JSON.parse(localStorage.getItem("pollIDs"));
    if (storedPollIDs) {
      setPollIDs(storedPollIDs);
    }
  }, []);

  const handleOptionClick = (pollID) => {
    if (!answeredPollIDs.includes(pollID)) {
      const updatedAnsweredPollIDs = [...answeredPollIDs, pollID];
      setAnsweredPollIDs(updatedAnsweredPollIDs);
      localStorage.setItem(
        "answeredPollIDs",
        JSON.stringify(updatedAnsweredPollIDs)
      );
    }

    if (!pollIDs.includes(pollID)) {
      const updatedPollIDs = [...pollIDs, pollID];
      setPollIDs(updatedPollIDs);
      localStorage.setItem("pollIDs", JSON.stringify(updatedPollIDs));
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      {userDetailsFromLocalStorage.user.roleId === 1 && (
        <div className="button-container">
            <Button
              variant="primary"
              className="add-poll-button mt-3 rounded-pill btn-lg"
              onClick={() => setShow(true)}
            >
              Add Poll
            </Button>
          <Button variant="primary" className="logout-button mt-3 rounded-pill btn-lg" onClick={logOut}>
            Logout
          </Button>
        </div>
      )}
      {pollQuestion.map(({ title, optionList, id }, index) => (
        <div key={id}>
          <div className="title">
           <div className="poll-title">{title}</div>
           <Button className="btn-sm btn-light" onClick={()=>dispatch(deletePoll(id))}><Trash/></Button>
           <Button className="btn-sm btn-light edit-button" onClick={()=>setShowUpdatePollMOdal(true)}><PencilSquare/></Button>
           </div>
           <UpdatePollTitle show={showUpdatePollModal} setShow={setShowUpdatePollMOdal} id={id}/>
          {optionList.map((element) => {
            const isChecked = answeredPollIDs.includes(element.pollId);
            const isDisabled =
              pollIDs.includes(element.pollId) && element.pollId !== isChecked;
            return (<div className="radio-container">
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
                <PencilSquare className="edit-button-radio"/>
              </div> );
          })}
        </div>
      ))}
      <AddPoll show={show} setShow={setShow} />
    </div>
  );
};

export default PollList;
