import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import {withRouter} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  centrar: {
    marginLeft: "10%"
  },
  card: {
    float: "left",
    padding: "20px",
    cursor: "pointer",
    border: "1px solid #ccc",
    margin: "20px",
    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2);"
  },
  img: {
    width: "200px",
    height: "150px"
  },
  nombre: {
    fontWeight: "bold",
    textDecoration: "none",
    color:"black"
  },
  direccion: {
    marginTop: "-8px",
    textDecoration: "none",
    color:"black"
  }
}));

const Cuartos = () => {
  const getBrowserLang = () => {
    return navigator.language || navigator.userLanguage;
  };
  const classes = useStyles();
  const [cuartos, setCuartos] = useState(null);

  const url = getBrowserLang().includes("en")
    ? "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json"
    : "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  const fetchData = async () => {
    const data = await axios.get(url);
    setCuartos(data.data);
    localStorage.setItem("cuartos", data);
  };

  useEffect(() => {
    console.log(this.props.location.pathname);
    if (!navigator.onLine) {
      if (localStorage.getItem("cuartos") !== null) {
        setCuartos(localStorage.getItem("cuartos").data);
      }
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



}

export default Cuartos;
