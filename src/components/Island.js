import React, { Component } from 'react';

const teamID = ["1a", "1b", "1c", "1d", "1e", "1f", "2a", "2b", "2c", "2d", "2e", "2f", "3a", "3b", "3c", "3d", "3e", "3f", "4a", "4b", "4c", "4d", "4e", "4f", "5a", "5b", "5c", "5d", "5e", "5f", "6a", "6b", "6c", "6d", "6e", "6f", "7a", "7b", "7c", "7d", "7e", "7f", "8a", "8b", "8c", "8d", "8e", "8f", "9a", "9b", "9c", "9d", "9e", "9f", "10a", "10b", "10c", "10d", "10e", "10f", "11a", "11b", "11c", "11d", "11e", "11f", "12a", "12b", "12c", "12d", "12e", "12f"];

class Island extends Component {
  constructor() {
    super();
    this.state = {

    }
    this.tick = this.tick.bind(this);
    this.switchTiming = this.switchTiming.bind(this);
    this.purgeAll = this.purgeAll.bind(this);
  }

  componentDidMount() {
    this.tick();
    this.timer = setInterval(this.tick, 1000);
    document.body.classList.add(this.props.env.timing === 'daytime' ? 'brightTheme' : 'darkTheme');
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {

  }

  switchTiming() {
    if (this.props.env.timing === 'daytime') {
      this.props.modifyEnvData({ 'timing': 'night' });
      document.body.classList.add('darkTheme');
      document.body.classList.remove('brightTheme');
      teamID.forEach((item) => {
        this.props.modifyTeamData({ 'earned': 0 }, item);
      });
    } else {
      this.props.modifyEnvData({ 'timing': 'daytime' });
      document.body.classList.remove('darkTheme');
      document.body.classList.add('brightTheme');
      ['1', '2', '3'].forEach((item) => {
        if (this.props.arenas[item]['team'] !== "" && this.props.arenas[item]['moneyToGet'] === 0) {
          const d = new Date();
          const earn = Math.floor((d.getTime() - this.props.arenas[item]['timestamp']) / 30000) * 1000;
          this.props.modifyArenaData({ moneyToGet: earn, timestamp: 0 }, item);
        }
      });
      teamID.forEach((item) => {
        this.props.modifyTeamData({ recover: false }, item);
      });
    }
  }

  purgeAll() {
    let teamMoney= this.props.env['teamMoney'];
    teamID.forEach((item) => {
      if (this.props.teams[item]['jail'] === 'in') {
        const newData1 = {
          'jail': 'free',
          'hunted': 3000
        };
        this.props.modifyTeamData(newData1, item);
        teamMoney[item.slice(0, -1)] -= 3000;
      }
    });
    this.props.modifyEnvData({ jailTimestamp: 0, teamMoney: teamMoney });
  }

  render() {
    const teamID1 = ["1a", "1b", "1c", "1d", "1e", "1f", "2a", "2b", "2c", "2d", "2e", "2f", "3a", "3b", "3c", "3d", "3e", "3f", "4a", "4b", "4c", "4d", "4e", "4f", "5a", "5b", "5c", "5d", "5e", "5f", "6a", "6b", "6c", "6d", "6e", "6f"];
    const teamID2 = ["7a", "7b", "7c", "7d", "7e", "7f", "8a", "8b", "8c", "8d", "8e", "8f", "9a", "9b", "9c", "9d", "9e", "9f", "10a", "10b", "10c", "10d", "10e", "10f", "11a", "11b", "11c", "11d", "11e", "11f", "12a", "12b", "12c", "12d", "12e", "12f"];
    const showTeamData1 = teamID1.map((item, key) => (
      <tr key={key}>
        <th>{item}</th>
        <td>{this.props.teams[item]['life']}</td>
        <td>{this.props.teams[item]['money']}</td>
        <td>{this.props.teams[item]['earned']}</td>
        <td>{this.props.teams[item]['hunted']}</td>
        <td>{this.props.teams[item]['kill']}</td>
        <td>{this.props.teams[item]['death']}</td>
        <td>{this.props.teams[item]['head']}</td>
        <td>{this.props.teams[item]['jail']}</td>
      </tr>
    ));
    const showTeamData2 = teamID2.map((item, key) => (
      <tr key={key}>
        <th>{item}</th>
        <td>{this.props.teams[item]['life']}</td>
        <td>{this.props.teams[item]['money']}</td>
        <td>{this.props.teams[item]['earned']}</td>
        <td>{this.props.teams[item]['hunted']}</td>
        <td>{this.props.teams[item]['kill']}</td>
        <td>{this.props.teams[item]['death']}</td>
        <td>{this.props.teams[item]['head']}</td>
        <td>{this.props.teams[item]['jail']}</td>
      </tr>
    ));

    return (
      <div className="container">
        <div className="row header-div">
          <div className="col-2">
            <button 
              type="button" 
              className={"btn " + (this.props.env.timing === "daytime" ? "btn-outline-danger" : "btn-danger")} 
              onClick={() => this.switchTiming()}>
              Switch to {this.props.env.timing === "daytime" ? "night" : "daytime"} 
            </button>
          </div>
          <div className="col-4">
            <button 
              type="button" 
              className={"btn " + (this.props.env.timing === "daytime" ? "btn-outline-danger" : "btn-danger")} 
              onClick={() => this.purgeAll()}>
              Purge all
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-6" style={{ "padding": "10px" }}>
            <table className="table">
              <thead style={{ "textAlign": "center" }}>
                <tr>
                  <th>隊</th><th>命</th><th>錢</th><th>賺</th><th>賞</th><th>殺</th><th>亡</th><th>頭</th><th>獄</th>
                </tr>
              </thead>
              <tbody>
                {showTeamData1}
              </tbody>
            </table>
          </div>
          <div className="col-6" style={{ "padding": "10px" }}>
            <table className="table">
              <thead style={{ "textAlign": "center" }}>
                <tr>
                  <th>隊</th><th>命</th><th>錢</th><th>賺</th><th>賞</th><th>殺</th><th>亡</th><th>頭</th><th>獄</th>
                </tr>
              </thead>
              <tbody>
                {showTeamData2}
              </tbody>
            </table>
          </div>
        </div> 
      </div>
    );
  }
}

export default Island;
