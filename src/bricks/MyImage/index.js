import React from 'react';
import PropTypes from 'prop-types';

class Image extends React.Component {

  constructor(p) {
    super(p);
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 2000);
  }

  render() {
    
    const {
      src,
      alt,
      className,
      width,
      height,
      placeholder
    } = this.props;

    if (this.state.loaded) {
      return <img width={width} height={height} src={src} alt={alt} className={className} />;
    } else {
      return <div style={{width: `${width}px`, height: `${height}px`, background: '#d3d3d3', display: 'inline-block'}}>{placeholder}</div>
    }
    
  }
}

Image.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.strig,
  src: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default Image;