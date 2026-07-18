import React, { useState } from 'react';
import { Upload, FileText, Plus, Trash2 } from 'lucide-react';
import { mockIngestedDocs } from '../data/mockData';

export default function IngestPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !docNumber || !docTitle || !effectiveDate) {
      setErrorMsg('Vui lòng điền đủ thông tin và chọn file.');
      return;
    }
    setErrorMsg('');
    setUploading(true);
    setUploadProgress(10);
    
    // Giả lập tiến trình upload (tránh dùng setInterval gây lỗi side-effect trong React StrictMode)
    await new Promise(resolve => setTimeout(resolve, 200));
    setUploadProgress(40);
    await new Promise(resolve => setTimeout(resolve, 200));
    setUploadProgress(70);
    await new Promise(resolve => setTimeout(resolve, 200));
    setUploadProgress(100);
    
    setTimeout(() => {
      setUploading(false);
      setSuccessMsg(`Lưu trữ thành công ${docNumber}`);
      
      // Add to mock data so it appears in the Library page
      mockIngestedDocs.unshift({
        id: `doc-${Date.now()}`, 
        docNumber, 
        title: docTitle,
        effectiveDate, 
        status: expiryDate ? 'Hết hiệu lực' : 'Đang hiệu lực', 
        relationsCount: relationships.length
      });

      setFile(null); 
      setDocNumber(''); 
      setDocTitle(''); 
      setEffectiveDate(''); 
      setExpiryDate(''); 
      setRelationships([]);
      
      setTimeout(() => setSuccessMsg(''), 3000);
    }, 500);
  };

  return (
    <div className="max-w-4xl w-full mx-auto h-full flex flex-col space-y-4 md:space-y-6 px-4 md:px-8 py-6 md:py-8">
      
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-3 bg-shb-navy dark:bg-slate-800 rounded-xl">
          <Upload className="w-6 h-6 text-white dark:text-shb-orange" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Nạp Tài Liệu</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Tải lên và trích xuất thông tin văn bản pháp lý mới</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 md:p-8 animate-slideDown w-full">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium border border-rose-100">
              {errorMsg}
            </div>
          )}
          
          {successMsg && (
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-medium border border-emerald-100">
              {successMsg}
            </div>
          )}

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
                <span className="font-bold">Kéo thả hoặc chọn File PDF / Word</span>
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
                    {mockIngestedDocs.map(doc => <option key={doc.id} value={doc.id}>{doc.docNumber}</option>)}
                  </select>
                  <div className="sm:col-span-6 flex gap-2">
                    <input type="text" placeholder="Phạm vi (VD: Điều 8)" value={rel.clauses} onChange={e => updateRelationship(index, 'clauses', e.target.value)} className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white" />
                    <button type="button" onClick={() => removeRelationship(index)} className="px-4 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors">
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
                <div className="bg-shb-orange h-2 rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          <button type="submit" disabled={uploading} className="w-full py-4 rounded-xl bg-shb-navy dark:bg-blue-600 text-white font-bold text-base hover:bg-shb-navy-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
            {uploading ? 'Đang nạp...' : 'Xác Nhận Nạp Liệu'}
          </button>
        </form>
      </div>
    </div>
  );
}
