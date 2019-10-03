import React, {Component} from 'react';

class BookForm extends Component{

    constructor(){
        super();
        this.addBook = this.addBook.bind(this);
        this.book = {
            title: undefined,
            author: undefined
        }
    }

    addBook(){
        this.props.addBook(this.book);
        this.book.title.value = '';
        this.book.author.value = '';
        this.book.title.focus();
    }


    render(){
        return(
            <section className="form">
                <h1>Create a new book</h1>
                <article className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control" type="text" id="title" ref={input => this.book.title = input }/>
                </article>
                <article className="form-group">
                    <label htmlFor="author">Author</label>
                    <input className="form-control" type="text" id="author" ref={input => this.book.author = input}/>
                </article>
                <article className="form-group">
                    <input className="btn btn-outline-green" type="submit" value="Register" onClick={this.addBook}/>
                </article>
            </section>
        )
    }

}

export default BookForm;