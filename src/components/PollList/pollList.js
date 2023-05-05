import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import AddPoll from "../AddPoll/addPoll";
import pollList from "../../redux/pollList/actions/pollList";

const PollList = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [optionList, setOptionList] = useState([]);
  useEffect(() => {
    dispatch(pollList());
  }, []);
  return (
    <div className="container-fluid">
      <div className="button-container">
        <Button variant="primary" onClick={() => setShow(true)}>
          Custom Width Modal
        </Button>

        <AddPoll show={show} setShow={setShow} setOptionList={setOptionList} />
      </div>
    </div>
  );
};

export default PollList;
