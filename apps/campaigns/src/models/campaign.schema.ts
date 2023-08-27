import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class CampaignDocument extends AbstractDocument{
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    targetAmount: number;

    @Prop({default: 0})
    currentAmount: number;

    @Prop()
    campaignTag: string;

    @Prop()
    creatorId: string;

    @Prop({ default: [] })
    donations: string[];

    @Prop({default: false})
    isClosed: boolean;

    @Prop()
    createAt: Date;

    @Prop()
    endDate: Date;
}

export const CampaignSchema = SchemaFactory.createForClass(CampaignDocument);
