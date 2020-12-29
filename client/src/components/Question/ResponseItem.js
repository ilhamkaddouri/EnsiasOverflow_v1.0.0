import React, { Fragment, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";

const ResponseItem = ({ response, questionId }) => {
  const [isLiked, updateLike] = useState(false);
  const [like, setlikes] = useState([response.rep_likes.length]);
  const [dislike, setdislikes] = useState([response.rep_dislikes.length]);

  const handleLike = (res_id) => {
    const id = res_id;
    axios
      .put("/posts/like/" + questionId + "/responses/" + id, null, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        console.log(res.data.rep_likes.length);
        setlikes(res.data.rep_likes.length);
        setdislikes(res.data.rep_dislikes.length);
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = (res_id) => {
    const id = res_id;
    axios
      .put("/posts/unlike/" + questionId + "/responses/" + id, null, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        // console.log(res.data);
        setlikes(res.data.rep_likes.length);
        setdislikes(res.data.rep_dislikes.length);
      })
      .catch((err) => console.log(err));
    console.log(id);
  };
  return (
    <Fragment>
      <Card style={{ width: "70vw", margin: "5px", borderColor: "black" }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
           Answered by :<Card.Link href="#LinktoUser"> </Card.Link>
          </Card.Subtitle>
          <Card.Subtitle className="mb-1 text-muted">
            {" "}
            On : {response.rep_date.substring(0, 10)}{" "}
          </Card.Subtitle>
          <Card.Text>{response.rep_content}</Card.Text>
          <div className="ml-auto">
            <button
              type="button"
              className="btn btn-success mr-2"
              value={response._id}
              onClick={() => {
                handleLike(response._id);
              }}
            >
              <i className="fa fa-thumbs-up"></i>{" "}
              <span>{like}</span>
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleDislike(response._id);
              }}
            >
              <i className="fa fa-thumbs-down"></i>
              {" "}
               {<span>{dislike}</span>}
            </button>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default ResponseItem;