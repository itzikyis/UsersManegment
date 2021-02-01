import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';

class PostComp extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Card style={{ width: '17rem', margin: '5px' }} bg='Secondary'>
                <Card.Body>
                    <Card.Text>
                        <label className="input-label">Title</label><br />
                        <input type='text' className="input" value={this.props.title} />
                        <br />
                        <label className="input-label">Body</label><br />
                        <input type='text' className="input" value={this.props.body} />
                        <br />
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default PostComp;