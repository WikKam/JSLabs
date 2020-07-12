function onClick(){
    let x = document.forms[0].elements.pole_tekstowe.value;
    console.log(typeof x); //zawsze string, prawdopodobnie powodowane przez parametr type
}

console.log('Tekst 1'); //w konsoli
window.alert('Tekst 2'); //w popupie
document.write('Tekst 3'); //w zawartości dokumentu


  /*let temp = window.prompt("Tekst1","Tekst2"); //Nazwa okienka, placeholder w textboxie
  console.log(typeof temp);//zawsze string, chyba, że wciśnięte anuluj, wtedy object
*/