import { AbstractRepository } from "@app/common";
import { Injectable } from "@nestjs/common/decorators";
import { CampaignDocument } from "./models/campaign.schema";
import { Logger } from "@nestjs/common/services";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class CampaignsRepository extends AbstractRepository<CampaignDocument> {
    protected readonly logger = new Logger(CampaignsRepository.name);

    constructor(
        @InjectModel(CampaignDocument.name) campaignModel: Model<CampaignDocument>) {
            super(campaignModel);
        }
}