
import React from 'react';
import TaskColumn from './TaskColumn';

const KanbanBoard: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <TaskColumn title="To do" count={0} />
      <TaskColumn title="In progress" count={0} />
      <TaskColumn title="Completed" count={0} />
    </div>
  );
};

export default KanbanBoard;
