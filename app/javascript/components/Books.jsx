import React, { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const cardImage = {
      width: "100%",
      height: "35vw",
      objectFit: "cover"
  }

  const cardHeight = {
    height: "98%"
  }
 

  useEffect(() => {
    const url = "/api/v1/books/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
          
        }
        throw new Error("Error in network.");
      })
      .then((res) => {
        res.map((book, idx) => {
          let total = 0;
          let count = book["reviews"].length
          
          book["reviews"].map(rev => {
            total += rev["score"]
          })

          if (count == 0) {
            res[idx]["avgRating"] = 0
          } else {
            res[idx]["avgRating"] = total/count
          }
        })
        setBooks(res)
      })
      // .then((res) =>  setBooks(res))
      .catch(() => navigate("/"));
  }, []);

  const onChange = ((event, setFunction) => {
    // console.log(event.target.value)
    const url = `/api/v1/search?q=${event.target.value}`;
    console.log(url)

    fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log(res)
          return res.json();
          
        }
        throw new Error("Error in network.");
      })
      .then((res) => {
        console.log(res)
        
        const test = res.map((book, idx) => {
          let total = 0;
          let count = book["reviews"].length
          
          book["reviews"].map(rev => {
            total += rev["score"]
          })

          if (count == 0) {
            res[idx]["avgRating"] = 0
          } else {
            res[idx]["avgRating"] = total/count
          }
        })
        setFunction(res)
      })


  });
  

  const RatingLabel1 = {
    width: "40px",
    height: "40px",
    marginTop: "auto",
    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "76%",
    transition: ".3s"
  };
  const RatingLabel2 = {
    width: "40px",
    height: "40px",
    marginTop: "auto",
    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23fcd93a' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "76%",
    transition: ".3s"
  };


  const ratingView = (props) => [1,2,3,4,5].map((val, index) => {
    let rating = Math.round(props)
    if (val >  rating){
      return (
          <Fragment key={index}>
            {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
            <label className="card-body" style={RatingLabel1}></label>
          </Fragment>
      )
    }
    else{
      return (
        <Fragment key={index}>
          {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
          <label className="card-body" style={RatingLabel2}></label>
        </Fragment>
      )
    }
  });

  const allBooks = books.map((book, index) => (
    <div key={index} className="col-lg-4">
      <div className="card mb-4" style={cardHeight}>
        <img
          src={book.image}
          className="card-img-top" style={cardImage}
          alt={`${book.title} image`}
        />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          {/* <h5 className="card-body">{book.avgRating}</h5> */}
          <h5>{ratingView(book["avgRating"])}</h5>
          <Link to={`/book/${book.id}`} className="btn btn-success">
            View Book
          </Link>
        </div>
      </div>
    </div>
  ));
  const noBook = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        Oops! Couldn't find any book. :(
      </h4>
    </div>
  );

  return (
    <div>
      <div>
      </div>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Book Review Application</h1>
          <p className="lead text-muted">
            Discover, rate, and review your favorite books with our intuitive book review application.
          </p>
        </div>
      </section>
      <div className="py-2">
        <main className="container">
          <div className="text-end mb-3">
            {/* <Link to="/book" className="btn btn-success">
              Add new book
            </Link> */}
              <input
                type="text"
                name="search"
                id="searchBooks"
                className="form-control border border-secondary"
                placeholder="Search and review your favorite book..."
                required
                onChange={(event) => onChange(event, setBooks)}
              />
            




          </div>
          <div className="row">
            {books.length > 0 ? allBooks : noBook}
          </div>

        </main>
      </div>
    </div>
  );

};

export default Books;
