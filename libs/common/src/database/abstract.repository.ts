import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstract.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createdDocument.save()).toJSON() as unknown as TDocument
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });

        if (!document) {
        this.logger.warn('Document not found with filterQuery', filterQuery);
        throw new NotFoundException('Document not found.');
        }

        return document as TDocument;
  }

    async findOneAndUpdate(
      filterQuery: FilterQuery<TDocument>, document: UpdateQuery<TDocument>)   {
      const updatedDocument = await this.model.findOneAndUpdate(filterQuery, document, { 
          lean: true,
          new: true });
      
      if (!updatedDocument) {
          this.logger.warn('Document not found with filterQuery', filterQuery);
          throw new NotFoundException('Document not found.');
          }
      
      return updatedDocument;
    }

    async find() {
      const document = await this.model.find({}, {}, {lean: true});
      return document
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
      const document = await this.model.findOneAndDelete(filterQuery, {lean: true});
    }

}