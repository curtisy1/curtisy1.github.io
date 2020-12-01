import { Page } from './../enums';
import {NodeObject} from 'react-force-graph-2d';

export type CustomNodeObject = NodeObject & {
  page: Page;
  description: string;
}