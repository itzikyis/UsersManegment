import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostComp from './PostComp'
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

class PostsComp extends Component {

    constructor() {
        super();
        this.state = {
            showHide: false,
            post: {
                userId: '',
                title: '',
                body: ''
            }
        }

    }
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }

    getTitle = async (e) => {
        var tempPost = { ...this.state.post }
        tempPost.userId = this.props.idClicked;
        tempPost.title = e.target.value;
        await this.setState({ post: tempPost })
    }

    getBody = async (e) => {
        var tempPost = { ...this.state.post }
        tempPost.userId = this.props.idClicked;
        tempPost.body = e.target.value;
        await this.setState({ post: tempPost })
    }

    addPost = () => {
        this.props.dispatch({
            type: 'ADD-POST',
            payload: { ...this.state.post }
        });
        this.setState({ showHide: !this.state.showHide })
    }


    render() {
        const datas = this.props.data;
        let userPosts = null;
        let userPostsData = Object.values(datas.posts)
        let userPostsByID = userPostsData.filter((item) => item.userId == this.props.idClicked);

        userPosts = userPostsByID.map((item, index) => {
            return <PostComp key={item.id} id={item.id} title={item.title} body={item.body} />
        })
        return (
            <Card style={{ width: '20rem', margin: '5px' }} bg='Secondary'>
                <Card.Body>
                    <Card.Header style={{ "background-color": 'gray', width: 'auto' }}>
                        Posts - User {this.props.idClicked}
                        <Button className="button" variant="warning" style={{ marginRight: "auto" }} onClick={() => this.handleModalShowHide()}>Add</Button>
                    </Card.Header>
                    <Card.Text>
                        {userPosts}
                    </Card.Text>

                    <Modal show={this.state.showHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                            <Modal.Title>Add New Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label className="input-label">Title</label><br />
                            <input type='text' className="input" onChange={this.getTitle} />
                            <br />
                            <label className="input-label">Body</label><br />
                            <input type='text' className="input" onChange={this.getBody} />
                            <br />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleModalShowHide()}>Cancel</Button>
                            <Button variant="primary" onClick={() => this.addPost()}>Add</Button>
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


export default connect(mapStateToProps)(PostsComp);