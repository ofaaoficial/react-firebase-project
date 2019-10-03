import React,{Component} from 'react'

class Book extends Component{

    handleRemove(id){
        if(window.confirm("Seguro que quieres eliminarlo?")) this.props.removeBook(id);
    }

    render(){
        return(
            <section className="panel">
                <span className="close" onClick={()=> this.handleRemove(this.props.id)}>&times;</span>
                <h2>{this.props.title}</h2>
                <p>{this.props.author}</p>
            </section>
        )
    }
}

export default Book;