export class  TableSchemaFormatted {
    constructor(){
    }
    [key: string]: {
        maxLength: number;
        isRequired: boolean;
        dataType: 'text' | 'number';    
    };
}