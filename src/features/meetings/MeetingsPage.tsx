import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Clock, Users, CheckCircle2, Circle, Calendar, Plus, FileText, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { MOCK_MEETINGS } from '@/lib/constants';
import { formatDateTime, getRelativeTime } from '@/lib/utils';

const MeetingsPage: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<string>('1');
  const active = MOCK_MEETINGS.find((m) => m.id === selectedMeeting);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Meeting Assistant"
        description="AI-powered meeting summaries, transcripts, and action items"
        actions={<Button icon={<Plus className="w-4 h-4" />}>Schedule Meeting</Button>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting List */}
        <div className="space-y-3">
          {MOCK_MEETINGS.map((meeting, i) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                hover
                onClick={() => setSelectedMeeting(meeting.id)}
                className={selectedMeeting === meeting.id ? 'ring-1 ring-primary-600/50' : ''}
                padding="sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0 light:bg-gray-100">
                    <Video className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate light:text-gray-900">{meeting.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDateTime(meeting.date)}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge
                        variant={meeting.status === 'completed' ? 'success' : meeting.status === 'upcoming' ? 'info' : 'danger'}
                        size="sm"
                      >
                        {meeting.status}
                      </Badge>
                      <span className="text-[10px] text-gray-500">{meeting.duration}min</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Meeting Detail */}
        <div className="lg:col-span-2 space-y-6">
          {active ? (
            <motion.div key={active.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Header */}
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white light:text-gray-900">{active.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDateTime(active.date)}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {active.duration} minutes</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {active.attendees.length} attendees</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {active.attendees.map((a) => (
                        <Avatar key={a} name={a} size="sm" />
                      ))}
                    </div>
                  </div>
                  <Badge variant={active.status === 'completed' ? 'success' : 'info'}>{active.status}</Badge>
                </div>
              </Card>

              {/* Summary */}
              {active.summary && (
                <Card>
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2 light:text-gray-900">
                    <FileText className="w-4 h-4 text-primary-400" /> Summary
                  </h4>
                  <p className="text-sm text-gray-300 leading-relaxed light:text-gray-600">{active.summary}</p>
                </Card>
              )}

              {/* Action Items */}
              {active.actionItems && active.actionItems.length > 0 && (
                <Card>
                  <h4 className="text-sm font-semibold text-white mb-4 light:text-gray-900">Action Items</h4>
                  <div className="space-y-3">
                    {active.actionItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] light:bg-gray-50">
                        {item.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-200 light:text-gray-700'}`}>
                            {item.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge size="sm">{item.assignee}</Badge>
                            {item.dueDate && <span className="text-[10px] text-gray-500">Due: {item.dueDate}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Follow-ups */}
              <Card>
                <h4 className="text-sm font-semibold text-white mb-3 light:text-gray-900">Follow-ups</h4>
                <div className="space-y-2">
                  {['Send summary to all attendees', 'Schedule follow-up meeting for next week', 'Update project timeline'].map((fu, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400 light:text-gray-600">
                      <ArrowRight className="w-3.5 h-3.5 text-primary-400" />
                      {fu}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Select a meeting to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;
