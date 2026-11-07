export const pets = ['奶糖', '豆包', '栗子']

export const recentRecords = [
  { id: 'r1', title: '奶糖完成年度疫苗', date: '2026-05-12', detail: '狂犬疫苗和联苗均已完成。' },
  { id: 'r2', title: '豆包新增体重记录', date: '2026-05-10', detail: '本次体重 4.8kg，较上次增加 0.1kg。' },
  { id: 'r3', title: '栗子完成驱虫', date: '2026-05-06', detail: '体内外驱虫均已记录。' }
]

export const petProfiles = [
  {
    id: 'pet1',
    name: '奶糖',
    breed: '英短',
    age: '2 岁',
    weight: '4.8kg',
    status: '状态稳定',
    image: '/static/images/banner-cat.jpg'
  },
  {
    id: 'pet2',
    name: '豆包',
    breed: '柴犬',
    age: '1 岁',
    weight: '8.2kg',
    status: '今日已遛',
    image: '/static/images/banner-dog.jpg'
  },
  {
    id: 'pet3',
    name: '栗子',
    breed: '布偶',
    age: '3 岁',
    weight: '5.1kg',
    status: '待驱虫',
    image: '/static/images/banner-ragdoll.jpg'
  }
]

export const petStats = [
  { id: 's1', label: '已记录天数', value: '128 天' },
  { id: 's2', label: '本月体检', value: '1 次' },
  { id: 's3', label: '提醒完成率', value: '94%' }
]

export const careReminders = [
  { id: 'c1', title: '19:30 喂食', note: '奶糖晚餐 60g' },
  { id: 'c2', title: '明天 09:00 驱虫', note: '栗子体外驱虫' },
  { id: 'c3', title: '本周复查', note: '豆包耳道恢复情况' }
]

export const dailyProgress = {
  completed: 3,
  total: 5,
  percent: 60,
  tasks: [
    { id: 't1', title: '早餐', time: '08:00', done: true },
    { id: 't2', title: '晨间饮水', time: '09:10', done: true },
    { id: 't3', title: '体重记录', time: '12:30', done: true },
    { id: 't4', title: '晚餐', time: '19:30', done: false },
    { id: 't5', title: '梳毛', time: '21:00', done: false }
  ]
}

export const homeTimeline = [
  { id: 'tl1', time: '08:12', title: '奶糖完成早餐', type: '喂养' },
  { id: 'tl2', time: '10:05', title: '豆包完成散步 28 分钟', type: '运动' },
  { id: 'tl3', time: '12:40', title: '栗子体重 5.1kg', type: '记录' }
]

export const featuredArticles = [
  {
    id: 'a2',
    title: '狗狗夏季补水指南',
    summary: '天气热起来后，补水也要更聪明。',
    image: '/static/images/article-dog.jpg'
  },
  {
    id: 'a3',
    title: '常见皮肤问题速查',
    summary: '先分清症状，再决定是否就医。',
    image: '/static/images/article-cat.jpg'
  }
]

export const weightRecords = [
  { id: 'w1', date: '2026-04-01', weight: 4.3 },
  { id: 'w2', date: '2026-04-15', weight: 4.5 },
  { id: 'w3', date: '2026-05-01', weight: 4.7 },
  { id: 'w4', date: '2026-05-15', weight: 4.8 }
]

export const weightSummary = [
  { id: 'avg', label: '近 30 天均值', value: '4.6kg' },
  { id: 'change', label: '较上月', value: '+0.3kg' },
  { id: 'goal', label: '目标区间', value: '4.5-5.0kg' }
]

export const healthChecks = [
  { id: 'hc1', title: '食欲', status: '正常' },
  { id: 'hc2', title: '饮水', status: '正常' },
  { id: 'hc3', title: '精神', status: '良好' }
]

export const weightGoals = [
  { id: 'wg1', title: '目标体重', value: '4.7kg' },
  { id: 'wg2', title: '波动阈值', value: '±0.2kg' }
]

export const weightAlerts = [
  { id: 'wa1', title: '连续 3 次上升', note: '仍在目标区间内，继续观察。', level: '提醒' }
]

