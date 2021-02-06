const gtsjcx = {
  cx: [
    {
      cm: '姓名',
      type: 'input',
      dm: 'xm',
    },
    {
      cm: '性别',
      type: 'select',
      dm: 'xb',
    },
    {
      cm: '国家地区',
      type: 'select',
      dm: 'gjdq',
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'zjhm',
    },
    {
      cm: '出生日期',
      type: 'doubleDate',
      dm: 'csTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'birthstart',
          dateType:'dateJ'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'birthend',
          dateType:'dateJ'
        },
      ],
    },
    {
      cm: '签证种类',
      type: 'select',
      dm: 'visatype',
    },
    {
      cm: '乘车次数',
      type: 'ageDouble',
      dm: 'age',
      children: [
          {
              cm: '开始次数',
              type: 'number',
              dm: 'cccsstart'
          },
          {
              cm: '结束次数',
              type: 'number',
              dm: 'cccsend'
          },
      ],
    },
    {
      cm: '发车时间段',
      type: 'double',
      dm: 'tlTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'fcsjstart'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'fcsjend'
        },
      ],
    },
    {
      cm: '到达站',
      type: 'inputCheck',
      dm: 'ddzmc',
      dmlike:'ddzmh',
      trueLabel:'1',
      falseLabel:'0',
      check:false,
    },
    {
      cm: '出发站',
      type: 'inputCheck',
      dm: 'cfzmc',
      dmlike:'cfzmh',
      trueLabel:'1',
      falseLabel:'0',
      check:false,
    },
    // {
    //   cm: '行车范围',
    //   type: 'button',
    //   dm: 'gtsz',
    // },
    {
      cm: '行车范围',
      type: 'cascader',
      optype:true,
      dm: 'gtsz',
    },
    {
      cm: '关联查询',
      type: 'button',
      dm: 'gtglcx',
      multiple:true,
    },
    {
      cm:'',
      mc: '有效数据',
      type: 'checkbox',
      dm: 'sfglcrj',
      trueLabel:'1',
      falseLabel:'0',
      check:true,
      col:12
    },
    {
      cm: '常住类别',
      type: 'select',
      dm: 'resident_type',
      optype:true,
      disdm:true,
      distype:'cz'
    },
    {
      cm: '停留有效期至',
      type: 'datePicker',
      dm: 'tlyxqz',
      distype:'cz'
    },
    {
      cm: '是否有效人员',
      type: 'select',
      dm: 'sfyxry',
      optype:true,
      distype:'cz'
    },
    {
      cm:'',
      mc: '无常住数据',
      type: 'checkbox',
      dm: 'lackcz',
      trueLabel:'1',
      falseLabel:'',
      check:false,
      distype:'cz'
    },
    {
      cm: '住宿时间段',
      type: 'double',
      dm: 'tlTime',
      distype:'lz',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'zssjstart'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'zssjend'
        },
      ],
    },
    {
      cm: '投宿于',
      type: 'select',
      dm: 'tsy',
      optype:true,
      distype:'lz'
    },
    {
      cm:'',
      mc: '无临住数据',
      type: 'checkbox',
      dm: 'lacklz',
      trueLabel:'1',
      falseLabel:'',
      check:false,
      distype:'lz'
    },
  ],
  cxCheck:[],
  cxButton:[],
  facx: [],
  lb: [
    {
      cm:'订票姓名',
      dm:'gt_name'
    },
    {
      cm:'性别',
      dm:'crj_gender_desc'
    },
    {
      cm: '出入境记录姓名',
      dm: 'crj_name'
    },
    {
      cm: '国家地区',
      dm: 'crj_nationality_desc',
    },  
    {
      cm: '证件号码',
      dm: 'gt_passportno',
    },
    {
      cm: '签证种类',
      dm: 'crj_visa_type_desc',
    },
    {
      cm: '车次编号',
      dm: 'gt_train_number',
    },
    {
      cm: '车厢编号',
      dm: 'gt_car_number',
    },
    {
      cm: '座位编号',
      dm: 'gt_seat_number',
    },
    {
      cm: '发车时间',
      dm: 'departure_date_gt',
    },
    {
      cm: '出发站',
      dm: 'gt_station_name',
    },
    {
      cm: '到达站',
      dm: 'gt_arrival_station_name',
    },
    {
      cm: '常住次数',
      dm: 'czcs',
      textLink:true
    },
    {
      cm: '临住次数',
      dm: 'lzcs',
      textLink:true
    },
    {
      cm: '处理类型',
      dm: 'clry',
    }
  ],
  lbBtn: [],
  lbTabEdit:[
    {
        "mc": '省厅下发',
        "dm": '0',
    },
    {
        "mc": '核查走访',
        "dm": '1',
    },
    {
        "mc": '实有常住',
        "dm": '',
    },
  ],
  lzxxTableEdit:[
    {
      cm:'英文姓名',
      dm:'ywxm'
    },
    {
      cm: '中文姓名',
      dm: 'zwxm'
    },
    {
      cm: '性别',
      dm: 'xb_desc'
    },
    {
      cm: '出生日期',
      dm: 'birth',
    },
    {
      cm: '国家地区',
      dm: 'gjdq_desc',
    },  
    {
      cm: '证件号码',
      dm: 'zjhm',
    },
    {
      cm: '证件种类',
      dm: 'zjzl_desc',
    },
    {
      cm: '所属分局',
      dm: 'bggxdw_desc',
    },
    {
      cm: '住宿地址',
      dm: 'lsdwdz',
    },
    {
      cm: '住宿日期',
      dm: 'zsrq_lz',
    },
  ],
  czxxTableEdit:[
    {
      cm:'人员编号', 
      dm:'personnel_id'
    },
    {
      cm:'英文姓名',
      dm:'ename'
    },
    {
      cm: '中文姓名',
      dm: 'name'
    },
    {
      cm: '性别',
      dm: 'gender_desc'
    },
    {
      cm: '出生日期',
      dm: 'birthday',
      subS:true,//列表数据截取
    },
    {
      cm: '国家地区',
      dm: 'nationality_desc',
    },  
    {
      cm: '证件号码',
      dm: 'paperno',
    },
    {
      cm: '证件种类',
      dm: 'paper_type_desc',
    },
    {
      cm: '常住类别',
      dm: 'resident_type_desc',
    },
    {
      cm: '停留有效期',
      dm: 'localize_period',
      subS:true,//列表数据截取
    },
  ],
  inLbBtn:[
    {
      "button_name": "详情",
      "button_type": 'ck',
    },
  ],
}
const gtsjrgcl = {
  cx: [
    {
      cm: '国家地区',
      type: 'select',
      dm: 'nationality',
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'passportno',
    },
    {
      cm: '处理时间段',
      type: 'double',
      dm: 'csTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'clsjstart',
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'clsjend',
        },
      ],
    },
    {
      cm: '处理状态',
      type: 'select',
      dm: 'result',
      optype:true,
    },
    {
      cm: '用户ID',
      type: 'input',
      dm: 'userid',
    },
    {
      cm: '处理人',
      type: 'input',
      dm: 'clry',
    },
    {
      cm: '数据来源',
      type: 'select',
      dm: 'type',
      optype:true
    },
  ],
  cxa:[
    {
      cm: '数据来源',
      type: 'select',
      dm: 'type',
      optype:true,
    },
  ],
  cxCheck:[],
  facx: [],
  lbTab:[
    {
        "mc": '未接收',
        "dm": '0',
    },
    {
        "mc": '已接收',
        "dm": '1',
    },
    {
        "mc": '已处理',
        "dm": '2',
    },
  ],
  lb1: [
    {
      cm:'姓名',
      dm:'name'
    },
    {
      cm: '性别',
      dm: 'gender_desc',
    },
    {
      cm: '国家地区',
      dm: 'nationality_desc',
    },
    {
      cm: '证件种类',
      dm: 'passporttype_desc',
    },
    {
      cm: '证件号码',
      dm: 'passportno',
    },
    {
      cm: '出生日期',
      dm: 'birthday',
    },
    {
      cm: '数据来源',
      dm: 'type_desc',
    },
  ],
  lb3:[
    {
      cm:'姓名',
      dm:'name'
    },
    {
      cm: '性别',
      dm: 'gender_desc',
    },
    {
      cm: '国家地区',
      dm: 'nationality_desc',
    },
    {
      cm: '证件种类',
      dm: 'passporttype_desc',
    },
    {
      cm: '证件号码',
      dm: 'passportno',
    },
    {
      cm: '出生日期',
      dm: 'birthday',
    },
    {
      cm: '数据来源',
      dm: 'type_desc',
    },
    {
      cm: '处理结果',
      dm: 'result_desc',
    },
    {
      cm: '处理人',
      dm: 'received_personnel',
    },
    {
      cm: '用户ID',
      dm: 'received_number',
    },
    {
      cm: '处理时间',
      dm: 'handling_time_desc',
    },
  ],
  lbBtn: [
    {
      "button_name": "详情",
      "button_type": 'detail',
    },
  ],
  jsDia:[
    {
      cm: '接收条数',
      type: 'inputNumber',
      dm: 'jsts',
    },
  ],
  clDia:[
    {
      title:'基本信息',
      type:'line',
      col:24
    },
    {
      cm: '姓名',
      type: 'input',
      dm: 'name',
    },
    {
      cm: '证件号码',
      type: 'joinBtn',
      dm: 'passportno',
      btnmc:'核查'
    },
    {
      cm: '性别',
      type: 'input',
      dm: 'gender_desc',
      dis:true,
    },
    {
      cm: '国家地区',
      type: 'input',
      dm: 'nationality_desc',
      dis:true,
    },
    {
      cm: '出生日期',
      type: 'datePicker',
      dm: 'birthday_desc',
      dis:true,
    },
    {
      cm: '证件种类',
      type: 'input',
      dm: 'passporttype_desc',
      dis:true,
    },
    {
      cm: '数据来源',
      type: 'input',
      dm: 'type_desc',
      optype:true,
      dis:true,
    },
  ],
  inLb:[
    {
      cm: '姓名',
      dm: 'crj_name',
      only:'serial',
      btnCommon:true,
    },
    {
      cm: '国家地区',
      dm: 'crj_nationality_desc',
    },
  ],
  inXzDia:[
    {
      cm: '姓名',
      type: 'input',
      dm: 'crj_name',
    },
    {
      cm: '国籍',
      type: 'select',
      dm: 'crj_nationality',
    },
    {
      cm: '姓名拼音',
      type: 'input',
      dm: 'crj_namepy',
    },
    {
      cm: '性别',
      type: 'select',
      dm: 'crj_gender',
      // dis:true,
    },
    {
      cm: '出生日期',
      type: 'datePicker',
      dm: 'crj_birthday',
      dateType:'dateJ'
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'crj_passportno',
    },
    {
      cm: '证件种类',
      type: 'select',
      dm: 'crj_passporttype',
      // dis:true,
    },
    {
      cm: '前往地',
      type: 'input',
      dm: 'crj_destination',
      // dis:true,
    },
    {
      cm: '发证日期',
      type: 'input',
      dm: 'crj_grant_cert_date',
      // dis:true,
    },
    {
      cm: '发证审批机关',
      type: 'input',
      dm: 'crj_grant_cert_org',
      // dis:true,
    },
    {
      cm: '出境登记卡号',
      type: 'input',
      dm: 'crj_in_time',
      // dis:true,
    },
    {
      cm: '检查员号',
      type: 'input',
      dm: 'crj_inspectorid',
    },
    {
      cm: '出入境日期',
      type: 'datePicker',
      dm: 'crj_io_date',
      dateType:'dateJ'
      // dis:true,
    },
    {
      cm: '出入口岸',
      type: 'select',
      dm: 'crj_io_port',
      // dis:true,
    },
    {
      cm: '出入境事由',
      type: 'select',
      dm: 'crj_out_reason',
      // dis:true,
    },
    {
      cm: '出入境类别',
      type: 'select',
      dm: 'crj_person_type',
      // dis:true,
    },
    {
      cm: '职业',
      type: 'select',
      dm: 'crj_prof_code',
      // dis:true,
    },
    {
      cm: '旅游团号',
      type: 'input',
      dm: 'crj_tour_groupno',
    },
    {
      cm: '交通方式',
      type: 'select',
      dm: 'crj_traffic_mode',
      // dis:true,
    },
    {
      cm: '交通工具',
      type: 'input',
      dm: 'crj_traffic_tool',
      // dis:true,
    },
    {
      cm: '签证种类',
      type: 'select',
      dm: 'crj_visa_type',
      // dis:true,
    },
  ],
  inPlBtn:[
    {
      "menu_name": "新增",
      "button_type": 2,
      'py':'xz'
    },
  ],
  inLbBtn:[
    {
      "button_name": "编辑",
      "button_type": 'edit',
    }
  ],
  inLbCkBtn:[
    {
      "button_name": "详情",
      "button_type": 'ck',
    }
  ],
}
const bzhdzcl = {
  cxa: [
    {
      cm: '详细地址',
      type: 'input',
      dm: 'address',
    },
  ],
  cxb:[
    {
      cm: '详细地址',
      type: 'input',
      dm: 'address',
    },
    {
      cm: '处理人',
      type: 'input',
      dm: 'clry',
    },
    {
      cm: '用户id',
      type: 'input',
      dm: 'userid',
    },
  ],
  cxCheck:[],
  facx: [],
  lbTab:[
    {
        "mc": '未接收',
        "dm": '0',
    },
    {
        "mc": '已接收',
        "dm": '1',
    },
    {
        "mc": '已完成',
        "dm": '2',
    },
    {
        "mc": '未标准化',
        "dm": '3',
    },
  ],
  lb: [
    {
      cm:'住宿地址',
      dm:'standard_address'
    },
    {
      cm: '姓名',
      dm: 'name',
    },
    {
      cm: '国家地区',
      dm: 'nationality_desc',
    },
    {
      cm: '证件号码',
      dm: 'paperno',
    },
    {
      cm: '所属分局',
      dm: 'police_bureau_desc',
    },
    {
      cm: '所属派出所',
      dm: 'police_station_desc',
    },
    {
      cm: '数据来源',
      dm: 'source_desc',
    },
    {
      cm: '处理人',
      dm: 'received_personnel',
      isShow:true
    },
    {
      cm: '用户id',
      dm: 'received_number',
      isShow:true
    },
    {
      cm: '处理时间',
      dm: 'handling_time_desc',
      isShow:true
    },
  ],
  lbBtn: [
    {
      "button_name": "详情",
      "button_type": 'detail',
    },
  ],
  jsDia:[
    {
      cm: '接收条数',
      type: 'inputNumber',
      dm: 'jsts',
    },
  ],
  clDia:[
    {
      title:'高铁信息',
      type:'line',
      col:24
    },
    {
      cm: '姓名',
      type: 'input',
      dm: 'name',
      dis:true,
    },
    {
      cm: '国籍',
      type: 'select',
      dm: 'nationality',
      dis:true,
    },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'paperno',
      dis:true,
    },
    {
      cm: '住宿地址',
      type: 'joinBtn',
      dm: 'standard_address',
      btnmc:'核查'
    },
    {
      cm: '所属分局',
      type: 'input',
      dm: 'police_bureau_desc',
      dis:true,
    },
    {
      cm: '所属派出所',
      type: 'input',
      dm: 'police_station_desc',
      dis:true,
    },
    {
      cm: '数据来源',
      type: 'input',
      dm: 'source_desc',
      dis:true,
    },
  ],
  inLb:[
    {
      cm: '标准化地址',
      dm: 'standard_address',
      only:'serial',
      btnCommon:true
    },
  ],
  inXzDia:[
    // {
    //   cm: '姓名',
    //   type: 'input',
    //   dm: 'crj_name',
    // },
    // {
    //   cm: '国籍',
    //   type: 'select',
    //   dm: 'crj_nationality',
    // },
    // {
    //   cm: '姓名拼音',
    //   type: 'input',
    //   dm: 'crj_namepy',
    // },
    // {
    //   cm: '性别',
    //   type: 'select',
    //   dm: 'crj_gender',
    //   // dis:true,
    // },
    // {
    //   cm: '出生日期',
    //   type: 'datePicker',
    //   dm: 'crj_birthday',
    // },
    // {
    //   cm: '证件号码',
    //   type: 'input',
    //   dm: 'crj_passportno',
    // },
    // {
    //   cm: '证件种类',
    //   type: 'select',
    //   dm: 'crj_passporttype',
    //   // dis:true,
    // },
    // {
    //   cm: '前往地',
    //   type: 'input',
    //   dm: 'crj_destination',
    //   // dis:true,
    // },
    // {
    //   cm: '发证日期',
    //   type: 'datePicker',
    //   dm: 'crj_grant_cert_date',
    //   // dis:true,
    // },
    // {
    //   cm: '发证审批机关',
    //   type: 'input',
    //   dm: 'crj_grant_cert_org',
    //   // dis:true,
    // },
    // {
    //   cm: '入库时间',
    //   type: 'datePicker',
    //   dm: 'crj_in_time',
    //   // dis:true,
    // },
    // {
    //   cm: '检查员号',
    //   type: 'input',
    //   dm: 'crj_inspectorid',
    // },
    // {
    //   cm: '出入境日期',
    //   type: 'datePicker',
    //   dm: 'crj_io_date',
    //   // dis:true,
    // },
    // {
    //   cm: '出入口岸',
    //   type: 'select',
    //   dm: 'crj_io_port',
    //   // dis:true,
    // },
    // {
    //   cm: '出入境事由',
    //   type: 'select',
    //   dm: 'crj_out_reason',
    //   // dis:true,
    // },
    // {
    //   cm: '人员类别',
    //   type: 'select',
    //   dm: 'crj_person_type',
    //   // dis:true,
    // },
    // {
    //   cm: '职业',
    //   type: 'select',
    //   dm: 'crj_prof_code',
    //   // dis:true,
    // },
    // {
    //   cm: '旅游团号',
    //   type: 'input',
    //   dm: 'crj_tour_groupno',
    // },
    // {
    //   cm: '交通方式',
    //   type: 'select',
    //   dm: 'crj_traffic_mode',
    //   // dis:true,
    // },
    // {
    //   cm: '交通工具',
    //   type: 'input',
    //   dm: 'crj_traffic_tool',
    //   // dis:true,
    // },
    // {
    //   cm: '签证种类',
    //   type: 'select',
    //   dm: 'crj_visa_type',
    //   // dis:true,
    // },
  ],
  inPlBtn:[
    // {
    //   "menu_name": "新增",
    //   "button_type": 2,
    //   'py':'xz'
    // },
  ],
  inLbBtn:[
    // {
    //   "button_name": "编辑",
    //   "button_type": 'edit',
    // }
  ],
  inLbCkBtn:[
    // {
    //   "button_name": "详情",
    //   "button_type": 'ck',
    // }
  ],
}
export default{
  gtsjcx,
  gtsjrgcl,
  bzhdzcl
}