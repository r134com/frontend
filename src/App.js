import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from './components/add-todo.js';
import TodosList from './components/todos-list.js';
import Login from './components/login.js';
import Signup from './components/signup.js';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';

import TodoDataService from './services/todos.js';

import './App.css';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";
import styled from "@emotion/styled";

import { useState, useRef } from 'react'
import { useAsyncCallback } from 'react-async-hook'
import Box from '@mui/material/Box'
import CircularIntegration from './components/circular-integration.js';

import Children from "./children/Children.js";


function App() {

  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');
  const [fasta, setFasta] = React.useState('');
  const TextButton = styled(Button)`
  text-transform: none;
`;
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    criteriaMode: 'all',
  });

  const initialState = {
    file: null,
  }

  const onSubmit = (data) => console.log(data);


  async function login(user = null){ // default user to null
    TodoDataService.login(user)
      .then(response =>{        
        setToken(response.data.token);     
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
        setError('');
      })
      .catch( e =>{
        console.log('login', e);
        setError(e.toString());       
      });
  }

  async function logout(){
    setToken('');
    setUser('');
    localStorage.setItem('token', '');
    localStorage.setItem('user', ''); 
  }

  async function signup(user = null){ // default user to null
    TodoDataService.signup(user)
      .then(response =>{
        setToken(response.data.token);
        setUser(user.username);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', user.username);
      })
      .catch( e =>{
        console.log(e);
        setError(e.toString());
      })
  }
  
  const inputRef = useRef(null)
  const [formState, setFormState] = useState(initialState)
  const [success, setSuccess] = useState(false)

  const uploadFile = async(file) => {
    if (!file) return

    const fr = new FileReader();

    fr.onload = e => {
      if (e && e.target) {
        const content = e.target.result;

        if (content) {
          //this.props.onOpen(content);
          //setFasta("hahaha");
          setFasta(content);
        } else {
          console.error("Unable to read content");
        }
      } else {
        console.error(
          "No event/target supplied for onload callback to readAsText"
        );
      }
    };
    fr.readAsText(file);


    /* アップロード処理に見立てた時間のかかる処理 */
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    await sleep(5000)

    /* アップロード処理が成功したらフォームの状態を
       初期化してsuccessステートをtrueにする */
    setFormState(initialState)
    setSuccess(true)
  }

  const onFileInputChange = async (event) => {
    const file = event.target.files[0]
    await uploadFile(file)
  }

  const clickFileUploadButton = () => {
    setSuccess(false)
    inputRef.current.click()
  }

  const asyncEvent = useAsyncCallback(onFileInputChange);


  return (

    <div className="App">

      <Navbar bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand>TodosApp</Navbar.Brand>
          <Nav className="me-auto">
            <Container>
              <Link className="nav-link" to={"/todos"}>Todos</Link>
              { user ? (
                <Link className="nav-link" onClick={logout}>Logout ({user})</Link>
              ) : (
                <>
                  <Link className="nav-link" to={"/login"}>Login</Link>
                  <Link className="nav-link" to={"/signup"}>Sign Up</Link>
                </>
              )}
            </Container>
          </Nav>
        </div>
      </Navbar>

      <div className="App">
        {/* ここを追加 */}
        <Children>ここはChildrenです</Children>
        <Children text="これはpropsのtextです" />
      </div>


      <div class="px-4 py-3 my-2 text-center">
            <h1 class="display-6 fw-bold text-primary"> Beyond the Dream </h1>            
          </div>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center my-2">
        <Box>
          <CircularIntegration
            onClick={clickFileUploadButton}
            asyncEvent={asyncEvent}
            success={success}
            component="label"
            text={asyncEvent.loading ? '...' : "Upload File"}
          />
          <input
            hidden
            ref={inputRef}
            type="file"
            onChange={asyncEvent.execute}
          />
        </Box>
      </div>
      <div>
        <p>
          {fasta}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center my-2">
          <label class="display-7 fw-bold text-success" htmlFor="email">Email</label>
          <input id="email" {...register('email', { required: true })} />
          {errors.email && <div>入力が必須の項目です</div>}
        </div>
        <>
        </>
        <div>
        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center my-2">
        <button type="submit" class="btn btn-primary btn-lg px-4 gap-3">Submit</button>
        </div>
      </form>

      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center my-2">
        <label class="display-7 fw-bold text-info">Text</label>
        <Button variant="contained">contained</Button>
        <Button variant="outlined">outlined</Button>
      </div>
      
      <div className="container mt-4">
        <Switch>	
          <Route exact path={["/", "/todos"]} render={(props) =>
            <TodosList {...props} token={token} />
          }>
          </Route>
          <Route path="/todos/create" render={(props)=> 
            <AddTodo {...props} token={token} />
          }>
          </Route>
          <Route path="/todos/:id/" render={(props)=> 
            <AddTodo {...props} token={token} />
          }>
          </Route>
          <Route path="/login" render={(props)=> 
            <Login {...props} login={login} />
          }>
          </Route>
          <Route path="/signup" render={(props)=> 
            <Signup {...props} signup={signup} />
          }>
          </Route>
        </Switch>
      </div>
      
      <footer className="text-center text-lg-start 
        bg-light text-muted mt-4">
        <div className="text-center p-4">
          © Copyright - <a 
            target="_blank" 
            className="text-reset fw-bold text-decoration-none" 
            href="https://twitter.com/greglim81"
          >
            Greg Lim
          </a> - <a 
            target="_blank" 
            className="text-reset fw-bold text-decoration-none" 
            href="https://twitter.com/danielgarax"
          >
            Daniel Correa
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
