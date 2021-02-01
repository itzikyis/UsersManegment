import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TodoComp from './TodoComp'
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap'

class TodosComp extends Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            todo: {
                userId: '',
                title: '',
                completed: false
            }
        }
    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    getTitle = async (e) => {
        var tempTodo = { ...this.state.todo }
        tempTodo.userId = this.props.idClicked;
        tempTodo.title = e.target.value;
        await this.setState({ todo: tempTodo })
    }

    addTodo = () => {
        this.props.dispatch({
            type: 'ADD-TODO',
            payload: { ...this.state.todo }
        });
        this.setState({ showHide: !this.state.showHide })
    }

    render() {
        const datas = this.props.data;
        let userTodos = null;
        let userTodosData = Object.values(datas.todos)
        let userTodosByID = userTodosData.filter((item) => item.userId == this.props.idClicked);

        userTodos = userTodosByID.map((item, index) => {
            return <TodoComp key={item.id} id={item.id} title={item.title} completed={item.completed} userId={item.userId} />
        })

        return (
            <Card style={{ width: '20rem', margin: '5px' }} bg='Secondary'>
                <Card.Body>
                    <Card.Header style={{ "background-color": 'gray', width: 'auto' }}>
                        Todos - User {this.props.idClicked}
                        <Button className="button" variant="warning" style={{ marginRight: "auto" }} onClick={() => this.handleModalShowHide()}>Add</Button>
                    </Card.Header>
                    <Card.Text>
                        {userTodos}
                    </Card.Text>

                    <Modal show={this.state.showHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                            <Modal.Title>Add New Todo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="input-label">Title</label><br />
                            <input type='text' className="input" onChange={this.getTitle} />
                            <br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleModalShowHide()}>Cancel</Button>
                            <Button variant="primary" onClick={() => this.addTodo()}>Add</Button>
                        </Modal.Footer>
                    </Modal>

                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}


export default connect(mapStateToProps)(TodosComp);