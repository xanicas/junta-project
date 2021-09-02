import React from 'react';
import axios from 'axios';

class Landing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            osName: ""
        }
    }

    componentDidMount(){
        axios.get("/api/users", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if(response.data.success) {
                console.log(response.data);
            }
        })        
    }
	

    render() {
        return(
            <div>
                <h1>Landing</h1>
            </div>
        );
    }

}

export default Landing;