import { useRef } from 'react';

// Arrastrar con el mouse para desplazar el contenedor (como un lienzo).
export function usePan() {
  const ref = useRef(null);
  const s = useRef({ down: false, moved: false, x: 0, y: 0, sl: 0, st: 0 });

  const onPointerDown = (e) => {
    if (e.button !== 0 || !ref.current) return;
    const el = ref.current;
    s.current = { down: true, moved: false, x: e.clientX, y: e.clientY, sl: el.scrollLeft, st: el.scrollTop };
  };
  const onPointerMove = (e) => {
    const st = s.current;
    const el = ref.current;
    if (!st.down || !el) return;
    const dx = e.clientX - st.x;
    const dy = e.clientY - st.y;
    if (!st.moved && Math.hypot(dx, dy) > 6) {
      st.moved = true;
      el.setPointerCapture?.(e.pointerId);
      el.classList.add('panning');
    }
    if (st.moved) {
      el.scrollLeft = st.sl - dx;
      el.scrollTop = st.st - dy;
    }
  };
  const end = () => {
    s.current.down = false;
    ref.current?.classList.remove('panning');
  };
  return { ref, handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end } };
}