export const articles = [
  {
    id: 'a1',
    title: '幼猫换粮的 5 个关键点',
    summary: '循序渐进，观察便便和食欲变化。',
    tags: ['喂养', '幼宠'],
    image: '/static/images/banner-cat.jpg'
  },
  {
    id: 'a2',
    title: '狗狗夏季补水指南',
    summary: '看懂脱水信号，准备更聪明。',
    tags: ['护理', '夏季'],
    image: '/static/images/article-dog.jpg'
  },
  {
    id: 'a3',
    title: '常见皮肤问题速查',
    summary: '区分掉毛、过敏和真菌感染。',
    tags: ['疾病', '猫狗通用'],
    image: '/static/images/article-cat.jpg'
  }
]

export const categories = [
  { id: 'cat', name: '猫咪' },
  { id: 'dog', name: '狗狗' },
  { id: 'feeding', name: '喂养' },
  { id: 'disease', name: '疾病' },
  { id: 'vaccine', name: '疫苗' },
  { id: 'care', name: '护理' }
]

export const collections = [
  { id: 'col1', title: '新手养猫入门', count: '12 篇' },
  { id: 'col2', title: '犬只夏季护理', count: '8 篇' },
  { id: 'col3', title: '常见急症识别', count: '10 篇' }
]

export const matchQuestions = [
  {
    id: 'space',
    label: '居住空间',
    options: [
      { label: '小户型', value: 'small' },
      { label: '普通住宅', value: 'medium' },
      { label: '有院子/大空间', value: 'large' }
    ]
  },
  {
    id: 'activity',
    label: '活动偏好',
    options: [
      { label: '安静陪伴型', value: 'low' },
      { label: '每天散步互动', value: 'medium' },
      { label: '高能量户外型', value: 'high' }
    ]
  },
  {
    id: 'fur',
    label: '护理意愿',
    options: [
      { label: '越省心越好', value: 'low' },
      { label: '每周可护理', value: 'medium' },
      { label: '愿意高频护理', value: 'high' }
    ]
  },
  {
    id: 'social',
    label: '社交期待',
    options: [
      { label: '偏独立', value: 'independent' },
      { label: '黏人亲密', value: 'close' },
      { label: '活泼外向', value: 'outgoing' }
    ]
  }
]

export const breedCandidates = [
  { id: 'bc1', name: '英国短毛猫', type: '猫', space: 'small', activity: 'low', fur: 'low', social: 'independent', newbie: true, trait: '稳重安静，适应力强', care: '控体重，定期梳毛' },
  { id: 'bc2', name: '布偶猫', type: '猫', space: 'medium', activity: 'low', fur: 'high', social: 'close', newbie: true, trait: '温柔黏人，家庭陪伴感强', care: '重点梳理长毛' },
  { id: 'bc3', name: '柴犬', type: '犬', space: 'medium', activity: 'medium', fur: 'medium', social: 'independent', newbie: false, trait: '独立有主见，警觉性强', care: '耐心训练，减少固执行为' },
  { id: 'bc4', name: '金毛寻回犬', type: '犬', space: 'large', activity: 'high', fur: 'high', social: 'close', newbie: true, trait: '温和友善，家庭型', care: '高频梳毛，注意耳道' },
  { id: 'bc5', name: '贵宾犬', type: '犬', space: 'small', activity: 'medium', fur: 'high', social: 'close', newbie: true, trait: '聪明敏感，互动性强', care: '毛发修剪频率较高' },
  { id: 'bc6', name: '俄罗斯蓝猫', type: '猫', space: 'small', activity: 'low', fur: 'low', social: 'independent', newbie: true, trait: '优雅内敛，对人专一', care: '稳定环境更安心' }
]

export const languageDictionary = [
  { id: 'ld1', word: '摇尾巴（犬）', desc: '通常代表兴奋或友好，但高频僵硬摇尾可能是紧张信号。' },
  { id: 'ld2', word: '咕噜咕噜（猫）', desc: '常见于放松满足，也可能在不适时用于自我安抚。' },
  { id: 'ld3', word: '慢眨眼（猫）', desc: '友好和信任信号，可以轻慢眨眼回应。' },
  { id: 'ld4', word: '跺后脚（兔）', desc: '警报行为，提示周围有危险或它感到不安。' },
  { id: 'ld5', word: '抖羽（鸟）', desc: '短暂抖羽多为整理羽毛，持续异常可能提示不适。' }
]

