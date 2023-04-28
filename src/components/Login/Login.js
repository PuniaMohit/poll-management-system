import './login.css'

const LoginPage =()=> {
  return (
    <form class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" required/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required/>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;