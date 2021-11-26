import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginatedModel<TData> {
  total: number;

  limit: number;

  offset: number;

  results: TData[];
}
