import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';

class OtherDataComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            otherData: {
                street: this.props.street,
                city: this.props.city,
                zipCode: this.props.zipCode
            }
        }
    }

    getStreet = async (e) => {
        var tempOtherData = { ...this.state.otherData }
        tempOtherData.street = e.target.value;
        await this.setState({ otherData: tempOtherData })
        this.props.callbackUserData(this.state.otherData)
    }

    getCity = async (e) => {
        var tempOtherData = { ...this.state.otherData }
        tempOtherData.city = e.target.value;
        await this.setState({ otherData: tempOtherData })
        this.props.callbackUserData(this.state.otherData)
    }

    getZipCode = async (e) => {
        var tempOtherData = { ...this.state.otherData }
        tempOtherData.zipCode = e.target.value;
        await this.setState({ otherData: tempOtherData })
        this.props.callbackUserData(this.state.otherData)
    }


    render() {
        return (
            <Card style={{ width: '20rem', margin: '5px' }} bg='Secondary'>
                <Card.Body>
                    <Card.Text>
                        <label className="input-label">Street</label><br />
                        <input type='text' className="input" value={this.props.street} onChange={this.getStreet} />
                        <br />
                        <label className="input-label">City</label><br />
                        <input type='text' className="input" value={this.props.city} onChange={this.getCity} />
                        <br />
                        <label className="input-label">Zip Code</label><br />
                        <input type='text' className="input" value={this.props.zipCode} onChange={this.getZipCode} />
                        <br />
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default OtherDataComp;