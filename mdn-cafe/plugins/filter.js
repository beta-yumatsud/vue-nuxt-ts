import Vue from 'vue'
import { DateTime } from 'luxon'

Vue.filter('formatDate', (value) => {
  const valueDate = DateTime.fromISO(value)
  return valueDate.toFormat('yyyy.MM.dd')
})
