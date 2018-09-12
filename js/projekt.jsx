import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

document.addEventListener('DOMContentLoaded', () => {


    class League extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                leagueArray: [],
                finished: false,
                leagueID: this.props.id,
            }
        }
        componentDidMount(){
            fetch(`https://api.football-data.org/v2/competitions/${this.state.leagueID}/standings`, {
                method: 'GET',
                headers: { 'X-Auth-Token': 'f0ffb8f0ea184c14ae68e2cdf564428b' }
            })
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        leagueArray: data.standings[0].table,
                        finished: true,
                    })
                });
        }
        render(){

            const arrayLi = this.state.leagueArray.map(el=>{
                return (
                    <tr key={el.team.name}>
                        <th>{el.position}</th>
                        <th>{el.team.name}</th>
                        <th>{el.won}</th>
                        <th>{el.draw}</th>
                        <th>{el.lost}</th>
                        <th>{el.points}</th>
                    </tr>
                );
            });
            if(this.state.finished){
                return (
                    <div className={"soccerTable"}>
                        <table>
                            <tbody>
                            <tr>
                                <th>Position</th>
                                <th>Name</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>Pts</th>
                            </tr>
                            {arrayLi}
                            </tbody>
                        </table>
                    </div>

                );
            }
            return <div className={"wait"}>
                <h1>Please wait...</h1>
                <div className={"circle"}></div>
            </div>
        }
    }


    class PremierLeague extends React.Component {

        render(){
            return <League id={2021}/>
        }
    }

    class SerieA extends React.Component {

        render(){
            return <League id={2019}/>
        }
    }

    class Bundesliga extends React.Component {

        render(){
            return <League id={2002}/>
        }
    }

    class TeamInfo extends React.Component {

        constructor(props){
            super(props);

            this.state = {
                teamInfo: null,
                loaded: false,
                id: this.props.id
            }
        }

        componentDidMount(){
            fetch(`https://api.football-data.org/v2/teams/${this.state.id}`, {
                method: 'GET',
                headers: { 'X-Auth-Token': 'f0ffb8f0ea184c14ae68e2cdf564428b' }
            })
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        teamInfo: data,
                        loaded: true,
                    });
                });
        }

        render(){
            if(this.state.loaded){
                const style = {
                    backgroundImage: `url(${this.state.teamInfo.crestUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    width: "300px",
                    height: "300px",
                    display: "inline-block"
                }

                const secondStyle = {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }
                const defender = this.state.teamInfo.squad.map(el => {
                    if(el.position==="Defender"){
                        return <li key={el.id}>{el.name}</li>
                    }
                    return null;
                });
                const goalkeeper = this.state.teamInfo.squad.map(el => {
                    if(el.position==="Goalkeeper"){
                        return <li key={el.id}>{el.name}</li>
                    }
                    return null;
                });
                const midfilder = this.state.teamInfo.squad.map(el => {
                    if(el.position==="Midfielder"){
                        return <li key={el.id}>{el.name}</li>
                    }
                    return null;
                });
                const attacker = this.state.teamInfo.squad.map(el => {
                    if(el.position==="Attacker"){
                        return <li key={el.id}>{el.name}</li>
                    }
                    return null;
                });
                const padding = {
                    paddingBottom: "10px",
                    paddingTop: "10px",
                }

                const paddingRight = {
                    paddingRight: "20px",
                }


                return(
                    <div className={"teamInfo"}>
                        <div className={"flex"}>
                            <div style={style}></div>
                            <div style={secondStyle}>
                                <h3>Team name: {this.state.teamInfo.name}</h3>
                                <h3>Team colors: {this.state.teamInfo.clubColors}</h3>
                                <h3>Founded: {this.state.teamInfo.founded}</h3>
                                <h5>Address: {this.state.teamInfo.address}</h5>
                                <h5>Phone: {this.state.teamInfo.phone}</h5>
                                <h5>email: {this.state.teamInfo.email}</h5>
                                <h5><a href={this.state.teamInfo.website}>{this.state.teamInfo.website}</a></h5>
                            </div>
                        </div>
                        <div>
                            <h1>2018/2019 Squad</h1>
                            <div>
                                <div className={"squad"} style={padding}>
                                    <div style={paddingRight}>
                                        <h2>Goalkeepers</h2>
                                        <ul className={"squadList"}>
                                            {goalkeeper}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2>Defenders</h2>
                                        <ul className={"squadList"}>
                                            {defender}
                                        </ul>
                                    </div>

                                </div>
                                <div className={"squad"} style={padding}>
                                    <div style={paddingRight}>
                                        <h2>Midfilders</h2>
                                        <ul className={"squadList"}>
                                            {midfilder}
                                        </ul>
                                    </div>
                                    <div>
                                        <h2>Attackers</h2>
                                        <ul className={"squadList"}>
                                            {attacker}
                                        </ul>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                );
            }

            return <div className={"wait"}>
                <h1>Please wait...</h1>
                <div className={"circle"}></div>
            </div>
        }
    }


    class Home extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                leagueArray: [],
                leagueName: "Premier League",
                teamID: 1044,
                teamName: "AFC Bournemouth",
                teamArray: [],
            }
        }


        componentDidMount(){
            fetch(`https://api.football-data.org/v2/competitions/2021/standings`, {
                method: 'GET',
                headers: { 'X-Auth-Token': 'f0ffb8f0ea184c14ae68e2cdf564428b' }
            })
                .then(r => r.json())
                .then(data => {
                    const teamArray = data.standings[0].table.map(el=>{
                        return {
                            name: el.team.name,
                            key: el.team.id,
                        }
                    });
                    this.setState({
                        leagueArray: data.standings[0].table,
                        teamArray: teamArray,
                    });
                });
        }


        handleLeagueChange = e => {
            this.setState({
                leagueName: e.target.value,
            });
            const leagueName=e.target.value;
            let leagueID;
            if(leagueName==="Premier League"){
                leagueID= 2021;
            } else if (leagueName === "Serie A") {
                leagueID=2019;
            } else {
                leagueID=2002;
            }
            fetch(`https://api.football-data.org/v2/competitions/${leagueID}/standings`, {
                method: 'GET',
                headers: { 'X-Auth-Token': 'f0ffb8f0ea184c14ae68e2cdf564428b' }
            })
                .then(r => r.json())
                .then(data => {
                    const teamArray = data.standings[0].table.map(el=>{
                        return {
                            name: el.team.name,
                            key: el.team.id,
                        }
                    });
                    this.setState({
                        leagueArray: data.standings[0].table,
                        teamArray: teamArray,
                    });
                });
        }


        handleTeamChange = e => {
            this.setState({
                teamName: e.target.value,
            });

            this.state.teamArray.forEach(el => {
                if(el.name === e.target.value){
                    this.setState({
                       teamID: el.key,
                    });
                }
            });
        }



        render(){
            this.state.leagueArray.sort((a,b)=>{
                if(a.team.name < b.team.name) return -1;
                if(a.team.name > b.team.name) return 1;
                return 0;
            })
            const teamOptions = this.state.leagueArray.map(el=>{
                return <option
                    key={el.team.id}
                    value={el.team.name}>{el.team.name}</option>;
            });

            return (
                <div className={"playerStats"}>
                    <h1>Check info about your team!</h1>
                    <h3>Choose league:</h3>
                    <select
                        value={this.state.leagueName}
                        onChange={this.handleLeagueChange}>
                        <option value="Premier League">Premier League</option>
                        <option value="Serie A">Serie A</option>
                        <option value="Bundesliga">Bundesliga</option>
                    </select>
                    <h3>Choose Team:</h3>
                    <select
                        value={this.state.teamName}
                        onChange={this.handleTeamChange}
                    >
                        {teamOptions}
                    </select>
                    <TeamInfo id={this.state.teamID}/>
                </div>
            );
        }
    }


    class Navigation extends React.Component{
        render(){
            return (
                <ul className={"navigation"}>
                    <li>
                        <NavLink exact to="/"
                                activeStyle={activeLink}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/england"
                                 activeStyle={activeLink}
                        >Premier League</NavLink>
                    </li>
                    <li>
                        <NavLink to="/italy"
                                 activeStyle={activeLink}
                        >Serie A</NavLink>
                    </li>
                    <li>
                        <NavLink to="/germany"
                                 activeStyle={activeLink}
                        >Bundesliga</NavLink>
                    </li>
                </ul>
            );
        }
    }



    class App extends React.Component {
        render() {
            return (
                <HashRouter>
                    <div>
                        <Navigation/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/england" component={PremierLeague}/>
                            <Route path="/italy" component={SerieA}/>
                            <Route path="/germany" component={Bundesliga}/>
                        </Switch>
                    </div>
                </HashRouter>
            );

        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );

});

const activeLink = {
    color:'crimson',
};