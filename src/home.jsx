import './App.css';
import TopBar from './top-bar.jsx';
import Carousel from './body.jsx';
import Landing from './Landing.jsx';

function HOME() {
  return (
    <>
      <TopBar />
      <Landing />
      <Carousel />
    </>
  );
}

export default HOME;


