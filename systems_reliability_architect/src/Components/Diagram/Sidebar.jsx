import React from 'react';
import { useDnD } from './DnDContext';

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Вы можете перетащить эти узлы на панель справа.</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'is_node')} draggable>
        Элемент ИС
      </div>
    </aside>
  );
};
