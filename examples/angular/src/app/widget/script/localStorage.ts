export class local{
    static set(key:string, value:any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static get(key:string) {
        var d = localStorage.getItem(key);
        if (!d) return d;
        return JSON.parse(d);
    }

    static remove(key:string) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    } 
    //如果设置为length，转为js时会报错
    static count(){
        return localStorage.length;
    } 

}


    



