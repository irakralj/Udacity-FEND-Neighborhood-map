import React, {Component} from 'react'
import Location from './Location'

class LocationDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'locations': '',
      'query': '',
    }

    this.locationsFilter = this.locationsFilter.bind(this)
    }

    locationsFilter(event) {
      this.props.infoClose()
      const {value} = event.target
      let locations = []
      this.props.mylocations.forEach(function (location) {
        if (location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            location.marker.setVisible(true)
            locations.push(location)
        } else {
            location.marker.setVisible(false)
        }
      })

      this.setState({
        'locations': locations,
        'query': value
      })
    }

    componentWillMount() {
      this.setState({
        'locations': this.props.mylocations
      })
    }

    render() {
      let locationdropdown = this.state.locations.map(function (listItem, index) {
        return (
          <Location key={index}
            infoOpen={this.props.infoOpen.bind(this)}
            data={listItem}/>
        )
    }, this)

    return (
      <div className='search'>
        <input role='search'
              aria-labelledby='search'
              id='input-field'
              className='input-field'
              type='text'
              placeholder='Restaurant name'
              value={this.state.query}
              onChange={this.locationsFilter}/>
              <ol>
                {locationdropdown}
              </ol>
      </div>
    )
  }
}

export default LocationDropdown
