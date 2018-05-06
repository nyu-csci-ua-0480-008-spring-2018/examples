// Sunday, May 6th Final Exam Review
// REACT PT. 1
class Parent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      count: [1,2,3]
    }
  }
  handleParentOnClick(){
    console.log("Hello world");
  }
  handleChildOnClick(idx){
    const count = this.state.count[idx];
    this.setState({ count[idx]: count + 1 });
  }
  render(){
    <div onClick={this.handleParentOnClick}>
      <p> "Hello, I'm a parent" </p>
      this.state.count.forEach((count, idx) =>{
        <Child onClick={() => this.handleChildOnClick(idx)} count={count}/>
      });
    </div>
  }

}

class Child extends React.Component{
    constructor(props){
      super(props);
      this.static = "dfjsdklfs";
      this.state = {
        style: {'color': 'green'}
      }
    }
    render(){
      <div onClick={this.props.onClick}>
        <p style={this.state.style}>
          My count is: {this.props.count}
        </p>
      </div>
    }
}

ReactDOM.render(<Parent/>, document.body);

// PROMISES
const p = new Promise((resolve, reject) =>{
  // do something async here
  if err{ reject(err); }
  else{ resolve(data);}
}).then((data) =>{
  console.log("Success!", data)
}).catch((err) =>{
  console.log("Error :(", err);
});

function f(val){
  console.log(val);
  return new Promise((fulfill, reject) =>{
    console.log('acoustics');
    fulfill('bandit');
    console.log('cotton');
  });
}
const r1 = f('desert'); // promise
const r2 = r1.then(f); // promise
const r3 = r2.then(console.log); // undefined
f('desert').then(f).then(console.log) //chained together


// REACT PT 2
class NumBox extends React.Component{
render(){
  return <div onClick={this.props.onClick}> Num: {this.props.num} </div>;
  }
}

class Sum extends React.Component{
  render(){
    return <div> Sum: {this.props.sum} </div>;
  }
}

class Adder extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      numbers : [0, 0];
    }
  }

  handleOnClick(idx){
    const val = this.state.numbers[idx];
    this.setState({ this.state.numbers[idx] : val + 1 });
  }

  render(){
    const boxes = [];
    this.state.numbers.forEach((val, idx) =>{
      boxes.push(<NumBox num={val} onClick={() => this.handleOnClick(idx)} />)
    });
    const sum = this.state.numbers.reduce(((sum, curr) => return sum + curr), 0);
    return <div> {boxes} <Sum sum={sum} /> </div>
  }
}

// SOCKET.IO

// SERVER SIDE
// We want a global store of numbers so
// the changes are reflected for ALL users
const numbers = [1,2,3,4,5];

io.on('connect', (socket) =>{ //socket = unique/individual client
  // If we declared numbers inside the connect callback,
  // the changes are specific per user
  // (i.e. removing a number is only reflected for the clicking user)
  // const numbers = [1,2,3,4,5]
  socket.emit('init', numbers);
  socket.on('remove', (number) =>{
    let idx = numbers.indexOf(number);
    numbers.splice(idx, 1);
    socket.broadcast.emit('removeOne', number);
    //if i didnt remove the div myself, tell everyone including me:
    // io.emit('removeOne', number);
  });
});


// CLIENT SIDE
socket.on('init', (numbers) =>{
  numbers.forEach((number) =>{
    // DOM manipulation to display numbers
    let div = document.createElement('span');
    div.classList.append('class' + number); //for identifying the div
    div.textContent = number;
    document.body.append(div);
    div.addEventListener('click', function(){
      // tell the server to remove a num from global store
      socket.emit('remove', this.textContent);
      // remove the number from the DOM
      this.parentNode.removeChild(this);
    });
  });
});

socket.on('removeOne', (n) =>{
  // DOM manipulation to remove div
  const d = document.querySelector('class' + n);
  d.parentNode.removeChild(d);
});
