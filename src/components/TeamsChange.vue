<template>
  <div id="float"> <!-- this div is vital, code breaks otherwise -->
    <table v-if="!isHidden" id="teamsTabel">
      <tr>
        <th>Team name</th>
        <th>Wins</th>
        <th>Draws</th>
        <th>Losses</th>
        <th>Points</th>
        <th></th>
      </tr>

      <tr v-for="team in teams">
        <td>{{ team.id }}. {{team.name}}</td>
        <td><input type="number" min="1" v-model:value="team.wins"/></td>
        <td><input type="number" min="1" v-model:value="team.draws"/></td>
        <td><input type="number" min="1" v-model:value="team.losses"/></td>
        <td><input type="number" min="1" v-model:value="team.points"/></td>
        <td><button id="saveButton" v-on:click="updateTeams(team.id, team.name, team.wins, team.draws, team.losses, team.points)">Save</button></td>
      </tr>
    </table>
    <br>
    <table id="teamsAddTabel">
      <tr>
        <th>Team name</th>
        <th>Wins</th>
        <th>Draws</th>
        <th>Losses</th>
        <th>Points</th>
        <th></th>
      </tr>
      <tr>
        <td><input type="text" id="teamName" value="Team name"></td>
        <td><input type="number" id="teamWins" min="1" value="1"/></td>
        <td><input type="number" id="teamDraws" min="1" value="1"/></td>
        <td><input type="number" id="teamLosses" min="1" value="1"/></td>
        <td><input type="number" id="teamPoints" min="1" value="1"/></td>
        <td><button id="addButton" v-on:click="addTeams()">Add</button></td>
      </tr>
    </table>

    <button class="toggleButton" v-on:click="isHidden = !isHidden">Show / Hide</button>

    <label class="switch"><input id="deleteCheckbox" type="checkbox" v-on:click="deleteTeams()"><span class="slider"></span></label>
    <span>{{ error }}</span>
  </div>
</template>

// Data Fetching in vue-router
// source: https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation

<script>
  export default {
    data () {
      return {
        loading: false,
        post: null,
        error: null,
        status : '',
        teams: [],
        isHidden: false
      }
    },
    /*
      mounted is equivalent aan onload in JS
      mounted() wordt aangeroepen nadat het DOM is gemount (geladen)
      source: https://stackoverflow.com/a/55678324/12308353
      */
    mounted () { //created works too, there's prob a diff tho
      // fetch the data when the view is created and the data is
      // already being observed
      this.fetchTeams()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchTeams'
    },
    methods: {
      fetchTeams () {
        let url = 'http://localhost:3000/teams/';
        this.teams=[];
        fetch(url)
                .then((response) => {
                  if (response.status == 200) {
                    return response.json();
                  } else {
                    throw `error with status ${response.status}`;
                  }
                })
                .then((teams) => {
                  this.teams = teams;
                })
                .catch((error) => {
                  this.error = error;
                });
      },
      addTeam: function (name, wins, draws, losses, points) {
        this.status = "";
        this.error = "";
        let url = 'http://localhost:3000/teams/';
        let team = {name: name,
          wins: wins,
          draws: draws,
          losses: losses,
          points: points};
        fetch(url,
                {
                  method: "POST",
                  body: JSON.stringify(team),
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                })
                .then((response) => {
                  if (response.status == 200 || response.status == 201) {
                    return response.json();
                  } else {
                    throw `error with status ${response.status}`;
                  }
                })
                .then((team) => {
                  this.teams.push(team);
                  this.status = `added ${team.id} ${team.name} ${team.wins} ${team.draws} ${team.losses} ${team.points}`;
                })
                .catch((error) => {
                  this.error = error;
                });
      },
      addTeams:function () {
        let teamName = document.getElementById("teamName").value;
        let teamWins = document.getElementById("teamWins").value;
        let teamDraws = document.getElementById("teamDraws").value;
        let teamLosses = document.getElementById("teamLosses").value;
        let teamPoints = document.getElementById("teamPoints").value;
        this.addTeam(teamName, teamWins, teamDraws, teamLosses, teamPoints);
      },
      updateTeams: function (id, name, wins, draws, losses, points) {
        this.status = "";
        this.error = "";
        let url = 'http://localhost:3000/teams/';
        let team = {name: name,
          wins: wins,
          draws: draws,
          losses: losses,
          points: points};
        fetch(url + id,
                {
                  method: "PUT",
                  body: JSON.stringify(team),
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
                })
                .then((response) => {
                  if (response.status == 200 || response.status == 201) {
                    return response.json();
                  } else {
                    throw `error with status ${response.status}`;
                  }
                })
                .then((team) => {
                  this.status = `updated ${team.id} ${team.name} ${team.wins} ${team.draws} ${team.losses} ${team.points}`;
                })
                .catch((error) => {
                  this.error = error;
                });
      },
      deleteTeam: function (id) {
        this.status = "";
        this.error = "";
        let url = 'http://localhost:3000/teams/';
        fetch(url + id,
                {
                  method: "DELETE",
                })
                .then((response) => {
                  if (response.status == 200 || response.status == 201) {
                    return response.json();
                  } else {
                    throw `error with status ${response.status}`;
                  }
                })
                .then((team) => {
                  this.status = `team ${id} deleted`;
                })
                .catch((error) => {
                  this.error = error;
                });
      },
      /*checkbox ophalen, kijken of die checked is. Zo ja, dan word er een nieuwe checkbox gemaakt voor iedere rij van de table. Als een nieuwe aangemaakte checkbox aangevinkt wordt, dan wordt het team van die checkbox verwijderd*/
      deleteTeams: function(){
        let deleteCheckbox = document.getElementById("deleteCheckbox");
        let table = document.getElementById("teamsTabel");
        if(deleteCheckbox.checked){
          for(let i = 0, row; row = table.rows[i]; i++){
            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            /*checkbox.name = "name";
            checkbox.value = "value";
            checkbox.id = "id";*/
            let newCheckBoxCell = row.insertCell(0);
            newCheckBoxCell.appendChild(checkbox);
          }
        }else{
          for(let i = 0, row; row = table.rows[i]; i++){
            let checkbox = row.cells[0].firstChild;
            if(checkbox.checked){
              let teamName = row.cells[1].innerHTML;
              let id = teamName.substr(0, teamName.indexOf('.'));
              this.deleteTeam(id);
            }
            row.deleteCell(0);
          }
        }
      }
    },
    computed: {
      // sort teams-array based on points
      sortedArray: function() {
        function compare(a, b) {
          if (Number(a.points) > Number(b.points))
            return -1;
          if (Number(a.points) < Number(b.points))
            return 1;
          return 0;
        }
        return this.teams.sort(compare);
      }
    }
  }
</script>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-top: 5pt;
    margin-left: 10pt;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  input:checked + .slider {
    background-color: #B73434;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  .toggleButton {
    width: 100%;
    padding: 14px 16px;
    color: white;
    background-color: #393E46;
    border: none;
    transition: 0.1s;
    font-size: 12pt;
  }
  .toggleButton:hover {
    background-color: #B73434;
  }
  .toggleButton:focus {
    outline: none;
  }
  #float {
    width: 100%;
    float: left;
  }
</style>