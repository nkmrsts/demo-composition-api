/* eslint-disable */
import mockServer from 'axios-mock-server'
import mock0 from './api/notes/index'
import mock1 from './api/notes/_id'

export default (client) => mockServer([
  {
    path: '/api/notes',
    methods: mock0
  },
  {
    path: '/api/notes/_id',
    methods: mock1
  }
], client, '')
