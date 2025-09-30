import axios, { AxiosInstance } from 'axios';
import { POST_register_Req } from '../axios-caller/api/POST_register';
import { POST_login_Req } from '../axios-caller/api/POST_login';
import { GET_users_Req } from '../axios-caller/api/GET_users';
import { GET_user__id_Req } from '../axios-caller/api/GET_user__id';
import { PUT_user__id_Req } from '../axios-caller/api/PUT_user__id';
import { DELETE_user__id_Req } from '../axios-caller/api/DELETE_user__id';
import { POST_product_Req } from '../axios-caller/api/POST_product';
import { GET_products_Req } from '../axios-caller/api/GET_products';
import { GET_product__id_Req } from '../axios-caller/api/GET_product__id';
import { PUT_product__id_Req } from '../axios-caller/api/PUT_product__id';
import { DELETE_product__id_Req } from '../axios-caller/api/DELETE_product__id';
import { POST_transaction_Req } from '../axios-caller/api/POST_transaction';
import { GET_transactions_Req } from '../axios-caller/api/GET_transactions';
import { GET_transaction__id_Req } from '../axios-caller/api/GET_transaction__id';
import { DELETE_transaction__id_Req } from '../axios-caller/api/DELETE_transaction__id';
import { POST_category_Req } from '../axios-caller/api/POST_category';
import { GET_category_Req } from '../axios-caller/api/GET_category';
import { GET_category__id_Req } from '../axios-caller/api/GET_category__id';
import { PUT_category__id_Req } from '../axios-caller/api/PUT_category__id';
import { DELETE_category__id_Req } from '../axios-caller/api/DELETE_category__id';
import { user_response } from '../ts-schema/user_response'
import { login_response } from '../ts-schema/login_response'
import { users_response } from '../ts-schema/users_response'

import { product } from '../ts-model/table/product'
import { transaction_detail_response } from '../ts-schema/transaction_detail_response'
import { category_response } from '../ts-schema/category_response'

export class AxiosCaller {
  public axios_instance: AxiosInstance | null = null;

  public call = {
    'POST /register': async (param: POST_register_Req): Promise<user_response> => {
      let clean_path = '/register';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        
      })).data
    },
    'POST /login': async (param: POST_login_Req): Promise<login_response> => {
      let clean_path = '/login';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        
      })).data
    },
    'GET /users': async (param: GET_users_Req): Promise<users_response[]> => {
      let clean_path = '/users';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        params: param.query,
        headers: param.headers as any,
      })).data
    },
    'GET /user/:id': async (param: GET_user__id_Req): Promise<users_response> => {
      let clean_path = '/user/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'PUT /user/:id': async (param: PUT_user__id_Req): Promise<boolean> => {
      let clean_path = '/user/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.put(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'DELETE /user/:id': async (param: DELETE_user__id_Req): Promise<boolean> => {
      let clean_path = '/user/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.delete(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'POST /product': async (param: POST_product_Req): Promise<boolean> => {
      let clean_path = '/product';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'GET /products': async (param: GET_products_Req): Promise<product[]> => {
      let clean_path = '/products';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        params: param.query,
        headers: param.headers as any,
      })).data
    },
    'GET /product/:id': async (param: GET_product__id_Req): Promise<product> => {
      let clean_path = '/product/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'PUT /product/:id': async (param: PUT_product__id_Req): Promise<boolean> => {
      let clean_path = '/product/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.put(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'DELETE /product/:id': async (param: DELETE_product__id_Req): Promise<boolean> => {
      let clean_path = '/product/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.delete(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'POST /transaction': async (param: POST_transaction_Req): Promise<boolean> => {
      let clean_path = '/transaction';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'GET /transactions': async (param: GET_transactions_Req): Promise<transaction_detail_response[]> => {
      let clean_path = '/transactions';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        params: param.query,
        headers: param.headers as any,
      })).data
    },
    'GET /transaction/:id': async (param: GET_transaction__id_Req): Promise<transaction_detail_response> => {
      let clean_path = '/transaction/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'DELETE /transaction/:id': async (param: DELETE_transaction__id_Req): Promise<boolean> => {
      let clean_path = '/transaction/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.delete(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'POST /category': async (param: POST_category_Req): Promise<boolean> => {
      let clean_path = '/category';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.post(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'GET /category': async (param: GET_category_Req): Promise<category_response[]> => {
      let clean_path = '/category';
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        params: param.query,
        headers: param.headers as any,
      })).data
    },
    'GET /category/:id': async (param: GET_category__id_Req): Promise<category_response> => {
      let clean_path = '/category/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.get(clean_path, {
        
        headers: param.headers as any,
      })).data
    },
    'PUT /category/:id': async (param: PUT_category__id_Req): Promise<boolean> => {
      let clean_path = '/category/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.put(clean_path, param.body, {
        
        headers: param.headers as any,
      })).data
    },
    'DELETE /category/:id': async (param: DELETE_category__id_Req): Promise<boolean> => {
      let clean_path = '/category/:id';
      for (const key of Object.keys(param.paths)) {
        clean_path = clean_path.replace(`:${key}`, (param.paths as any)[key]);
      }
      if (!this.axios_instance) {
        throw new Error('Axios not initialized');
      }
      return (await this.axios_instance.delete(clean_path, {
        
        headers: param.headers as any,
      })).data
    }
  }

  constructor(base_url: string) {
    this.axios_instance = axios.create({ baseURL: base_url });
  }
}

