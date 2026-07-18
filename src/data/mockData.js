export const graphDataScenarios = {
  'cho vay': {
    nodes: [
      { id: 'tt39', name: 'TT 39', color: '#002654', val: 20, desc: 'Bản gốc' },
      { id: 'tt06', name: 'TT 06', color: '#002654', val: 20, desc: 'Sửa đổi' },
      { id: 'tt10', name: 'TT 10', color: '#F36F21', val: 25, desc: 'Đình chỉ' }
    ],
    links: [
      { source: 'tt06', target: 'tt39', name: 'Sửa đổi', color: '#64748b' },
      { source: 'tt10', target: 'tt06', name: 'Đình chỉ', color: '#F36F21' }
    ]
  },
  'an toan von': {
    nodes: [{ id: 'tt41', name: 'TT 41', color: '#002654', val: 30, desc: 'Đang hiệu lực' }],
    links: []
  },
  'phan loai no': {
    nodes: [{ id: 'tt11', name: 'TT 11', color: '#002654', val: 30, desc: 'Đang hiệu lực' }],
    links: []
  }
};

export const mockCitations = {
  'cit-1': {
    title: 'Điều 8 - TT 39/2016/TT-NHNN',
    effectiveDate: '15/03/2017',
    expiryDate: 'Bị sửa đổi một phần',
    content: 'Tổ chức tín dụng không được cho vay đối với các nhu cầu vốn: 1. Để thực hiện các hoạt động đầu tư kinh doanh thuộc ngành, nghề cấm... 2. Để mua, sử dụng các dịch vụ của ngành, nghề cấm...'
  },
  'cit-2': {
    title: 'Điều 1 - TT 06/2023/TT-NHNN',
    effectiveDate: '01/09/2023',
    expiryDate: 'Đình chỉ một phần',
    content: 'Bổ sung các khoản 8, 9, 10 về nhu cầu vốn không được cho vay bao gồm: mua cổ phần, góp vốn, thanh toán tiền đặt cọc dự án...'
  },
  'cit-3': {
    title: 'Điều 1 - TT 10/2023/TT-NHNN',
    effectiveDate: '01/09/2023',
    expiryDate: 'Đang hiệu lực',
    content: 'Ngưng hiệu lực thi hành đối với khoản 8, khoản 9 và khoản 10 Điều 8 của Thông tư số 39/2016/TT-NHNN (đã được bổ sung bởi khoản 2 Điều 1 Thông tư số 06/2023/TT-NHNN).'
  },
  'cit-4': {
    title: 'Điều 10 - TT 11/2021/TT-NHNN',
    effectiveDate: '01/10/2021',
    expiryDate: 'Đang hiệu lực',
    content: 'Tổ chức tín dụng thực hiện phân loại nợ theo 05 nhóm như sau: Nhóm 1 (Nợ đủ tiêu chuẩn), Nhóm 2 (Nợ cần chú ý), Nhóm 3 (Nợ dưới tiêu chuẩn), Nhóm 4 (Nợ nghi ngờ), Nhóm 5 (Nợ có khả năng mất vốn).'
  }
};

export const mockQA = {
  'cho vay': {
    text: 'Điều kiện cho vay liên quan đến góp vốn, mua cổ phần hiện đang chịu sự điều chỉnh của nhiều văn bản pháp lý. Điều 8 TT 39/2016 [cit-1] đã được sửa đổi bởi TT 06/2023 [cit-2]. Đáng chú ý, TT 10/2023 [cit-3] đã đình chỉ hiệu lực các quy định cấm mới này.',
    citations: ['cit-1', 'cit-2', 'cit-3'],
    hasConflict: true,
    conflictMsg: 'Khoản 8, 9, 10 Điều 8 TT 39 (bổ sung bởi TT 06) về cấm cho vay góp vốn ĐÃ BỊ NGƯNG HIỆU LỰC bởi TT 10/2023. Áp dụng quy định cũ.',
  },
  'an toan von': {
    text: 'Theo Thông tư 41/2016/TT-NHNN, tổ chức tín dụng phải duy trì tỷ lệ an toàn vốn (CAR) tối thiểu 8%.',
    citations: ['cit-1'],
    hasConflict: false
  },
  'phan loai no': {
    text: 'Theo Thông tư 11/2021/TT-NHNN, tổ chức tín dụng phải thực hiện phân loại nợ thành 5 nhóm: Nợ đủ tiêu chuẩn, Nợ cần chú ý, Nợ dưới tiêu chuẩn, Nợ nghi ngờ, và Nợ có khả năng mất vốn [cit-4]. Việc phân loại nợ phải được thực hiện ít nhất mỗi quý một lần.',
    citations: ['cit-4'],
    hasConflict: false
  }
};

export let mockIngestedDocs = [
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
];
