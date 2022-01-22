import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./chat.css";
import AttachFile from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
export default function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    let { roomId } = useParams()
    const [RoomName, setRoomName] = useState("")
    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });
            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

            // db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
            //     setMessages(snapshot.docs.map(doc => doc.data()))
            // });

        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>>>", input);
        db.collection('rooms').doc(roomId)
            .collection('messages').add((
                {
                    message: input,
                    name: user.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }))
        setInput("");
    }
    return (
        <div className="chat">
            <div className="chat_header">
                {/* {console.log("hiiiii")} */}
                <Avatar src="https://avatars.dicebear.com/api/human/123.svg" />
                <div className="chat_headerinfo">
                    <h3>{RoomName}</h3>
                    <p>Last seen {""}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}

                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>
            <div className="chat_body">
                {messages.map(
                    (message) =>
                    (<p className={`chat_message 
                    ${message.name === user.displayName
                        && "chat_receiver"}`} >
                        <span className="chat_name">
                            {message.name}
                        </span>
                        {message.message}
                        <span
                            className="chat_timestamp">
                            {new Date(message.timestamp?.toDate()).
                                toUTCString()}
                        </span>
                    </p>))}

            </div >
            <div className="chat_footer">
                <InsertEmoticonIcon ></InsertEmoticonIcon>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message </button>
                </form>
                <MicIcon />
            </div>
        </div >
    );
}
