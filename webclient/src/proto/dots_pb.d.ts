// package: 
// file: proto/dots.proto

import * as jspb from "google-protobuf";

export class CreateDotTx extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  getR(): number;
  setR(value: number): void;

  getG(): number;
  setG(value: number): void;

  getB(): number;
  setB(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateDotTx.AsObject;
  static toObject(includeInstance: boolean, msg: CreateDotTx): CreateDotTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreateDotTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateDotTx;
  static deserializeBinaryFromReader(message: CreateDotTx, reader: jspb.BinaryReader): CreateDotTx;
}

export namespace CreateDotTx {
  export type AsObject = {
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
  }
}

