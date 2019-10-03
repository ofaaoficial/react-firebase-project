import React, {Component} from 'react';
import './App.css';
import Book from './components/Book/Book';
import BookForm from './components/Book/Form';
import firebase from 'firebase';
import { DB_CONFIG } from  './config/config';
import 'firebase/database';


class App extends Component {
    constructor() {
        super();
        this.state = {
            books: [
                // {
                //     id: 1,
                //     title: 'Book 1',
                //     author: 'Oscar Amado',
                // },
                // {
                //     id: 2,
                //     title: 'Book 2',
                //     author: 'Oscar Amado',
                // }
            ]
        }

        this.app = firebase.initializeApp(DB_CONFIG);
        this.db = this.app.database().ref().child('books');

        // this.componentDidMount = this.componentDidMount.bind(this);

        this.addBook = this.addBook.bind(this);
        this.removeBook = this.removeBook.bind(this);
    }

    componentDidMount() {
        let { books } = this.state;
        this.db.on('child_added', snap => {
            books.push({
                id: snap.key,
                title: snap.val().title,
                author: snap.val().author,
            })
            this.setState({
                books
            });
        });

        this.db.on('child_removed', snap => {
            books = books.filter(book => book.id !== snap.key);
            this.setState({
                books
            });
        })



    }

    addBook(book) {
        // let { books } = this.state;
        // let {title, author} = book;
        //
        // books.push({
        //     id: books.length + 1,
        //     title: title.value,
        //     author: author.value
        // });

        book.title.value && book.author.value ? this.db.push().set({title: book.title.value, author: book.author.value}) : alert('Datos vacios.');



        // this.setState({
        //     books
        // });
    }

    removeBook(id) {
        this.db.child(id).remove();
    }

    render() {
        return (
            <article className="container">
                <section>
                    <BookForm addBook={this.addBook}/>
                </section>
                <h1 className="title-salient">List of books</h1>
                <section className="books-list">
                    {
                        this.state.books.map(book => {
                            return (
                                <Book key={book.id} id={book.id} title={book.title} author={book.author} removeBook={this.removeBook}></Book>
                            )
                        })
                    }
                </section>
            </article>
        );
    }
}


export default App;
