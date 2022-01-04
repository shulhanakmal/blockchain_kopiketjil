// MyGoogleMaps.js
import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import styled from "styled-components";

import Marker from "./Marker";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;

class MyGoogleMap extends Component {
  state = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [],
    zoom: 9,
    address: "",
    draggable: true,
    lat: null,
    lng: null,
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.longProps !== prevProps.longProps) {
      var lat = parseFloat(this.props.latProps);
      var long = parseFloat(this.props.longProps);
      this.setState({
        center: [lat, long],
        lat: lat,
        lng: long,
      });
    }
  }
  componentWillMount() {
    this.setCurrentLocation();
  }

  onMarkerInteraction = (childKey, childProps, mouse) => {
    this.setState({
      draggable: false,
      lat: mouse.lat,
      lng: mouse.lng,
    });
    this.props.onMarkerHandle(mouse.lat, mouse.lng);
  };

  onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
    this.setState({ draggable: true });
    this._generateAddress();
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom,
    });
  };

  _onClick = (value) => {
    this.setState({
      lat: value.lat,
      lng: value.lng,
    });
    this.props.onMarkerHandle(value.lat, value.lng);
  };

  apiHasLoaded = (map, maps) => {
    this.setState({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    });

    this._generateAddress();
  };

  addPlace = (place) => {
    this.setState({
      places: [place],
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    this._generateAddress();
  };

  _generateAddress() {
    const { mapApi } = this.state;

    // const geocoder = new mapApi.Geocoder();

    // geocoder.geocode(
    //   { location: { lat: this.state.lat, lng: this.state.lng } },
    //   (results, status) => {
    //     console.log(results);
    //     console.log(status);
    //     if (status === "OK") {
    //       if (results[0]) {
    //         this.zoom = 12;
    //         this.setState({ address: results[0].formatted_address });
    //       } else {
    //         window.alert("No results found");
    //       }
    //     } else {
    //       window.alert("Geocoder failed due to: " + status);
    //     }
    //   }
    // );
  }

  // Get Current Location Coordinates

  setCurrentLocation() {
    if (this.props.longProps == null && this.props.latProps == null) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }

  render() {
    const { places, mapApiLoaded, mapInstance, mapApi } = this.state;

    return (
      <Wrapper>
        <GoogleMapReact
          center={this.state.center}
          zoom={this.state.zoom}
          draggable={this.state.draggable}
          onChange={this._onChange}
          onChildMouseDown={this.onMarkerInteraction}
          onChildMouseUp={this.onMarkerInteractionMouseUp}
          onChildMouseMove={this.onMarkerInteraction}
          onChildClick={() => console.log("child click")}
          onClick={this._onClick}
          bootstrapURLKeys={{
            key: "AIzaSyC81o8Qoasn_E2FqMrqhmM-2IUlgAab2V4",
            libraries: ["places", "geometry"],
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiHasLoaded(map, maps)}
        >
          <Marker
            text={this.state.address}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </GoogleMapReact>

        {/* <div className="info-wrapper">
          <div className="map-details">
            Latitude: <span>{this.state.lat}</span>, Longitude:{" "}
            <span>{this.state.lng}</span>
          </div>
          <div className="map-details">
            Zoom: <span>{this.state.zoom}</span>
          </div>
        </div> */}
      </Wrapper>
    );
  }
}

export default MyGoogleMap;
