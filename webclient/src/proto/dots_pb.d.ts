// package: 
// file: proto/dots.proto

import * as jspb from "google-protobuf";

export class TileMapTx extends jspb.Message {
  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TileMapTx.AsObject;
  static toObject(includeInstance: boolean, msg: TileMapTx): TileMapTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TileMapTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TileMapTx;
  static deserializeBinaryFromReader(message: TileMapTx, reader: jspb.BinaryReader): TileMapTx;
}

export namespace TileMapTx {
  export type AsObject = {
    data: string,
  }
}

export class TileMapState extends jspb.Message {
  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TileMapState.AsObject;
  static toObject(includeInstance: boolean, msg: TileMapState): TileMapState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TileMapState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TileMapState;
  static deserializeBinaryFromReader(message: TileMapState, reader: jspb.BinaryReader): TileMapState;
}

export namespace TileMapState {
  export type AsObject = {
    data: string,
  }
}

