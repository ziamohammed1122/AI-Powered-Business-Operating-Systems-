import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, FileText, File, Sheet, Presentation, Eye, MoreVertical, Clock, User, Tag } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MOCK_DOCUMENTS } from '@/lib/constants';
import { cn, getRelativeTime } from '@/lib/utils';

const fileIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-6 h-6 text-red-400" />,
  word: <File className="w-6 h-6 text-blue-400" />,
  excel: <Sheet className="w-6 h-6 text-emerald-400" />,
  csv: <Sheet className="w-6 h-6 text-emerald-400" />,
  powerpoint: <Presentation className="w-6 h-6 text-amber-400" />,
};

const KnowledgePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const filtered = MOCK_DOCUMENTS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        title="Knowledge Base"
        description="Upload and search across all your business documents"
        actions={
          <Button icon={<Upload className="w-4 h-4" />} onClick={() => setShowUpload(true)}>
            Upload Document
          </Button>
        }
      />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Semantic search across all documents..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600/50 light:bg-white light:border-gray-200 light:text-gray-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] flex items-center justify-center light:bg-gray-100">
                    {fileIcons[doc.type]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate light:text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">{(doc.size / 1_000_000).toFixed(1)} MB</p>
                  </div>
                </div>
                <Badge
                  variant={doc.status === 'ready' ? 'success' : doc.status === 'processing' ? 'warning' : 'danger'}
                  size="sm"
                >
                  {doc.status}
                </Badge>
              </div>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-1"><User className="w-3 h-3" /> {doc.uploadedBy}</div>
                <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {getRelativeTime(doc.uploadedAt)}</div>
                {doc.pages && <div>📄 {doc.pages} pages · v{doc.version}</div>}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {doc.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-white/[0.03] text-[10px] text-gray-500 light:bg-gray-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center gap-2 light:border-gray-200">
                <Button variant="ghost" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>Preview</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Upload Document">
        <div className="border-2 border-dashed border-white/[0.1] rounded-xl p-10 text-center light:border-gray-300">
          <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
          <p className="text-sm text-gray-300 mb-1 light:text-gray-700">Drag & drop files here, or click to browse</p>
          <p className="text-xs text-gray-500">Supports PDF, Word, Excel, CSV, PowerPoint</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setShowUpload(false)}>Upload Files</Button>
        </div>
      </Modal>
    </div>
  );
};

export default KnowledgePage;
