import express from 'express';

export type Url = `/${string}`;

export type RequestCallback = (req: express.Request, res: express.Response) => Promise<void>;

export enum Method {
  Delete = 'delete',
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
}
