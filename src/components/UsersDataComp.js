import React, { Component } from 'react'
import UserDataComp from './UserDataComp'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Utils from '../utils/AppUtils';
import { connect } from 'react-redux';
import PostsComp from './PostsComp'
import TodosComp from './TodosComp'

class UsersDataComp extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            todos: [],
            posts: [],
            idClicked: ''
        }
    }
    setToStore = () => {
        this.props.dispatch({
            type: 'ADD',
            payload: { ...this.state.users }
        });
    }

    setTodosToStore = () => {
        this.props.dispatch({
            type: 'ADD-TODOS',
            payload: { ...this.state.todos }
        });
    }

    setPostsToStore = () => {
        this.props.dispatch({
            type: 'ADD-POSTS',
            payload: { ...this.state.posts }
        });
    }

    getData = async () => {
        const usersData = await Utils.getAllUsersData();
        await this.setState({ users: usersData.data })

        this.setToStore();

        const todos = await Utils.getAllUsersTodos();
        await this.setState({ todos: todos.data })

        this.setTodosToStore();

        const posts = await Utils.getAllUsersPosts();
        await this.setState({ posts: posts.data })

        this.setPostsToStore();
    }

    componentDidMount() {
        this.getData();
    }

    async clickedInChild(id) {
        await this.setState({ idClicked: id })
    }

    render() {
        const datas = this.props.data;
        let users = null;
        let userTodos = null;
        let userPosts = null;
        if (datas != null) {
            let usersData = Object.values(datas.users)
            users = usersData.map((item, index) => {
                if (datas == null || datas.nameToSearch == null || datas.nameToSearch === "" || (
                    datas.nameToSearch !== "" &&
                    (item.name.toLowerCase().includes(datas.nameToSearch.toString().toLowerCase()) ||
                        item.email.toLowerCase().includes(datas.nameToSearch.toString().toLowerCase())))) {
                    return <UserDataComp callbackParent={(data) => this.clickedInChild(data)} key={item.id} id={item.id} idClicked={this.state.idClicked} />
                }
            })
            if (this.state.idClicked !== "") {
                userTodos = <TodosComp idClicked={this.state.idClicked} />
                userPosts = <PostsComp idClicked={this.state.idClicked} />
            }
        }


        return (
            <Container>
                <Row>
                    <Col style={{ paddingRight: 0 }}>{users}</Col>
                    <Col style={{ paddingRight: 0 }}>{userTodos}</Col>
                    <Col style={{ paddingRight: 0 }}>{userPosts}</Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

export default connect(mapStateToProps)(UsersDataComp);