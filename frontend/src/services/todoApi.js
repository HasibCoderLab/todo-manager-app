import {httpClient} from './httpClient.js';

const todos_base = '/todos'

export const todoApi = {
  create: data => httpClient.post(`${todos_base}/post`, data),
  getAll: (params = {}) => httpClient.get(`${todos_base}/get`, {params}),
  bulkCreate: todos => httpClient.post(`${todos_base}/bulk`, {todos}),
  update: (id, data) => httpClient.put(`${todos_base}/${id}`, data),
  delete: (id) => httpClient.delete(`${todos_base}/${id}`),
}