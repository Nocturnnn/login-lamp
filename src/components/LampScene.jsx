import { useRef, useState } from 'react';

const MAX_PULL_DISTANCE = 26;

function LampScene({ interactionCount, isLightOn, onToggleLight }) {
  const [isPulling, setIsPulling] = useState(false);
  const pullButtonRef = useRef(null);
  const pointerStart = useRef(null);
  const pullDistance = useRef(0);

  const swingAnimationName =
    interactionCount === 0
      ? 'none'
      : interactionCount % 2 === 0
        ? 'lamp-swing-a'
        : 'lamp-swing-b';

  const ropeAnimationName =
    interactionCount === 0
      ? 'none'
      : interactionCount % 2 === 0
        ? 'rope-tug-a'
        : 'rope-tug-b';

  const applyPullOffset = (distance) => {
    pullButtonRef.current?.style.setProperty('--pull-shift', `${distance}px`);
  };

  const releasePull = (pointerTarget, pointerId) => {
    pointerTarget.releasePointerCapture?.(pointerId);
    pointerStart.current = null;
    pullDistance.current = 0;
    applyPullOffset(0);
    setIsPulling(false);
    onToggleLight();
  };

  const handlePointerDown = (event) => {
    pointerStart.current = event.clientY;
    pullDistance.current = 0;
    applyPullOffset(0);
    setIsPulling(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (pointerStart.current === null) {
      return;
    }

    const distance = Math.max(
      0,
      Math.min(MAX_PULL_DISTANCE, event.clientY - pointerStart.current),
    );

    pullDistance.current = distance;
    applyPullOffset(distance);
  };

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) {
      return;
    }

    releasePull(event.currentTarget, event.pointerId);
  };

  const handlePointerCancel = (event) => {
    pointerStart.current = null;
    pullDistance.current = 0;
    applyPullOffset(0);
    setIsPulling(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    onToggleLight();
  };

  return (
    <section className="scene-panel">
      <div className="scene-panel__copy">
        <span className="scene-panel__eyebrow">Acesso Cinemático</span>
        <h1>Puxe a corda e revele a sala.</h1>
        <p>
          A lâmpada define toda a atmosfera. Acenda para enxergar tudo com
          clareza ou mantenha o formulário quase dissolvido na sombra.
        </p>
      </div>

      <div
        className={`scene__fixture ${isLightOn ? 'scene__fixture--on' : ''}`}
        style={{ animationName: swingAnimationName }}
      >
        <div className="scene__canopy" aria-hidden="true" />
        <div className="scene__cord" aria-hidden="true" />

        <div className="scene__lamp-body" aria-hidden="true">
          <div className="scene__lamp-cap" />
          <div className="scene__shade">
            <div className="scene__shade-inner" />
            <div className="scene__bulb-shell">
              <div className="scene__bulb" />
              <div className="scene__filament" />
            </div>
          </div>
          <div className="scene__light-cone" />
          <div className="scene__light-pool" />
        </div>

        <button
          aria-label={isLightOn ? 'Apagar a lâmpada' : 'Acender a lâmpada'}
          aria-pressed={isLightOn}
          className={`scene__pull ${isPulling ? 'scene__pull--active' : ''}`}
          onKeyDown={handleKeyDown}
          onPointerCancel={handlePointerCancel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          ref={pullButtonRef}
          style={{ animationName: ropeAnimationName }}
          type="button"
        >
          <span className="scene__pull-line" aria-hidden="true" />
          <span className="scene__pull-knob" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

export default LampScene;
