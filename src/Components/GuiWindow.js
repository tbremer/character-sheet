import React from 'react';

let curZ = 0;

export default function GuiWindow({ closeDialog, children, title, width, height }) {
  const windowRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const [minimized, setMinimized] = React.useState(false);

  React.useEffect(() => {
    const { current: windowElem } = windowRef;
    const { current: headerElem } = headerRef;
    const offset = { x: 0, y: 0 };
    let prevY;

    function mDown(evt) {
      if (!evt.target.isSameNode(headerElem)) return;
      curZ += 1;
      document.addEventListener('mousemove', mMove);
      document.addEventListener('mouseup', mUp);

      offset.x = windowElem.offsetLeft - evt.clientX;
      offset.y = windowElem.offsetTop - evt.clientY;
      windowElem.style.zIndex = curZ;
    }

    function mMove(evt) {
      evt.preventDefault();
      const bounds = windowElem.getBoundingClientRect();

      windowElem.style.left = `${evt.clientX + offset.x}px`;
      if (bounds.top > 44 || (prevY && evt.clientY > prevY)) {
        windowElem.style.top = `${evt.clientY + offset.y}px`;
      }
      if (bounds.top <= 44 && !prevY) prevY = evt.clientY;
      if (bounds.top > 44 && prevY) prevY = undefined;
    }

    function mUp() {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseup', mUp);
    }

    headerElem.addEventListener('mousedown', mDown);

    return mUp;
  }, [windowRef.current]);

  function minimizeWindow() {
    const elem = windowRef.current;
    const bounds = elem.getBoundingClientRect();
    const parsedHeight = parseInt(height, 10);

    setMinimized(!minimized);

    if (minimized) elem.style.top = bounds.y + parsedHeight / 2 + 'px';
    else elem.style.top = bounds.y + 11 + 'px';
  }

  return (
    <section
      ref={windowRef}
      className="window draggable flex flex-col"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width,
        height: minimized ? 'auto' : height,
        zIndex: curZ,
      }}
    >
      <header ref={headerRef} className="menu-background window-title">
        <div className="window-title__controls window-title__controls--left">
          <button type="button" onClick={closeDialog}>
            <span className="visually-hidden">close</span>
          </button>
        </div>
        <div className="window-title__name pointer-event-off">{title}</div>
        <div className="window-title__controls window-title__controls--right">
          <button type="button" onClick={minimizeWindow}>
            <span className="visually-hidden">minimize window</span>
          </button>
        </div>
      </header>

      {!minimized && (
        <section className="flex-1 overflow-y-auto" style={{ backgroundColor: '#fff' }}>
          {children}
        </section>
      )}
    </section>
  );
}
GuiWindow.defaultProps = { height: '320px', width: '250px' };
