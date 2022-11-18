import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createNoteAction } from "../../actions/notesActions";
import { Button, Card, Form } from "react-bootstrap";
import axios from "axios";

const SingleNote = () =>{
    let navigate = useNavigate()
    //////////////////
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [category,setCategory] = useState('')
    const [data,setData] = useState('')
    /////////////////////
    const dispatch = useDispatch()
    const noteUpdate = useSelector(state=>state.noteUpdate)
    const {loading,error} =noteUpdate
    ///////////////////////
    const updatehandler = (e) =>{
        e.preventDefault()
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

                   </Form>
               </Card.Body>
           </Card>
       </MainScreen>
    )
}
export default SingleNote;
