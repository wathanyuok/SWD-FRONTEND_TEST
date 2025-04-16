"use client";
import React, { useState } from 'react';
import styles from './layout-style.module.scss';

type ShapeType = 'trapezoid' | 'rectangle' | 'parallelogram' | 'square' | 'circle' | 'ellipse';

type Shape = {
  id: number;
  type: ShapeType;
  position: { x: number; y: number };
  color: string;
};

const initialShapes: Shape[] = [
  { id: 1, type: 'trapezoid', position: { x: 0, y: 0 }, color: 'gray' },
  { id: 2, type: 'rectangle', position: { x: 1, y: 0 }, color: 'gray' },
  { id: 3, type: 'parallelogram', position: { x: 2, y: 0 }, color: 'gray' },
  { id: 4, type: 'square', position: { x: 0, y: 1 }, color: 'gray' },
  { id: 5, type: 'circle', position: { x: 1, y: 1 }, color: 'gray' },
  { id: 6, type: 'ellipse', position: { x: 2, y: 1 }, color: 'gray' },
];

const LayoutStyleClient = () => {
  const [shapes, setShapes] = useState<Shape[]>(initialShapes);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [activeShapeId, setActiveShapeId] = useState<number | null>(null);

  const moveShapeLeft = () => {
    setShapes(prev => {
      const newShapes = [...prev];
      const rows: { [key: number]: Shape[] } = {};
      newShapes.forEach(shape => {
        const row = shape.position.y;
        if (!rows[row]) rows[row] = [];
        rows[row].push(shape);
      });
      Object.keys(rows).forEach(row => {
        const rowShapes = rows[+row].sort((a, b) => a.position.x - b.position.x);
        const firstPos = rowShapes[0].position.x;
        for (let i = 0; i < rowShapes.length - 1; i++) {
          rowShapes[i].position.x = rowShapes[i + 1].position.x;
        }
        rowShapes[rowShapes.length - 1].position.x = firstPos;
      });
      return newShapes;
    });
    setActiveButton('left');
    setTimeout(() => setActiveButton(null), 300);
  };

  const moveShapeRight = () => {
    setShapes(prev => {
      const newShapes = [...prev];
      const rows: { [key: number]: Shape[] } = {};
      newShapes.forEach(shape => {
        const row = shape.position.y;
        if (!rows[row]) rows[row] = [];
        rows[row].push(shape);
      });
      Object.keys(rows).forEach(row => {
        const rowShapes = rows[+row].sort((a, b) => a.position.x - b.position.x);
        const lastPos = rowShapes[rowShapes.length - 1].position.x;
        for (let i = rowShapes.length - 1; i > 0; i--) {
          rowShapes[i].position.x = rowShapes[i - 1].position.x;
        }
        rowShapes[0].position.x = lastPos;
      });
      return newShapes;
    });
    setActiveButton('right');
    setTimeout(() => setActiveButton(null), 300);
  };

  const movePosition = () => {
    setShapes(prev =>
      prev.map(shape => ({
        ...shape,
        position: {
          ...shape.position,
          y: shape.position.y === 0 ? 1 : 0
        }
      }))
    );
    setActiveButton('position');
    setTimeout(() => setActiveButton(null), 300);
  };

  const randomizePosition = (id: number) => {
    setActiveShapeId(id);

    setShapes(prev => {
      const newShapes = [...prev];
      const idx = newShapes.findIndex(s => s.id === id);
      let randIdx = idx;
      while (randIdx === idx) {
        randIdx = Math.floor(Math.random() * newShapes.length);
      }
      const temp = newShapes[idx].position;
      newShapes[idx].position = newShapes[randIdx].position;
      newShapes[randIdx].position = temp;
      return newShapes;
    });

    setTimeout(() => setActiveShapeId(null), 300);
  };

  const getShapeAt = (x: number, y: number) =>
    shapes.find(s => s.position.x === x && s.position.y === y);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Layout & Style</div>
      <div className={styles.content}>
        <div className={styles.controlRow}>
          <div className={styles.cardContainer}>
            <div
              className={`${styles.buttonCard} ${activeButton === 'left' ? styles.activeButton : ''}`}
              onClick={moveShapeLeft}
            >
              <div className={styles.triangleLeft}></div>
            </div>
            <div className={styles.buttonLabel}>Move shape</div>
          </div>
          <div className={`${styles.cardContainer} ${styles.controlCenter} ${activeButton === 'position' ? styles.activeButton : ''}`}>
            <div className={`${styles.buttonCard} ${styles.doubleButton}`}>
              <div
                className={styles.triangleUp}
                onClick={movePosition}
              ></div>
              <div
                className={styles.triangleDown}
                onClick={movePosition}
              ></div>
            </div>
            <div className={styles.buttonLabel}>Move position</div>
          </div>
          <div className={styles.cardContainer}>
            <div
              className={`${styles.buttonCard} ${activeButton === 'right' ? styles.activeButton : ''}`}
              onClick={moveShapeRight}
            >
              <div className={styles.triangleRight}></div>
            </div>
            <div className={styles.buttonLabel}>Move shape</div>
          </div>
        </div>
        <div className={`${styles.shapeRow} ${styles.rowCenter}`}>
          {[0, 1, 2].map(x => {
            const shape = getShapeAt(x, 0);
            return (
              <div
                key={`row0-${x}`}
                className={`${styles.shapeCard} ${activeShapeId === shape?.id ? styles.activeShape : ''}`}
                onClick={() => shape && randomizePosition(shape.id)}
              >
                {shape && <div className={styles[shape.type]}></div>}
              </div>
            );
          })}
        </div>
        <div className={`${styles.shapeRow} ${styles.rowBottom}`}>
          {[0, 1, 2].map(x => {
            const shape = getShapeAt(x, 1);
            return (
              <div
                key={`row1-${x}`}
                className={`${styles.shapeCard} ${activeShapeId === shape?.id ? styles.activeShape : ''}`}
                onClick={() => shape && randomizePosition(shape.id)}
              >
                {shape && <div className={styles[shape.type]}></div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LayoutStyleClient;
