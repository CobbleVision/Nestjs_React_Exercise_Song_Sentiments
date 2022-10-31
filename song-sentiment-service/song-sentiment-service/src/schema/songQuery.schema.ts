import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

export type SongQueryDocument = SongQuery & Document;

@Schema()
export class SongQuery{
   @Prop({required: true, unique:true})
   songName: string;
   
   @Prop({required: true})
   sentimentRating: number;
}

export const songQuerySchema = SchemaFactory.createForClass(SongQuery);
