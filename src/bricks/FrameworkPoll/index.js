import React from 'react';
import firebase from './firebase.js';

const Layout = ({
  children
}) => (
  <div className="container" style={{
    textAlign: 'center',
    padding: '10px'
  }}>
    <div className="card">
      <div>
        <img src={require('./assets/ctsw_logo.png')} height="37" alt="CodingTheSmartWay.com" style={{
          marginTop: '20px'
        }} />
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  </div>  
);

const Intro = ({
  onVote
}) => (
  <div>
    <h2>Which is your favorite frontend framework?</h2>
    <h4>Click on the logos below to vote!</h4>
    <br />
    <div className="row">
      <div className="offset-md-3 col-md-2">
        <img src={require('./assets/angular_logo.png')} height="96" alt="Angular" onClick={() => onVote('Angular')} />
      </div>
      <div className="col-md-2">
        <img src={require('./assets/react_logo.png')} height="96" alt="React" onClick={() => onVote('React')} />
      </div>
      <div className="col-md-2">
        <img src={require('./assets/vuejs_logo.png')} height="96" alt="Vue.js" onClick={() => onVote('Vuejs')} />
      </div>
    </div>
  </div>  
);

const Updating = () => (
  <div>
    <h3>Thanks. Redirecting to voting results ...</h3>
  </div>  
);

const Results = ({
  votes,
  votesTotal
}) => {
  const angularVotePercent = (votes.Angular / votesTotal) * 100;
  const reactVotePercent = (votes.React / votesTotal) * 100;
  const vueVotePercent = (votes.Vuejs / votesTotal) * 100;

  return (
    <div style={{
      textAlign: 'left'
    }}>
      <span className="badge badge-pill badge-danger mb-1">
        Angular: {votes.Angular} ( {angularVotePercent} %)
      </span>
      <div className="progress">
        <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{
          width: `${angularVotePercent}%`
        }}></div>
      </div>
      <br/><br/>
      <span className="badge badge-pill badge-info mb-1">
        React: {votes.React} ( {reactVotePercent} %)
      </span>
      <div className="progress">
        <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={{
          width: `${reactVotePercent}%`
        }}></div>
      </div>
      <br/><br/>
      <span className="badge badge-pill badge-success mb-1">
        Vue.js: {votes.Vuejs} ( {vueVotePercent} %)
      </span>
      <div className="progress">
        <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{
          width: `${vueVotePercent}%`
        }}></div>
      </div>
    </div> 
  ) 
}

class FrameworkPoll extends React.Component {
  constructor(p) {
    super(p);

    this.state = {
      voted: undefined,
      voteCounted: false,
      votes: {
        React: 0,
        Angular: 0,
        Vuejs: 0
      }
    }

    firebase.database().ref('items').on('value', (snapshot) => {

      const votes = {
        React: 0,
        Angular: 0,
        Vuejs: 0
      }
      Object.values(snapshot.val()).forEach(item => {
        if (item.name in votes) {
          votes[item.name]++;
        }
      });

      this.setState({
        votes,
        voteCounted: this.state.voted ? true : false
      })
    })

    this.handleVote = (voted) => {
      this.setState({
        voted
      }, () => {
        const itemsRef = firebase.database().ref('items');
        const item = {
          name: voted,
        }
        itemsRef.push(item);   
      });
    }
  }
  render() {
    return (
      <Layout>
        {!this.state.voted && <Intro onVote={this.handleVote} />}
        {this.state.voted && !this.state.voteCounted && <Updating />}
        {this.state.voteCounted && <Results votes={this.state.votes} votesTotal={Object.values(this.state.votes).reduce((accumulator, item) => parseInt(accumulator, 10) + parseInt(item, 10))} />}
      </Layout>
    )
  }
}

export default FrameworkPoll;