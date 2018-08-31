import React from 'react'

class Location extends React.Component {

    render() {
        return (
            <li role="button"
              className="location"
              onClick={this.props.infoOpen.bind(this, this.props.data.marker)}>{this.props.data.name}</li>
        )
    }
}

export default Location
