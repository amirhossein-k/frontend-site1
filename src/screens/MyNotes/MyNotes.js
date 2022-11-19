import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import "./MyNotes.css";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteNoteAction } from "../../actions/notesActions";
import axios from "axios";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, notes } = noteList;
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = noteDelete;

  const deletehandle = (id) => {
    if (window.confirm("Are you Sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);
  return (
    <MainScreen title={`welcome back  ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes &&
        notes
          .reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion defaultActiveKey="1" flush key={note._id}>
              <Card style={{ margin: 10, textDecoration: "none" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      {note.title}
                    </span>
                    <div>
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deletehandle(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge className="btn-red">
                          Catagory - {note.category}
                        </Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          create on -{" "}
                          <cite title="Sorce Title">
                            {note.createdAt.substring(0, 10)}
                          </cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
};
export default MyNotes;
