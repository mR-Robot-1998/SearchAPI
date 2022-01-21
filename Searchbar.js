import React from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import './Searchbar.css';
import Pagein from "../Pageintion/Pagein";

class Searchbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            persons:[],
            currentPage:1,
            personsPerPage:3
        };
    }    
        // create Search and Filter
        getShowall = (e) => {
            e.preventDefault();
            axios.get('http://karanza.ir:8080/getall').then(res => {
                const persons=res.data
                this.setState({persons})
                // console.log(res.data)
            }).catch(err => {
                // console.log(err)
            })
        }
        nameFind = (e) =>{
            let val=e.target.value;
            console.log(val)
            if (val.length > 2){
            axios.get(`http://karanza.ir:8080/search?name=${val}`,{
                headers: {
                    'Content-Type' : "text/html",
                    'charset':"utf-8"

                },
            }).then( res => {
                const persons=res.data
                this.setState({persons})
            })
        }
    }
        familyFind = (e) => {
            let val=e.target.value;
            if (val.length > 2){
                axios.get(`http://karanza.ir:8080/search?family=${val}`,{
                    headers: {
                        'Content-Type' : "text/html",
                        'charset':"utf-8"
    
                    },
                }).then( res => {
                    const persons=res.data
                    this.setState({persons})
                })        }
            }
        
        ageFind = (e) =>{
            let val=e.target.value;
                axios.get(`http://karanza.ir:8080/search?age=${val}`).then( res => {
                    const persons=res.data
                    this.setState({persons})
                })
            
            
        }
        workFind = (e) => {
            let val=e.target.value;
            if (val.length > 2){
                axios.get(`http://karanza.ir:8080/search?work=${val}`).then( res => {
                    const persons=res.data
                    this.setState({persons})
                })
        }
    } 

        render() {
        // create handle pagination
            return(
                <div id='searchbar'>
                <form>
                 <button type="submit" id="showall" onClick={(e) => this.getShowall(e)} >نمایش</button>
                 <input type="text"  id='Fname' placeholder="Search Name " onChange={(e)=> this.nameFind(e)}/>
                 <input type="text"  id='Flastname' placeholder="Search last " onChange={(e)=> this.familyFind(e)}/>
                 <input type="text"  id='Fage' placeholder="Search Age " onChange={(e)=>this.ageFind(e)}/>
                 <input type="text"  id='Fwork' placeholder="Search Work " onChange={(e)=>this.workFind(e)}/>
                </form>
                <div id='cont'>
                    <Pagein users={this.state.persons} />
                    {
                        this.state.persons.map( (users,index) => {
                            return (
                                
                                    <Card key={index} id='profile' style={{ width: '24rem' }}>
                                        <Card.Img variant="top" src={users.profile_image}/>
                                        <Card.Body>
                                        <Card.Title>نام :  <span>{users.name}</span></Card.Title>
                                        <Card.Text>
                                        <span>نام خانوادگی : </span> {users.family}
                                        </Card.Text>
                                        <Card.Text>
                                        <span>سن  :{users.age}</span>
                                        </Card.Text>
                                        <Card.Text>
                                        <span>شغل :{users.work}</span>
                                        </Card.Text>
                                        </Card.Body>
                                    </Card>
                            )
                        })
                    }
                    </div>
            </div>
        )
    }
}   
    
    export default Searchbar