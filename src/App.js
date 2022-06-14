import './App.css';
import TextEntry from './TextEntry';
import react from 'react'
function Heading(props){
  return (
    <>
      <div className="statistics">
        <p>Speed: {props.speed} wps</p>
        <p>accuracy: {props.accuracy}%</p>
        <p>time: {props.time} seconds</p>
      </div>
    </>
  );
}
class Main extends react.Component
{
  constructor(props){
    super(props)
    this.state={speed:0,accuracy:0,time:0}
    this.status={}
    this.tick=this.tick.bind(this);
    this.started=false
    this.handleStatus=this.handleStatus.bind(this)
  }
  tick(){
    this.setState((prevState)=>{
      return {time:this.started?(prevState.time+1):0} 
    })
    let status=this.status
    this.started = status.started
    if (this.state.time)
    this.setState({ speed: Math.floor(status.right / 6 / (this.state.time / 60)), accuracy: Math.floor(status.right / status.total * 100) })
  }
  componentDidMount(){
    setInterval(this.tick, 1000);
  }
  handleStatus(status){
    this.status=status
  }
  render(){
   return ( 
     <>
     <div id="main">
     <Heading speed={this.state.speed} accuracy={this.state.accuracy} time={this.state.time}/>
     <TextEntry handleStatus={this.handleStatus}/>
       </div>
     </>
   );
  }
} 
function App() {
  return (
    <>
      <h1 className="heading">TypeMeasure</h1>
      <Main />
    </>
  );
}

export default App;
