import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/UserDataComp.css'
import { connect } from 'react-redux';
import OtherDataComp from './OtherDataComp'

class UserDataComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showOtherData: false,
            showUserData: false,
            user: [],
            street: '',
            city: '',
            zipCode: ''
        }
    }

    hideOtherData = () => {
        this.setState({ showOtherData: false });
    }

    overOtherDate = () => {
        this.setState({ showOtherData: true });
    }

    updateUser = () => {
        this.props.dispatch({
            type: 'UPDATE',
            payload: { ...this.state.user }
        });
    }

    deleteUser = () => {
        this.props.dispatch({
            type: 'DELETE',
            payload: this.props.id
        });
    }

    getName = (e) => {

        // 1. Make a shallow copy of the items
        let items = this.props.data.users;
        // 2. Make a shallow copy of the item you want to mutate
        let user = Object.values(items).filter(x => x.id == this.props.id);
        // 3. Replace the property you're intested in
        user[0].name = e.target.value;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        //items[1] = user;
        // 5. Set the state to our new copy
        this.setState({ user });
    }

    getEmail = (e) => {
        // 1. Make a shallow copy of the items
        let items = this.props.data.users;
        // 2. Make a shallow copy of the item you want to mutate
        let user = Object.values(items).filter(x => x.id == this.props.id);
        // 3. Replace the property you're intested in
        user[0].email = e.target.value;
        // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        //items[1] = user;
        // 5. Set the state to our new copy
        this.setState({ user });
    }

    callback = (e) => {
        this.props.callbackParent(e);
    }

    async otherDataChanged(data) {
        await this.setState({
            street: data.street,
            city: data.city,
            zipCode: data.zipCode
        })

         // 1. Make a shallow copy of the items
         let items = this.props.data.users;
         // 2. Make a shallow copy of the item you want to mutate
         let user = Object.values(items).filter(x => x.id == this.props.id);
         // 3. Replace the property you're intested in
         user[0].address.street = this.state.street;
         user[0].address.city =this.state.city;
         user[0].address.zipcode =this.state.zipCode;
         // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
         //items[1] = user;
         // 5. Set the state to our new copy
         this.setState({ user });
    }

    render() {

        const datas = this.props.data;
        let item = [{ id: 0, name: "", email: "" }];
        let status = { status: false }
        if (datas != null) {
            let users = datas.users;
            item = Object.values(users).filter(x => x.id == this.props.id);
        }
        if (datas != null && datas.todos != null) {
            status = Object.values(datas.todos).filter(x => x.userId == item[0].id).some(y => y.completed == false)
        }
        let styles = status ? 'danger' : 'success';
        let backColor = (this.props.idClicked === item[0].id) ? 'secondary' : 'light';
        let otherData;
        if (this.state.showOtherData) {
            //console.log(this.props);
            otherData = <OtherDataComp callbackUserData={(data) => this.otherDataChanged(data)} city={item[0].address.city} street={item[0].address.street} zipCode={item[0].address.zipcode} />
        }
        return (
            <Card style={{ width: '25rem', margin: '5px' }} bg={backColor} border={styles} >
                <Card.Body>
                    <Card.Header onClick={() => this.props.callbackParent(item[0].id)}>
                        ID: {item[0].id}
                    </Card.Header>
                    <Card.Text>
                        <label className="input-label">Name</label><br />
                        <input type='text' className="input" defaultValue={item[0].name} onChange={this.getName} />
                        <br />
                        <label className="input-label">Email</label><br />
                        <input type='text' className="input" value={item[0].email} onChange={this.getEmail} />
                        <br />
                    </Card.Text>
                    <br />
                    <Button className="button" variant="primary" onClick={this.hideOtherData} onMouseOver={this.overOtherDate}>Other Data</Button>
                    <Button className="button" variant="success" onClick={this.updateUser}>Update</Button>
                    <Button className="button" variant="danger" onClick={this.deleteUser}>Delete</Button>
                    <br />
                    {otherData}
                    <br />
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

export default connect(mapStateToProps)(UserDataComp);