import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fett = async () => {
      const { data } = await axios.get(
        "https://exqe2r-8000.preview.csb.app/api/notes"
      );
      console.log(data);
      setNotes(data);
    };
    fett();
    console.log(notes, "notes");
  }, []);

  const deletehandle = (id) => {
    if (window.confirm("Are you Sure?")) {
    }
  };

  return (
    <MainScreen title={"welcome back  amirhossein"}>
      <Link to="createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {notes.map((note) => (
        <Accordion>
          <Card style={{ margin: 10, textDecoration: "none" }} key={note._id}>
            <Card.Header style={{ display: "flex" }}>
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
                <Accordion.Toggle as={Card.Text} variant="link"eventKey="0">
                  {note.title}
                </Accordion.Toggle>
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
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Catagory - {note.catagory}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    create on - Date
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};
export default MyNotes;
