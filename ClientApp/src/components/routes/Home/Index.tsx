import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  return <div>
    <h4>Home</h4><hr />
    <Link to={`/game/${Math.random().toString().split('.')[1]}`}>
      <button className="btn btn-success">Play Rummy</button>
    </Link>
  </div>;
};

export default connect()(Home);
