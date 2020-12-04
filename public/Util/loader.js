"use strict";

let UlkaUtility = {
  appendLoader: function() {
    let styles = `.loader {
      display: flex;
      background: #000000;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0%;
      z-index: 0;
      opacity: 0;
      transition: opacity 0.6s;
    }

    .loader>span {
      display: inline-block;
      background-color: purple;
      width: 0px;
      height: 0px;
      border-radius: 50%;
      margin: 0 8px;
      transform: translate3d(0);
      animation: bounce 0.6s infinite alternate;
    }

    .loader>span:nth-child(2) {
      background-color: palevioletred;
      animation-delay: 0.2s;
    }

    .loader>span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      to {
        width: 16px;
        height: 16px;
        transform: translate3d(0, -16px, 0);
      }
    }`;

    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    let div = document.createElement("div");
    div.setAttribute("class", "loader");
    div.innerHTML = "<span></span> <span></span> <span></span>";
    document.body.appendChild(div);

    this.showLoad();
  },

  showLoad: function() {
    let load = document.getElementsByClassName("loader")[0];
    load.style.opacity = "1";
    load.style.zIndex = "100000";
  },

  hideLoad: function() {
    let load = document.getElementsByClassName("loader")[0];
    load.style.opacity = "0";
    setTimeout(function() {
      load.style.zIndex = "0";
    }, 100);
  }
};