import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { DonationDocument } from "./models/donate.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class DonationsRepository extends AbstractRepository<DonationDocument> {
    protected readonly logger = new Logger(DonationsRepository.name);

    constructor(
        @InjectModel(DonationDocument.name) donationModel: Model<DonationDocument>) {
            super(donationModel);
        }
}