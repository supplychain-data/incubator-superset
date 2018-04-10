import DataSet from '@antv/data-set';
import G2 from '@antv/g2';

const funnelViz = (slice, payload) => {
  const { DataView } = DataSet;
  console.log({ slice, payload });
  const { data } = payload;
  const chart = new G2.Chart({
    container: slice.containerId,
    forceFit: true,
    height: slice.height(),
    padding: [ 20, 120, 95 ]
  });
  chart.source(data, {
    percent: {
      nice: false
    }
  });
  chart.axis(false);
  chart.tooltip({
    showTitle: false,
    itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
        + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
        + '{key}<br/>'
        + '<span style="padding-left: 16px">数量：{value}</span><br/>'
        + '<span style="padding-left: 16px">占比：{percent}</span><br/>'
        + '</li>'
  });
  chart.coord('rect').transpose().scale(1,-1);
  chart.intervalSymmetric().position('key*value')
    .shape('funnel')
    .color('key')
    .label('key*value', (key, value) => {
      return key + ' ' + value;
    }, {
      offset: 35,
      labelLine: {
        lineWidth: 1,
        stroke: 'rgba(0, 0, 0, 0.15)'
      }
    })
    .tooltip('key*value*percent', (key, value, percent) => {
      return {
        key: key,
        percent: parseInt(percent * 100) + '%',
        value: value
      };
    });
  data.forEach((obj) => {
    // 中间标签文本
    chart.guide().text({
      top: true,
      position: {
        key: obj.key,
        percent: 'median'
      },
      content: parseInt(obj.percent * 100) + '%', // 显示的文本内容
      style: {
        fill: '#fff',
        fontSize: '12',
        textAlign: 'center',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    });
  });
  chart.render();
}

module.exports = funnelViz;
