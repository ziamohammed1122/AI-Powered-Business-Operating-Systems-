import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Columns3, Sparkles, Clock, Tag, AlertCircle, GripVertical } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_TASKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Task } from '@/types';

const COLUMNS: { id: Task['status']; label: string; color: string }[] = [
  { id: 'backlog', label: 'Backlog', color: 'text-gray-400' },
  { id: 'todo', label: 'To Do', color: 'text-blue-400' },
  { id: 'in-progress', label: 'In Progress', color: 'text-amber-400' },
  { id: 'review', label: 'Review', color: 'text-purple-400' },
  { id: 'done', label: 'Done', color: 'text-emerald-400' },
];

const priorityColors: Record<string, string> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
  urgent: 'danger',
};

const TasksPage: React.FC = () => {
  const [view, setView] = useState('kanban');

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Tasks"
        description="Manage your team's tasks with AI-powered suggestions"
        actions={
          <div className="flex items-center gap-3">
            <Tabs
              tabs={[
                { id: 'kanban', label: 'Board', icon: <Columns3 className="w-3.5 h-3.5" /> },
                { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-3.5 h-3.5" /> },
              ]}
              activeTab={view}
              onChange={setView}
            />
            <Button icon={<Plus className="w-4 h-4" />}>Add Task</Button>
          </div>
        }
      />

      {view === 'kanban' ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => {
            const tasks = MOCK_TASKS.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="flex-shrink-0 w-72">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-sm font-semibold', col.color)}>{col.label}</span>
                    <span className="text-xs text-gray-600 bg-white/[0.05] px-1.5 py-0.5 rounded light:bg-gray-100">{tasks.length}</span>
                  </div>
                </div>
                <div className="space-y-3 kanban-column">
                  {tasks.map((task, i) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card padding="sm" className="cursor-grab">
                        <div className="flex items-start gap-2 mb-2">
                          <GripVertical className="w-4 h-4 text-gray-600 shrink-0 mt-0.5 cursor-grab" />
                          <p className="text-sm font-medium text-white light:text-gray-900 flex-1">{task.title}</p>
                        </div>
                        {task.description && (
                          <p className="text-xs text-gray-500 mb-3 ml-6 line-clamp-2">{task.description}</p>
                        )}
                        {task.aiSuggestion && (
                          <div className="ml-6 mb-3 p-2 rounded-lg bg-primary-600/10 border border-primary-600/20 flex items-start gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-primary-300">{task.aiSuggestion}</p>
                          </div>
                        )}
                        <div className="ml-6 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant={priorityColors[task.priority] as any} size="sm">
                              {task.priority === 'urgent' && <AlertCircle className="w-3 h-3 mr-0.5" />}
                              {task.priority}
                            </Badge>
                          </div>
                          {task.assignee && <Avatar name={task.assignee} size="sm" />}
                        </div>
                        {task.dueDate && (
                          <div className="ml-6 mt-2 flex items-center gap-1 text-[10px] text-gray-500">
                            <Clock className="w-3 h-3" />
                            Due: {task.dueDate}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400 light:text-gray-600">Calendar view coming soon</p>
            <p className="text-xs text-gray-600 mt-1">Switch to Board view to manage tasks</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TasksPage;
