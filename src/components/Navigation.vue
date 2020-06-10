<template>
    <nav id="nav">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/change">Edit</router-link></li>
      </ul>
    </nav>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
    width: 100%;
    float: left;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #393e46;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    transition: 0.1s;
}

li a:hover {
    background-color: #B73434;
}

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
</style>
