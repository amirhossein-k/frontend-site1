import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import "./MyNotes.css";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fett = async () => {
      const { data } = await axios.get(
        "https://n07siw-8000.preview.csb.app/api/notes"
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
        <Accordion defaultActiveKey="1" flush>
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
                  <Button href={"/"}>Edit</Button>
                  <Button variant="danger" className="mx-2">
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
                      create on - Date
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
