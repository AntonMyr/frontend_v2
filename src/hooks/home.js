import React from 'react'
import LeftView from './LeftView'
import MainView from './MainView'
import RightView from './RightView'

const Home = props => (
    <div className="home">
      <LeftView />
      <MainView />
      <RightView />
    </div>
);

export default Home;