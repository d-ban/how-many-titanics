import React, { Component } from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import './App.css';
const now = moment();
const format = 'HH:mm';
const formatH = 'HH';
const formatM = 'mm';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:'',
      titanika:0,
      h:0,
      titanika1:[]
    }
    this.onChange = this.onChange.bind(this);

  }

componentDidMount() {
  this.onChange(0)
  window.setInterval(function(){
    this.onChange(0)
  }.bind(this), 15000);
}


  onChange(value) {


    let nowH = moment().format(formatH)
    let nowM = moment().format(formatM)
    nowM = 100/(60/nowM)/100;
    nowH= parseInt(nowH,10)+nowM
    let selectedH
    let selectedM
    let selected
    if (value!==0) {
      selectedH =  value.format(formatH)
      selectedM =  value.format(formatM)
      selectedM = 100/(60/selectedM)/100;
      selectedH= parseInt(selectedH,10)+selectedM
      localStorage.setItem('selectedH', selectedH);
      localStorage.setItem('selected', value.format(format));
      selected = value.format(format)
    }else {
      selectedH =  localStorage.getItem('selectedH')
      selected =  localStorage.getItem('selected')
    }

    // selectedM = 100/(60/selectedM)/100;
    // selectedH= parseInt(selectedH,10)+selectedM

    let titanika=(selectedH-nowH)/3.25;
    titanika = Math.round(titanika*100)/100;
    let titanika2 = Math.round(titanika);
    if (nowH<=selectedH) {
      let n = 0
      let titanika1 = []
      while (titanika2>n) {
        titanika1.push(n)
        n=n+1
      }

      this.setState({h:selectedH-nowH,titanika: titanika,titanika1:titanika1,selected:selected})

    }else {
      this.setState({h:0,titanika: 0,titanika1:[]})
    }
    // let mee = moment.duration(moment().format(format)-moment(n)).humanize()
    // console.log(mee);
  }


  render() {
    return (
      <div className="App">

      <h3>{this.state.titanika}
      {this.state.titanika1.map( (row, index) => (
        <i key={index}className="fa fa-ship" aria-hidden="true"></i>
      ))}
      {this.state.titanika>=1?"titanics":"titanic"} ({this.state.h>1?Math.round(this.state.h*100)/100+"h":Math.round(this.state.h*60)+"min"}) until {this.state.selected}</h3>

        <h4>select new time:</h4>
      <TimePicker
          showSecond={false}
          defaultValue={now}
          className="xxx"
          onChange={this.onChange}
          format={format}
          use12Hours={false}
        />



      </div>
    );
  }
}

export default App;
