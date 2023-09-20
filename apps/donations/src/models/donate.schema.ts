import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
export const DonationSchema = SchemaFactory.createForClass(DonationDocument);