import "./adminPollList.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddPoll from "../AddPoll/addPoll";

const AdminPollList = () => {
  const [show, setShow] = useState(false);
  const [optionList, setOptionList] = useState([]);
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

export default AdminPollList;
