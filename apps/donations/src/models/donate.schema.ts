import { AbstractDocument } from "@app/common";
import { Prop, Schema } from "@nestjs/mongoose";
import { CampaignDocument } from "apps/campaigns/src/models/campaign.schema";

@Schema({versionKey: false})
export class DonationDocument extends AbstractDocument{
    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    campaignId: string;

    @Prop()
    createdAt: Date;
    
    @Prop()
    donorId: string;
}