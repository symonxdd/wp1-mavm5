<template>
  <div> <!-- this div is vital, code breaks otherwise -->
    <img id="logo" src="@/assets/jupiler-logo.png"/>
    <p id="caption">Jupiler Pro League</p>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo {
    float: left;
    width: 12%;
    height: auto;
}

#caption {
  font-weight: bold;
  font-size: 30px;
  color: #393E46;
  float: left;
  padding-top: 50px;
}
</style>
