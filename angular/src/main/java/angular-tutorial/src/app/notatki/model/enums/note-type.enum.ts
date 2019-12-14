export enum NoteType {
  HIBERNATE = "HIBERNATE",
  SPRING = "SPRING",
  ANGULAR = "ANGULAR"
}

export namespace NoteType{
  export function values() {
    return Object.keys(NoteType).filter(
      (type) => isNaN(<any> type) && type !== 'values'
    );
  }
}
