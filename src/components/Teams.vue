<template>
<div id="float"> <!-- this div is vital, code breaks otherwise -->
  <table v-if="!isHidden" id="teamsTabel">
    <tr>
      <th>Team name</th>
      <th>Wins</th>
      <th>Draws</th>
      <th>Losses</th>
      <th>Points</th>
    </tr>

    <tr v-cloak v-for="team in sortedArray">
      <td>{{team.name}}</td>
      <td>{{team.wins}}</td>
      <td>{{team.draws}}</td>
      <td>{{team.losses}}</td>
      <td>{{team.points}}</td>
    </tr>
  </table>
  <button class="toggleButton" v-on:click="isHidden = !isHidden">Show / Hide</button>
  <span>{{ error }}</span>
</div>
</template>

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


    // Data Fetching in vue-router
    // source: https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-after-navigation


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
                    this.status = `team ${team.name} with id ${team.id} deleted`;
                })
                .catch((error) => {
                    this.error = error;
                });
        }
  },
  computed: {
        // sort teams-array based on points
        sortedArray: function() {
            function compare(a, b) {
                if (a.points > b.points)
                    return -1;
                if (a.points < b.points)
                    return 1;
                return 0;
            }

            return this.teams.sort(compare);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#teamsTabel {
    border-collapse: collapse;
    width: 100%;
}

#teamsTabel td {
    padding: 7px;
    color: white;
}

/* eerste kolom */
#teamsTabel td:first-child {
    padding: 7px 50px;
}

#teamsTabel tr:nth-child(even) {
    background-color: #C86666;
    transition: 0.2s;
}
#teamsTabel tr:nth-child(odd) {
    background-color: #942E2E;
    transition: 0.2s;
}

#teamsTabel tr:nth-child(odd):hover {
    background-color: #393E46;
}

#teamsTabel tr:nth-child(even):hover {
    background-color: #393E46;
}

#teamsTabel th {
    padding: 12px 7px;
    background-color: #B73434;
    color: white;
    text-align: left;
}

/* eerste kolom van th */
#teamsTabel th:first-child {
    padding: 12px 20px;
}

#teamsAddTabel {
    border-collapse: collapse;
    width: 100%;
}

#teamsAddTabel td {
    padding: 7px;
    color: white;
}

/* eerste kolom */
#teamsAddTabel td:first-child {
    padding: 7px 50px;
}

#teamsAddTabel tr:nth-child(even) {
    background-color: #C86666;
    transition: 0.2s;
}
#teamsAddTabel tr:nth-child(odd) {
    background-color: #942E2E;
    transition: 0.2s;
}

#teamsAddTabel tr:nth-child(odd):hover {
    background-color: #393E46;
}

#teamsAddTabel tr:nth-child(even):hover {
    background-color: #393E46;
}

#teamsAddTabel th {
    padding: 12px 7px;
    background-color: #B73434;
    color: white;
    text-align: left;
}

/* eerste kolom van th */
#teamsAddTabel th:first-child {
    padding: 12px 20px;
}
input {
    width: 50px;
    border: 1px solid white;
    padding: 4px;
    background-color: inherit;
    color: white;
}

#saveButton {
  padding: 6px 10px;
  color: white;
  background-color: #393E46;
  border: none;
  transition: 0.1s;
  font-size: 12pt;
}

#saveButton:hover {
    background-color: #B73434;
}

#saveButton:focus {
    outline: none;
}

#addButton {
  padding: 6px 10px;
  color: white;
  background-color: #393E46;
  border: none;
  transition: 0.1s;
  font-size: 12pt;
}

#addButton:hover {
    background-color: #B73434;
}

#addButton:focus {
    outline: none;
}

.toggleButton {
    width: 150px;
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
