let azure = document.getElementsByClassName("azure")
let border = document.getElementsByClassName("border")
let margin = document.getElementsByClassName("margin")
let aside = document.getElementsByTagName("aside")
let nav = document.getElementsByTagName("nav")
let main = document.getElementsByTagName("main")
let footer = document.getElementsByTagName("footer")
function set(){
    Array.from(azure).forEach(element => {
        element.style.backgroundColor = "#EFF";
    });
    Array.from(border).forEach(element =>{
        element.style.border = "2px solid"
        element.style.boxShadow = "2px 2px 5px #000000"
        element.style.MozBoxShadow = "2px 2px 5px #000000"
        element.style.WebkitboxShadow = "2px 2px 5px #000000"
    })
    Array.from(margin).forEach(element => {
        element.style.margin = "10px 0 10px 0"
    })
    Array.from(aside).forEach(element => {
        element.style.paddingRight = "10%"
        element.style.display = "grid"
        element.style.float = "right"
        element.style.justifySelf = "right"
    })
    Array.from(main).forEach(element => {
        element.style.textAlign = "left"
        element.style.maxWidth = "40%"
    })
    Array.from(footer).forEach(element => {
        element.style.padding = "10px 0 10px 0"
    })
    Array.from(nav).forEach(element => {
        element.style.left = "10px"
        element.style.display = "inline-flex"
        element.style.padding = "5px 5px 0 5px"
    })
}
function unset(){
    Array.from(azure).forEach(e => e.removeAttribute("style"))
    Array.from(border).forEach(e => e.removeAttribute("style"))
    Array.from(margin).forEach(e => e.removeAttribute("style"))
    Array.from(aside).forEach(e => e.removeAttribute("style"))
    Array.from(main).forEach(e => e.removeAttribute("style"))
    Array.from(nav).forEach(e => e.removeAttribute("style"))
    Array.from(footer).forEach(e => e.removeAttribute("style"))
}