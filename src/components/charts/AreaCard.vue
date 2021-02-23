<template>
  <v-card class="d-flex flex-grow-1 blue darken-2" dark>

    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- information -->
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <div>{{ title }}</div>
        <v-spacer></v-spacer>
        <v-btn text color="white-text" @click="$emit('action-clicked')">{{ actionLabel }}</v-btn>
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="pa-2">
          <div class="text-h4">
            ${{ 26358.49 | formatCurrency }}
          </div>
          <div class="blue--text text--lighten-2 mt-1">
            ${{ 7123.21 | formatCurrency }} 对比{{ percentageLabel }}
          </div>
        </div>

        <v-spacer></v-spacer>

        <div class="px-2 pb-2">
          <div class="title mb-1 white-text">{{ subtitle }}</div>
          <div class="d-flex align-center">
            <div class="text-h4">
              ${{ value | formatCurrency }}
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column text-right">
              <div class="font-weight-bold">
                <trend-percent :value="percentage" />
              </div>
              <div class="caption">对比于{{ percentageLabel }}</div>
            </div>
          </div>
        </div>
      </div>

      <apexchart
        type="area"
        height="120"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment'
import TrendPercent from '@/components/charts/TrendPercent.vue'

function formatDate(date) {
  return date ? moment(date).format('D MMM') : ''
}

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  components: {
    TrendPercent
  },
  props: {
    title:{
      type: String,
      default: '营业额'
    },
    subtitle:{
      type: String,
      default: '平均每周业绩量'
    },
    value: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    },
    percentageLabel: {
      type: String,
      default: '上个月'
    },
    series: {
      type: Array,
      default: () => [{
        name: 'Sales',
        data: [11, 32, 45, 32, 34, 52, 41]
      }]
    },
    xaxis: {
      type: Object,
      default: () => ({
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-20T00:00:00.000Z',
          '2018-09-21T00:00:00.000Z',
          '2018-09-22T00:00:00.000Z',
          '2018-09-23T00:00:00.000Z',
          '2018-09-24T00:00:00.000Z',
          '2018-09-25T00:00:00.000Z'
        ]
      })
    },
    label: {
      type: String,
      default: 'dashboard.sales'
    },
    actionLabel: {
      type: String,
      default: '查看报告'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    chartOptions() {
      const primaryColor = '#64B5F6'
      // this.$vuetify.theme.isDark
      //   ? this.$vuetify.theme.themes.dark.primary
      //   : this.$vuetify.theme.themes.light.primary

      return {
        chart: {
          height: 120,
          type: 'area',
          sparkline: {
            enabled: true
          },
          animations: {
            speed: 400
          }
        },
        colors: [primaryColor],
        fill: {
          type: 'solid',
          colors: ['#1E88E5'],
          opacity: 0.01
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: this.xaxis,
        tooltip: {
          followCursor: true,
          theme: 'dark',
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            const seriesName = w.config.series[seriesIndex].name

            return `<div class="rounded-lg pa-1 caption">
              <div class="font-weight-bold">${formatDate(w.globals.labels[dataPointIndex])}</div>
              <div>${series[seriesIndex][dataPointIndex]} ${seriesName}</div>
            </div>`
          }
        },
        ...this.options
      }
    }
  }
}
</script>
