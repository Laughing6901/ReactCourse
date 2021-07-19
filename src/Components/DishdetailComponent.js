import React, { Component } from 'react';
import {actions, Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Card, CardBody, CardImg, CardText,
    CardTitle, Col, Label, Modal, ModalBody, ModalHeader, Row
} from 'reactstrap';
import { Loading } from './LoadingComponent';

    class CommentForm extends Component {
        constructor(props) {
            super(props);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            this.state = {
                isModalOpen: false,
                lastname: '',
                    touched: {
                        lastname: false,
                    }
          };
        }
        validate(lastname) {
            const errors = {
                lastname: '',
            };
    
            if (this.state.touched.lastname && lastname.length < 3)
                errors.lastname = 'Last Name should be >= 3 characters';
            else if (this.state.touched.lastname && lastname.length > 10)
                errors.lastname = 'Last Name should be <= 10 characters';
            return errors;
        }

        handleLogin(event) {
            
            alert("Username: ");
            event.preventDefault();
        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            this.props.resetFeedbackForm();
        }
    
        render () {
            const errors = this.validate(this.state.lastname);
            const required = (val) => val && val.length;
            const maxLength = (len) => (val) => !(val) || (val.length <= len);
            const minLength = (len) => (val) => val && (val.length >= len); 
        return (
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>    
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                    <div class="form-group">
    <label for="exampleFormControlSelect1">Example select</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
      <option>6</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
    </select>
  </div>
                            <Row className="form-group">
                                <Label htmlFor="lastname">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <label for="exampleFormControlTextarea1">Example textarea</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="6"></textarea>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
            </Modal>
        </div>
        )
        }
    }

        function RenderDish(dish) {
            if (dish != null) {
                return (
                    <div className='col-12 m-1'>
                        <Card>
                            <CardImg width="100%" src={dish.dish.image} alt={dish.dish.name} />
                            <CardBody>
                                <CardTitle> {dish.dish.name}</CardTitle>
                                <CardText> {dish.dish.description} </CardText>
                            </CardBody>
                        </Card>
                    </div>   
                );
            }
            else {
                return (
                    <div></div>
                );
            }
        }
    
        function RenderComments({comments, addComment, dishId}) {
            if (comments == null) {
                return (<div></div>)
            }
            const commentt = comments.map(comment => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author},
                        &nbsp;
                        {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                        </p>
                    </li>
                )
            })
            return (
                <div className='col-12 m-1 col-md-9'>
                    <h4> Comments </h4>
                    <ul className='list-unstyled row'>
                        {commentt}
                        <li>
                        <CommentForm dishId={dishId} addComment={addComment} />
                        </li>
                    </ul>
    
                </div>
            )
        }

const Dishdetail= (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
     if (props.dish != null) {     
        return (
             <div className="container">
                <div className="row">
                    <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
                    </div>
                </div>
            </div>
        )}
        else {
            return (
                <div></div>
            )
        }
}

export default Dishdetail;