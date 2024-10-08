import { describe, expect, it, jest } from "@jest/globals";
import { MyService } from "./main";

describe(MyService, () => {
    it("dedupes the requests", async () => {

        const mockFn = jest.fn<(str: string) => Promise<string>>().mockImplementation((str) => {
            return Promise.resolve(str); 
        }); 
        const service = new MyService(mockFn); 

        const prom1 = service.getData("a")
        const prom2 = service.getData("a")

        await Promise.all([prom1, prom2]); 

        expect(mockFn).toHaveBeenCalledTimes(1);
    });


    it("dedupes the requests 2", async () => {

        const mockFn = jest.fn<(str: string) => Promise<string>>().mockImplementation((str) => {
            return Promise.resolve(str); 
        }); 
        const service = new MyService(mockFn); 

        const prom1 = await service.getData("a")
        const prom2 =  await  service.getData("a")

        expect(mockFn).toHaveBeenCalledTimes(1);
    })

    it("doesn't dedupe different keys", async () => {

        const mockFn = jest.fn<(str: string) => Promise<string>>().mockImplementation((str) => {
            return Promise.resolve(str); 
        }); 
        const service = new MyService(mockFn); 

        const prom1 = await service.getData("a")
        const prom2 =  await  service.getData("b")

        expect(mockFn).toHaveBeenCalledTimes(2);
    })
})