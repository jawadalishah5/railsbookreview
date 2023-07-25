import React, {useState, useEffect, Fragment} from "react";
import { Link, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";


const leftColumnStyle = {
  background: "#fff",
  maxWidth: "50%",
  width: "50%",
  float: "left", 
  height: "100vh",
  overflowX: "scroll",
  overflowY: "scroll", 
  overflow: "scroll",
}

const rightColumnStyle = {
  maxWidth: "50%",
  width: "50%",
  float: "right", 
  height: "100vh",
  display: "flex",
  overflow: "hidden",
  position: "relative"

}

const Book = () => {
  const [book, setBook] = useState({title: '', subjects: '[]', author: '', languages: '[]'})
  const [reviews, setReviews] = useState([])
  const params = useParams();

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        
        let total = 0;
        let count = res["reviews"].length
        
        res["reviews"].map(rev => {
          total += rev["score"]
        })

        if (count == 0) {
          res["avgRating"] = 0
        } else {
          res["avgRating"] = total/count
        }
        
        setBook(res)
        setReviews(res["reviews"])

       })
      .catch(() => navigate("/books"));
  }, [params.id]);


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



  const ratingView = [1,2,3,4,5].map((val, index) => {

    let rating = Math.round(book.avgRating)
    if (val >  rating){
      return (
          <Fragment key={index}>
            {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
            <label style={RatingLabel1}></label>
          </Fragment>
      )
    }
    else{
      return (
        <Fragment key={index}>
          {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
          <label style={RatingLabel2}></label>
        </Fragment>
      )
    }
  });
  
  const ratingsView = (props) => [1,2,3,4,5].map((val, index) => {
      let rating = Math.round(props)

      if (val >  rating){
        return (
            <Fragment key={index}>
              {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
              <label className="card-text" style={RatingLabel1}></label>
            </Fragment>
        )
      }
      else{
        return (
          <Fragment key={index}>
            {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
            <label className="card-text" style={RatingLabel2}></label>
          </Fragment>
        )
      }
  });

  return (
    <div>
        <div className="jumbotron jumbotron-fluid bg-light">
            <div className="container ">
              <div className="row mt-2">
                <div className="col-3">
                  <h1 className="display-4">
                  <img
                    src={book.image}
                    alt={`${book.title} image`}
                  />
                  
                  </h1>

                </div>
                <div className="col-9 mt-3">
                  <h1>{book.title}</h1>
                  <p><em>Subjects: {
                    book.subjects.substr(0, book.subjects.length - 1).substr(1).split(',').map((val, idx) => {
                      return(
                        
                        <span key={idx}>{val.substr(0, val.length - 1).substr(1).replace('"', ', ')}</span>
                      )
                    })
                    }</em></p>
                  <p><em>Author: {book.author}</em></p>
                  <p><em>Languages: {
                    
                    book.languages.substr(0, book.languages.length - 1).substr(1).split(',').map((val, idx) => {
                      return(
                        
                        <span key={idx}>{val.substr(0, val.length - 1).substr(1).replace('"', ', ')}</span>
                        )
                      })
                      
                    } 
                  </em></p>
                  
                  <div><em>Rating: 
                    <div>
                    {ratingView}
                    </div>
                    </em>
                  </div>
                  

                  <Link to="/" className="btn btn-lg btn-danger mt-3">
                    Back to books
                  </Link>
                </div>


              </div>
              
              
            </div>
        </div>
        <div className="container">
          <div style={leftColumnStyle} className="review-details">
            <h1 className="bg-dark text-white text-center mt-1">User Reviews!</h1>
            {
              reviews.map((rev, idx) => {
                return(
                  <div className="card mt-3" key={idx}>
                    <div className="card-header">
                      {rev["title"]}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{rev["description"]}</h5>
                      {/* <p className="card-text">{rev["score"]}</p> */}
                      {ratingsView(rev["score"])}
                    </div>
                  </div>
                )
                
              })
            }
            
            {/* <h1 key={idx}>{rev["title"]}</h1> */}
          </div>
          <div className="bg-secondary text-white mt-1" style={rightColumnStyle}>
            <ReviewForm></ReviewForm>
          </div>

        </div>


    </div>
  )
}

export default Book;
