import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddTodo from './components/add-todo';
import TodosList from './components/todos-list';
import Login from './components/login';
import Signup from './components/signup';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Navbar';

import TodoDataService from './services/todos';

import './App.css';
import { useForm } from 'react-hook-form';
import { Button } from "@mui/material";

function App() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [error, setError] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    criteriaMode: 'all',
  });

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


      <div class="px-4 py-3 my-2 text-center">
            <img class="d-block mx-auto mb-4" src="{% static 'images/azure-icon.svg' %}" alt="Azure Logo" width="192" height="192"/>
            <h1 class="display-6 fw-bold text-primary">Welcome to Azure Sequence</h1>            
          </div>

          <>
          <Button>text</Button>
          <Button variant="contained">contained</Button>
          <Button variant="outlined">outlined</Button>
        </>



      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" {...register('email', { required: true })} />
          {errors.email && <div>入力が必須の項目です</div>}
        </div>
        <div>



        </div>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center my-2">
        <button type="submit" class="btn btn-primary btn-lg px-4 gap-3">Submit</button>
        </div>
      </form>


      
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
