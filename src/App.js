import React, {Component} from 'react'
import './App.css'
import LocationDropdown from './LocationDropdown'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'mylocations': [
        {
          'name': "Grof",
          'latitude': 45.713932,
          'longitude': 16.073044
        },
        {
          'name': "Pastuh Grill",
          'latitude': 45.724651,
          'longitude': 16.072196
        },
        {
          'name': "Kaktus",
          'latitude': 45.716582,
          'longitude': 16.065170
          },
        {
          'name': "Monument",
          'latitude': 45.710935,
          'longitude': 16.059315
          },
        {
          'name': "Gavran",
          'latitude': 45.720127,
          'longitude': 16.061395
          }],

          'map': '',
          'infowindow': '',
          'prevmarker': ''
        }

        this.initMap = this.initMap.bind(this)
        this.infoOpen = this.infoOpen.bind(this)
        this.infoOpen = this.infoOpen.bind(this)
    }

    componentDidMount() {
      this.renderMap()
    }

    renderMap() {
      createSource('https://maps.googleapis.com/maps/api/js?key=AIzaSyDvMvsqARDrmDH4kYBqJZtNOZrGzKpeXko&callback=initMap')
      window.initMap = this.initMap
    }

    initMap() {
        let self = this

        let mapview = document.getElementById('map')
        mapview.style.height = window.innerHeight + "px"
        let map = new window.google.maps.Map(mapview, {
            center: {lat: 45.713880, lng: 16.073884},
            zoom: 14,
        })

        let infoWindow = new window.google.maps.InfoWindow({})

        window.google.maps.event.addListener(infoWindow, 'closeclick', function () {
            self.infoClose()
        })

        this.setState({
            'map': map,
            'infowindow': infoWindow
        })

        let mylocations = []
        this.state.mylocations.forEach(function (location) {
            let marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(location.latitude, location.longitude),
                animation: window.google.maps.Animation.DROP,
                map: map,
            })

            marker.addListener('click', function () {
                self.infoOpen(marker)
            })

            location.marker = marker;
            location.display = true;
            mylocations.push(location);
        })
        this.setState({
            'mylocations': mylocations
        })
    }

    infoOpen(marker) {
        this.infoClose()
        this.state.infowindow.open(this.state.map, marker)
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        this.setState({
            'prevmarker': marker
        })
        this.state.infowindow.setContent('Loading...')
        this.markerInfo(marker)
    }

    markerInfo(marker) {
        let self = this
        let url = "https://api.foursquare.com/v2/venues/search?client_id=Z1BARBSDHGPVAVHIHA1IS1QCMOYX2HXHAKZWBKQC0RKXSIRD&client_secret=LOCVC44GBLGJYCI2RTEBGPTUH1LCKXN4S0OU4ULCH1TU3CYR&v=20180713&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1"
        fetch(url)
            .then(
                function (response) {
                    response.json().then(function (data) {
                        let location_data = data.response.venues[0]
                        let readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Place Info</a>'
                        self.state.infowindow.setContent(readMore)
                    })
                }
            )
            .catch(function (error) {
                self.state.infowindow.setContent("Sorry, there was an error.")
            })
    }

    infoClose() {
        if (this.state.prevmarker) {
            this.state.prevmarker.setAnimation(window.google.maps.Animation.BOUNCE)
        }
        this.setState({
            'prevmarker': ''
        })
        this.state.infowindow.close()
    }

    render() {
        return (
            <div>
                <LocationDropdown key="locations"
                  mylocations={this.state.mylocations}
                  infoOpen={this.infoOpen}
                  infoClose={this.infoClose}/>
                <div id="map"></div>
            </div>
        )}}

export default App

 function createSource(source) {
   let index = window.document.getElementsByTagName('script')[0]
   let script = window.document.createElement('script')
   index.parentNode.insertBefore(script, index)
   script.src = source
   script.async = true
   script.defer = true
 }
