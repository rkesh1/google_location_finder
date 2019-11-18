import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from 'react-google-maps';

const GoogleMapRoute = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '700px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withGoogleMap,
)( (props) => {
  const {
    center, cordinateData, renderPath, zoom,
  } = props;
  let path = [];
  let startMarkerPoint = {};
  let endMarkerPoint = {};

  if (cordinateData.length > 0) {
    path = cordinateData.map((item) => ({ lat: parseFloat(item[0]), lng: parseFloat(item[1]) }));
  }

  if (renderPath) {
    startMarkerPoint = path[0];
    endMarkerPoint = path[path.length - 1];
  }

  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={center}>
      {renderPath && (
        <Fragment>
          <Marker position={startMarkerPoint} />
          <Marker position={endMarkerPoint} />
          <Polyline path={path} />
        </Fragment>
      )}
    </GoogleMap>
  );
});

GoogleMapRoute.propTypes = {
  zoom: PropTypes.number.isRequired,
  center: PropTypes.object,
  cordinateData: PropTypes.array,
};

GoogleMapRoute.defaultProps = {
  center: { lat: 22.372081, lng: 114.107877 },
  zoom: 12,
  cordinateData: []
};

export default GoogleMapRoute;
