import React, { useEffect, useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import io from "socket.io-client";
import Nav from "react-bootstrap/esm/Nav";

let socket = io("http://localhost:3001");

function App() {
    const [status, setStatus] = useState(false);
    const [events, setEvents] = useState<string[]>([]);

    useEffect(() => {
        socket.on("connect", () => {
            setStatus(true);
        });

        socket.on("disconnect", () => {
            setStatus(false);
        });
    }, []);

    const addEvent = () => {
        console.log(socket.connected);
        setEvents([...events, `Testing #${events.length + 1}`]);
    };

    const disconnect = () => {
        socket.close();
    };

    const connect = () => {
        socket.open();
    };

    return (
        <div className="App">
            <header className="App-header">
                <div
                    className="position-absolute"
                    style={{ right: 20, top: 20 }}
                >
                    <span
                        className={`circle shadow ${
                            status ? "bg-success" : "bg-danger"
                        }`}
                    ></span>
                </div>
                <div
                    className="position-absolute"
                    style={{ left: 20, bottom: 20 }}
                >
                    <Nav variant="pills" defaultActiveKey="/">
                        <Nav.Item>
                            <Nav.Link href="/">None</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/master">Master</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/slave">Slave</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div
                    className="position-absolute"
                    style={{ left: 20, top: 20 }}
                >
                    <ButtonGroup>
                        <Button variant="success" onClick={connect}>
                            Connect
                        </Button>
                        <Button variant="info" onClick={addEvent}>
                            Evoke Action
                        </Button>
                        <Button variant="danger" onClick={disconnect}>
                            Disconnect
                        </Button>
                    </ButtonGroup>
                </div>
                <small className="mt-3 text-muted">
                    You are connected to [ADMIN]
                </small>
                <div className="position-absolute" style={{ left: "15%" }}>
                    {events.map((event, index) => (
                        <div className="my-2" key={index}>
                            {event}
                        </div>
                    ))}
                </div>
                <div className="position-absolute" style={{ right: "15%" }}>
                    {events.map((event, index) => (
                        <div className="my-2" key={index}>
                            {event}
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
