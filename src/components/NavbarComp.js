import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap'

class NavbarComp extends Component {

    constructor() {
        super();
        this.state = {
            nameToSearch: '',
            showHide: false,
            user: {
                name: '',
                email: '',
                address: {
                    city: '',
                    street: '',
                    zipcode: ''
                }
            }
        }
    }

    setToStore = (e) => {
        this.props.dispatch({
            type: 'ADD-SEARCH',
            payload: { nameToSearch: e.target.value }
        });
    }

    searchName = (e) => {
        this.setState({ nameToSearch: e.target.value });
        this.setToStore(e);
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    getName = async (e) => {
        var tempUser = { ...this.state.user }
        tempUser.name = e.target.value;
        await this.setState({ user: tempUser })
    }

    getEmail = async (e) => {
        var tempUser = { ...this.state.user }
        tempUser.email = e.target.value;
        await this.setState({ user: tempUser })
    }
    addUser = () => {
        this.props.dispatch({
            type: 'ADD-USER',
            payload: { ...this.state.user }
        });
        this.setState({ showHide: !this.state.showHide })
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">USER MANEGMENT</Navbar.Brand>
                <Form inline>
                    <FormControl type="text" defaultValue="" onChange={this.searchName} placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" onClick={() => this.handleModalShowHide()}>Add User</Button>
                </Form>

                <Modal show={this.state.showHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                        <Modal.Title>Add New User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="input-label">Name</label><br />
                        <input type='text' className="input" onChange={this.getName} />
                        <br />
                        <label className="input-label">Email</label><br />
                        <input type='text' className="input" onChange={this.getEmail} />
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleModalShowHide()}>Cancel</Button>
                        <Button variant="primary" onClick={() => this.addUser()}>Add</Button>
                    </Modal.Footer>
                </Modal>

            </Navbar>
        )
    }
}

export default connect()(NavbarComp);