export const behaviorLibrary = [
  { id: 'bh1', title: '狗狗突然拆家', detail: '常见原因是精力过剩或分离焦虑。优先提高每日运动与嗅闻游戏。' },
  { id: 'bh2', title: '猫咪半夜跑酷', detail: '睡前 15 分钟高强度逗猫加少量加餐，有助于把活动高峰提前。' },
  { id: 'bh3', title: '兔子不愿被抱', detail: '可改为地面互动和零食引导，逐步建立信任。' },
  { id: 'bh4', title: '仓鼠咬笼', detail: '常见于空间不足或环境单调，建议升级空间并提供啃咬物。' }
]

export const clinicExamples = [
  { id: 'ce1', symptom: '不吃饭 + 打喷嚏', advice: '观察饮水、体温和精神状态；若超过 24 小时未改善建议就医。' },
  { id: 'ce2', symptom: '频繁挠痒', advice: '先排查寄生虫和过敏源，避免频繁洗澡破坏皮肤屏障。' },
  { id: 'ce3', symptom: '呕吐或带血', advice: '属于高风险信号，建议尽快联系线下宠物医院。' }
]

export const hospitals = [
  {
    id: 'h1',
    name: '暖阳宠物医院',
    distance: 1.2,
    address: '珊瑚路 18 号',
    phone: '021-8888-1001',
    hours: '09:00-21:00',
    specialties: ['疫苗', '影像', '急诊'],
    queue: '等待约 15 分钟',
    latitude: 31.2304,
    longitude: 121.4737
  },
  {
    id: 'h2',
    name: '绿芽动物诊所',
    distance: 2.4,
    address: '春风街 66 号',
    phone: '021-8888-1002',
    hours: '08:30-20:30',
    specialties: ['皮肤', '内科'],
    queue: '可直接到院',
    latitude: 31.2326,
    longitude: 121.4801
  },
  {
    id: 'h3',
    name: '橘子宠物中心',
    distance: 3.1,
    address: '云朵路 9 号',
    phone: '021-8888-1003',
    hours: '10:00-22:00',
    specialties: ['外科', '牙科'],
    queue: '等待约 25 分钟',
    latitude: 31.2268,
    longitude: 121.4683
  }
]

export const reportMetrics = [
  { id: 'rm1', label: '体重记录', value: '4 次' },
  { id: 'rm2', label: '疫苗记录', value: '1 次' },
  { id: 'rm3', label: '异常提醒', value: '0 项' }
]

export const reportSections = [
  { id: 'rs1', title: '基础信息', checked: true },
  { id: 'rs2', title: '体重曲线', checked: true },
  { id: 'rs3', title: '疫苗记录', checked: true },
  { id: 'rs4', title: '异常备注', checked: false }
]

export const accountDevices = [
  { id: 'd1', name: 'iPhone 15', lastSync: '今天 18:10' },
  { id: 'd2', name: 'iPad mini', lastSync: '昨天 21:32' }
]

export const householdMembers = [
  { id: 'm1', name: '小橘家长', role: '管理员' },
  { id: 'm2', name: '爸爸', role: '可编辑' },
  { id: 'm3', name: '妈妈', role: '只读' }
]

export const hospitalServices = [
  { id: 'hs1', name: '在线问诊', note: '10 分钟内回复' },
  { id: 'hs2', name: '预约挂号', note: '支持当日预约' },
  { id: 'hs3', name: '疫苗套餐', note: '含年度提醒' }
]

export const pdfList = [
  { id: 'p1', name: '奶糖_2026年04月健康报告.pdf', date: '2026-04-30', url: '/static/reports/report-april.pdf' },
  { id: 'p2', name: '奶糖_2026年03月健康报告.pdf', date: '2026-03-31', url: '/static/reports/report-march.pdf' }
]
