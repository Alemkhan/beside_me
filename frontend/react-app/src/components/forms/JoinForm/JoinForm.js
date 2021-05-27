import React from "react";
import Row from "../../UI/Row";
import JoinFormHeader from "./JoinFormHeader";
import JoinFormBody from "./JoinFormBody";
import Button from "../../UI/Button";
import getCookie from "../getCookie";

import styles from "../Form.module.css";

const JoinForm = (props) => {
  const joinEvent = (event) => {
    event.preventDefault();
    // const csrf_token = getCookie("csrftoken");
    console.log(props.eventDetail.id);
    // return fetch("http://127.0.0.1:8000/api/join-meeting/", {
    //   method: "POST",
    //   headers: {
    //     "X-CSRFToken": csrf_token,
    //     "Content-Type": "application/json",
    //     meeting_id: props.eventDetail.id,
    //     user_id: parseInt(localStorage.getItem("id")),
    //   },
    // }).then((data) => data.json());
  };

  return (
    <Row className={styles["form-control"]}>
      <form onSubmit={joinEvent}>
        <JoinFormHeader
          title={props.eventDetail.title}
          tags={props.eventDetail.tags}
        />
        <JoinFormBody eventDetail={props.eventDetail}></JoinFormBody>
        <Row>
          {localStorage.getItem("token") !== null &&
            !props.eventDetail.users.includes(
              parseInt(localStorage.getItem("id"))
            ) && (
              <Button className={styles["btn-full-width"]} type="submit">
                Join Event
              </Button>
            )}
          {localStorage.getItem("token") !== null &&
            props.eventDetail.users.includes(
              parseInt(localStorage.getItem("id"))
            ) && (
              <Button>
                You have already <br /> joined this meeting
              </Button>
            )}
          {localStorage.getItem("token") === null && (
            <Button>Please, login!</Button>
          )}
        </Row>
      </form>
    </Row>
  );
};

export default JoinForm;
