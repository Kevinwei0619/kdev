import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Visits extends Component {
  // Setting our component's initial state
  state = {
    visits: [],
    Doctor_Speciality: "",
    Prescription: "",
    Diagnosis: "",
    Data: "",
    Time: ""
  };

  // When the component mounts, load all visits and save them to this.state.visits
  componentDidMount() {
    this.loadVisits();
  }

  // Loads all visits  and sets them to this.state.visits
  loadVisits = () => {
    API.getBooks()
      .then(res =>
        this.setState({ visits: res.data, Doctor_Speciality: "", Prescription: "", Diagnosis: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a visit from the database with a given id, then reloads visits from the db
  deleteVisit = id => {
    API.deleteVisit(id)
      .then(res => this.loadVisits())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // When the form is submitted, use the API.saveBook method to save the visit data
  // Then reload visits from the database
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.Doctor_Speciality && this.state.Prescription) {
  //     API.saveBook({
  //       Doctor_Speciality: this.state.Doctor_Speciality,
  //       Prescription: this.state.Prescription,
  //       Diagnosis: this.state.Diagnosis
  //     })
  //       .then(res => this.loadVisits())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Previous Visits</h1>
            </Jumbotron>
            {this.state.visits.length ? (
              <List>
                {this.state.visits.map(visit => {
                  return (
                    <ListItem key={visit._id}>
                      <a href={"/visits/" + visit._id}>
                        <strong>
                          {visit.Doctor_Speciality} by {visit.Prescription}
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteVisit(visit._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Visits;
