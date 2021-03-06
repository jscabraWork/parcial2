import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";


import {useParams} from 'react-router-dom'

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

  const {id} = useParams();
  

  const getBrowserLang = () => {
    return navigator.language || navigator.userLanguage;
  };


  const classes = useStyles();
  const [cuartos, setCuartos] = useState(null);
  const [cuarto,setCuarto] = useState(null);

  const url = getBrowserLang().includes("en")
    ? "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json"
    : "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

  const fetchData = async () => {
    const data = await axios.get(url);
    setCuartos(data.data);
    localStorage.setItem("cuartos", data);
    
  };

  useEffect(() => {
    
    if (!navigator.onLine) {
      if (localStorage.getItem("cuartos") !== null) {
        setCuartos(localStorage.getItem("cuartos").data);
      }
    } else {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderNombre =() => {
    if(getBrowserLang().includes("en")){
    return <h1>My rooms</h1>
  }
  else if(getBrowserLang().includes("es")){
    return <h1>Mis cuartos</h1>
  }
  }
  const renderImagen = (tipo) => {

    if (tipo === "room") {
      return <img alt="Imagen" className={classes.img} src="https://image.freepik.com/vector-gratis/interior-dormitorio-ninos-cuarto-ninos-ilustracion-vectorial_87771-527.jpg" />
    }
    else {
      return <img alt="Imagen" className={classes.img} src="https://image.freepik.com/vector-gratis/ilustracion-cocina-interior-moderna_43633-5653.jpg" />
    }
  }

  const renderBody = () => {
    return cuartos.map((item) => {

      if(item["homeId"]===id){

        let a = item["homeId"] + item["name"];
        
      return (
        <div key={item.id}>

        
          <div  className={classes.card} key={ a}>
          <p key={ a +"as"} className={classes.nombre}> {item["name"]}</p>
            {renderImagen(item["type"])}
            
            
            
          </div>


        </div>
      )
    }
      
      ;
    });
  };
  const click = (item) => {
    console.log(item)
    setCuarto(item)
  }

  const renderCuartos = () => {

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
  if (cuartos) {
    
    return renderCuartos();
    
  } else {
    return <div> Cargando </div>;
    
  }

}

export default Cuartos;
