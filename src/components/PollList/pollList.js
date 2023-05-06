import "./pollList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import AddPoll from "../AddPoll/addPoll";
import pollList from "../../redux/pollList/actions/pollList";

const PollList = () => {
  const dispatch = useDispatch();
  const pollQuestion = useSelector((state) => state.pollList.pollList);
  const [show, setShow] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const userDetailsFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(pollList(userDetailsFromLocalStorage.token));
  }, []);
  return (
    <div className="container-fluid">
      {userDetailsFromLocalStorage.user.roleId === 1 && (
        <div className="button-container">
          <Button variant="primary" onClick={() => setShow(true)}>
            Custom Width Modal
          </Button>
        </div>
      )}
      {pollQuestion.map(({ title, optionList }, index) => (
        <div>
          <div>
            Q.{index + 1} {title}
          </div>
          {optionList.map(({ optionTitle }) => (
            <Form.Check
              label={optionTitle}
              // onClick={(event) => console.log(event.target.value)} it will be used later without console, used console just to see event.target is working or not
              name="group1"
              type="radio"
              value={optionTitle}
              id={optionTitle}
            />
          ))}
        </div>
      ))}
      <AddPoll show={show} setShow={setShow} setOptionList={setOptionList} />
    </div>
  );
};

export default PollList;
