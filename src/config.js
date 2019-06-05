// 配置元素获取焦点的颜色
export const FOCUS_COLOR = '#6666ff';

// 配置获取幻灯片图片的URL
export const PLAY_URL = 'https://api.asilu.com/bg/';

// 配置获取新闻信息的选项
export const NEWS = {
    // 获取新闻的URL
    URL: 'https://3g.163.com/touch/reconstruct/article/list/',
    // 新闻的分类
    CATEGORIES: [
        'BA10TA81wangning', 'BA8E6OEOwangning', 'BA8EE5GMwangning', 'BAI67OGGwangning',
        'BD2A86BEwangning', 'BD2A9LEIwangning', 'BD2AB5L9wangning', 'BD2AC4LMwangning',
        'DE0CGUSJwangning'
    ],
    // 默认开始时显示的新闻的分类
    DEFAULT: 0,
    // 每次加载能够获取的记录数量
    COUNT: 10
};

// 天气与对应图标class的散列表
export const WEATHERS = {
    '霾': 'iconweather_mai',
    '扬沙': 'iconweather_yangsha',
    '强沙尘暴': 'iconweather_qiangshachenbao',
    '多云': 'iconweather_duoyun',
    '晴': 'iconweather_qing',
    '阵雨': 'iconweather_zhenyu',
    '雷阵雨伴冰雹': 'iconweather_leizhenyubanbingbao',
    '雷阵雨': 'iconweather_leizhenyu',
    '阴': 'iconweather_yin',
    '小雨': 'iconweather_xiaoyu',
    '大雨': 'iconweather_dayu',
    '暴雨': 'iconweather_baoyu',
    '雨夹雪': 'iconweather_yujiaxue',
    '特大暴雨': 'iconweather_tedabaoyu',
    '中雨': 'iconweather_zhongyu',
    '小雪': 'iconweather_xiaoxue',
    '中雪': 'iconweather_zhongxue',
    '阵雪': 'iconweather_zhenxue',
    '大暴雨': 'iconweather_dabaoyu',
    '暴雪': 'iconweather_baoxue',
    '大雪': 'iconweather_daxue',
    '雾': 'iconweather_wu',
    '冻雪': 'iconweather_dongxue',
    '沙尘暴': 'iconweather_shachenbao',
    '浮尘': 'iconweather_fuchen'
};

// 配置获取当前设备所在区域的URL
export const LOCALE_URL = 'https://api.asilu.com/geo/';

// 配置获取城市天气信息的URL
export const WEATHER_URL = 'https://api.asilu.com/weather/';
