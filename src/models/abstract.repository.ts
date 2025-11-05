import { Model, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from 'mongoose';

export class AbstractRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create(item: Partial<T>) {
    const doc = new this.model(item);
    return doc.save();
  }

  public async getOne(
    filter: RootFilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOne(filter, projection, options);
  }

  public async updateOne(filter:RootFilterQuery<T>,update:UpdateQuery<T>){
    return this.model.updateOne(filter,update)
  }
}
