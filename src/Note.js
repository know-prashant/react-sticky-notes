import React, {Component} from 'react';
import Draggable from 'react-draggable';

class Note extends Component{
  constructor(props){
    super(props);

    this.state = {
      editing: false,
      data: ''
    }

    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.save = this.save.bind(this);
    this.randomBetween = this.randomBetween.bind(this);
  }

  componentWillMount(){
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 200, 'px'),
      top: this.randomBetween(0, window.innerHeight - 200, 'px'),
      //transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
    }
  }

  componentDidUpdate(){
    var textArea;
    if(this.state.editing){
      textArea = this._newText;
      textArea.focus();
      //textArea.select();
    }
  }

  shouldComponentUpdate(nextProps, nextState){
      return(
        this.props.children !== nextProps.children || this.state !== nextState
      )
  }

  edit(){
    this.setState({
      editing: true
    });
  }

  save(e){
    e.preventDefault();
    this.props.onChange(this._newText.value, this.props.index);
    this.setState({
      editing: false
    })
  }

  remove(){
    this.props.onRemove(this.props.index);
  }

  randomBetween(x, y, s){
    return x + Math.ceil(Math.random() * (y-x)) + s;
  }
  renderForm(){
    return (
      <Draggable
        handle=".handle"
        bounds="parent"
      >
      <div className="note" style={this.style}>
       <span className="handle">drag</span>
        <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input} defaultValue={this.props.children}/>
          <button id="save">save</button>
        </form>
      </div>
      </Draggable>
    )
  }

  renderDisplay(){
    return(
      <Draggable
       bounds="parent"
       handle=".handle"
      >
      <div className="note" style={this.style}>
       <span className="handle">drag</span>
        <p>{this.props.children}</p>
        <span>
          <button id="edit" onClick={this.edit}>edit</button>
          <button id="remove" onClick={this.remove}>delete</button>
        </span>

      </div>
      </Draggable>
    )
  }

  render(){
    if(this.state.editing){
      return this.renderForm();
    }else{
      return this.renderDisplay();
    }
  }
}

export default Note;
