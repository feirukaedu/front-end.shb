import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Plus, Trash2, Calendar, Link2, Database, Search } from 'lucide-react';

export default function IngestPage() {
  const [activeTab, setActiveTab] = useState('upload'); 
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [docNumber, setDocNumber] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [issuer, setIssuer] = useState('Ngân hàng Nhà nước');
  const [relationships, setRelationships] = useState([]);

  const [ingestedDocs, setIngestedDocs] = useState([
    {
      id: 'doc-1', docNumber: '39/2016/TT-NHNN', title: 'Thông tư quy định về hoạt động cho vay',
      effectiveDate: '2017-03-15', status: 'Hết hiệu lực một phần', relationsCount: 2
    },
    {
      id: 'doc-2', docNumber: '41/2016/TT-NHNN', title: 'Thông tư quy định tỷ lệ an toàn vốn',
      effectiveDate: '2020-01-01', status: 'Đang hiệu lực', relationsCount: 1
    },
    {
      id: 'doc-3', docNumber: '06/2023/TT-NHNN', title: 'Sửa đổi bổ sung Thông tư 39',
      effectiveDate: '2023-09-01', status: 'Ngưng hiệu lực một phần', relationsCount: 3
    },
    {
      id: 'doc-4', docNumber: '10/2023/TT-NHNN', title: 'Đình chỉ hiệu lực Thông tư 06',
      effectiveDate: '2023-09-01', status: 'Đang hiệu lực', relationsCount: 1
    }
  ]);

  const relationshipTypes = [
    { value: 'amends', label: 'Sửa đổi / Bổ sung' },
    { value: 'supersedes', label: 'Thay thế hoàn toàn' },
    { value: 'partially_supersedes', label: 'Thay thế một phần' },
    { value: 'references', label: 'Dẫn chiếu tới' }
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setDocTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
    }
  };

  const addRelationship = () => setRelationships([...relationships, { type: 'amends', targetDocId: '', clauses: '' }]);
  const removeRelationship = (index) => setRelationships(relationships.filter((_, i) => i !== index));
  const updateRelationship = (index, field, value) => {
    const updated = [...relationships];
    updated[index][field] = value;
    setRelationships(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !docNumber || !docTitle || !effectiveDate) {
      setErrorMsg('Vui lòng điền đủ thông tin và chọn file.');
      return;
    }
    setErrorMsg('');
    setUploading(true);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setSuccessMsg(`Lưu trữ thành công ${docNumber}`);
            setIngestedDocs([{
              id: `doc-${Date.now()}`, docNumber, title: docTitle,
              effectiveDate, status: expiryDate ? 'Hết hiệu lực' : 'Đang hiệu lực', relationsCount: relationships.length
            }, ...ingestedDocs]);
            setFile(null); setDocNumber(''); setDocTitle(''); setEffectiveDate(''); setExpiryDate(''); setRelationships([]);
          }, 500);
          return 100;
        }
        return prev + 30;
      });
    }, 200);
  };

  return (
    <div className="max-w-6xl w-full mx-auto h-full flex flex-col space-y-4 md:space-y-6 px-4 md:px-8 py-6 md:py-8">
      
      {/* Tab Navigation */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-fit mx-auto md:mx-0">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 md:flex-none justify-center px-4 md:px-6 py-2.5 text-sm font-bold rounded-lg transition-colors flex items-center space-x-2 ${
            activeTab === 'upload' 
              ? 'bg-white dark:bg-slate-700 text-shb-orange dark:text-orange-400 shadow-sm' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Upload className="w-4 h-4" /> <span>Nạp Tài Liệu</span>
        </button>
        <button
          onClick={() => setActiveTab('repository')}
          className={`flex-1 md:flex-none justify-center px-4 md:px-6 py-2.5 text-sm font-bold rounded-lg transition-colors flex items-center space-x-2 ${
            activeTab === 'repository' 
              ? 'bg-white dark:bg-slate-700 text-shb-orange dark:text-orange-400 shadow-sm' 
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Database className="w-4 h-4" /> <span>Kho Dữ Liệu ({ingestedDocs.length})</span>
        </button>
      </div>

      {activeTab === 'upload' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 md:p-8 animate-slideDown max-w-4xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* File Dropzone */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 hover:border-shb-orange dark:hover:border-shb-orange transition-colors bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center cursor-pointer relative">
              <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              {file ? (
                <div className="flex flex-col items-center">
                  <FileText className="w-8 h-8 text-shb-orange mb-2" />
                  <p className="font-bold text-slate-800 dark:text-white">{file.name}</p>
                </div>
              ) : (
                <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center">
                  <Upload className="w-8 h-8 mb-2" />
                  <span className="font-bold">Kéo thả hoặc chọn File</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Số Hiệu</label>
                <input type="text" value={docNumber} onChange={e => setDocNumber(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-shb-orange outline-none" required />
              </div>
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Cơ quan ban hành</label>
                <input type="text" value={issuer} onChange={e => setIssuer(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-shb-orange outline-none" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Tên văn bản</label>
                <input type="text" value={docTitle} onChange={e => setDocTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-shb-orange outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Hiệu lực từ</label>
                <input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-shb-orange outline-none" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Hết hiệu lực</label>
                <input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-shb-orange outline-none" />
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
                <h3 className="font-bold text-slate-800 dark:text-white">Liên kết pháp lý</h3>
                <button type="button" onClick={addRelationship} className="w-full sm:w-auto px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-lg text-sm hover:bg-slate-200 flex justify-center items-center">
                  <Plus className="w-4 h-4 mr-1" /> Thêm liên kết
                </button>
              </div>
              <div className="space-y-4">
                {relationships.map((rel, index) => (
                  <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <select value={rel.type} onChange={e => updateRelationship(index, 'type', e.target.value)} className="sm:col-span-3 w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
                      {relationshipTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <select value={rel.targetDocId} onChange={e => updateRelationship(index, 'targetDocId', e.target.value)} className="sm:col-span-3 w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
                      <option value="">- Chọn văn bản -</option>
                      {ingestedDocs.map(doc => <option key={doc.id} value={doc.id}>{doc.docNumber}</option>)}
                    </select>
                    <div className="sm:col-span-6 flex gap-2">
                      <input type="text" placeholder="Phạm vi (VD: Điều 8)" value={rel.clauses} onChange={e => updateRelationship(index, 'clauses', e.target.value)} className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white" />
                      <button type="button" onClick={() => removeRelationship(index)} className="px-4 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {uploading && (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50">
                <div className="flex justify-between text-sm font-bold text-shb-orange mb-2">
                  <span>Đang tải lên...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-shb-orange h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            <button type="submit" className="w-full py-4 rounded-xl bg-shb-navy dark:bg-blue-600 text-white font-bold text-base hover:bg-shb-navy-light transition-colors">
              Xác Nhận Nạp Liệu
            </button>
          </form>
        </div>
      )}

      {activeTab === 'repository' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 md:p-8 animate-slideDown">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {ingestedDocs.map((doc) => (
              <div key={doc.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <div className="mb-3">
                  <span className="text-sm font-bold text-slate-800 dark:text-white">{doc.docNumber}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">{doc.title}</h3>
                <div className="space-y-2 border-t border-slate-200 dark:border-slate-700 pt-4 text-xs font-medium">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Trạng thái:</span>
                    <span className={doc.status === 'Đang hiệu lực' ? 'text-emerald-500' : 'text-amber-500'}>{doc.status}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Liên kết pháp lý:</span>
                    <span className="text-shb-orange">{doc.relationsCount} nodes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
