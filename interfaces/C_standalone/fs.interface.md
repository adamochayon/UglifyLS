
fs as supported in LiteC-core

    public namespace fs

        method existsSync(filename:string)

        method readFileSync(filename,encoding:string) returns string
        method writeFileSync(filename, contents) 

        method statSync(filename:string)
        method unlinkSync(filename:string)
        method mkdirSync(path:string, mode)

        method openSync(filename:string, mode:string)
        method writeSync(fd, buf)
        method closeSync(fd)

        class Stat 
            properties
                size : number
                mtime : Date
                mode: number

            method isDirectory returns boolean
            method isFile returns boolean
