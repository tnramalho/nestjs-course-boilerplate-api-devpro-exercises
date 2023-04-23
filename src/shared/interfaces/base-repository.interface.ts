export interface BaseRepositoryInterface<T, K> {
  create(data: T): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: K): Promise<T>;
  delete(id: K): Promise<string>;
  update(id: K, data: Partial<T>): Promise<string>;
}
