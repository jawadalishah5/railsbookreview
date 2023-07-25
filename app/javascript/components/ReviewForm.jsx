import React, { useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const ReviewForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");
  const {id} = useParams();

  const RatingInput = { display: "none" }

  const RatingLabel = {
    cursor: "pointer",
    width: "40px",
    height: "40px",
    marginTop: "auto",
    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "76%",
    transition: ".3s"
  }

  const changeStyle = (event, score) => {

    for (let val of "12345"){
      if (val <= score){
        document.querySelector(`[for=rating-${val}]`).style.backgroundImage = "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23fcd93a' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e\")"
      }
      else{
        document.querySelector(`[for=rating-${val}]`).style.backgroundImage = "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='126.729' height='126.73'%3e%3cpath fill='%23e3e3e3' d='M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z'/%3e%3c/svg%3e\")"
      }

    }

  };

  // Rating button
  const ratingOptions = [1,2,3,4,5].map((score, index) => {
    return (
      <Fragment key={index}>
        {/* <input style={RatingInput}  type="radio" value={score} onChange={()=>console.log('selected:', score)} name="rating" id={`rating-${score}`}/> */}
        <input style={RatingInput}  type="radio" value={score} onChange={(event) => onChange(event, setScore)} name="rating" id={`rating-${score}`}/>
        <label style={RatingLabel} htmlFor={`rating-${score}`} onClick={(event) => changeStyle(event, score)} ></label>
      </Fragment>
    )
  })


  const onChange = ((event, setFunction) => {
    setFunction(event.target.value);
    // console.log(event)
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/reviews/create";

    if (title.length == 0 || description.length == 0 || score.length == 0)
      return;

    const body = {
        title,
        description,
        score,
        book_id: id     
    };
    console.log(body)
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      // .then((response) => navigate(`/book/${response.book_id}`))
      .then((response) => window.location.reload(false))
      .catch((error) => console.log(error.message));
  };


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Share Your Unforgettable Book Reading Adventure!
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="reviewTitle" className="mt-2 mb-2">Review Title</label>
              <input
                type="text"
                name="title"
                id="reviewTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="score" className="mt-5">Rate out of 5</label>
              {/* <input
                className="form-control"
                id="score"
                name="score"
                required
                onChange={(event) => onChange(event, setScore)}
              /> */}
              <div>
                {ratingOptions}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="reviewDescription" className="mt-5">Add Description</label>
              <textarea
                type="text"
                name="description"
                id="reviewDescription"
                className="form-control"
                rows={5}
                required
                onChange={(event) => onChange(event, setDescription)}
              />
            </div>
            <button type="submit" className="btn custom-button mt-5">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};




export default ReviewForm;