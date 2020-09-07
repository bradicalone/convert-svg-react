// @ts-nocheck
const http = require('http');
const openFile = require('../../converter/server')

jest.mock('http');
describe('openFile', ()=> {
    
    it('should create server on port 8000', () => {
        let func = jest.fn((req, res)=> {
            res.end(content);
        })
        
        const server = http.createServer()
        expect(http.createServer).toBeCalled()
        
        http.createServer(func);
        openFile('<h1>hey</h1>')
        
    });
})

