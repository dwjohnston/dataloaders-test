import DataLoader from "dataloader";



async function defaultApiCall(value: string) : Promise<string> {
    console.log("api",value);
    return value;
}
export class MyService{


    loader: DataLoader<string, string>
    constructor(private apiCall : (value: string) => Promise<string> = defaultApiCall) {

        this.apiCall = apiCall;

        this.loader =  new DataLoader<string, string>((keys) => {
            return Promise.all(keys.map((v) => this.apiCall(v))); 
        });
    }

    public getData(value: string): Promise<string> {
        return this.loader.load(value);
    }


}

