import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  return (
    <MainScreen title={"Create a Note"}>
      <Card></Card>
    </MainScreen>
  );
};

export default CreateNote;
