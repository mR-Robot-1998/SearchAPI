import React from 'react'
import Card from "react-bootstrap/Card";


class Pagein extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            currentPage:1,
            PersonsPerpage:3,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    render(){
        const persons =this.props.users
        const {currentPage,PersonsPerpage} =this.state; 
         
        const indexOfLastPerson = currentPage * PersonsPerpage;

        const indexOfFirstPerson =indexOfLastPerson - PersonsPerpage;

        const currentPersons =persons.slice(indexOfFirstPerson,indexOfLastPerson) ;

        const renderPersons =currentPersons.map((person,index) =>{
            return(
                <Card key={index} id='profile' style={{ width: '24rem' }}>
                <Card.Img variant="top" src={person.profile_image}/>
                <Card.Body>
                <Card.Title>نام :  <span>{person.name}</span></Card.Title>
                <Card.Text>
                <span>نام خانوادگی : </span> {person.family}
                </Card.Text>
                <Card.Text>
                <span>سن  :{person.age}</span>
                </Card.Text>
                <Card.Text>
                <span>شغل :{person.work}</span>
                </Card.Text>
                </Card.Body>
            </Card>
            )
        })
      
    const pageNumbers=[];
    for (let i =1; i <=Math.ceil(persons.length / PersonsPerpage); i++){
        pageNumbers.push(i);
    }    
    const renderPageNumbers = pageNumbers.map(number => {
        return (
         <button
            key={number}
            id={number}
            onClick={this.handleClick}
            >
            {number}
          </button>
        );
      });
        return(
             <div>

                 <ul>
                     {renderPersons}
                 </ul>
                 <ul>
                     {renderPageNumbers}
                 </ul>
             
             </div>
         )
     }   
    }

export default Pagein