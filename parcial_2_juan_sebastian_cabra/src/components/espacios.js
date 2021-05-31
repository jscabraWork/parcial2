import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "./../util/router.js";

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

const Espacios = () => {
  const getBrowserLang = () => {
    return navigator.language || navigator.userLanguage;
  };
  const classes = useStyles();
  const [espacios, setEspacios] = useState(null);

  const url = getBrowserLang().includes("en")
    ? "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json"
    : "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";

  const fetchData = async () => {
    const data = await axios.get(url);
    setEspacios(data.data);
    localStorage.setItem("espacios", data);
  };

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("espacios") !== null) {
        setEspacios(localStorage.getItem("espacios").data);
      }
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderImagen = (tipo) => {

    if (tipo === "house") {
      return <img className={classes.img} src="https://image.freepik.com/vector-gratis/ilustracion-casa-venta_43605-2451.jpg" />
    }
    else {
      return <img className={classes.img} src="https://image.freepik.com/vector-gratis/ilustracion-edificio-apartamentos_53876-35079.jpg" />
    }
  }


  const renderBody = () => {
    return espacios.map((item) => {
      return (
        <div key={item.id}>


          <Link to={"/espacios/" + item["id"]} className={classes.card} key={item["id"]}>
            {renderImagen(item["type"])}
            <p className={classes.nombre}> {item["name"]}</p>
            <p className={classes.direccion}> {item["address"]}</p>
          </Link>


        </div>
      );
    });
  };

  const renderNombre =() => {
    if(getBrowserLang().includes("en")){
    return <h1>My spaces</h1>
  }
  else if(getBrowserLang().includes("es")){
    return <h1>Mis espacios</h1>
  }
  }
  const renderEspacios = () => {

    return (
      <div className={classes.centrar}>
        <div className="row mt-5">
          <div className="col">
            <div>
                {renderNombre()}
            </div>
            <div>{renderBody()}</div>
          </div>
        </div>
      </div>
    );
  };
  if (espacios) {
    return renderEspacios();
  } else {
    return <div> Cargando </div>;
  }
};

export default Espacios;
