import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "./firebase";
import axios from 'axios';

import { useAuth } from "../contexts/AuthContext";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg'})
  }

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "2a0c31e2-d244-4cd0-95a8-557764f93be9",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL)
        .then((avatar) => {
            formdata.append('avatar', avatar,avatar.name);

            axios.post('https://api.chatengine.io/users',
            formdata,
            {headers:{"private-key":"d0e6b07b-6ad5-481c-aafe-feb39da9c5c2"}}
            )
            .then(()=> setLoading(false))
            .catch((error)=> console.log(error))

        })
      })
  }, [user, history]);


  if(!user || loading) return 'Loading...';
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div onClick={handleLogout} className="logout-tab">
          logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="2a0c31e2-d244-4cd0-95a8-557764f93be9"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
