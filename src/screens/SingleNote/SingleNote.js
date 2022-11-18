import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createNoteAction } from "../../actions/notesActions";
import { Button, Card, Form } from "react-bootstrap";
import {  updateNoteAction } from "../../actions/notesActions";
import axios from "axios";
import { useParams } from "react-router-dom"

const SingleNote = () =>{
    let navigate = useNavigate()
     const { id } = useParams()
     
    //////////////////
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [category,setCategory] = useState('')
    const [date,setDate] = useState('')
    /////////////////////
    const dispatch = useDispatch()
    const noteUpdate = useSelector(state=>state.noteUpdate)
    const {loading,error} =noteUpdate
    ////
    console.log(typeof(id),typeof(Number(id)))
    ///////////////////////
    useEffect(()=>{
        const fetching = async () =>{
            const {data} = await axios.get(`https://n07siw-8000.preview.csb.app/api/notes/${id}}`)
            
            setTitle(data.title)
            setContent(data.contnet)
            setCategory(data.category)
            setDate(data.updatedAt)
        }
        fetching()
    },[date,id])
    ///////////
    const updatehandler = (e) =>{
        e.preventDefault()
         dispatch(updateNoteAction(id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    navigate('/mynotes')
    }
     const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
    return(
       <MainScreen title='Edit Note'>
           <Card>
               <Card.Header>Edit tour note</Card.Header>
               <Card.Body>
                   <Form onSubmit={updatehandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='title' placeholder="Enter the Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
             {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            {/* <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button> */}

                   </Form>
               </Card.Body>
               <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
           </Card>
       </MainScreen>
    )
}
export default SingleNote;
