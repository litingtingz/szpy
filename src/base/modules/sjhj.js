const gtsjcx = {
  cx: [
    {
      cm: '英文姓名',
      type: 'input',
      dm: 'ename',
    },
    {
      cm: '中文姓名',
      type: 'input',
      dm: 'name',
    },
    {
      cm: '性别',
      type: 'select',
      dm: 'gender',
    },
    {
      cm: '国家地区',
      type: 'select',
      dm: 'nationality',
    },
    
    // {
    //   cm: '证件种类',
    //   type: 'select',
    //   dm: 'paper_type'
    // },
    {
      cm: '证件号码',
      type: 'input',
      dm: 'paperno',
    },
    {
      cm: '出生日期',
      type: 'double',
      dm: 'csTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'birthday_begin',
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'birthday_end',
        },
      ],
    },
    {
      cm: '签证种类',
      type: 'select',
      dm: 'visa_type',
    },
    // {
    //   cm: '签证号码',
    //   type: 'input',
    //   dm: 'visa_no',
    // },
    {
      cm: '出发站',
      type: 'select',
      dm: 'visa_type',
    },
    {
      cm: '到达站',
      type: 'select',
      dm: 'visa_type',
    },
    {
      cm: '发车时间段',
      type: 'double',
      dm: 'tlTime',
      children: [
        {
          cm: '开始时间',
          type: 'date',
          dm: 'begin'
        },
        {
          cm: '结束时间',
          type: 'date',
          dm: 'end'
        },
      ],
    },
    {
      cm: '常住类别',
      type: 'select',
      dm: 'resident_type',
      optype:true,
      disdm:true,
    },
    {
      cm: '人员地域类别',
      type: 'select',
      dm: 'personnel_area_type',
      mult:true,
    },
  ],
  cxCheck:[],
  facx: [],
  lb: [
    {
      cm:'业务编号',
      dm:'business_number'
    },
    {
      cm: '中文姓名',
      dm: 'name'
    },
    {
      cm: '英文姓名',
      dm: 'ename'
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
      cm: '签证种类',
      dm: 'visa_type_desc',
    },
    {
      cm: '停留有效期',
      dm: 'localize_period',
      subS:true,//列表数据截取
    },
  ],
  lbBtn: [
    {
      "button_name": "编辑",
      "button_type": 'edit',
      "serial": "201",
    },
  ],
  lbTabEdit:[
    {
        "mc": '常住人员基本信息',
        "dm": '1',
    },
    {
        "mc": '居住地信息',
        "dm": '2',
    },
    {
        "mc": '工作地/学校信息',
        "dm": '3',
    },
  ],
  jbxxTableEdit:[
    {
      cm:'业务编号',
      dm:'business_number'
    },
    // {
    //   cm:'人员编号',
    //   dm:'personnel_id'
    // },
    {
      cm: '中文姓名',
      dm: 'name'
    },
    {
      cm: '英文姓名',
      dm: 'ename'
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
      cm: '签证种类',
      dm: 'visa_type_desc',
    },
    {
      cm: '停留有效期',
      dm: 'localize_period',
      subS:true,//列表数据截取
    },
  ],
  jbxxEdit:{
    'a':[
      {
          title:'基本信息',
          type:'line',
          col:24
      },
      {
        cm:'业务编号',
        type:'input',
        dm:'business_number'
      },
      {
        cm:'人员编号',
        type:'input',
        dm:'personnel_id'
      },
      {
          cm: '国家(地区)',
          type: 'select',
          dm: 'nationality',
          weight:true
      },
      {
          cm: '证件种类',
          type: 'select',
          dm: 'paper_type',
          weight:true
      },
      {
          cm: '证件号码',
          type: 'input',
          dm: 'paperno',
          weight:true
      },
      {
          cm: '英文姓',
          type: 'input',
          dm: 'surnameen'
      },
      {
          cm: '英文名',
          type: 'input',
          dm: 'firstnameen'
      },
      {
          cm: '中文姓名',
          type: 'input',
          dm: 'name'
      },
      {
          cm: '性别',
          type: 'select',
          dm: 'gender',
      },
      {
          cm: '出生日期',
          type: 'datePicker',
          dm: 'birthday',
      },
      // {
      //   cm: '人员地域类别',
      //   type: 'select',
      //   dm: 'personnel_area_type',
      // },
      {
        cm: '身份',
        type: 'select',
        dm: 'degree_code',
      },
      {
        cm: '出生地',
        type: 'select',
        dm: 'birthplace',
      },
      {
          cm: '联系电话',
          type: 'input',
          dm: 'reside_contact_tel'
      },
      {
          cm: '紧急情况联系人',
          type: 'input',
          dm: 'emergency_contact'
      },
      
      
    ],
    'b':[
      // {
      //     cm: '有效次数',
      //     type: 'input',
      //     dm: 'effective_times'
      // },
      {
          cm: '紧急情况联系电话',
          type: 'input',
          dm: 'emergency_contact_tel'
      },
      {
          title:'证件信息',
          type:'line',
          col:24
      },
      {
          cm: '签发日期',
          type: 'datePicker',
          dm: 'issue_date'
      },
      {
          cm: '证件有效期至',
          type: 'datePicker',
          dm: 'expired_day'
      },
      {
          cm: '证件内人数',
          type: 'input',
          dm: 'qty_of_party'
      },
      {
          cm: '签证种类',
          type: 'select',
          dm: 'visa_type'
      },
      {
          cm: '签证号码',
          type: 'input',
          dm: 'visa_no'
      },
      {
          cm: '签证签发日期',
          type: 'datePicker',
          dm: 'reside_permit_assign_day'
      },
      {
          cm: '签发地',
          type: 'select',
          dm: 'assignment_org',
      },
      // {
      //     cm: '签注有效期至',
      //     type: 'datePicker',
      //     dm: 'reside_permit_expired_day'
      // },
      {
          cm: '停留有效期',
          type: 'datePicker',
          dm: 'localize_period'
      },
      {
          cm: '居留事由',
          type: 'select',
          dm: 'reside_reason'
      },
      {
          cm: '身份证号',
          type: 'input',
          dm: 'idno'
      },
      
      {
          cm: '登记日期',
          type: 'datePicker',
          dm: 'registration_time'
      },
      
      // {
      //     cm: '永久居留标识',
      //     type: 'input',
      //     dm: 'permanent_residence_sign'
      // },
      {
          title:'出入境信息',
          type:'line',
          col:24
      },
      {
          cm: '入境日期',
          type: 'datePicker',
          dm: 'entry_date'
      },
      {
          cm: '入境事由',
          type: 'select',
          dm: 'entry_reason'
      },
      {
          cm: '入境口岸',
          type: 'select',
          dm: 'entry_port'
      },
      {
          cm: '出入境状态',
          type: 'select',
          dm: 'exit_entry_status',
      },
      {
          // title:'出入境信息',
          type:'line',
          col:24
      },
      {
          cm: '常住人员类型',
          type: 'select',
          dm: 'resident_type',
          optype:true
      },
      {
          cm: '常住有效状态',
          type: 'select',
          dm: 'valid_state',
          optype:true
      },
      {
          cm: '省厅下发时间',
          type: 'datePicker',
          dm: 'prov_issue_time'
      },
      {
          cm: '更新人',
          type: 'input',
          dm: 'update_person',
          dis: true
      },
      {
          cm: '更新时间',
          type: 'datetimePicker',
          dm: 'update_time',
          dis: true
      },
      {
          cm: '更新单位',
          type: 'input',
          dm: 'update_unit',
          dis: true
      }
    ],
  },
  jzdTableEdit:[
    {
      cm: '居住地详细地址',
      dm: 'inhabi_detail_addr',
    },
    {
      cm: '居住状态类型',
      dm: 'inhabi_state_desc'
    },
    {
      cm: '走访反馈状态',
      dm: 'backstatus_desc'
    },
    {
      cm: '居住地所在派出所',
      dm: 'inhabi_police_station_desc'
    },
    
    // {
    //   cm: '房主姓名',
    //   dm: 'gender_desc'
    // },
    // {
    //   cm: '是否有效',
    //   dm: 'csrq',
    // },
  ],
  jzdFormEdit:[
    {
      mRow:24,
      labelWid:'137px'
    },
    // {
    //   cm: '居住地业务编号',
    //   type: 'input',
    //   dm: 'inhabi_businessno',
    //   col:8
    // },
    // {
    //   cm: '居住地城市',
    //   type: 'select',
    //   dm: 'inhabi_city',
    //   col:8
    // },
    {
      cm: '居住初始状态产生时间',
      type: 'datePicker',
      dm: 'inhabi_ori_state_time',
      col:8
    },
    {
      cm: '居住地所在派出所',
      type: 'select',
      dm: 'inhabi_police_station',
      col:8
    },
    {
      cm: '居住地所在区县',
      type: 'select',
      dm: 'inhabi_residence',
      col:8
    },
    {
      cm: '所属责任区',
      type: 'select',
      dm: 'turnoutarea',
      col:8,
      optype:true,
    },
    {
      cm: '居住状态类型',
      type: 'select',
      dm: 'inhabi_state',
      col:8
    },
    {
      cm: '走访反馈状态',
      type: 'select',
      dm: 'backstatus',
      col:8
    },
    {
      cm: '居住地详细地址',
      type: 'input',
      dm: 'inhabi_detail_addr',
      col:16
    },
    {
        cm: '迁入时间',
        type: 'datePicker',
        dm: 'move_in_time',
        col:8
    },
    {
      cm: '迁出时间',
      type: 'datePicker',
      dm: 'move_out_time',
      col:8
  },
    // {
    //   cm: '登记人',
    //   type: 'input',
    //   dm: 'sprMc',
    //   dis: true,
    //   col:8
    // },
    // {
    //     cm: '登记时间',
    //     type: 'datePicker',
    //     dm: 'sprdwMc',
    //     dis: true,
    //     col:8
    // },
    // {
    //     cm: '登记单位',
    //     type: 'input',
    //     dm: 'spsj',
    //     dis: true,
    //     col:8
    // }
  ],
  gzdTableEdit:[
    {
      cm: '工作单位名称',
      dm: 'workplace_name'
    },
    {
      cm: '单位地址',
      dm: 'workplace_address'
    },
    {
      cm: '工作状态类型',
      dm: 'working_state_desc'
    },
  ],
  gzdFormEdit:[
    {
      mRow:24,
      labelWid:'137px'
    },
    {
      cm: '工作任职起始时间',
      type: 'datePicker',
      dm: 'working_begin_time',
      col:8
    },
    {
      cm: '工作任职终止时间',
      type: 'datePicker',
      dm: 'working_end_time',
      col:8
    },
    {
      cm: '工作状态类型',
      type: 'select',
      dm: 'working_state',
      col:8
    },
    // {
    //   cm: '工作地业务编号',
    //   type: 'input',
    //   dm: 'workplace_businessno',
    //   col:8
    // },
    // {
    //   cm: '工作地城市',
    //   type: 'select',
    //   dm: 'workplace_city',
    //   col:8
    // },
    {
      cm: '单位所在地派出所',
      type: 'select',
      dm: 'workplace_police_station',
      col:8
    },
    {
      cm: '工作单位名称',
      type: 'input',
      dm: 'workplace_name',
      col:8
    },
    // {
    //   cm: '工作单位组织机构',
    //   type: 'select',
    //   dm: 'workplace_org_code',
    //   col:8
    // },
    {
      cm: '单位所在区县',
      type: 'select',
      dm: 'workplace_residence',
      col:8
    },
    {
      cm: '单位地址',
      type: 'input',
      dm: 'workplace_address',
      col:16
    },
    // {
    //   cm: '职务',
    //   type: 'select',
    //   dm: 'work_duty',
    //   col:8
    // },
    {
      cm: '备注',
      type: 'input',
      dm: 'remarks',
      col:16
    },
    // {
    //   cm: '登记人',
    //   type: 'input',
    //   dm: 'sprMc',
    //   dis: true,
    //   col:8
    // },
    // {
    //     cm: '登记时间',
    //     type: 'datePicker',
    //     dm: 'sprdwMc',
    //     dis: true,
    //     col:8
    // },
    // {
    //     cm: '登记单位',
    //     type: 'input',
    //     dm: 'spsj',
    //     dis: true,
    //     col:8
    // }
  ],
}
export default{
  gtsjcx
}