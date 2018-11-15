import React, {Component} from 'react';
import Note from './Note';
import Draggable from 'react-draggable';

class Board extends Component{
  constructor(props){
    super(props)
    this.state={
      notes:[]
    }

    this.eachNote = this.eachNote.bind(this);
    this.updateText = this.updateText.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextId = this.nextId.bind(this);
  }

  componentWillMount(){
    var self = this;
    if(this.props.count){
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
      .then(response => response.json())
      .then(json => json[0].split('. ').forEach(sentence => self.add(sentence.substring(0, 25))));
    }
  }

  updateText(newText, i){
    console.log('Updating item at index', i, newText);
    this.setState(prevState => ({
      notes: prevState.notes.map(
        note => (note.id !== i) ? note : {...note, note : newText}
      )
    }));
  }

  remove(id){
    console.log('Removing item at id', id);
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id )
    }));
  }

  add(text){
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }));
  }

  nextId(){
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  eachNote(note, i){
    return (
        <Note key={note.id} index={note.id} onChange={this.updateText} onRemove={this.remove} onAdd = {this.add}> {note.note} </Note>
    )
  }



  render(){
    return(
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null,'Some new Text')}>Add</button>
      </div>
    )
  }
}


export default Board;
