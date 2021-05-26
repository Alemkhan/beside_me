import React, { useState } from "react";
import Row from "../../UI/Row";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import CreateFormHeader from "./CreateFormHeader";
import getCookie from "../getCookie";

import default_styles from "../Form.module.css";
import createForm_styles from "./css/CreateForm.module.css";
import CreateFormBody from "./CreateFormBody";
import CreateFormActions from "./CreateFormActions";

const Backdrop = (props) => {
  return (
    <div className={createForm_styles.backdrop} onClick={props.onConfirm} />
  );
};

const ModalCreate = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    participants: "",
    tags: [],
    start_time: "",
    isParticipant: false,
  });

  const resetData = () => {
    setFormData({
      title: "",
      participants: "",
      start_time: "",
      tags: [],
      isParticipant: false,
    });
    setClear(clear + 1);
  };

  const [formError, setFormError] = useState(null);
  const [clear, setClear] = useState(0);

  const proccedEventCreation = () => {
    console.log(formData);
    console.log(props.latlong);
    // const csrf_token = getCookie("csrftoken");

    const sendingData = {
      tags: formData.tags,
      headman: 1,
      title: formData.title,
      participants: formData.participants,
      start_at: formData.start_time.substring(0, 19) + "Z",
      longitude: props.latlong.lng,
      latitude: props.latlong.lat,
      is_expired: false,
      users: [formData.isParticipant ? 2 : null],
    };

    console.log(sendingData);
    // console.log(JSON.stringify(sendingData));
    // return fetch("http://127.0.0.1:8000/api/meeting-create/", {
    //   method: "POST",
    //   headers: {
    //     "X-CSRFToken": csrf_token,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(sendingData),
    // }).then((data) => data.json());
  };

  const createEvent = (event) => {
    event.preventDefault();
    if (formData.title.length <= 5) {
      setFormError("Title length must be > 5");
      return;
    }
    if (parseInt(formData.participants, 10) < 2) {
      setFormError("Participants number must be > 2");
      return;
    }
    if (new Date(formData.start_time) < new Date()) {
      console.log("HELLO");
      return;
    }
    setFormError(null);
    proccedEventCreation();
    resetData();
  };

  const titleHandler = (enteredTitle) => {
    setFormData((prevState) => {
      return { ...prevState, title: enteredTitle };
    });
  };

  const participantHandler = (enteredParticipants) => {
    setFormData((prevState) => {
      return { ...prevState, participants: parseInt(enteredParticipants, 10) };
    });
  };

  const startTimeHandler = (enteredTime) => {
    setFormData((prevState) => {
      return { ...prevState, start_time: new Date(enteredTime).toISOString() };
    });
  };

  const isParticipantHandler = (isParticipantChoice) => {
    setFormData((prevState) => {
      return { ...prevState, isParticipant: isParticipantChoice };
    });
  };

  const tagsHandler = (newTaglist) => {
    setFormData((prevState) => {
      return { ...prevState, tags: newTaglist.map((item) => item.id) };
    });
  };

  return (
    <form
      autoComplete="off"
      className={createForm_styles["create-form"]}
      onSubmit={createEvent}
    >
      <Row>
        <CreateFormHeader />
        <CreateFormBody
          onTitleChange={titleHandler}
          onParticipantChange={participantHandler}
          onTimeChange={startTimeHandler}
          onCheckboxChange={isParticipantHandler}
          onTagsChange={tagsHandler}
          error={formError}
          clear={clear}
        />
        <CreateFormActions />
      </Row>
    </form>
  );
};

const CreateForm = (props) => {
  return (
    <Row className={default_styles["form-control"]}>
      <>
        {ReactDOM.createPortal(
          <Backdrop onConfirm={props.onEventHandler} />,
          document.getElementById("backdrop-root")
        )}

        {ReactDOM.createPortal(
          <ModalCreate latlong={props.coordinates} />,
          document.getElementById("overlay-root")
        )}
      </>
    </Row>
  );
};

export default CreateForm;
