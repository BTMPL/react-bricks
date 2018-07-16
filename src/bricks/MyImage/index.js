import React from 'react';

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

export default Image;