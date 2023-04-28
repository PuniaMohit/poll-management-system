import './signUp.css'

const SignUpPage=()=>{
    return(<form class="signup-form">
    <h2>Signup Form</h2>
    <div class="form-group">
      <label for="first-name">First Name</label>
      <input type="text" id="first-name" placeholder="Enter your first name" required/>
    </div>
    <div class="form-group">
      <label for="last-name">Last Name</label>
      <input type="text" id="last-name" placeholder="Enter your last name" required/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" placeholder="Enter your password" required/>
    </div>
    <div class="form-group">
      <label for="email">Email Address</label>
      <input type="email" id="email" placeholder="Enter your email address" required/>
    </div>
    <div class="form-group">
      <label for="role">Role</label>
      <select id="role">
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
    <button type="submit">Submit</button>
  </form>)
}

export default SignUpPage