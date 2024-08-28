/*

MOLTEN ANDROID BUTTON SPECIFICATION 2024
COPYRIGHT ©️ GHGLTGGAMER 2024

Include this script file in your html file where you want to use ripple effect on button , Note this will launch ripple to every single button you crrate with button tag of html
If included this file then please also include Molten-Android-Button.css file in order to use the ripple successfully 

*/
document.querySelectorAll('button').forEach(button => {
  const createRipple = (e) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = (e.type === 'mousedown' ? e.clientX : e.touches[0].clientX) - rect.left - size / 2;
    const y = (e.type === 'mousedown' ? e.clientY : e.touches[0].clientY) - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');

    // Use the ripple color defined on the button element, if any
    if (button.style.getPropertyValue('--ripple-color')) {
      ripple.style.setProperty('--ripple-color', button.style.getPropertyValue('--ripple-color'));
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 900); // duration of the ripple animation
  };
  
  function detectDevice() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return 'Android';
  } else if (/windows|macintosh|linux/i.test(userAgent)) {
    return 'PC';
  } else {
    return 'Unknown';
  }
}
  
  if (detectDevice() === 'Android'){
    button.addEventListener('touchstart', createRipple);
  }

  else {
    button.addEventListener('mousedown', createRipple);
  }
  
});
