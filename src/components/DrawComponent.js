import React, { useEffect, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import * as turf from '@turf/turf';
import { MapSharp } from "@mui/icons-material";


const drawStyle = {
  position: "absolute",
  background: "white",
  padding: 20,
  zIndex: "2",
  bottom: "0vh",
};



const DrawComponent = (props) => {


  const [area, setArea] = useState(null);



  const map = props.mapConnection;
  useEffect(() => {
    if (!map) return;
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
    });
    const updateArea = (e)  => {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        setArea(rounded_area);
      } else {
        if (e.type !== 'draw.delete')
          alert('Press OK check the area');
      }
      
    }
    map.addControl(draw);
    map.on('draw.create', updateArea);
  }, [map]);

  // Se flere muligheter med Draw Modulen til MapBox: https://github.com/mapbox/mapbox-gl-draw/blob/main/docs/API.md
  // Om vi har tilgang til kartet, render component. Ellers returner et tomt HTML objekt.
  return <>{map ? <div style={drawStyle}>
    <p style={{fontSize: "50px"}}>Area: {area} m2</p>
    </div> : <></>}</>;
};

export default DrawComponent;
