// @ts-nocheck
const http = require('http');
const openFile = require('../../converter/server')

jest.mock('http', ()=> {
    return {
        createServer: jest.fn(()=> {
            return {
                listen: jest.fn()
            }
        })
    }
});

describe('openFile', ()=> {
    
    it('should create server on port 8000', () => {
        let func = jest.fn((req, res)=> {})
        
        const server = http.createServer(func)
        expect(http.createServer).toBeCalled()
        server.listen(8000)

        openFile('<h1>Hey You</h1>')
        
    });
})

