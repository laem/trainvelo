import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import ReactMapGL, { LinearInterpolator } from "react-map-gl";
import WebMercatorViewport from "@math.gl/web-mercator";

import useWindowSize from "hooks/useWindowSize";
import SearchContext from "utils/SearchContext";
import buffer from "@turf/buffer";
import { point } from "@turf/helpers";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  .mapboxgl-control-container {
    display: none;
  }
`;
export default function Map() {
  const { km, mode, itinerary } = useContext(SearchContext);

  const { height, width } = useWindowSize();

  console.log(height, width);

  const [viewport, setViewport] = useState({
    latitude: 48.8159,
    longitude: 2.3061,
    zoom: 11,
  });

  const timer = useRef();

  var from =
    itinerary.from &&
    point([+itinerary.fromLongitude, +itinerary.fromLatitude]);
  var buffered = from && buffer(from, 20, { units: "kilometers", steps: 1 }),
    bounds = buffered && [
      buffered.geometry.coordinates[0][0],
      buffered.geometry.coordinates[0][2],
    ];

  console.log(buffered, bounds);
  const defaultViewport = (viewport) => ({
    ...viewport,
    latitude: 48.8159,
    longitude: 2.3061,
    zoom: 5,
    transitionInterpolator: new LinearInterpolator(),
    transitionDuration: 600,
  });

  useEffect(() => {
    timer.current = setTimeout(
      () =>
        Number(km) &&
        setViewport((viewport) =>
          itinerary.from && itinerary.to
            ? new WebMercatorViewport({
                width,
                height,
              }).fitBounds(
                [
                  [
                    Number(itinerary.fromLongitude),
                    Number(itinerary.fromLatitude),
                  ],
                  [Number(itinerary.toLongitude), Number(itinerary.toLatitude)],
                ],
                { padding: 200 }
              )
            : itinerary.from
            ? new WebMercatorViewport({
                width,
                height,
              }).fitBounds(bounds, { padding: 0 })
            : defaultViewport(viewport)
        ),
      500
    );
    return () => clearTimeout(timer.current);
  }, [timer, km, height, width, mode, itinerary]);

  return (
    <Wrapper>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={"mapbox://styles/kont/cknhamhk522ty17p39hhwcyqo"}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_TOKEN}
      />
    </Wrapper>
  );
}
