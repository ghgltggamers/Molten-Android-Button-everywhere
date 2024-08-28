/*

MOLTEN ANDROID BUTTON SPECIFICATION 2024
COPYRIGHT ©️ GHGLTGGAMER

This specification will add the ripple effect to every single html button element you will create without needed to included sny external css file becsuse this is onefile

*/
  
var molten_android_is_css_filled = false;

if (molten_android_is_css_filled === false){
  document.head.innerHTML += `
    <style>
      button {
  position: relative;
  overflow: hidden;
  --ripple-color: rgba(0, 0, 0, 0.5); /* Default ripple color */
  user-select: none;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple-animation 900ms linear;
  background-color: var(--ripple-color);
  box-shadow: 0 0 30px 30px var(--ripple-color);
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
    </style>
  `;
  molten_android_is_css_filled = true;
}
else {
  
}

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

  if (detectDevice() === 'Android') {
    button.addEventListener('touchstart', createRipple);
  }

  else {
    button.addEventListener('mousedown', createRipple);
  }

});
