export interface Message {
    id: number;
    text: string;
    isAnswer: boolean;
    createdAt: Date;
    file?: File;
    fileUrl? : string | undefined;
}