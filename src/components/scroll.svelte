<script>

    export let color = "#FFF3E2";

</script>




<div>
    <div class="scroll" style="color: {color}" id="right">SCROLLDOWN</div>
    <span id="rightSpan" style="color: {color}">-></span>

    <div class="scroll" style="color: {color}" id="left">SCROLLDOWN</div>
    <span id="leftSpan" style="color: {color}">-></span>
  </div>
  
  
  
  <style>
    .scroll {
        position: absolute;
        bottom: 15px;
        animation: 0.7s infinite alternate jump;
		letter-spacing: 4.8px;
		font-size: max(0.65vw, 10px);
        writing-mode: vertical-lr;
    }

    span {
        writing-mode: vertical-lr;
        position: absolute;
        bottom: 0;
        font-size: max(0.75vw, 12px);
    }

      #left {
          right: 10px;
      }
  
      #right {
          left: 10px;
      }

      #leftSpan {
          left: 9px;
      }

        #rightSpan {
            right: 9px;
        }
  
  
    @keyframes jump {
          from {
              transform: translateY(-15px);
          }
          to {
              transform: translateY(0px);
          }
      }
  
      @media screen and (max-width: 428px) {
          
          .scroll {
              font-size: 5px;
          }

          span {
              font-size: 7px;
          }

          #right {
              left: 2px;
          }

          #left {
              right: 2px;
          }

          #leftSpan {
              left: 0.5px;
          }

          #rightSpan {
              right: 0.5px;
          }
      }
  
  
  </style>