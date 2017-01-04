export class MyButton{
  constructor() {
    this.normalBtnValue = 'normal';
    this.smallBtnValue = 'small';
    this.miniBtnValue = 'mini';
    this.mediumBtnValue = 'medium';
    this.largeBtnValue = 'large';
    this.roundedCorner = true;
  }
  attached(){
    $("#button11").ejButton({
      size: "normal",
      showRoundedCorner: true,
      contentType: "imageonly",
      prefixIcon: "e-icon e-uiLight e-handup"
    });

    $("#button21").ejButton({
      showRoundedCorner: true,
      size: "mini"
    });


    $("#button31").ejButton({
      showRoundedCorner: true,
      size: "small"
    });


    $("#button41").ejButton({
      showRoundedCorner: true,
      size: "medium"
    });


    $("#button51").ejButton({
      size: "large",
      showRoundedCorner: true,
      contentType: "textandimage",
      prefixIcon: "e-icon e-uiLight e-handup"
    });
  }
}
