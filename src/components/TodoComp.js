import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';


class TodoComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            completed: this.props.completed
        }
    }
    setAsComlete = () => {
        this.props.dispatch({
            type: 'COMPLETE',
            payload: {
                userId: this.props.userId,
                id: this.state.id,
                title: this.state.title,
                completed: this.state.completed
            }
        });
    }

    markComplete = async () => {
        await this.setState({ completed: true })
        this.setAsComlete();
    };

    render() {
        let button = null;
        if (!this.props.completed) {
            button = <Button className="button" variant="warning" onClick={this.markComplete}>Mark Completed</Button>
        }

        return (
            <Card style={{ width: '17rem', margin: '5px' }} bg='Secondary'>
                <Card.Body>
                    <Card.Text>
                        <label className="input-label">Title</label><br />
                        <input type='text' className="input" value={this.state.title} />
                        <br />
                        <label className="input-label">Completed</label><br />
                        <input type='text' className="input" value={this.state.completed} />
                        <br />
                        {button}
                        <br />
                    </Card.Text>
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

export default connect(mapStateToProps)(TodoComp);