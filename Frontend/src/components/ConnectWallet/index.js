import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "../../hooks/web3";
import { Button } from "react-bootstrap";

import "./style.css";

function ConnectWallet() {

    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork, address } = useWeb3Context();
    const dispatch = useDispatch();
    const [isConnected, setConnected] = useState(connected);

    let buttonText = "ConnectWallet";
    let clickFunc = connect;
    let buttonStyle = {};

    if (isConnected) {
        buttonText = String(address).substring(0, 6) +"..." +String(address).substring(38);
        clickFunc = disconnect;
    }

    if (isConnected && providerChainID !== 56) {
        buttonText = "Wrong Network";
        buttonStyle = { backgroundColor: "rgb(255, 67, 67)", color: "#ffffff" };
        clickFunc = () => {
            checkWrongNetwork();
        };
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    return (
        <button type="button " className="btn btn-primary connect-wallet-btn " style={buttonStyle} onClick={clickFunc}>
            <p>{buttonText}</p>
        </button>
    );
}

export default ConnectWallet;