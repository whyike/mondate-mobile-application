export function whichSubstitute(theKey): number {
    if (theKey.length === 1) {
        return theKey.codePointAt(0);
    }
    switch (theKey) {
        case 'Backspace':
            return 8;
        case 'Tab':
            return 9;
        case 'Enter':
            return 13;
        case 'Alt':
            return 18;
        case 'Escape':
            return 27;
        case 'Delete':
            return 127;
        case 'Unidentified':
    }

    /*** there are many other possible key values https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
     but, AFAIK, there are no unicode code points for them, such as:

     switch (theKey) {
    case "AltGraph":
    case "CapsLock":
    case "Control":
    case "Fn":
    case "FnLock":
    ...

       event.which may output some number for them, but it is not consistent across
       browsers/machines and they may overlap with other code points. For example:

  case "ArrowUp":
    return 38; //this overlaps with "&"
  case "ArrowLeft":
    return 37; //this overlaps with "%"
  case "ArrowDown":
    return 40; //this overlaps with "("
  case "ArrowRight":
    return 39; //this overlaps with "'"

     ***/

    return 0;
}
