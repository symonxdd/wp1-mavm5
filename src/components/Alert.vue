<template>
  <div class="alert">
    <span class="closeButton" onclick="this.parentElement.style.display='none';">&times;</span>
    <b>Due to the Corona pandemic the current Jupiler Pro League is postponed.</b>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
    padding: 20px;
    background-color: #F9BA45; /* orange */
    color: #393E46;
}

/* The close button */
.closeButton {
    color: white;
    float: right;
    font-size: 28px;
    line-height: 20px;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closeButton:hover {
    color: #393E46;
}
</style>
