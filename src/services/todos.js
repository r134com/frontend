import axios from 'axios';

class TodoDataService{

  getAll(token){      
    axios.defaults.headers.common["Authorization"] = "Token " + token;      
    return axios.get('https://lalgebra.azurewebsites.net/api/todos/');
  }   

  createTodo(data, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.post("https://lalgebra.azurewebsites.net/api/todos/", data);
  }
   
  updateTodo(id, data, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`https://lalgebra.azurewebsites.net/api/todos/${id}`, data);
  }

  deleteTodo(id, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.delete(`https://lalgebra.azurewebsites.net/api/todos/${id}`);
  }   

  completeTodo(id, token){
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    return axios.put(`https://lalgebra.azurewebsites.net/api/todos/${id}/complete`);    
  }   

  login(data){
    return axios.post("https://lalgebra.azurewebsites.net/api/login/", data);
  }   

  signup(data){
    return axios.post("https://lalgebra.azurewebsites.net/api/signup/", data);
  }      
}

export default new TodoDataService();