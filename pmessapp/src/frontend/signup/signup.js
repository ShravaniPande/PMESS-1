import React, { Component } from 'react';
import axios from 'axios';
import backend_url from '../../url/backend_url';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            user_id: '',
            password: '',
            phone: '',
            email_id: '',
            role: ''

        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClick = () => {
        const { firstName, lastName, user_id, password, phone, email_id, role} = this.state;
        axios.post(backend_url + '/user', { firstName, lastName, user_id, password, phone, email_id, role })
            .then(result => {
                if (result.data.success && result.status == 200) {
                    alert('User successfully created');
                } else {
                    alert('User could not be created successfully');
                }
            })
    }

    render() {
        return (
            <div style={{ marginLeft: "500px", width: "1300px", paddingTop: "80px"}}>
                <div class="col-xs-3" style={{ border: "1px solid black", padding: "20px" }}>
                    <h2>Add User</h2>
                    <br />
                    <form>
                        <div class="form-group">
                            <label for="firstName">First Name: </label>
                            <input type="text" class="form-control" id="firstName" name="firstName" placeholder="Enter First Name" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="lastName">Last Name: </label>
                            <input type="lastName" class="form-control" id="lastName" name="lastName" placeholder="Enter Last Name" onChange={this.onChange} />
                        </div>
                        <div class="form-group">
                            <label for="user_id">User Id</label>
                            <input type="text" class="form-control" id="user_id" name="user_id" placeholder="Enter User ID" onChange={this.onChange} />
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password" placeholder="Password" onChange={this.onChange} />
                        </div>
                        <div class="form-check">
                            <label for="phone">Phone Number: </label>
                            <input type="text" class="form-control" id="phone" name="phone" placeholder="Phone Number" onChange={this.onChange} />
                        </div>
                        <div class="form-group">
                            <label for="email">Email ID: </label>
                            <input type="text" class="form-control" id="email_id" name="email_id" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.onChange} />
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="role" id="role" value="A" onChange={this.onChange} />
                            <label class="form-check-label" for="typeAdmin">
                                Administrator
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="role" id="role" value="M" onChange={this.onChange} />
                            <label class="form-check-label" for="typeMechanic">
                                Mechanic
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={this.onClick}>Create User</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;